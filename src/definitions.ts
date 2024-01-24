
export type SpellCheckWord = {
  word: string,
  variations?: string[],
  context: string
} | null

export interface RoundTime {
  seconds: number
  millis: number
}

export enum TimerState {
  STOPPED = 0,
  STARTED,
  PAUSED,
}

export enum RoundOutcomeState {
  ONGOING = 0,
  WIN,
  LOSS,
}

export enum GameState {
  NEW = 0,
  ONGOING,
  ENDED
}