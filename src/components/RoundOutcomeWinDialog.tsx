import { Alert, Box } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { roundPointsAtom, roundStartTimestampAtom, roundTimeAtom } from "../atoms"
import { getRoundTimeDifference } from "../utils"
import RoundOutcomeContinueButton from "./RoundOutcomeContinueButton"

export default function RoundOutcomeWinDialog() {
  const [ roundPoints ] = useAtom( roundPointsAtom )
  const [ roundStartTimestamp ] = useAtom( roundStartTimestampAtom )

  return (
    <Alert colorScheme="green">
      <Box>
        Nice! You earned {roundPoints} points! <br />
        You answered in { getRoundTimeDifference( roundStartTimestamp ) } seconds <br />
        <RoundOutcomeContinueButton/>
      </Box>
    </Alert>
  )
}
