import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { calculateMBTI } from "../utils/mbtiCalculator";
import { mbtiDescriptions } from "../data/mbtiDescriptions";
import useAuthStore from "../zustand/bearsStore";
import { createTestResult } from "../api/test";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TestForm from "../components/TestForm";

const MbtiTest = () => {
  //테스트 결과를 담는 state
  const [testResult, setTestResult] = useState(null);
  const {
    userData: { userId, nickname },
  } = useAuthStore();
  const nav = useNavigate();

  //쿼리클라이언트 호출
  const queryClient = useQueryClient();
  //뮤테이션 호출
  const addMutation = useMutation({
    mutationFn: createTestResult,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["testResults"],
      });
    },
  });

  //테스트 내용을 제출
  const handleTestSubmit = async (answers) => {
    const mbtiResult = calculateMBTI(answers);
    //mbtiResult를 jsonServer에 post 하는 로직 필요
    //이때 작성자 id와 nickname도 같이...
    const resultData = { userId, nickname, mbtiResult };

    addMutation.mutate(resultData);

    setTestResult(mbtiResult);
  };

  //테스트 결과 페이지로 이동
  const handleMoveToResults = () => {
    nav("/result");
  };
  return (
    // 테스트 결과 유무에 따라서 ? 테스트 : 결과
    <div className="w-full mx-4 flex flex-col items-center justify-center">
      {!testResult ? (
        <>
          <h2 className="text-3xl font-bold mb-6">MbtiTest</h2>
          <TestForm onTestSubmit={handleTestSubmit} />
        </>
      ) : (
        <div className=" w-auto mx-16 p-6 bg-white rounded-xl shadow-md ">
          <h2 className="text-3xl font-bold mb-6">
            당신의 유형은? <span className="text-purple-500">{testResult}</span>
          </h2>
          <p>
            {mbtiDescriptions[testResult].slice(5) ||
              "해당 성격 유형에 대한 설명이 없습니다."}
          </p>
          <div className="mt-4 flex  gap-2">
            <button
              onClick={handleMoveToResults}
              className=" bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600 transition duration-300"
            >
              결과페이지로 이동하기
            </button>
            <button
              onClick={() => {
                setTestResult(null);
              }}
              className=" bg-red-500 text-white p-4 rounded-lg hover:bg-red-600 transition duration-300"
            >
              다시 테스트하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MbtiTest;
