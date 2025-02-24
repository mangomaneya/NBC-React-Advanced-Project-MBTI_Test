import ResultItem from "../components/ResultItem";
import { useGetTestResults } from "../hooks/queries";

const Result = () => {
  const { data: resultData, isPending:resultPending, isError:resultError } = useGetTestResults();

  if (resultPending) {
    return <div>로딩중입니다...</div>;
  }
  if (resultError) {
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
