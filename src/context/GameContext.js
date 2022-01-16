import React from 'react';

export const GameContext = React.createContext({
  gameStarted: false,
  startGame: () => {},
  endGame: () => {},
  stats: {firstGame: true},
  setStats: () => {},
})

GameContext.displayName = 'GameContext';
