import { http, HttpResponse } from 'msw'

interface Letter {
  id: string
  sender: string
  receiver: string
  content: string
  createdAt: string
  type: 'received' | 'sent'
}

// 초기 목업 데이터 및 인메모리 저장소
let letters: Letter[] = [
  {
    id: '1',
    sender: '민수',
    receiver: '나',
    content: '오랜만이야. 잘 지내고 있니? 문득 네 생각이 나서 글을 남겨.',
    createdAt: '2026-02-19T10:00:00Z',
    type: 'received',
  },
  {
    id: '2',
    sender: '지수',
    receiver: '나',
    content: '우리가 함께 걸었던 그 길을 오늘 다시 지나갔어. 여전히 조용하더라.',
    createdAt: '2026-02-18T15:30:00Z',
    type: 'received',
  },
  {
    id: '3',
    sender: '현우',
    receiver: '나',
    content: '새로운 시작을 축하해. 너라면 분명 잘 해낼 수 있을 거야.',
    createdAt: '2026-02-15T09:12:00Z',
    type: 'received',
  },
]

export const handlers = [
  // 받은 편지함 (Inbox)
  http.get('/api/letters/inbox', () => {
    return HttpResponse.json(letters.filter(l => l.type === 'received'))
  }),

  // 보낸 편지함 (Records)
  http.get('/api/letters/sent', () => {
    return HttpResponse.json(letters.filter(l => l.type === 'sent'))
  }),

  // 편지 상세 가져오기 (Wildcard는 나중에 배치)
  http.get('/api/letters/:id', ({ params }) => {
    const { id } = params
    const letter = letters.find(l => l.id === id)
    if (!letter) {
      return new HttpResponse(JSON.stringify({ error: 'Not Found' }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    return HttpResponse.json(letter)
  }),

  // 편지 보내기
  http.post('/api/letters', async ({ request }) => {
    const data = await request.json() as any
    const newLetter: Letter = {
      id: Math.random().toString(36).substr(2, 9),
      sender: data.sender,
      receiver: data.receiver,
      content: data.content,
      createdAt: new Date().toISOString(),
      type: 'sent',
    }
    
    letters = [newLetter, ...letters]
    
    return HttpResponse.json({ success: true, data: newLetter }, { status: 201 })
  }),
]
