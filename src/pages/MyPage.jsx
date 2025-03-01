import { useState } from "react";
import { updateProfile } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../zustand/bearsStore";
import { useGetTestResults } from "../hooks/queries";
import ResultItem from "../components/ResultItem";
import Swal from "sweetalert2";

const MyPage = () => {
  const nav = useNavigate();
  const { token, logout, userData, patchNickname } = useAuthStore();

  const [newNickname, setNewNickname] = useState("");
  // 닉네임 업데이트
  const handleUpdateNickname = async (e) => {
    e.preventDefault();
    //새로운 닉네임이 입력되지 않았을 때
    if (!newNickname) {
      Swal.fire({
        icon: "warning",
        title: "변경할 내용이 없습니다.",
        text: "변경할 닉네임을 입력하고 시도해주세요.",
        confirmButtonColor: "#c084fc",
      });
      return;
    }
    const response = await Swal.fire({
      title: "정말 변경하시겠습니까?",
      text: "이 작업은 돌이킬 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#c084fc",
      confirmButtonText: "변경",
      cancelButtonColor: "#d33",
      cancelButtonText: "취소",
    });

    if (response.isConfirmed) {
      // 인풋으로 받은 닉네임을 formData에 담아서 patch통신
      const formData = new FormData();
      formData.append("nickname", newNickname);
      try {
        const { success, nickname: updatedNickname } = await updateProfile(
          formData,
          token
        );
        // 통신이 성공하면 유저정보에서 닉네임을 업데이트 (닉네임 변경 성공 알림 + 닉네임 인풋을 지워주기)
        if (success) {
          patchNickname(updatedNickname);
          Swal.fire({
            title: "닉네임이 변경되었습니다.",
            text: `변경된 닉네임 : ${updatedNickname}`,
            icon: "success",
            confirmButtonColor: "#c084fc",
          });
          setNewNickname("");
        }
      } catch (error) {
        console.error(error.response.data);
        Swal.fire({
          title: "닉네임 변경에 실패했습니다.",
          text: error.response.data.message,
          icon: "warning",
          confirmButtonColor: "#c084fc",
        });
        if (
          error.response.data.message ===
          "토큰이 만료되었습니다. 다시 로그인 해주세요."
        ) {
          logout();
          nav("/login");
        }
      }
    }
  };
  const {
    data: resultData,
    isPending: resultPending,
    isError: resultError,
  } = useGetTestResults();

  if (resultPending) {
    return <div>로딩중입니다...</div>;
  }
  if (resultError) {
    return <div>데이터 조회 중 오류가 발생했습니다.</div>;
  }

  //유저데이터가 아직 set되지 않았을 때 보여줄 화면
  if (!userData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col items-center gap-16">
      <div className="w-96	mx-4 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-6">마이 페이지</h2>
        <div className="w-full space-y-6 bg-white p-6 rounded-lg shadow-md ">
          <p>아이디 : {userData.userId}</p>
          <p>닉네임 : {userData.nickname}</p>
          <form onSubmit={handleUpdateNickname} className="space-y-6">
            <input
              type="text"
              name="nickname"
              placeholder={userData.nickname}
              value={newNickname}
              onChange={(e) => {
                setNewNickname(e.target.value);
              }}
              className="w-full p-4 border border-gray-300 rounded-lg "
            />
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-300 transition duration-300 "
            >
              닉네임 수정
            </button>
          </form>
        </div>
      </div>

      {/* 테스트 결과 렌더링 */}
      {}
      <div className="mx-4 flex flex-col items-center justify-center space-y-4 bg-slate-50">
        <h2 className="text-3xl font-bold mb-6">내 테스트 결과</h2>
        {resultData.filter((result) => {
          return result.writerId === userData.userId;
        }).length > 0 ? (
          resultData.map((result) => {
            return (
              userData.userId === result.writerId && (
                <ResultItem result={result} key={result.id}></ResultItem>
              )
            );
          })
        ) : (
          <div className="flex flex-col items-center text-center space-y-4 text-gray-600 ">
            <p className="text-lg font-semibold">
              아직 테스트 결과가 없습니다.
            </p>
            <Link
              to="/test"
              className="bg-purple-600 text-white px-5 py-2 rounded-lg transition hover:bg-purple-700"
            >
              테스트하러 가기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPage;
