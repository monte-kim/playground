# 🎮 Focus Quest: 1-Bit Edition - Project Status

## 1. 개요 (Concept)
- **컨셉**: 사용자의 실시간 행동을 감시하는 '1-Bit 도트 감시자' 기반 하드코어 집중 타이머.
- **스타일**: 흑백(#000000, #FFFFFF) 1-Bit 픽셀 아트, 스캔라인 효과, 레트로 게임 UI.
- **핵심 기술**: Next.js, Tailwind CSS, TensorFlow.js (COCO-SSD 모델).

## 2. 현재 구현 상태 (Current Progress)
- [x] **1-Bit 비주얼 테마**: `Press Start 2P` 폰트 및 커스텀 CSS 스캔라인/도트 테두리 적용.
- [x] **AI 감시 엔진**: 원본 비디오 기반 실시간 '사람' 및 '스마트폰' 감지 루프 (5-10 FPS).
- [x] **AR 아바타 필터 (Privacy)**: 
    - 사용자의 실제 모습을 1-bit 실루엣과 도트 캐릭터로 덮어씌움.
    - 실시간 좌표 추적을 통해 캐릭터가 사용자를 따라 움직임.
    - 눈 깜빡임 애니메이션 및 상태 텍스트 출력.
- [x] **스코어링 시스템**: 
    - 집중 시(사람 감지 + 폰 미감지) EXP 상승.
    - 딴짓 시(사람 미감지 혹은 폰 감지) Penalty 상승 및 경고 오버레이 출력.
- [x] **모노레포 구조**: `playground` (Root) 폴더 아래 `focus-guard` 프로젝트 배치.

## 3. 디렉토리 구조 (Structure)
```text
playground/ (Monorepo Root)
├── package.json (Workspaces: ["focus-guard"])
├── PROJECT_STATUS.md (현재 파일)
└── focus-guard/ (Next.js App)
    ├── src/app/page.tsx (핵심 게임 로직)
    ├── src/app/globals.css (1-Bit 스타일)
    └── next.config.ts (Turbopack 루트 설정 완료)
```

## 4. 실행 및 배포 (Run & Deploy)
- **로컬 실행**: 루트 디렉토리에서 `npm run dev`
- **저장소**: [GitHub - playground](https://github.com/monte-kim/playground.git)
- **Vercel 배포**: 
    - Root Directory를 `focus-guard`로 설정하여 배포.
    - `turbopack.root: "../../"` 설정이 `next.config.ts`에 포함됨.

## 5. 남은 작업 및 아이디어
- [ ] Spring Boot, Flutter 등 다른 연습 프로젝트들을 `playground/` 하위에 추가.
- [ ] 집중 점수에 따른 '도트 장비' 업그레이드 시스템.
- [ ] 8-bit 배경음 및 경고음 추가.

---
*마지막 업데이트: 2026-02-17*
