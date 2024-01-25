import { Button, Center } from "@chakra-ui/react"
import { useAtom } from "jotai"
import React, { useEffect, useState } from 'react'
import { gameStateAtom, gameTotalRoundCountAtom, roundNumberAtom, roundOutcomeStateAtom } from "../atoms"
import { GameState, RoundOutcomeState } from "../definitions"

export default function GameContinueButton() {
  const [ roundOutcomeState, setRoundOutcomeState ] = useAtom( roundOutcomeStateAtom )

  const [ gameState, setGameState ] = useAtom( gameStateAtom )
  const [ roundNumber, setRoundNumber ] = useAtom( roundNumberAtom )
  const [ totalRoundCount, setTotalRoundCount ] = useAtom( gameTotalRoundCountAtom )

  const [ isActive, setIsActive ] = useState( false )
  
  useEffect( () => {
    setTimeout( () => {
      setIsActive( true )
    }, 500 )
  }, [] )
  
  useEffect( () => {
    window.addEventListener( "keydown", pressEnterToNextRound )
    return () => window.removeEventListener( "keydown", pressEnterToNextRound )
  }, [ isActive ] )

  function pressEnterToNextRound( e: any )
  {
    if ( !isActive ) return
    if ( e.code !== "Enter" ) return
    if ( roundOutcomeState === RoundOutcomeState.ONGOING ) return
    // todo: fix this 
    nextAction()
  }

  function nextAction() 
  {
    // after end screen
    if ( gameState === GameState.ENDED )
    {
      setGameState( GameState.NEW )
      console.log( "Set state of Game to NEW" )
      return
    }

    // final round
    if ( roundNumber === totalRoundCount ) setGameState( GameState.ENDED )
    else setRoundOutcomeState( RoundOutcomeState.ONGOING )
  }

  function determineColorScheme()
  {
    let colorScheme = roundOutcomeState === RoundOutcomeState.WIN ? "green" : "red"
    colorScheme     = gameState === GameState.ENDED ? "red" : colorScheme
    return colorScheme
  }

  function determineButtonText()
  {
    return ( gameState === GameState.ENDED ) ? "New Game" : "Continue"
  }


  return (
    <Button onClick={ nextAction } isLoading={!isActive} colorScheme={determineColorScheme()}>
      {determineButtonText()}
    </Button>
  )
}
