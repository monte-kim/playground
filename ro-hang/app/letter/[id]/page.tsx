'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Letter {
  id: string;
  sender: string;
  receiver: string;
  content: string;
  createdAt: string;
  type: 'received' | 'sent';
}

export default function LetterDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [letter, setLetter] = useState<Letter | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/letters/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error('Not Found');
          return res.json();
        })
        .then((data) => {
          setLetter(data);
          setLoading(false);
        })
        .catch(() => {
          router.push('/');
        });
    }
  }, [id, router]);

  if (loading) {
    return (
      <div className='min-h-screen bg-white flex items-center justify-center'>
        <p className='text-muted animate-pulse'>불러오는 중...</p>
      </div>
    );
  }

  if (!letter) return null;

  return (
    <div className='flex flex-col min-h-screen bg-white text-black'>
      {/* Navigation */}
      <nav className='flex items-center justify-between px-6 py-8 border-b border-border'>
        <button onClick={() => router.back()} className='text-sm font-bold tracking-widest uppercase'>
          ←
        </button>
        <div className='w-10' />
      </nav>

      {/* Letter Content */}
      <main className='flex-1 px-8 py-16 flex flex-col'>
        <header className='mb-16 space-y-4'>
          <div className='space-y-1'>
            <span className='text-[12px] text-muted tracking-widest uppercase'>To.</span>
            <p className='text-xl font-bold'>{letter.receiver}</p>
          </div>
          <div className='w-full h-[1px] bg-border opacity-50' />
          <div className='space-y-1'>
            <span className='text-[12px] text-muted tracking-widest uppercase'>From.</span>
            <p className='text-xl font-bold'>{letter.sender}</p>
          </div>
        </header>

        <section className='flex-1 mb-20'>
          <p className='text-[17px] leading-[1.8] text-zinc-800 whitespace-pre-wrap'>{letter.content}</p>
        </section>

        <footer className='mt-auto'>
          <time className='text-[13px] text-muted'>
            {new Date(letter.createdAt).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </time>
        </footer>
      </main>
    </div>
  );
}
