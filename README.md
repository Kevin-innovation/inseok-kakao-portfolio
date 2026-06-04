# 박인석 · 카카오 AI 루키 캠프 포트폴리오

지원서 1-4번 항목과 연결된 실제 경험 중심 원페이지 포트폴리오입니다.
GitHub Pages로 배포한 뒤 발급된 URL을 지원서의 포트폴리오 링크 칸에 붙여넣는 용도입니다.

기존 예시성 내용과 수치 차트는 제거했고, `priavte.md`에 정리한 스포츠 의공학 비전, 급식 AI 데이터 기획, 중성부력 과학 부스 협업 경험, 코딩 학습 이력을 기준으로 구성했습니다.

---

## 📁 폴더 구조

```
PPT/
├── index.html                  ← 페이지 본문(텍스트는 여기서 수정)
├── .nojekyll                   ← GitHub Pages가 assets 폴더를 그대로 서빙하게 함
├── assets/
│   ├── css/
│   │   ├── tokens.css          ← 색·타이포·간격 디자인 토큰 (HEX 한 곳에서 관리)
│   │   ├── fonts.css           ← Pretendard @font-face
│   │   ├── base.css            ← 리셋·타이포·레이아웃
│   │   ├── components.css      ← 네비·버튼·카드·코드창·타임라인·푸터
│   │   ├── sections.css        ← 섹션별 스타일
│   │   └── design-system.css   ← DESIGN.md 기준 shadcn 스타일 최종 오버라이드
│   ├── js/
│   │   ├── data.js             ← 현재 차트 미사용
│   │   ├── charts.js           ← 보관용 차트 렌더링 파일
│   │   └── main.js             ← 스크롤·메뉴·리빌 인터랙션
│   ├── images/
│   │   └── hero-biomechanics.png
│   ├── awards/
│   │   ├── award-01-cos-coding-specialist.jpeg
│   │   ├── award-02-knu-cps-coding.jpeg
│   │   ├── award-03-koi-regional-encouragement.jpeg
│   │   ├── award-04-koi-overall-bronze.jpeg
│   │   ├── award-05-koi-second-encouragement.jpeg
│   │   ├── award-06-sw-thinking-9-bronze.jpeg
│   │   ├── award-07-sw-thinking-10-encouragement.jpeg
│   │   ├── award-08-creative-problem-silver.jpeg
│   │   └── award-09-daegu-gifted-program.jpeg
│   └── fonts/
│       └── PretendardVariable.woff2   ← 자체 호스팅(인터넷 없어도 폰트 정상)
└── README.md
```

---

## ✏️ 수정 방법

### 1) 텍스트(이름·학교·스토리) — `index.html`
HTML을 직접 열어 한글 문장을 고치면 됩니다. 섹션은 주석(`<!-- ===== ... -->`)으로 구분돼 있어요.
- 이름: `박인석`을 찾아 바꾸기
- 각 평가항목 섹션: `01 비전`, `02 기획`, `03 코딩`, `04 소통` 주석 기준으로 이동

### 2) 색·폰트 크기 — `assets/css/tokens.css`
모든 색(HEX)과 글자 크기가 토큰으로 정의돼 있습니다. 여기만 고치면 전체에 반영됩니다.

### 3) 수상·증빙 이미지 — `assets/awards`
`박인석 - 수상자료` 폴더의 9개 이미지를 배포용 영문 파일명으로 복사해 넣었습니다. `index.html`의 `awards` 섹션에서 카드 설명과 확대보기 데이터가 함께 관리됩니다.

---

## 💻 로컬에서 미리보기

브라우저로 `index.html`을 더블클릭해도 되지만, 폰트/차트까지 정확히 보려면 간단한 서버를 권장합니다.

```bash
cd PPT
python3 -m http.server 8848
# 브라우저에서 http://localhost:8848 접속
```

---

## 🚀 GitHub Pages 배포 (URL 만들기)

1. GitHub에서 새 저장소 생성 (예: `portfolio`).
2. 이 폴더 전체를 업로드 / 푸시:
   ```bash
   cd PPT
   git init
   git add .
   git commit -m "박인석 포트폴리오"
   git branch -M main
   git remote add origin https://github.com/<your-id>/portfolio.git
   git push -u origin main
   ```
3. 저장소 → **Settings → Pages** → Source를 **`main` 브랜치 / `/ (root)`**로 지정 → Save.
4. 1~2분 뒤 발급되는 주소
   `https://<your-id>.github.io/portfolio/`
   를 **지원서 포트폴리오 링크 칸**에 붙여넣으면 끝.

> 이미 `.nojekyll` 파일이 포함돼 있어 `assets/` 폴더가 그대로 서빙됩니다(추가 설정 불필요).

---

## 디자인 노트
- **폰트**: Pretendard(가변, 자체 호스팅) 고정. 코드 블록만 JetBrains Mono.
- **색**: 화이트 중심 라이트 모드(#ffffff) · 블랙 CTA(#000000) · 민트 보조 CTA(#c8f6f9) · 제한적 네이비 코드 표면(#010120).
- **리듬**: 화이트 히어로 → 화이트 콘텐츠 카드 → 얇은 보더 섹션 → 화이트 증빙 카드 → 화이트 마무리.
- **컴포넌트**: 버튼, 카드, 배지, 모바일 시트는 shadcn UI에 가까운 얇은 보더/4px radius/명확한 focus 상태로 정리했습니다.
- **아이콘**: 마름모/반짝이형 브랜드 아이콘은 제거하고, lucide 스타일 기능 아이콘만 남겼습니다.
- 평가 4대 항목(비전/기획/소통/코딩)을 각각 독립 섹션(01~04)으로 매핑했습니다.
