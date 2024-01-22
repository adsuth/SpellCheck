
export type SpellCheckWord = {
  word: string,
  variations?: string[],
  context: string
} | null

export enum TimerState {
  STOPPED = 0,
  STARTED,
  PAUSED,
}

export enum RoundOutcomeState {
  UNSTARTED = 0,
  WIN,
  LOSS,
}