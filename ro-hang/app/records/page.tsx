'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Letter {
  id: string;
  sender: string;
  receiver: string;
  content: string;
  createdAt: string;
}

export default function RecordsPage() {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/letters/sent')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setLetters(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetching records failed:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className='flex flex-col min-h-screen bg-white text-black'>
      <nav className='flex items-center justify-center px-6 py-8 border-b border-border'>
        <Link href='/' className='absolute left-7 text-sm font-bold tracking-widest uppercase'>
          ←
        </Link>
        <h1 className='text-lg font-bold'>나의 흔적</h1>
      </nav>

      <main className='flex-1 flex flex-col px-6 py-8'>
        {loading ? (
          <p className='text-muted animate-pulse'>불러오는 중...</p>
        ) : letters.length === 0 ? (
          <div className='flex-1 flex items-center justify-center'>
            <div className='text-center'>
              <p className='text-[14px] text-muted tracking-widest uppercase mb-4'>(비어있음)</p>
              <Link href='/write' className='text-[13px] font-bold border-b border-black pb-1'>
                첫 편지 남기기
              </Link>
            </div>
          </div>
        ) : (
          <div className='space-y-12'>
            {letters.map((letter) => (
              <Link key={letter.id} href={`/letter/${letter.id}`} className='group block'>
                <article>
                  <header className='flex justify-between items-baseline mb-3'>
                    <span className='text-sm font-bold tracking-tight'>to. {letter.receiver}</span>
                    <time className='text-[12px] text-muted'>{new Date(letter.createdAt).toLocaleDateString()}</time>
                  </header>
                  <p className='text-[15px] leading-relaxed text-zinc-700 line-clamp-2'>{letter.content}</p>
                  <div className='mt-4 h-[1px] w-full bg-border group-hover:bg-black transition-colors' />
                </article>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
