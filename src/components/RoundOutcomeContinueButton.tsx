import { Button, Center } from "@chakra-ui/react"
import { useAtom } from "jotai"
import React, { useEffect, useState } from 'react'
import { gameStateAtom, gameTotalRoundCountAtom, roundNumberAtom, roundOutcomeStateAtom } from "../atoms"
import { GameState, RoundOutcomeState } from "../definitions"

export default function RoundOutcomeContinueButton() {
  const [ roundOutcomeState, setRoundOutcomeState ] = useAtom( roundOutcomeStateAtom )

  const [ gameState, setGameState ] = useAtom( gameStateAtom )
  const [ roundNumber, setRoundNumber ] = useAtom( roundNumberAtom )
  const [ totalRoundCount, setTotalRoundCount ] = useAtom( gameTotalRoundCountAtom )
  
  useEffect( () => {
    window.addEventListener( "keydown", pressEnterToNextRound )
    return () => window.removeEventListener( "keydown", pressEnterToNextRound )
  }, [] )

  function pressEnterToNextRound( e: any )
  {
    if ( e.code !== "Enter" ) return
    if ( roundOutcomeState === RoundOutcomeState.ONGOING ) return
    return
    // todo: fix this 
    nextAction()
  }

  function nextAction() 
  {
    if ( roundNumber === totalRoundCount ) setGameState( GameState.ENDED )
    else setRoundOutcomeState( RoundOutcomeState.ONGOING )
  }

  return (
    <Button onClick={ nextAction }>
      Continue
    </Button>
  )
}
