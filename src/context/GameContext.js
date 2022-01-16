import React from 'react';

export const GameContext = React.createContext({
  started: false,
  startGame: () => {},
  endGame: () => {},
  stats: {firstGame: true},
  setStats: () => {},
})

GameContext.displayName = 'GameContext';
