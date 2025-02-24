import { useQuery } from "@tanstack/react-query";
import { getTestResults } from "../api/test";
import ResultItem from "../components/ResultItem";

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
    <div className="space-y-4 bg-slate-50">
      {resultData.map((result) => {
        return (
          result.visibility && (
            <ResultItem result={result} key={result.id}></ResultItem>
          )
        );
      })}
    </div>
  );
};

export default Result;
