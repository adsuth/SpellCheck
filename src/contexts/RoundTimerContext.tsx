import { useAtom } from 'jotai'
import React, { createContext } from 'react'
import { roundTimerAtom, roundTimerIdAtom } from '../atoms'
import { ROUND_TIME } from '../declarations'


export function useTimerReset()
{
  const [ timerId, setTimerId ] = useAtom( roundTimerIdAtom )
  const [ timer, setTimer   ]   = useAtom( roundTimerAtom )
  
  
  return () => {
    console.log( "resetting timer" )

    setTimer( ROUND_TIME )
    clearInterval( timerId )
    
    const newId = setInterval( () => {
      if ( timer < 0 ) clearInterval( newId ) 
      setTimer( timer - 1 )
    
    }, 1000 )
    
    setTimerId( newId )
  }
}