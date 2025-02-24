import { jsonApi } from "./axios";
//json server와 통신하는 함수들

// 데이터 읽어오기 (get) - 데이터베이스에 있는 모든 결과들 불러오기
export const getTestResults = async () => {
  try {
    const response = await jsonApi.get("");
    return response.data;
  } catch (error) {
    console.error(error.response.data);
    alert(error.response.data.message);
  }
};

// 데이터 추가하기 (post) - mbti결과 + 유저 정보
export const createTestResult = async (resultData) => {
  try {
    const response = await jsonApi.post("", {
      date: Date.now(),
      writerId: resultData.userId,
      nickname: resultData.nickname,
      mbtiResult: resultData.mbtiResult,
      visibility: true,
    });
    return response.data;
  } catch (error) {
    console.error(error.response.data);
    alert(error.response.data.message);
  }
};

// 데이터 수정하기 (patch) / 결과 공개 여부 결정
export const updateTestResultVisibility = async (result) => {
  try {
    const response = await jsonApi.patch(`/${result.id}`, {
      visibility: !result.visibility,
    });
    return response.data;
  } catch (error) {
    console.error(error.response.data);
    alert(error.response.data.message);
  }
};

// 데이터 삭제하기 (delete)
export const deleteTestResult = async (id) => {
  try {
    const response = await jsonApi.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(error.response.data);
    alert(error.response.data.message);
  }
};
