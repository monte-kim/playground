"use client";

import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import { Skull, Play, Pause, RefreshCw, Zap, User, Smartphone, AlertTriangle } from "lucide-react";

export default function FocusQuest() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [model, setModel] = useState<cocoSsd.ObjectDetection | null>(null);
  const [isFocusing, setIsFocusing] = useState(true);
  const [exp, setExp] = useState(0);
  const [penalty, setPenalty] = useState(0);
  const [status, setStatus] = useState("INITIALIZING...");
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

  // 3. 메인 감지 루프
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const detect = async () => {
      if (model && videoRef.current && isRunning && videoRef.current.readyState === 4) {
        try {
          const predictions = await model.detect(videoRef.current);
          const detectedObjects = predictions
            .filter(p => p.score > 0.5)
            .map(p => p.class);
          
          setObjects(detectedObjects);

          const hasPerson = detectedObjects.includes("person");
          const hasPhone = detectedObjects.includes("cell phone");

          if (hasPerson && !hasPhone) {
            setIsFocusing(true);
            setExp(prev => prev + 10);
            setStatus("FOCUSING...");
          } else {
            setIsFocusing(false);
            setPenalty(prev => prev + 10);
            setStatus(hasPhone ? "PHONE DETECTED!" : "USER MISSING!");
          }
        } catch (err) {
          console.error("Detection error:", err);
        }
      }
      
      if (isRunning) {
        timeoutId = setTimeout(detect, 200);
      }
    };

    if (isRunning) {
      detect();
    }
    return () => clearTimeout(timeoutId);
  }, [model, isRunning]);

  const resetGame = () => {
    setExp(0);
    setPenalty(0);
  };

  const isDistracted = !isFocusing && isRunning;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-black text-white">
      {/* 1-Bit Scanlines */}
      <div className="fixed inset-0 pointer-events-none scanlines z-50 opacity-10"></div>

      <div className="w-full max-w-2xl bit-border-double p-6 relative bg-black border-white">
        
        {/* Stats Header */}
        <div className="flex justify-between items-center mb-8 border-b-4 border-white pb-4 font-pixel">
          <div className="flex flex-col gap-2">
            <div className="text-[10px] opacity-70">EXP (FOCUS)</div>
            <div className="text-xl flex items-center gap-2">
              <Zap className="w-5 h-5" /> {exp.toString().padStart(6, '0')}
            </div>
          </div>
          <div className="text-right flex flex-col gap-2">
            <div className="text-[10px] opacity-70">PENALTY</div>
            <div className="text-xl flex items-center gap-2 justify-end">
              {penalty.toString().padStart(6, '0')} <Skull className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Camera Viewport */}
        <div className="relative aspect-video bit-border bg-black overflow-hidden mb-6 flex items-center justify-center">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className={`w-full h-full object-cover grayscale contrast-[400%] brightness-[1.1] ${!isRunning ? 'hidden' : 'block'}`}
          />

          {/* Distraction Overlay (Replaces Inversion) */}
          {isDistracted && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-30 animate-pulse">
              <div className="bit-border p-8 bg-black border-white flex flex-col items-center gap-4">
                <AlertTriangle className="w-16 h-16 text-white" />
                <div className="text-xl font-pixel text-center">
                  {objects.includes("cell phone") ? "PHONE ALERT!" : "USER MISSING!"}
                </div>
                <div className="text-[10px] font-pixel opacity-70 animate-bounce">GET BACK TO WORK!</div>
              </div>
            </div>
          )}

          {!isRunning && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10 bg-black">
              <p className="text-xs animate-pulse font-pixel">{status}</p>
              {model && (
                <button onClick={startCamera} className="bit-border px-6 py-3 hover:bg-white hover:text-black transition-colors flex items-center gap-2 font-pixel text-sm border-white bg-black text-white">
                  <Play className="w-4 h-4 fill-current" /> START QUEST
                </button>
              )}
            </div>
          )}

          {/* Indicators */}
          {isRunning && !isDistracted && (
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
              <div className="bg-white text-black text-[8px] p-1 border border-black flex items-center gap-1 font-pixel"><User size={10} /> FOCUSING</div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="space-y-6 font-pixel">
          <div className="flex items-center gap-4">
            <div className="flex-1 bit-border h-8 relative overflow-hidden border-white">
               <div className="absolute inset-y-0 left-0 bg-white transition-all duration-300" style={{ width: `${Math.min((exp / 10000) * 100, 100)}%` }} />
               <div className="absolute inset-0 flex items-center justify-center text-[8px] mix-blend-difference font-bold">QUEST PROGRESS</div>
            </div>
            <button onClick={() => setIsRunning(!isRunning)} className="bit-border p-2 border-white hover:bg-white hover:text-black transition-colors">
              {isRunning ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button onClick={resetGame} className="bit-border p-2 border-white hover:bg-white hover:text-black transition-colors">
              <RefreshCw size={20} />
            </button>
          </div>

          <div className="bit-border p-4 bg-white text-black flex justify-between items-center border-white">
            <div className="text-[10px] uppercase font-bold">STATUS: {status}</div>
            <div className="text-[8px] opacity-50 tracking-widest">FOCUS_QUEST_V2_STABLE</div>
          </div>
        </div>
      </div>
    </main>
  );
}
