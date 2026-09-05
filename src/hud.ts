import type { MatchState } from '@w3booster/sdk';
import { formatGameTime } from '@w3booster/sdk/standard-game';
import { isObserverOrReplayMatch } from '@w3booster/sdk/selectors';
import { element } from './ui';

export function observerMessage(state: MatchState | null): [string, string] | null {
  if (!state) return ['Waiting for match data', 'The HUD will appear once W3Booster delivers fresh observer or replay data.'];
  if (state.match.status === 'none') return ['Waiting for an observer game', 'Observe a Warcraft III match or watch a replay to see each player’s gold, lumber, and supply.'];
  if (state.match.status === 'finished') return ['Observer game ended', 'Observe another match or watch a replay to resume the economy HUD.'];
  if (!isObserverOrReplayMatch(state.match)) return ['Observer mode required', 'This example only displays resources while observing a match or watching a replay. It stays inactive when you are playing.'];
  if (state.match.status !== 'running') return ['Waiting for the observer game to start', 'The economy HUD will appear when this match starts.'];
  return null;
}

export function resources(state: MatchState | null) {
  const view = element('section', '', 'economy');
  const message = observerMessage(state);
  if (message) {
    const notice = element('div', '', 'economy-notice');
    notice.setAttribute('role', 'status');
    notice.append(element('span', 'OBSERVER ECONOMY', 'eyebrow'), element('h2', message[0]), element('p', message[1]));
    view.append(notice);
    return view;
  }
  if (!state) return view;
  const heading = element('div', '', 'economy-heading');
  heading.append(element('strong', 'ECONOMY'), element('span', `${state.match.isReplay ? 'REPLAY' : 'LIVE'} · ${formatGameTime(state.match.gameTime)}`));
  view.append(heading);
  for (const player of state.players) {
    const row = element('article', '', 'resource-card');
    const name = element('div', '', 'resource-player');
    name.append(element('strong', player.name), element('span', `${player.race || 'Unknown race'}${player.team == null ? '' : ' · T' + (player.team + 1)}`));
    row.append(name);
    const values = state.capabilities.includes('resources') ? player.resources : undefined;
    for (const [label, value] of [['Gold', values?.gold], ['Lumber', values?.lumber]] as const) {
      const tile = element('div', '', 'resource-value ' + label.toLowerCase());
      tile.append(element('span', label), element('strong', value == null ? '—' : String(value))); row.append(tile);
    }
    const supply = element('div', '', 'resource-value supply');
    const available = values?.supply != null && values?.supplyCap != null;
    supply.classList.toggle('blocked', !!available && values!.supplyCap! > 0 && values!.supply! >= values!.supplyCap!);
    supply.append(element('span', supply.classList.contains('blocked') ? 'Supply full' : 'Supply'), element('strong', available ? `${values!.supply} / ${values!.supplyCap}` : '—'));
    row.append(supply);
    if (!values) row.append(element('span', 'Resource data unavailable', 'unavailable'));
    view.append(row);
  }
  return view;
}

export function preview(state: MatchState | null) {
  const view = element('section', '', 'hud-preview');
  view.append(element('span', 'BROWSER DEMO / NOT AN APPLICATION SURFACE', 'eyebrow'));
  const stage = element('div', '', 'hud-stage'); stage.append(resources(state));
  view.append(stage, element('h2', 'Watch the economy without leaving the match.'), element('p', 'For observers comparing current gold, lumber, and supply. Amber supply flags mean the current cap is reached—not a prediction. Missing values stay unavailable; this app cannot unlock hidden or ungranted data.'), element('p', 'Install the example, then enable Stream or In-game. For OBS, use Set up OBS in W3Booster: one browser source carries all enabled stream overlays. No separate app window is needed.'));
  return view;
}
