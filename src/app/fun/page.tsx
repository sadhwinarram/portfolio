'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const colors = {
  background: "#0D0D0D",
  primary: "#3B82F6",
  text: "#D1D5DB",
  glow1: "#3B82F6",
  glow2: "#1E40AF",
  card: "#rgba(255,255,255,0.05)",
  border: "#1E3A8A",
};

const games = [
  { key: 'tictactoe', title: 'Tic Tac Toe', emoji: '❌⭕' },
  { key: 'joke', title: 'Tell Me a Joke', emoji: '🤣' },
  { key: 'colormatch', title: 'Color Match', emoji: '🎨' },
  { key: 'emoji', title: 'Emoji Memory Grid', emoji: '🧠' }
] as const;

type GameType = typeof games[number]['key'];

const JokeCard = () => {
  const [joke, setJoke] = useState<string>('Click the button to hear a programming joke!');
  const jokeEndpoint = process.env.NEXT_PUBLIC_JOKE_API ?? '';
  
  const fetchJoke = async () => {
    try {
      const res = await fetch(jokeEndpoint);
      const data = await res.json();
      setJoke(data.joke || 'Oops, no joke found!');
    } catch {
      setJoke('Could not load joke. Please try again!');
    }
  };

  return (
    <div className="text-center mt-6">
      <p className="text-lg mb-4 text-gray-300">{joke}</p>
      <button
        onClick={fetchJoke}
        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
      >
        😂 Tell me a new joke
      </button>
    </div>
  );
};

const ComingSoon = ({ title }: { title: string }) => (
  <div className="text-center mt-12 text-xl text-blue-400 font-semibold">
    🚧 {title} coming soon!
  </div>
);

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(board);

  const handleClick = (i: number) => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setXIsNext(true);
  };

  return (
    <div className="text-center mt-6 space-y-4">
      <p className="text-lg text-blue-400 font-medium">
        {winner ? `🎉 Winner: ${winner}` : board.every(cell => cell) ? '😅 Draw!' : `Turn: ${xIsNext ? '❌ X' : '⭕ O'}`}
      </p>
      <div className="grid grid-cols-3 gap-2 w-60 mx-auto">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="w-20 h-20 border-2 text-2xl font-bold rounded"
            style={{ borderColor: colors.primary, color: colors.primary }}
          >
            {cell}
          </button>
        ))}
      </div>
      <button
        onClick={resetGame}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
      >
        🔁 Play Again
      </button>
    </div>
  );
};

const calculateWinner = (squares: string[]) => {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default function Page() {
  const [activeGame, setActiveGame] = useState<GameType | null>(null);

  const renderGame = () => {
    switch (activeGame) {
      case 'tictactoe': return <TicTacToe />;
      case 'colormatch': return <ComingSoon title="Color Match" />;
      case 'emoji': return <ComingSoon title="Emoji Memory Grid" />;
      case 'joke': return <JokeCard />;
      default: return null;
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto min-h-screen">
      <h1 className="text-4xl font-bold text-center text-blue-500 mb-10">
        🎉 Welcome to the Fun Zone!
      </h1>

      <AnimatePresence>
        {!activeGame && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {games.map((game) => (
              <button
                key={game.key}
                onClick={() => setActiveGame(game.key)}
                className="p-6 rounded-lg border-2 hover:shadow-xl transition-all text-left"
                style={{ backgroundColor: colors.card, borderColor: colors.border }}
              >
                <div className="text-3xl mb-2">{game.emoji}</div>
                <div className="text-lg font-semibold text-blue-400">{game.title}</div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeGame && (
          <motion.div
            className="relative mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setActiveGame(null)}
              className="absolute top-0 right-0 text-2xl text-gray-400 hover:text-red-500 z-50"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-blue-400 mb-4 mt-4 text-center">
              {games.find((g) => g.key === activeGame)?.title}
            </h2>
            {renderGame()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
