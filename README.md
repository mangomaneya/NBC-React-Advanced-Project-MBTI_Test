# NBC-React-Advanced-Project-MBTI_Test

이 프로젝트는 스파르타의 내일배움캠프를 통해 개인과제로 제작되었습니다.

<br>

## ✨ 프로젝트 소개

- 작업기간 : 2025/02/20 ~ 2025/02/25
- React Vite로 프로젝트를 생성하고, Json-server를 통해 데이터베이스를 구축했습니다.
- JWT인증 서버와 API 통신으로 회원가입과 로그인을 구현했습니다.
- Layout컴포넌트를 사용해 Outlet과 ProtectedRouter를 통해 로그인여부에 따라 이동하는 SPA애플리케이션의 동작을 구현했습니다.
- TailwindCss를 활용하여 UI를 구현했습니다.
- axios와 탠스텍 쿼리를 활용하여 MBTI테스트 결과 CRUD를 구현했습니다.

<br>

## 🖥️ 사이트 소개

- 배포사이트 : [MBTI TEST](https://nbc-react-advanced-project-mbti-test.vercel.app/)
  ![Image](https://github.com/user-attachments/assets/df2651eb-5313-4e3c-b320-f193a267d1a5)

<br>

## 🛠️ 주요기능 및 구조

- 로그인 토큰 만료 10분 제한 설정
- (모두/개인)의 테스트 결과 모아보기 가능
- 내 테스트 결과의 공개여부 결정가능 / 내 테스트 결과 삭제 가능
- 내 프로필의 닉네임 정보 변경가능

### 폴더구조

```
📁 NBC-React-Advanced-Project-MBTI_Test
├─ LICENSE
├─ README.md
├─ db.json
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  └─ vite.svg
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ api
│  │  ├─ auth.js
│  │  ├─ axios.js
│  │  └─ test.js
│  ├─ assets
│  │  └─ react.svg
│  ├─ components
│  │  ├─ AuthForm.jsx
│  │  ├─ CommonInput.jsx
│  │  ├─ FormTest.jsx
│  │  ├─ Layout.jsx
│  │  ├─ ResultItem.jsx
│  │  └─ testForm.jsx
│  ├─ context
│  │  └─ AuthContext.jsx
│  ├─ data
│  │  ├─ mbtiDescriptions.js
│  │  └─ questions.js
│  ├─ hooks
│  │  └─ queries.js
│  ├─ index.css
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ Home.jsx
│  │  ├─ Login.jsx
│  │  ├─ MbtiTest.jsx
│  │  ├─ MyPage.jsx
│  │  ├─ Result.jsx
│  │  └─ Signup.jsx
│  ├─ shared
│  │  ├─ ProtectedRouter.jsx
│  │  └─ Router.jsx
│  ├─ utils
│  │  └─ mbtiCalculator.js
│  └─ zustand
│     └─ bearsStore.js
├─ tailwind.config.js
├─ vite.config.js
└─ yarn.lock

```

## 🔥 트러블 슈팅

- [[갠플일기] 자잘자잘한 오늘의 배움들](https://mangoman-e-ya.tistory.com/78)
- [[트러블슈팅] 이제는 context말고 zustand를 사용해보자](https://mangoman-e-ya.tistory.com/79)
- [[트러블 슈팅] 선택된 옵션의 라벨의 css 적용](https://mangoman-e-ya.tistory.com/80)

<br>

## 🏷 TechStack

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
<img src="https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white"> 
<img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"> 

<img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
<img src="https://img.shields.io/badge/json-000000?style=for-the-badge&logo=json&logoColor=whtie">
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
