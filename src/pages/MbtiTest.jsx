import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { calculateMBTI, mbtiDescriptions } from "../utils/mbtiCalculator";

const MbtiTest = () => {
  //테스트 결과를 담는 state
  const [testResult, setTestResult] = useState(null);
  const nav = useNavigate();

  //테스트 내용을 제출
  const handleTestSubmit = async (answers) => {
    const mbtiResult = calculateMBTI(answers);
    //mbtiResult를 jsonServer에 post 하는 로직 필요

    setTestResult(mbtiResult);
  };

  //테스트 결과 페이지로 이동
  const handleMoveToResults = () => {
    nav("/result");
  };
  return (
    // 테스트 결과 유무에 따라서 ? 테스트 : 결과
    <>
      {!testResult ? (
        <>
          <h2>MbtiTest</h2>
          <form onSubmit={handleTestSubmit}>
            <>테스트 문항</>
            <button type="submit">제출하기</button>
          </form>
        </>
      ) : (
        <>
          <h2>
            당신의 유형은? <span>{testResult}</span>
          </h2>
          <p>
            {mbtiDescriptions[testResult] ||
              "해당 성격 유형에 대한 설명이 없습니다."}
          </p>
          <button onClick={handleMoveToResults}>결과페이지로 이동하기</button>
          <button
            onClick={() => {
              setTestResult(null);
            }}
          >
            다시 테스트하기
          </button>
        </>
      )}
    </>
  );
};

export default MbtiTest;
