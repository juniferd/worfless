import { createContext } from 'react';

export const StatsContext = createContext({
  totalGames: 0,
  hist: {},
  recentGame: {},
  setStats: () => {},
})

StatsContext.displayName = 'StatsContext';
