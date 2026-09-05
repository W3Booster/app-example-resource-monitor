import { createDemoState } from '@w3booster/sdk/testing';

export const scenarios = ['match', 'no-match', 'player-match', 'unknown-mode', 'starting', 'replay', 'missing-data', 'teams', 'finished'] as const;
export function scenarioState(name: string) {
  const fixture = createDemoState();
  const state = { ...fixture, match: { ...fixture.match, gameTime: 872, isObserver: true } };
  if (name === 'no-match') return { ...state, match: { id: '', status: 'none' as const, gameTime: 0, mode: '' }, players: [] };
  if (name === 'player-match') return { ...state, match: { ...state.match, isObserver: false, isReplay: false } };
  if (name === 'unknown-mode') {
    const { isObserver, isReplay, ...match } = state.match;
    return { ...state, match };
  }
  if (name === 'starting') return { ...state, match: { ...state.match, status: 'starting' as const } };
  if (name === 'replay') return { ...state, match: { ...state.match, isObserver: false, isReplay: true } };
  if (name === 'missing-data') return {
    gameContext: state.gameContext, match: state.match, capabilities: ['match', 'players'] as const,
    players: state.players.map(({ id, name, race, team }) => ({ id, name, race, team }))
  };
  if (name === 'finished') return { ...state, match: { ...state.match, status: 'finished' as const } };
  if (name === 'teams') return {
    ...state, match: { ...state.match, mode: '2v2' },
    players: [...state.players, ...state.players.map((player, index) => ({ ...player, id: String(index + 2), name: ['Moonrise', 'Stormguard'][index] }))]
  };
  return state;
}
