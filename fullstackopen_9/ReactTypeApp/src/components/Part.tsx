import React from 'react';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartDescription {
    requirements: string[];
    kind: "special"
  }

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

interface Props {
  courseParts: CoursePart[];
}

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const Part: React.FC<Props> = ({ courseParts }) => {
    return (
      <div>
        {courseParts.map((coursePart, index) => {
          switch (coursePart.kind) {
            case "basic":
              return (
                <div key={index}>
                  <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
                  <p> <i> {coursePart.description} </i> </p>
                </div>
              );
            case "group":
              return (
                <div key={index}>
                  <h3> {coursePart.name} {coursePart.exerciseCount} </h3>
                  <p> project exercises {coursePart.groupProjectCount} </p>
                </div>
              );
            case "background":
              return (
                <div key={index}>
                  <h3>{coursePart.name} {coursePart.exerciseCount} </h3>
                  <p> <i> {coursePart.description} </i> </p>
                  <p> submit to {coursePart.backgroundMaterial} </p>
                </div>
              );
            case "special":
              return (
                <div key={index}>
                  <h3> {coursePart.name} {coursePart.exerciseCount} </h3>
                  <p> <i> {coursePart.description} </i> </p>
                  <p>Required skills: {coursePart.requirements.join(', ')}</p>
                </div>
                )
            default:
                return assertNever(coursePart);
          }
        })}
      </div>
    );
  };

export default Part;
