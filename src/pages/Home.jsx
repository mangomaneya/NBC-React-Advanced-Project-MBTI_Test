import {  useNavigate } from "react-router-dom";
import useAuthStore from "../zustand/bearsStore";

const Home = () => {
  const { isAuthenticated } = useAuthStore();
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
    <div className="w-full flex flex-col items-center justify-center bg-transparent">
      <h1 className="text-5xl font-bold text-primary-color mb-6">
        무료 성격 테스트
      </h1>
      <p className="mb-8 text-lg text-secondary-color">
        자신의 성격 유형을 확인할 수 있도록 솔직하게 답변해 주세요.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 mt-4">
        <section className="transition-all duration-300	bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl mx-4">
          <h2 className="text-xl font-semibold mb-4">성격유형검사</h2>
          <p>
            자신의 성격 유형을 파악하고 삶의 여러 영역에서 어떤 영향을 미치는지
            알아보세요.
          </p>
        </section>
        <section className="transition-all duration-300	bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl mx-4">
          <h2 className="text-xl font-semibold mb-4">성격유형이해</h2>
          <p>
            다른 사람들이 어떻게 행동하는지 이해하는 데 도움을 줄 수 있습니다.
          </p>
        </section>
        <section className="transition-all duration-300	bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl mx-4">
          <h2 className="text-xl font-semibold mb-4">팀평가</h2>
          <p>
            팀 내에서 자신과 동료들의 성격을 이해하고 협력할 수 있는 방법을
            배워보세요.
          </p>
        </section>
      </div>
      <button onClick={handleMoveToTest} className="bg-purple-600 p-4 rounded-xl text-slate-100 font-semibold transition-all duration-300 hover:bg-purple-400">내 성격 알아보러 가기</button>
    </div>
  );
};

export default Home;
