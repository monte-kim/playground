"use client";

import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as posenet from "@tensorflow-models/posenet";
import { Skull, Play, Pause, RefreshCw, Zap, AlertTriangle } from "lucide-react";

export default function FocusGuard() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [models, setModels] = useState<{ coco: cocoSsd.ObjectDetection | null; pose: posenet.PoseNet | null }>({
    coco: null,
    pose: null,
  });
  const [isFocusing, setIsFocusing] = useState(true);
  const [focusTime, setFocusTime] = useState(0); // in ms
  const [penaltyTime, setPenaltyTime] = useState(0); // in ms
  const [status, setStatus] = useState("INITIALIZING ENGINES...");
  const [isRunning, setIsRunning] = useState(false);
  const [objects, setObjects] = useState<string[]>([]);
  const lastTimeRef = useRef<number | null>(null);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const loadModels = async () => {
      try {
        await tf.ready();
        const [coco, pose] = await Promise.all([
          cocoSsd.load(),
          posenet.load({
            architecture: "MobileNetV1",
            outputStride: 16,
            inputResolution: { width: 513, height: 513 },
            multiplier: 0.75,
          }),
        ]);
        setModels({ coco, pose });
        setStatus("READY TO GUARD");
      } catch (err) {
        setStatus("ENGINE ERROR");
      }
    };
    loadModels();
  }, []);

  const startCamera = async () => {
    try {
      setStatus("REQUESTING CAMERA...");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsRunning(true);
        setStatus("WATCHING...");
      }
    } catch (err) {
      setStatus("CAMERA ERROR");
    }
  };

  useEffect(() => {
    let animationId: number;

    const renderLoop = async () => {
      const currentTime = performance.now();
      const deltaTime = lastTimeRef.current ? currentTime - lastTimeRef.current : 0;
      lastTimeRef.current = currentTime;

      if (models.coco && models.pose && videoRef.current && isRunning && videoRef.current.readyState >= 2) {
        try {
          const [predictions, pose] = await Promise.all([
            models.coco.detect(videoRef.current),
            models.pose.estimateSinglePose(videoRef.current, { flipHorizontal: false }),
          ]);

          const detectedObjects = predictions.filter((p) => p.score > 0.5).map((p) => p.class);
          const hasPhone = detectedObjects.includes("cell phone");
          const hasPerson = pose.score > 0.15;

          setObjects(detectedObjects);

          if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            if (ctx) {
              const { width, height } = canvasRef.current;
              const scaleX = width / videoRef.current.videoWidth;
              const scaleY = height / videoRef.current.videoHeight;

              ctx.clearRect(0, 0, width, height);

              // 1. 배경 (아주 어둡게)
              ctx.save();
              ctx.translate(width, 0);
              ctx.scale(-1, 1);
              ctx.filter = "grayscale(100%) contrast(200%) brightness(0.4) blur(4px)";
              ctx.drawImage(videoRef.current, 0, 0, width, height);
              ctx.filter = "none";

              if (hasPerson) {
                const kp = pose.keypoints;
                const findKp = (name: string) => kp.find((k) => k.part === name);

                const drawPart = (partName: string, size: number, color = "black") => {
                  const point = findKp(partName);
                  if (point && point.score > 0.5) {
                    const x = point.position.x * scaleX;
                    const y = point.position.y * scaleY;
                    ctx.fillStyle = color;
                    ctx.fillRect(x - size / 2, y - size / 2, size, size);
                    ctx.strokeStyle = "white";
                    ctx.lineWidth = 2;
                    ctx.strokeRect(x - size / 2, y - size / 2, size, size);
                    return { x, y };
                  }
                  return null;
                };

                const drawBone = (p1: any, p2: any) => {
                  const pt1 = findKp(p1);
                  const pt2 = findKp(p2);
                  if (pt1 && pt2 && pt1.score > 0.3 && pt2.score > 0.3) {
                    ctx.beginPath();
                    ctx.moveTo(pt1.position.x * scaleX, pt1.position.y * scaleY);
                    ctx.lineTo(pt2.position.x * scaleX, pt2.position.y * scaleY);
                    ctx.strokeStyle = "white";
                    ctx.lineWidth = 8;
                    ctx.stroke();
                  }
                };

                // 관절 연결 (뼈대)
                drawBone("leftShoulder", "rightShoulder");
                drawBone("leftShoulder", "leftElbow");
                drawBone("leftElbow", "leftWrist");
                drawBone("rightShoulder", "rightElbow");
                drawBone("rightElbow", "rightWrist");
                drawBone("leftShoulder", "leftHip");
                drawBone("rightShoulder", "rightHip");
                drawHipJoints("leftHip", "rightHip");

                function drawHipJoints(p1: any, p2: any) {
                  const pt1 = findKp(p1);
                  const pt2 = findKp(p2);
                  if (pt1 && pt2 && pt1.score > 0.3 && pt2.score > 0.3) {
                    ctx.beginPath();
                    ctx.moveTo(pt1.position.x * scaleX, pt1.position.y * scaleY);
                    ctx.lineTo(pt2.position.x * scaleX, pt2.position.y * scaleY);
                    ctx.strokeStyle = "white";
                    ctx.lineWidth = 8;
                    ctx.stroke();
                  }
                }

                // 관절 박스 (아바타 부위)
                const nose = drawPart("nose", 70); // 머리
                if (nose) {
                  // 눈동자 그리기
                  ctx.fillStyle = "white";
                  ctx.fillRect(nose.x - 20, nose.y - 10, 10, 10);
                  ctx.fillRect(nose.x + 10, nose.y - 10, 10, 10);
                }
                
                drawPart("leftShoulder", 30);
                drawPart("rightShoulder", 30);
                drawPart("leftElbow", 25);
                drawPart("rightElbow", 25);
                drawPart("leftWrist", 40); // 손
                drawPart("rightWrist", 40); // 손
                drawPart("leftHip", 35);
                drawPart("rightHip", 35);
              }
              ctx.restore();
            }
          }

          if (hasPerson && !hasPhone) {
            setIsFocusing(true);
            setFocusTime((prev) => prev + deltaTime);
            setStatus("FOCUSING...");
          } else {
            setIsFocusing(false);
            setPenaltyTime((prev) => prev + deltaTime);
            setStatus(hasPhone ? "PHONE DETECTED!" : "USER MISSING!");
          }
        } catch (err) {
          console.error("Render loop error:", err);
        }
      } else {
        // Even if not active, keep updating lastTimeRef when isRunning
        // to avoid huge deltaTime jumps
      }
      animationId = requestAnimationFrame(renderLoop);
    };

    if (isRunning) {
      lastTimeRef.current = performance.now();
      renderLoop();
    } else {
      lastTimeRef.current = null;
    }
    return () => cancelAnimationFrame(animationId);
  }, [models, isRunning]);

  const resetGame = () => {
    setFocusTime(0);
    setPenaltyTime(0);
  };

  const isDistracted = !isFocusing && isRunning;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-black text-white">
      <div className="fixed inset-0 pointer-events-none scanlines z-50 opacity-10"></div>

      <div className="w-full max-w-2xl bit-border-double p-6 relative bg-black border-white">
        <div className="flex justify-between items-center mb-8 border-b-4 border-white pb-4 font-mono">
          <div>
            <div className="text-[10px] opacity-70 font-bold uppercase">FOCUS TIME</div>
            <div className="text-xl flex items-center gap-2">
              <Zap className="w-5 h-5" /> {formatTime(focusTime)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] opacity-70 font-bold uppercase">PENALTY TIME</div>
            <div className="text-xl flex items-center gap-2 justify-end">
              {formatTime(penaltyTime)} <Skull className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="relative aspect-video bit-border bg-black overflow-hidden mb-6 flex items-center justify-center">
          <video ref={videoRef} autoPlay muted playsInline className="hidden" />
          <canvas ref={canvasRef} width={640} height={480} className="w-full h-full object-cover" />

          {isDistracted && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-30">
              <div className="bit-border p-6 bg-black border-white flex flex-col items-center gap-2 animate-pulse">
                <AlertTriangle className="w-12 h-12 text-white" />
                <div className="text-lg font-mono text-center">
                  {objects.includes("cell phone") ? "PHONE DETECTED!" : "USER MISSING!"}
                </div>
              </div>
            </div>
          )}

          {!isRunning && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10 bg-black">
              <p className="text-xs animate-pulse font-mono">{status}</p>
              {models.coco && models.pose && (
                <button
                  onClick={startCamera}
                  className="bit-border px-8 py-4 bg-black text-white hover:bg-white hover:text-black transition-colors font-mono font-bold"
                >
                  START GUARD
                </button>
              )}
            </div>
          )}
        </div>

        <div className="space-y-6 font-mono">
          <div className="flex items-center gap-4">
            <div className="flex-1 bit-border h-8 relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-white transition-all duration-300"
                style={{ width: `${Math.min((focusTime / 3600000) * 100, 100)}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold mix-blend-difference">
                1 HOUR GOAL
              </div>
            </div>
            <button onClick={() => setIsRunning(!isRunning)} className="bit-border p-2 hover:bg-white hover:text-black">
              {isRunning ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button onClick={resetGame} className="bit-border p-2 hover:bg-white hover:text-black">
              <RefreshCw size={20} />
            </button>
          </div>

          <div className="bit-border p-4 bg-white text-black flex justify-between items-center">
            <div className="text-[10px] font-bold uppercase tracking-widest">Status: {status}</div>
            <div className="text-[8px] opacity-70">SKELETAL_AVATAR_V2</div>
          </div>
        </div>
      </div>
    </main>
  );
}
