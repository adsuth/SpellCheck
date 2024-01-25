import { Alert, Box, Center, Text, VStack } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { roundPointsAtom, roundStartTimestampAtom, roundTimeAtom } from "../atoms"
import { getRoundTimeDifference } from "../utils"
import GameContinueButton from "./GameContinueButton"

export default function RoundOutcomeWinDialog() {
  const [ roundPoints ] = useAtom( roundPointsAtom )
  const [ roundStartTimestamp ] = useAtom( roundStartTimestampAtom )

  return (
    <Alert colorScheme="green" textAlign={"center"}>
      <VStack margin={"0 auto"}>
        <Text fontSize={"2xl"}>
          That's Right! 
        </Text>
        <Text>
          You earned <b>{roundPoints}</b> points!
        </Text>
        <Text fontStyle={"italic"}>
          You answered in <b>{ getRoundTimeDifference( roundStartTimestamp ) }s</b>.
        </Text>
        
        <Center>
          <GameContinueButton/>
        </Center>
      </VStack>
    </Alert>
  )
}
