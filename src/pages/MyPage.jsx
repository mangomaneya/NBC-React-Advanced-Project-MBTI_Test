import { useEffect } from "react";
import { useState } from "react";
import { getUserProfile, updateProfile } from "../api/auth";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const nav = useNavigate();
  const { isAuthenticated, token } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    id: "",
    avatar: "",
    nickname: "",
  });
  const [newNickname, setNewNickname] = useState("");

  //마이페이지에 들어오면(마운트) 회원정보를 통신으로 가져오기
  useEffect(() => {
    if (!isAuthenticated) {
      //로그인이 안된상태로 유입되거나, 마이페이지에서 사용자가 로그아웃을 눌르게 된 경우
      alert("로그인이 필요합니다.");
      nav("/login");
    } else {
      const fetchUserData = async () => {
        try {
          const { id, nickname, avatar, success } = await getUserProfile(token);
          if (success) {
            setUserData({ id, avatar, nickname });
          }
        } catch (error) {
          console.error("회원 정보를 불러오는데 실패했습니다.", error);
        }
      };
      fetchUserData();
    }
  }, [isAuthenticated, nav, token]); //useEffect에서 사용하는 모든 외부 변수는 의존성 배열에 포함시켜야 한다?

  // 닉네임 업데이트
  const handleUpdateNickname = async (e) => {
    e.preventDefault();
    const confirmInput = window.confirm("정말 변경하시겠습니까?");
    if (confirmInput) {
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
          setUserData((prev) => ({ ...prev, updatedNickname }));
          alert(`닉네임이 변경되었습니다. 변경된 닉네임 : ${updatedNickname}`);
          setNewNickname("");
        }
      } catch (error) {
        console.error(error);
        alert("닉네임 변경에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  //유저데이터가 아직 set되지 않았을 때 보여줄 화면
  if (!userData) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <h2>마이 페이지</h2>
      <p>아이디 : {userData.id}</p>
      <p>닉네임 : {userData.nickname}</p>
      <form onSubmit={handleUpdateNickname}>
        <input
          type="text"
          name="nickname"
          placeholder={userData.nickname}
          value={newNickname}
          onChange={(e) => {
            setNewNickname(e.target.value);
          }}
        />
        <button type="submit">닉네임 수정</button>
      </form>
    </>
  );
};

export default MyPage;
