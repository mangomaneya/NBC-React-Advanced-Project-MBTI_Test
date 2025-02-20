import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const nav = useNavigate();
  //로그인이 ? 테스트로 이동 : 경고를 띄우고 로그인으로 이동
  const handleMoveToTest = () => {
    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      nav("/login");
    } else {
      nav("test");
    }
  };
  return (
    <>
      <h1>무료 성격 테스트</h1>
      <p>자신의 성격 유형을 확인할 수 있도록 솔직하게 답변해 주세요.</p>
      <div>
        <section>성격유형검사</section>
        <section>성격유형이해</section>
        <section>팀평가</section>
      </div>
      <button onClick={handleMoveToTest}>내 성격 알아보러 가기</button>
    </>
  );
};

export default Home;
