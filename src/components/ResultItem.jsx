import { deleteTestResult, updateTestResultVisibility } from "../api/test";
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
  const deleteResultMutation = useMutation({
    mutationFn: deleteTestResult,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["testResults"],
      });
    },
  });

  const handleDeleteResult = () => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까");
    if (confirmDelete) {
      deleteResultMutation.mutate(result.id);
      alert("성공적으로 삭제되었습니다.");
    }
  };

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
    <div className="bg-purple-100 w-auto mx-16 p-6 rounded-xl shadow-md border border-purple-300">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-lg font-semibold text-purple-700">
          {`${result.nickname}님의 MBTI는`}
        </h4>
        <p className="text-sm text-gray-500">{getTimeStamp(result.date)}</p>
      </div>
      <p className="text-xl font-bold text-purple-900">{result.mbtiResult}</p>
      <p className="mt-2 text-gray-700">
        {mbtiDescriptions[result.mbtiResult].slice(5)}
      </p>

      {userData.userId === result.writerId && (
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => changeVisibilityMutation.mutate(result)}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg shadow ${
              result.visibility
                ? "bg-purple-500 hover:bg-purple-600"
                : "bg-slate-500 hover:bg-slate-600"
            } transition`}
          >
            {result.visibility ? "비공개로 전환" : "공개로 전환"}
          </button>
          <button
            onClick={() => handleDeleteResult()}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg shadow hover:bg-red-600 transition"
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultItem;
