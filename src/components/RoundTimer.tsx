import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import { currentWordAtom, roundTimerAtom, roundTimerIdAtom, timerStateAtom } from '../atoms'
import { Text } from '@chakra-ui/react'
import { ROUND_TIME } from '../declarations'
import { TimerState } from '../definitions'

export default function RoundTimer() {
  const [ time, setTime ] = useAtom( roundTimerAtom )
  const [ timerState, setTimerState ] = useAtom( timerStateAtom )  
  const [ timerIntervalId, setTimerIntervalId ] = useAtom( roundTimerIdAtom )
  const [ currentWord, setCurrentWord ] = useAtom( currentWordAtom )

  useEffect( () => {
    if ( currentWord === null ) return
    setTimerState( TimerState.STOPPED )
  }, [ currentWord ] )

  useEffect( () => {
    if ( timerState === TimerState.PAUSED ) return
    else if ( timerState === TimerState.STOPPED )
    {
      if ( timerIntervalId !== null )
        clearInterval( timerIntervalId )
      setTimerIntervalId( null )
      setTime( ROUND_TIME )
      return
    }
    
    // todo: do we need millis?
    // let millis  = 0
    let seconds = -1
    const newId = setInterval( () => {
      if ( ROUND_TIME - seconds === 0 )
      {
        setTimerState( TimerState.PAUSED )
        return
      }
      // millis += 10
      // if ( millis >= 1_000 ) seconds++
      seconds++

      setTime( ROUND_TIME - seconds )
    }, 1_000 )

    setTimerIntervalId( newId )

  }, [ timerState ] )

  return (
    <Text color="#ff0000">
      :{time}s
    </Text>
  )
}
