import React from 'react';

export const GameContext = React.createContext({
  started: false,
  startGame: () => {},
  endGame: () => {},
  firstGame: true,
  setStats: () => {},
})

GameContext.displayName = 'GameContext';
