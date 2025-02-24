import { useQuery } from "@tanstack/react-query";
import { getTestResults } from "../api/test";

const Result = () => {
  const {
    data: resultData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["testResults"],
    queryFn: getTestResults,
  });
  if (isPending) {
    return <div>로딩중입니다...</div>;
  }

  if (isError) {
    console.log("isError", isError);
    return <div>데이터 조회 중 오류가 발생했습니다.</div>;
  }

  return (
    <div>
      {resultData.map((result) => {
        return (
          <div key={result.id}>
            <h4>{result.nickname}</h4>
            <p>{result.mbtiResult}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Result;
