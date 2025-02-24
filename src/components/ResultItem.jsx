import { updateTestResultVisibility } from "../api/test";
import { mbtiDescriptions } from "../data/mbtiDescriptions";
import useAuthStore from "../zustand/bearsStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ResultItem = ({ result }) => {
  const { userData } = useAuthStore();
  const queryClient = useQueryClient();

  const changeVisibilityMutation = useMutation({
    mutationFn: updateTestResultVisibility,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["testResults"],
      });
    },
  });

  const getTimeStamp = (date) => {
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className=" bg-purple-100 w-auto mx-16 p-6 rounded-xl">
      <h4>{result.nickname}</h4>
      <p>{getTimeStamp(result.date)}</p>
      <p>{result.mbtiResult}</p>
      <p>{mbtiDescriptions[result.mbtiResult].slice(5)}</p>
      {userData.userId === result.writerId && (
        <>
          <button onClick={() => changeVisibilityMutation.mutate(result)}>
            비공개로 전환
          </button>
          <button>삭제</button>
        </>
      )}
    </div>
  );
};

export default ResultItem;
