import { useState } from "react";
import QuestionCard from "./QuestionCard";
import AnswerBox from "./AnswerBox";

export default function InterviewRoom({ questions = [], onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  const currentQuestion = questions[currentIndex] || "Describe your experience with React state management.";

  const handleAnswerSubmit = (userAnswer) => {
    const updated = [...answers, { question: currentQuestion, answer: userAnswer }];
    setAnswers(updated);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else if (onFinish) {
      onFinish(updated);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <QuestionCard
        questionNumber={currentIndex + 1}
        totalQuestions={questions.length || 5}
        question={currentQuestion}
      />
      <AnswerBox onSubmit={handleAnswerSubmit} />
    </div>
  );
}