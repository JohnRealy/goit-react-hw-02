import Description from "./Description/Description";
import Options from "./Options/Options";
import Feedback from "./Feedback/Feedback";
import { useState, useEffect } from "react";

export default function App() {
  const getFeedbackInfo = () => {
    const saveFeedbackInfo = localStorage.getItem("info");
    if (saveFeedbackInfo !== null) {
      return JSON.parse(saveFeedbackInfo);
    }
    return { good: 0, neutral: 0, bad: 0 };
  };
  const [feedback, setFeedback] = useState(getFeedbackInfo);

  const updateFeedback = (feedbackType) => {
    const plus = feedback[feedbackType] + 1;
    setFeedback({
      ...feedback,
      [feedbackType]: plus,
    });
  };

  const resetFeedback = () => {
    setFeedback({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  useEffect(() => {
    localStorage.setItem("info", JSON.stringify(feedback));
  }, [feedback]);

  const totalFeedback = feedback.good + feedback.bad + feedback.neutral;

  return (
    <>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        totalFeedback={totalFeedback}
        resetFeedback={resetFeedback}
      />
      {totalFeedback === 0 ? (
        "No feedback yet"
      ) : (
        <Feedback feedback={feedback} totalFeedback={totalFeedback} />
      )}
    </>
  );
}
