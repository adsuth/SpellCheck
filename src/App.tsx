import { useAtom } from "jotai"
import { currentWordAtom, roundOutcomeStateAtom, roundPointsAtom, roundTimerAtom } from "./atoms"
import { useEffect } from "react"
import GameFormInput from "./components/GameFormInput"
import GameHeader from "./components/GameHeader"
import { Alert, Center, Container, Stack } from "@chakra-ui/react"
import SiteHeader from "./components/SiteHeader"
import { calculateRoundPoints } from "./utils"
import GamePoints from "./components/GamePoints"
import { RoundOutcomeState } from "./definitions"


function App() 
{
  const [ , setCurrentWord ] = useAtom( currentWordAtom )
  const [ timeLeft ]    = useAtom( roundTimerAtom )
  const [ roundOutcome ]   = useAtom( roundOutcomeStateAtom )
  const [ roundPoints ] = useAtom( roundPointsAtom )

  // temp, delete
  useEffect( () => { setCurrentWord( {word: "Suspicious", variations: [], context: "Red is acting suspicious"} ) }, [] )

  function fetchRoundOutcomeAlert()
  {
    if ( roundOutcome === RoundOutcomeState.UNSTARTED ) return <></>

    else if ( roundOutcome === RoundOutcomeState.WIN ) 
      return <Alert colorScheme="green">Nice! You earned {roundPoints} points!</Alert> 
    else if ( roundOutcome === RoundOutcomeState.LOSS ) 
      return <Alert colorScheme="red">Too bad!</Alert> 
  }

  return (
    <Center>
      <Stack gap={"15px"}>
        <SiteHeader />
        <GameHeader />
        <GameFormInput></GameFormInput>
        {
          fetchRoundOutcomeAlert()
        }
      </Stack>
    </Center>
  )
}

export default App
