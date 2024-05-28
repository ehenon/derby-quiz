'use client';

import { useState } from 'react';

const Page = () => {
  const [question, setQuestion] = useState<string>('');

  const getRandomQuestion = async () => {
    try {
      const res = await fetch('/api/random-question', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(res.status.toString());
      }

      const { label } = await res.json();
      setQuestion(label);
    } catch (err) {
      console.log('Une erreur est survenue');
    }
  };

  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center'>
      <button onClick={getRandomQuestion} className="group relative h-12 w-96 overflow-hidden rounded-lg bg-white text-lg shadow">
        <div className="absolute inset-0 w-3 bg-blue-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
        <span className="relative text-black group-hover:text-white">Donne-moi une question !</span>
      </button>
      <p className='w-2/4 ml-12 mt-12 mr-12 text-justify'>{question}</p>
    </div>
  );
};

export default Page;
