import { atom } from "jotai";
import { RoundOutcomeState, SpellCheckWord, TimerState } from "./definitions";
import { ROUND_TIME } from "./declarations";

export const currentWordAtom  = atom<SpellCheckWord | null>(null)
export const roundNumberAtom  = atom<number>(-1)
export const gameStateAtom    = atom<any>(null)

export const roundTimerAtom   = atom<number>( ROUND_TIME )
export const roundOutcomeStateAtom = atom<RoundOutcomeState>( RoundOutcomeState.UNSTARTED )

export const roundPointsAtom  = atom<number>( 0 )
export const totalPointsAtom  = atom<number>( 0 )
export const timerStateAtom   = atom<TimerState>(TimerState.STOPPED)
export const roundTimerIdAtom = atom<number | null>( null )