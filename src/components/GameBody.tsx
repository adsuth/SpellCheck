import { useAtom } from "jotai"
import React from 'react'
import { gameStateAtom, roundOutcomeStateAtom } from "../atoms"
import GameFormInput from "./GameFormInput"
import { GameState, RoundOutcomeState } from "../definitions"
import RoundOutcomeWinDialog from "./RoundOutcomeWinDialog"
import RoundOutcomeLossDialog from "./RoundOutcomeLossDialog"
import GameOutcomeDialog from "./GameOutcomeDialog"

export default function GameBody() {
  const [ roundOutcomeState ] = useAtom( roundOutcomeStateAtom )
  const [ gameState ]         = useAtom( gameStateAtom )

  let element = <GameFormInput/>

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

  return (
    <>
      {element}
    </>
  )
}
