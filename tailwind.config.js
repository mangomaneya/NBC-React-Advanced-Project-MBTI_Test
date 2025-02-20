/** @type {import('tailwindcss').Config} */
export default {
  content: [
    //어떤경로에 테일윈드 css를 적용할 건가 지정 ->index.html에 css 적용 -> index 하위폴더가 모두 적용됨
    "./index.html",
    //자바스크립트, 타입스크립트파일, 리액트 파일 모두에 적용되도록 설정
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

