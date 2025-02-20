import { Link } from "react-router-dom"

const Home = () => {
  return (
    <>
    <h1>
        무료 성격 테스트
      </h1>
      <p>
        자신의 성격 유형을 확인할 수 있도록 솔직하게 답변해 주세요.
      </p>
      <div>
        <section>성격유형검사</section>
        <section>성격유형이해</section>
        <section>팀평가</section>
      </div>
      <Link to='/login'>
        로그인하기
      </Link>
      <button>내 성격 알아보러 가기</button>
    </>
  )
}

export default Home