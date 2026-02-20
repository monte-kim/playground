import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex flex-col min-h-screen px-8 py-20 bg-white'>
      {/* Header Area */}
      <header className='mb-24'>
        <h1 className='text-[40px] font-bold tracking-tighter leading-none mb-4'>로행</h1>
        <div className='h-[2px] w-12 bg-black mb-8' />
        <p className='text-[18px] font-medium leading-snug text-black'>
          마음을 잇는 글자들.
          <br />
          당신의 이야기를 전하세요.
        </p>
      </header>

      {/* Main Navigation (Text based) */}
      <nav className='flex-1 flex flex-col justify-center space-y-12'>
        <Link href='/write' className='group text-left block'>
          <span className='block text-[13px] text-muted mb-1 tracking-widest uppercase'>Action</span>
          <span className='text-2xl font-bold border-b-2 border-transparent group-hover:border-black transition-all'>
            편지 쓰기 —
          </span>
        </Link>

        <Link href='/inbox' className='group text-left block'>
          <span className='block text-[13px] text-muted mb-1 tracking-widest uppercase'>Archive</span>
          <span className='text-2xl font-bold border-b-2 border-transparent group-hover:border-black transition-all'>
            나에게 온 편지
          </span>
        </Link>

        <Link href='/records' className='group text-left block'>
          <span className='block text-[13px] text-muted mb-1 tracking-widest uppercase'>Records</span>
          <span className='text-2xl font-bold border-b-2 border-transparent group-hover:border-black transition-all'>
            나의 흔적
          </span>
        </Link>
      </nav>

      {/* Footer Info */}
      <footer className='mt-auto pt-10'>
        <p className='text-[13px] text-muted leading-relaxed'>도라에몽 . 어디로든 문 . 대나무 헬리콥터 | 26.02.20</p>
      </footer>
    </main>
  );
}
