import { Alert } from "@chakra-ui/react"
import React from 'react'
import GameContinueButton from "./GameContinueButton"

export default function GameOutcomeDialog() {
  return (
    <Alert colorScheme="slate">
      Game over, wip
      <GameContinueButton />
    </Alert>
  )
}
