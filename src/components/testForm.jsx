import { useState } from "react";
import { questions } from "../data/questions";

const TestForm = ({onSubmit}) => {
  //선택한 답변을 저장하는 스테이트
  const [answers, setAnswers] = useState(
    //질문항목만큼의 길이를 가진 - 타입과 답변으로 이루어진 객체로 채워진 - 배열
    Array(questions.length).fill({ type: "", answer: "" })
  );

  //사용자가 답변을 선택할 때마다, 복사된 답변스테이트의 문항 인덱스에 맞춰서, 질문의 타입과, 답변 = options의 문장을 넣어준다. 
  const handleOptionChange = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = { type: questions[index].type, answer };
    setAnswers(newAnswers);
  };

  const handleTestSubmit = (e) => {
    e.preventDefault();
    onSubmit(answers)
  };

  return (
    <form onSubmit={handleTestSubmit}>
      {/* question.js 를 렌더링(map)
        id를 키로 주고
        question을 p태그에
        option을 다시 map해서 input에 주고... */}
      {questions.map((q, index) => {
        <div key={q.id}>
          <p>{q.question}</p>
          <div>
            {q.options.map((option, i) => {
              <label key={i}>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  checked={answers[index]?.answer === option} // 답변 배열에 저장된 answer값이 현재 옵션과 일치하는지 판단
                  onChange={() => handleOptionChange(index, option)}
                >
                  {option}
                </input>
              </label>;
            })}
          </div>
        </div>;
      })}
      <button type="submit">제출하기</button>
    </form>
  );
};

export default TestForm;
