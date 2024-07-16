'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();
  const [userWannaJoin, setUserWannaJoin] = useState(false);
  const [inputRoomCode, setInputRoomCode] = useState('');
  const inputCodeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (userWannaJoin && inputCodeRef.current) {
      inputCodeRef.current.focus();
    }
  }, [userWannaJoin]);

  return (
    <main className="text-center flex flex-col items-center justify-center gap-6 h-full">
      <div className="flex flex-col items-center gap-4">
        <Link href="/play">
          <button className="p-4 w-56 rounded-lg text-white bg-black bg-opacity-50 hover:bg-opacity-100">
            Créer une partie 🏠
          </button>
        </Link>
        <div className="flex items-center w-56 opacity-80">
          <div className="flex-grow h-px bg-white"></div>
          <span className="mx-2 text-white">ou</span>
          <div className="flex-grow h-px bg-white"></div>
        </div>
        {!userWannaJoin ? (
          <button
            className="p-4 w-56 rounded-lg text-black bg-white bg-opacity-80 hover:bg-opacity-100"
            onClick={() => setUserWannaJoin(true)}
          >
            En rejoindre une 🤝
          </button>
        ) : (
          <div className="flex items-center w-56 h-14">
            <input
              ref={inputCodeRef}
              type="text"
              className="py-2 px-2 pl-4 rounded-l-lg border border-gray-300 w-2/5 h-full focus:outline-none"
              placeholder="Code"
              value={inputRoomCode}
              onChange={(e) => setInputRoomCode(e.target.value)}
            />
            <button
              className="py-2 px-4 rounded-r-lg text-white w-3/5 h-full bg-blue-500 bg-opacity-70 hover:bg-opacity-100"
              onClick={() => router.push(`/play#r=R${inputRoomCode}`)}
            >
              Rejoindre 🚀
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
