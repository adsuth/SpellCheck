import { atom } from "jotai";
import { GameState, RoundOutcomeState, RoundTime, SpellCheckWord, TimerState } from "./definitions";
import { ROUND_TIME, START_TIME, TOTAL_ROUND_COUNT } from "./declarations";

export const allWordsAtom     = atom<SpellCheckWord[]>([])
export const gameWordsAtom    = atom<SpellCheckWord[]>([])

export const currentWordAtom  = atom<SpellCheckWord | null>(null)
export const roundNumberAtom  = atom<number>( 0 )
export const gameStateAtom    = atom<GameState>( GameState.ONGOING )

export const roundTimeAtom   = atom<number>( START_TIME )
export const roundOutcomeStateAtom = atom<RoundOutcomeState>( RoundOutcomeState.ONGOING )

export const roundPointsAtom  = atom<number>( 0 )
export const totalPointsAtom  = atom<number>( 0 )
export const timerStateAtom   = atom<TimerState>(TimerState.STOPPED)
export const hasAudioPlayedOnceAtom   = atom<boolean>(false)
export const roundTimerIdAtom = atom<number | null>( null )

export const roundStartTimestampAtom = atom<number>( 0 )


export const gameTotalRoundCountAtom = atom<number>( TOTAL_ROUND_COUNT )
