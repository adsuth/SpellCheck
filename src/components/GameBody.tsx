import { useAtom } from "jotai"
import React, { useEffect, useState } from 'react'
import { gameInputShownAtom, gameStateAtom, roundOutcomeStateAtom } from "../atoms"
import GameFormInput from "./GameFormInput"
import { GameState, RoundOutcomeState } from "../definitions"
import RoundOutcomeWinDialog from "./RoundOutcomeWinDialog"
import RoundOutcomeLossDialog from "./RoundOutcomeLossDialog"
import GameOutcomeDialog from "./GameOutcomeDialog"
import { Box, Center, Slide, SlideFade } from "@chakra-ui/react"

export default function GameBody() {
  const [ roundOutcomeState ] = useAtom( roundOutcomeStateAtom )
  const [ gameState ]         = useAtom( gameStateAtom )
  const [ isGameInputIn, setIsGameInputIn ] = useAtom( gameInputShownAtom )

  useEffect( () => {
    const isIn = (
      gameState !== GameState.ENDED &&
      roundOutcomeState === RoundOutcomeState.ONGOING
    )
    setIsGameInputIn( isIn )
  }, [ roundOutcomeState, gameState ] )
  
  let element = <></>

  switch ( roundOutcomeState )
  {
    case RoundOutcomeState.WIN:
      element = <RoundOutcomeWinDialog />
      break
    case RoundOutcomeState.LOSS:
      element = <RoundOutcomeLossDialog />
      break
  }

  switch ( gameState )
  {
    case GameState.ENDED:
      element = <GameOutcomeDialog />
  }

  // dont like how this looks tbh. The input is supposed to slide out
  return (
    <>
      {/* For the slide in, this always needs to be present */}
      <SlideFade in={ isGameInputIn } offsetX={ "-500px" }
      >
        <Box display={ isGameInputIn ? "unset" : "none" }>
          <GameFormInput/>
        </Box>
      </SlideFade>

      {/* For the slide in, this always needs to be present */}
      <SlideFade in={ !isGameInputIn } offsetX={ "-500px" }>
        <Box display={ !isGameInputIn ? "unset" : "none" }>
          { element }
        </Box>
      </SlideFade>
    </>
  )
}
