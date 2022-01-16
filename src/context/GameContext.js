import React from 'react';

export const GameContext = React.createContext({
  gameStarted: false,
  startGame: () => {},
  endGame: () => {},
  stats: {},
  setStats: () => {},
})

GameContext.displayName = 'GameContext';
