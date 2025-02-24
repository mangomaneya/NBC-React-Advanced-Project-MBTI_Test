import { jsonApi } from "./axios";
//json server와 통신하는 함수들

// 데이터 읽어오기 (get) - 데이터베이스에 있는 모든 결과들 불러오기
export const getTestResults = async () => {
  const response = await jsonApi.get('');
  return response.data;
};

// 데이터 추가하기 (post) - mbti결과 + 유저 정보
export const createTestResult = async (resultData) => {
  const response = await jsonApi.post('',{
    date: Date.now(),
    userId: resultData.userId, 
    nickname: resultData.nickname,
    mbtiResult: resultData.mbtiResult,
    visibility: true,
  });
  return response.data;
};

// 데이터 수정하기 (patch) / 결과 공개 여부 결정
export const updateTestResultVisibility = async (id, visibility) => {
  const response = await jsonApi.patch(`/${id}`, { visibility });
  return response.data;
};

// 데이터 삭제하기 (delete)
export const deleteTestResult = async (id) => {
  const response = await jsonApi.delete(`/${id}`);
  return response.data;
};
