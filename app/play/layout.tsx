'use client';

import GenericLoading from '@components/GenericLoading';
import RoomIsFull from '@components/RoomIsFull';
import UnhandledError from '@components/UnhandledError';
import { MAX_PLAYERS_PER_ROOM } from '@utils/constants';
import { insertCoin } from 'playroomkit';
import { useEffect, useState } from 'react';

const PlayLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [playroomKitState, setPlayroomKitState] = useState({
    initialized: false,
    roomLimitExceeded: false,
    unhandledError: false,
  });

  const initializePlayroomKit = async () => {
    try {
      await insertCoin({
        skipLobby: true,
        reconnectGracePeriod: 5000,
        maxPlayersPerRoom: MAX_PLAYERS_PER_ROOM,
      });
      setPlayroomKitState({ initialized: true, roomLimitExceeded: false, unhandledError: false });
    } catch (err: any) {
      if (err?.message === 'ROOM_LIMIT_EXCEEDED') {
        setPlayroomKitState({ initialized: true, roomLimitExceeded: true, unhandledError: false });
      } else {
        setPlayroomKitState({ initialized: true, roomLimitExceeded: false, unhandledError: true });
      }
    }
  };

  useEffect(() => {
    initializePlayroomKit();
  }, []);

  if (!playroomKitState.initialized) {
    return <GenericLoading />;
  }

  if (playroomKitState.roomLimitExceeded) {
    return <RoomIsFull />;
  }

  if (playroomKitState.unhandledError) {
    return <UnhandledError />;
  }

  return <>{children}</>;
};

export default PlayLayout;
