import type { MatchState } from '@w3booster/sdk';
import { element } from './ui';

export function resources(state: MatchState | null) {
  const view = element('section', '', 'economy');
  const heading = element('div', '', 'economy-heading');
  heading.append(element('h2', 'Player economy'), element('span', 'CURRENT SNAPSHOT · NOT A HISTORY', 'eyebrow'));
  view.append(heading);
  if (!state?.players.length) { view.append(element('p', 'Waiting for players.')); return view; }
  const grid = element('div', '', 'resource-grid');
  for (const [index, player] of state.players.entries()) {
    const card = element('article', '', 'resource-card');
    const title = element('div', '', 'resource-player');
    title.append(element('span', String(index + 1).padStart(2, '0'), 'resource-index'), element('h3', player.name), element('span', player.race || 'Unknown race', 'race-label'));
    card.append(title);
    const value = state.capabilities.includes('resources') ? player.resources : undefined;
    if (!value) card.append(element('p', 'Resource data is unavailable for this player. Check granted scopes and current match data.', 'unavailable'));
    else {
      const stats = element('div', '', 'resource-stats');
      for (const [label, amount, kind] of [['Gold', value.gold, 'gold'], ['Lumber', value.lumber, 'lumber']] as const) {
        const tile = element('div', '', 'resource-value ' + kind);
        tile.append(element('span', label, 'eyebrow'), element('strong', amount == null ? '—' : String(amount)));
        stats.append(tile);
      }
      const supply = element('div', '', 'supply');
      supply.append(element('span', 'Supply', 'eyebrow'), element('strong', value.supply == null || value.supplyCap == null ? 'Unavailable' : value.supply + ' / ' + value.supplyCap));
      if (value.supply != null && value.supplyCap != null && value.supplyCap > 0) {
        const meter = element('meter'); meter.min = 0; meter.max = value.supplyCap; meter.value = value.supply; meter.setAttribute('aria-label', player.name + ' supply');
        supply.append(meter);
      }
      card.append(stats, supply);
    }
    const heroes = element('div', '', 'hero-roster');
    heroes.append(element('span', 'HERO ROSTER', 'eyebrow'));
    for (const hero of player.heroes || []) {
      const chip = element('span', '', 'hero-chip'); chip.append(element('b', 'LV ' + hero.level), element('span', hero.name)); heroes.append(chip);
    }
    if (!player.heroes?.length) heroes.append(element('span', 'No hero data available', 'muted'));
    card.append(heroes); grid.append(card);
  }
  view.append(grid);
  return view;
}
