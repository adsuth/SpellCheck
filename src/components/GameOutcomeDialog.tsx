import { Alert, Box, Text, VStack } from "@chakra-ui/react"
import React, { useState } from 'react'
import GameContinueButton from "./GameContinueButton"
import { useAtom } from "jotai"
import { gameTotalRoundCountAtom, gameTotalRoundWonAtom, totalPointsAtom } from "../atoms"
import { ROUND_TIME, TOTAL_ROUND_COUNT } from "../declarations"
import { pointsFormula } from "../utils"

export default function GameOutcomeDialog() {
  const [ totalPoints ] = useAtom( totalPointsAtom )
  const [ totalRoundCount ] = useAtom( gameTotalRoundCountAtom )
  const [ roundWonCount ] = useAtom( gameTotalRoundWonAtom )
  
  const [ possiblePoints ] = useState( pointsFormula( 0 ) * totalRoundCount )
  
  function getPerformanceMessage()
  {
    if ( totalPoints >= possiblePoints * 0.8 ) return "Phenomenal performance! 🤩"
    else if ( totalPoints >= possiblePoints * 0.5 ) return "Great Job! 😃"
    else if ( totalPoints >= possiblePoints * 0.25 ) return "Well Done. 🙂"
    else return "That just wasn't your game... 😕"
  }

  return (
    <Alert colorScheme="gray">
      <VStack spacing={3} margin={"0 auto"} textAlign={"center"}>
        <Box>
          <Text fontSize={"2xl"}>
            Game Over!
          </Text>
          <Text>
            {getPerformanceMessage()}
          </Text>
        </Box>
        
        <Box>
          <Text>
            You got <b>{totalPoints} / {possiblePoints}</b> points
          </Text>
          <Text>
            You answered <b>{roundWonCount} / {totalRoundCount}</b> correctly
          </Text>
        </Box>
        <Text>

        </Text>

        <GameContinueButton />
      </VStack>

    </Alert>
  )
}
