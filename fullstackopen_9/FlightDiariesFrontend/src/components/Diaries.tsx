import React from 'react';

interface Diary {
    id: string;
    date: string;
    weather: string;
    visibility: string;
}

interface Diaries {
    diaries: Diary[];
}

const Diaries: React.FC<Diaries> = ({ diaries }) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <strong> <p>Date: {diary.date}</p> </strong>
          <p>weather: {diary.weather}</p>
          <p>visibility: {diary.visibility}</p>
        </div>
      ))}
    </div>
  );
}

export default Diaries;
