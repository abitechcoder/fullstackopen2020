import React from "react";
import Content from "./Content";
import Header from "./Header";

const Course = ({ courses }) => {
  return (
    <React.Fragment>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <Header name={course.name} />
            <Content parts={course.parts} />
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default Course;
