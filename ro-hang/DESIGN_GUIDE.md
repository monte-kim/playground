# ro-hang (로행) Design System Guide

로행(ro-hang)은 '길 위의 휴식'과 '마음의 여행'을 테마로 한 익명 편지 교환 서비스입니다. 토스 앱인앱 환경에 최적화된 모바일 전용 미니멀 UI를 지향합니다.

## 1. Design Concept: "Quiet Resonance (잔잔한 울림)"
- **Minimalist**: 불필요한 장식을 배제하고 콘텐츠(편지)에 집중합니다.
- **Calm**: 마음이 편안해지는 따뜻하고 낮은 채도의 색조를 사용합니다.
- **Tactile**: 종이의 질감이나 부드러운 그림자를 통해 디지털 공간에서도 아날로그의 따스함을 전달합니다.

## 2. Color Palette (Tailwind CSS v4 Configuration)

| Color | Hex | Usage |
| :--- | :--- | :--- |
| **Background** | `#FDFCF8` | 페이지 기본 배경 (Creamy White) |
| **Surface** | `#F2EFE9` | 카드, 입력창 배경 (Pale Sand) |
| **Primary** | `#889E81` | 주요 버튼, 강조 포인트 (Sage Green) |
| **Secondary** | `#7A8DA5` | 보조 액션, 차분한 강조 (Muted Blue) |
| **Text-Main** | `#333333` | 본문 및 제목 (Deep Charcoal) |
| **Text-Muted** | `#8E8E8E` | 부연 설명, 날짜 등 (Warm Gray) |
| **Border** | `#E5E0D5` | 경계선, 디바이더 |

## 3. Typography
- **Font Family**: `Pretendard`, `Geist Sans`, sans-serif
- **Scale**:
  - `Heading`: 24px, Bold, Tracking -0.02em
  - `Body`: 16px, Regular, Leading 1.6
  - `Caption`: 13px, Medium, Muted Color

## 4. UI Components Strategy
- **Buttons**: Rounded (full), No borders, Soft shadows.
- **Cards**: Subtle borders or very light background contrast instead of heavy shadows.
- **Input**: Minimalist underline or soft-filled box.
- **Layout**: Max-width 480px (Mobile only centered layout).

## 5. Interactions
- **Fade-in**: 화면 진입 시 부드러운 페이드 인 효과.
- **Micro-interactions**: 버튼 클릭 시 가벼운 스케일 다운 효과.
