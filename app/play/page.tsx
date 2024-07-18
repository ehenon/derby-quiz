'use client';

import Lobby from '@components/Lobby';
import Derby from '@components/Derby';
import { useMultiplayerState } from 'playroomkit';
import { ActiveScreen } from '@utils/types';
import { MultiplayerStateKeys } from '@utils/stateKeys';

const Play = () => {
  const [activeScreen] = useMultiplayerState(MultiplayerStateKeys.ActiveScreen, ActiveScreen.Lobby);

  return (
    <main>
      {
        activeScreen === ActiveScreen.Lobby ? (
          <Lobby />
        ) : (
          <Derby />
        )
      }
    </main>
  );
};

export default Play;
