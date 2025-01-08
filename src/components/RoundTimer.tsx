import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import { currentWordAtom, gameTotalRoundWonAtom, roundOutcomeStateAtom, roundTimeAtom, roundTimerIdAtom, timerStateAtom } from '../atoms'
import { Text } from '@chakra-ui/react'
import { ROUND_TIME, START_TIME } from '../declarations'
import { RoundOutcomeState, TimerState } from '../definitions'
import { isRoundTimeUp } from "../utils"

export default function RoundTimer() {
  const [ time, setTime ] = useAtom( roundTimeAtom )
  const [ timerState, setTimerState ] = useAtom( timerStateAtom )  
  const [ timerIntervalId, setTimerIntervalId ] = useAtom( roundTimerIdAtom )
  const [ roundOutcomeState, setRoundOutcomeState ] = useAtom( roundOutcomeStateAtom )
  const [ roundWonCount, setRoundWonCount ] = useAtom( gameTotalRoundWonAtom )

  useEffect( () => {
    if ( ROUND_TIME - time !== 0 ) return
    setTimerState( TimerState.PAUSED )
    setRoundOutcomeState( RoundOutcomeState.LOSS )
  }, [ time ] )

  useEffect( () => {
    if ( roundOutcomeState === RoundOutcomeState.WIN )
      setRoundWonCount( roundWonCount + 1 )

    if ( roundOutcomeState === RoundOutcomeState.ONGOING ) return
    setTimerState( TimerState.PAUSED )
  }, [ roundOutcomeState ] )

  useEffect( () => {
    if ( roundOutcomeState !== RoundOutcomeState.ONGOING ) return
    setTime( START_TIME )
  }, [ roundOutcomeState ] )

  useEffect( () => {
    if ( timerState !== TimerState.STARTED )
    {
      if ( timerIntervalId !== null )
        clearInterval( timerIntervalId )
      setTimerIntervalId( null )
      return
    }
    
    let currentTime = 0
    const newId = setInterval( () => {
      currentTime++
      setTime( currentTime )
    }, 1_000 )

    setTimerIntervalId( newId )

  }, [ timerState ] )

  const color = ROUND_TIME - time > 5 ? "unset" : "#ff0000"
  return (
    <Text color={ color }>
      :{ROUND_TIME - time}s
    </Text>
  )
}
