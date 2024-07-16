'use client';

import { MAX_PLAYERS_PER_ROOM } from '@utils/constants';
import { MultiplayerStateKeys, PlayerStateKeys } from '@utils/stateKeys';
import {
  getRoomCode,
  myPlayer,
  PlayerState,
  useIsHost,
  useMultiplayerState,
  usePlayersList,
  usePlayerState,
} from 'playroomkit';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import avatars from '@utils/avatars';
import resetIcon from '@public/icons/reset.svg';
import { ActiveScreen } from '@utils/types';

const generateRandomPseudo = () => {
  const adjectives = ['Amazing', 'Brilliant', 'Cool', 'Dazzling', 'Epic'];
  const nouns = ['Player', 'Astronaut', 'Gamer', 'Pilot', 'Explorer'];
  const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdj}${randomNoun}${Math.floor(Math.random() * 1000)}`;
};

const Lobby = () => {
  const [, setActiveScreen] = useMultiplayerState(MultiplayerStateKeys.ActiveScreen, ActiveScreen.Lobby);
  const amIHost = useIsHost();
  const me = myPlayer();
  const [myPseudo, setMyPseudo] = usePlayerState(me, PlayerStateKeys.Pseudo, generateRandomPseudo());
  const [myAvatar, setMyAvatar] = usePlayerState(me, PlayerStateKeys.Avatar, avatars[Math.floor(Math.random() * avatars.length)]);
  const players = usePlayersList(true);
  const isRoomFull = players.length === MAX_PLAYERS_PER_ROOM;

  const changeAvatar = () => {
    const filteredAvatars = avatars.filter((avatar) => avatar !== myAvatar);
    const randomIndex = Math.floor(Math.random() * filteredAvatars.length);
    setMyAvatar(filteredAvatars[randomIndex]);
  };

  const renderPlayerCard = (player: PlayerState, isCurrentPlayer: boolean) => (
    <div key={player.id} className="flex flex-col items-center justify-start bg-black bg-opacity-40 text-white p-4 w-56 h-72 rounded-lg relative">
      <div className="mb-2 w-full">
        {isCurrentPlayer ? (
          <input
            type="text"
            className="p-2 w-full rounded-lg border border-gray-300 focus:outline-none text-center text-black"
            placeholder="pseudo"
            value={myPseudo}
            onChange={(e) => setMyPseudo(e.target.value)}
          />
        ) : (
          <p className="p-2 w-full rounded-lg border border-transparent text-center bg-transparent">{player.getState(PlayerStateKeys.Pseudo)}</p>
        )}
      </div>
      <div className="relative w-full h-60 flex justify-center items-center">
        <Image
          src={isCurrentPlayer ? myAvatar : player.getState(PlayerStateKeys.Avatar)}
          alt="Avatar"
          priority={true}
          width={180}
          height={180}
          className="w-48 h-48 object-contain rounded-full"
        />
        {isCurrentPlayer && (
          <button onClick={() => changeAvatar()} className="absolute top-7 right-8 w-8 h-8 bg-[#1e1e1e] border border-gray-600 bg-opacity-80 hover:bg-opacity-100 rounded-full flex justify-center items-center p-1">
            <Image src={resetIcon} alt="Reset Avatar" priority={true} width={24} height={24} />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <div className="flex space-x-4 mb-8">
        {Array.from({ length: MAX_PLAYERS_PER_ROOM }).map((_, index) => {
          const sortedPlayers = [
            me,
            ...players
              .filter((p) => p.id !== me.id)
              .sort((a, b) => (a.id > b.id ? 1 : -1)),
          ];
          const player = sortedPlayers[index];
          if (player) {
            return renderPlayerCard(player, player.id === me.id);
          }
          return (
            <div key={index} className="flex flex-col items-center justify-start bg-black bg-opacity-40 text-white p-4 w-56 h-72 rounded-lg">
              <p className="mb-2">En attente...</p>
            </div>
          );
        })}
      </div>
      {amIHost ? (
        <div className="flex flex-col items-center gap-4">
          <button
            className={`p-4 w-56 rounded-lg text-black ${isRoomFull ? 'bg-green-400 bg-opacity-80 hover:bg-opacity-100' : 'bg-gray-500'}`}
            onClick={() => isRoomFull && setActiveScreen(ActiveScreen.Derby)}
            disabled={!isRoomFull}
          >
            {isRoomFull ? 'Démarrer 🚀' : 'En attente de joueurs'}
          </button>
          <button
            className="p-4 w-56 rounded-lg text-black bg-white bg-opacity-80 hover:bg-opacity-100"
            onClick={() => {
              navigator.clipboard.writeText(getRoomCode() || '');
              toast.success('Code copié dans le presse-papier ✓');
            }}
          >
            Copier code 🔗
          </button>
        </div>
      ) : (
        <p className="text-white">En attente de l&apos;hôte</p>
      )}
    </div>
  );
};

export default Lobby;
