"use client";

import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { Skull, Play, Pause, RefreshCw, Zap, AlertTriangle } from "lucide-react";

export default function FocusGuard() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [model, setModel] = useState<any>(null);
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
        setStatus("LOADING AI MODEL...");
        const cocoSsd = await import("@tensorflow-models/coco-ssd");
        await tf.ready();
        const loadedModel = await cocoSsd.load();
        setModel(loadedModel);
        setStatus("READY TO GUARD");
      } catch (err) {
        console.error("Model load error:", err);
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

      if (model && videoRef.current && isRunning && videoRef.current.readyState >= 2) {
        try {
          const predictions = await model.detect(videoRef.current);
          const detectedObjects = predictions.filter((p: any) => p.score > 0.5).map((p: any) => p.class);
          
          const hasPhone = detectedObjects.includes("cell phone");
          const hasPerson = detectedObjects.includes("person");

          setObjects(detectedObjects);

          if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            if (ctx) {
              const { width, height } = canvasRef.current;
              ctx.clearRect(0, 0, width, height);

              // 1-Bit 스타일 배경 렌더링 (단순화)
              ctx.save();
              ctx.translate(width, 0);
              ctx.scale(-1, 1);
              ctx.filter = "grayscale(100%) contrast(200%) brightness(0.5)";
              ctx.drawImage(videoRef.current, 0, 0, width, height);
              ctx.restore();

              // 감지된 오브젝트 바운딩 박스 (도트 스타일)
              predictions.forEach((p: any) => {
                if (p.score > 0.5) {
                  const [x, y, w, h] = p.bbox;
                  ctx.strokeStyle = "white";
                  ctx.lineWidth = 4;
                  // 거울 모드 대응 좌표 변환
                  const displayX = width - (x + w);
                  ctx.strokeRect(displayX, y, w, h);
                  
                  ctx.fillStyle = "white";
                  ctx.font = "10px monospace";
                  ctx.fillText(p.class.toUpperCase(), displayX, y > 10 ? y - 5 : 10);
                }
              });
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
  }, [model, isRunning]);

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
              {model && (
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
            <div className="text-[8px] opacity-70">1-BIT_VISION_V1</div>
          </div>
        </div>
      </div>
    </main>
  );
}
