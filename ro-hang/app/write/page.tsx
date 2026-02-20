'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function WritePage() {
  const [content, setContent] = useState('');
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [isSending, setIsSending] = useState(false);
  const router = useRouter();

  const handleSend = async () => {
    if (!content.trim() || !sender.trim() || !receiver.trim()) return;

    setIsSending(true);
    try {
      const response = await fetch('/api/letters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender,
          receiver,
          content,
          createdAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        alert('편지가 성공적으로 전송되었습니다.');
        router.push('/');
      }
    } catch (error) {
      console.error('Failed to send letter:', error);
      alert('전송에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className='flex flex-col min-h-screen bg-white text-black'>
      {/* Navigation */}
      <nav className='flex items-center justify-between px-6 py-8 border-b border-border'>
        <Link href='/' className='text-sm font-bold tracking-widest uppercase'>
          ←
        </Link>
        <h1 className='text-lg font-bold'>나의 흔적</h1>
        <button
          onClick={handleSend}
          disabled={isSending || !content.trim() || !sender.trim() || !receiver.trim()}
          className='text-sm font-bold tracking-widest uppercase disabled:text-muted'
        >
          {/* 위 화살표 */}
          {isSending ? '...' : '✈'}
        </button>
      </nav>

      {/* Form */}
      <main className='flex-1 flex flex-col p-6 space-y-8'>
        <div>
          <label className='block text-[12px] text-muted uppercase tracking-widest mb-2'>To</label>
          <input
            type='text'
            placeholder='받는 이 (이름)'
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            className='w-full text-xl font-bold placeholder:text-zinc-200 outline-none border-b border-transparent focus:border-black transition-all'
          />
        </div>

        <div>
          <label className='block text-[12px] text-muted uppercase tracking-widest mb-2'>From</label>
          <input
            type='text'
            placeholder='당신의 이름'
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            className='w-full text-xl font-bold placeholder:text-zinc-200 outline-none border-b border-transparent focus:border-black transition-all'
          />
        </div>

        <div className='flex-1 pt-4'>
          <label className='block text-[12px] text-muted uppercase tracking-widest mb-2'>Content</label>
          <textarea
            placeholder='전하고 싶은 이야기를 적어보세요.'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='w-full h-[300px] text-[16px] leading-relaxed placeholder:text-zinc-200 outline-none resize-none'
          />
        </div>
      </main>

      <footer className='px-6 py-8 text-[12px] text-muted border-t border-border'>
        <p>당신의 진심이 담긴 텍스트는 상대방에게 그대로 전달됩니다.</p>
      </footer>
    </div>
  );
}
