import React from "react";

const Total = ({ parts }) => {
  const exercises = parts.map((part) => part.exercises);
  const total = exercises.reduce((sum, current) => {
    return sum + current;
  }, 0);
  return (
    <div>
      <p>
        <b>Total of {total} exercises</b>
      </p>
    </div>
  );
};
export default Total;
