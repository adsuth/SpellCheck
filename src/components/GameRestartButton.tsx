import { Button } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { useEffect, useState } from 'react'
import { gameStateAtom, roundOutcomeStateAtom } from "../atoms"
import { KEYBINDS } from "../declarations"
import { GameState, RoundOutcomeState } from "../definitions"

export default function GameRestartButton() {
  const [ roundOutcomeState ] = useAtom( roundOutcomeStateAtom )

  const [ , setGameState ] = useAtom( gameStateAtom )

  const [ isActive, setIsActive ] = useState( false )
  
  useEffect( () => {
    setTimeout( () => {
      setIsActive( true )
    }, 800 )
  }, [] )
  
  useEffect( () => {
    window.addEventListener( "keydown", restartRoundWithKey )
    return () => window.removeEventListener( "keydown", restartRoundWithKey )
  }, [ isActive ] )

  function restartRoundWithKey( e: any )
  {
    if ( !isActive ) return
    if ( e.code !== KEYBINDS[ "restartGame" ].code ) return
    if ( roundOutcomeState === RoundOutcomeState.ONGOING ) return
    // todo: fix this 
    restartRound()
  }

  function restartRound() 
  {
    // after end screen
    setGameState( GameState.NEW )
    console.log( "Restarted Game" )
  }

  return (
    <Button onClick={ restartRound } isLoading={!isActive} variant={"outline"} colorScheme={"red"}>
      Restart
    </Button>
  )
}
