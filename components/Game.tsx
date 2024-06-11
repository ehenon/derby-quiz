import { myPlayer, useIsHost, useMultiplayerState } from 'playroomkit';

const Game = () => {
  const player = myPlayer();
  const isHost = useIsHost();
  const [commonClicks, setCommonClicks] = useMultiplayerState('commonClicks', 0);

  const addClick = () => {
    setCommonClicks(commonClicks + 1);
  };

  return (
    <>
      <p className='mb-5'>[Interface {isHost ? 'hôte' : 'joueur'}]</p>
      <h1 className="mb-5 text-4xl text-gray-800">Hey {player.getProfile().name} 👋</h1>
      <h2 className="mb-6 text-2xl text-gray-800">Compteur de clics communs : {commonClicks}</h2>
      <button className="bg-gradient-to-r from-gray-700 to-gray-900 text-white font-medium text-lg py-3 px-6 rounded-md shadow-md transform transition-transform duration-200 hover:scale-105 active:scale-95" onClick={addClick}>
        J&apos;ajoute un clic 👆🏻
      </button>
    </>
  );
};

export default Game;
