import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Diaries from './components/Diaries';
import DiaryForm from './components/DiaryForm';

// Define Diary interface outside the component
export interface Diary {
  id: string;
  date: string;
  weather: string;
  visibility: string;
}

const App: React.FC = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/diaries')
      .then((response) => {
        setDiaries(response.data as Diary[]);
      })
      .catch((error) => {
        console.error('Error fetching diaries:', error);
      });
  }, []);
  
  return (
    <div>
      <DiaryForm/>
      <Diaries diaries={diaries}/>
    </div>
  );
}

export default App;
