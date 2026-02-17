"use client";

import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import { Skull, Play, Pause, RefreshCw, Zap, AlertTriangle } from "lucide-react";

export default function FocusQuest() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [model, setModel] = useState<cocoSsd.ObjectDetection | null>(null);
  const [isFocusing, setIsFocusing] = useState(true);
  const [exp, setExp] = useState(0);
  const [penalty, setPenalty] = useState(0);
  const [status, setStatus] = useState("INITIALIZING AI...");
  const [isRunning, setIsRunning] = useState(false);
  const [objects, setObjects] = useState<string[]>([]);

  // 1. 모델 로드
  useEffect(() => {
    const loadModel = async () => {
      try {
        await tf.ready();
        const loadedModel = await cocoSsd.load();
        setModel(loadedModel);
        setStatus("READY TO FOCUS");
      } catch (err) {
        setStatus("MODEL ERROR");
      }
    };
    loadModel();
  }, []);

  // 2. 카메라 설정
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          setIsRunning(true);
          setStatus("WATCHING...");
        };
      }
    } catch (err) {
      setStatus("CAMERA ERROR");
    }
  };

  // 3. 메인 감지 및 AR 렌더링 루프
  useEffect(() => {
    let animationId: number;
    
    const renderLoop = async () => {
      if (model && videoRef.current && isRunning && videoRef.current.readyState === 4) {
        try {
          // AI 감지는 원본 데이터로 수행
          const predictions = await model.detect(videoRef.current);
          const detectedObjects = predictions.filter(p => p.score > 0.5).map(p => p.class);
          const person = predictions.find(p => p.class === "person" && p.score > 0.5);
          const hasPhone = detectedObjects.includes("cell phone");

          setObjects(detectedObjects);

          // 캔버스 렌더링 (사용자 가리기)
          if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            if (ctx) {
              const { width, height } = canvasRef.current;
              ctx.clearRect(0, 0, width, height);

              // 1. 배경을 1-bit 느낌으로 아주 흐리게 그리기 (프라이버시)
              ctx.filter = "grayscale(100%) contrast(150%) brightness(0.8) blur(4px)";
              ctx.drawImage(videoRef.current, 0, 0, width, height);
              ctx.filter = "none";

              // 2. 캐릭터 덮어씌우기
              if (person) {
                const [x, y, w, h] = person.bbox;
                const scaleX = width / videoRef.current.videoWidth;
                const scaleY = height / videoRef.current.videoHeight;
                const cx = x * scaleX;
                const cy = y * scaleY;
                const cw = w * scaleX;
                const ch = h * scaleY;

                // 실물 가리기 (검은 실루엣)
                ctx.fillStyle = "black";
                ctx.fillRect(cx, cy, cw, ch);
                
                // 도트 캐릭터 (하얀 테두리)
                ctx.strokeStyle = "white";
                ctx.lineWidth = 4;
                ctx.strokeRect(cx + cw * 0.1, cy + ch * 0.1, cw * 0.8, ch * 0.8);

                // 눈 그리기 (움직이는 느낌)
                ctx.fillStyle = "white";
                const eyeSize = cw * 0.12;
                const time = Date.now() * 0.005;
                const blink = Math.sin(time) > 0.9 ? 0 : 1; // 깜빡임 효과
                
                ctx.fillRect(cx + cw * 0.25, cy + ch * 0.3, eyeSize, eyeSize * blink);
                ctx.fillRect(cx + cw * 0.65, cy + ch * 0.3, eyeSize, eyeSize * blink);

                // 집중 상태 문구
                ctx.font = "bold 14px monospace";
                ctx.fillStyle = "white";
                ctx.fillText(hasPhone ? "💀 PHONE!" : "📖 STUDYING", cx + 10, cy + ch - 10);
              }
            }
          }

          if (person && !hasPhone) {
            setIsFocusing(true);
            setExp(prev => prev + 10);
            setStatus("FOCUSING...");
          } else {
            setIsFocusing(false);
            setPenalty(prev => prev + 10);
            setStatus(hasPhone ? "PHONE DETECTED!" : "USER MISSING!");
          }
        } catch (err) {
          console.error("Render loop error:", err);
        }
      }
      animationId = requestAnimationFrame(renderLoop);
    };

    if (isRunning) {
      renderLoop();
    }
    return () => cancelAnimationFrame(animationId);
  }, [model, isRunning]);

  const resetGame = () => {
    setExp(0);
    setPenalty(0);
  };

  const isDistracted = !isFocusing && isRunning;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-black text-white">
      <div className="fixed inset-0 pointer-events-none scanlines z-50 opacity-10"></div>

      <div className="w-full max-w-2xl bit-border-double p-6 relative bg-black border-white">
        
        {/* Stats */}
        <div className="flex justify-between items-center mb-8 border-b-4 border-white pb-4 font-mono">
          <div>
            <div className="text-[10px] opacity-70 font-bold uppercase">EXP</div>
            <div className="text-xl flex items-center gap-2">
              <Zap className="w-5 h-5" /> {exp.toString().padStart(6, '0')}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] opacity-70 font-bold uppercase">PENALTY</div>
            <div className="text-xl flex items-center gap-2 justify-end">
              {penalty.toString().padStart(6, '0')} <Skull className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* AR Viewport */}
        <div className="relative aspect-video bit-border bg-black overflow-hidden mb-6 flex items-center justify-center">
          <video ref={videoRef} autoPlay muted playsInline className="hidden" />
          <canvas ref={canvasRef} width={640} height={480} className="w-full h-full object-cover" />

          {/* Alert Display */}
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
                <button onClick={startCamera} className="bit-border px-8 py-4 bg-black text-white hover:bg-white hover:text-black transition-colors font-mono font-bold">
                  START QUEST
                </button>
              )}
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="space-y-6 font-mono">
          <div className="flex items-center gap-4">
            <div className="flex-1 bit-border h-8 relative overflow-hidden">
               <div className="absolute inset-y-0 left-0 bg-white transition-all duration-300" style={{ width: `${Math.min((exp / 10000) * 100, 100)}%` }} />
               <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold mix-blend-difference">PROGRESS</div>
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
            <div className="text-[8px] opacity-70">AR_AVATAR_MODE_V1</div>
          </div>
        </div>
      </div>
    </main>
  );
}
