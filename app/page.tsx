'use client';

import Game from '@components/Game';
import avatars from '@utils/avatars';
import { insertCoin } from 'playroomkit';
import { useEffect, useState } from 'react';

const Lobby = () => {
  const [isJoined, setIsJoined] = useState<boolean>(false);

  useEffect(() => {
    const joinPlayRoom = async () => {
      try {
        await insertCoin({
          gameId: process.env.PLAYROOM_GAME_ID,
          avatars,
          reconnectGracePeriod: 5000,
          maxPlayersPerRoom: 4,
        });
        setIsJoined(true);
      } catch (err) {
        console.log('Error occurred in joinPlayRoom(): ', err);
      }
    };
    joinPlayRoom();
  });

  return (
    <main className="text-center">
      {isJoined && <Game />}
    </main>
  );
};

export default Lobby;
