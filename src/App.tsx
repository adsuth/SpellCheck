import { Alert, Center, Stack } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { useEffect } from "react"
import { allWordsAtom, currentWordAtom, gameStateAtom, gameTotalRoundCountAtom, gameWordsAtom, roundNumberAtom, roundOutcomeStateAtom } from "./atoms"
import GameHeader from "./components/GameHeader"
import GameBody from "./components/GameBody"
import SiteHeader from "./components/SiteHeader"
import { GameState, RoundOutcomeState } from "./definitions"
import { randomSample } from "./utils"
import { TOTAL_ROUND_COUNT } from "./declarations"


function App() 
{
  const [ gameState, setGameState ] = useAtom( gameStateAtom )
  const [ gameWords, setGameWords ] = useAtom( gameWordsAtom )
  const [ allWords, setAllWords ] = useAtom( allWordsAtom )
  const [ roundOutcomeState ] = useAtom( roundOutcomeStateAtom )
  const [ currentWord, setCurrentWord ] = useAtom( currentWordAtom )
  const [ totalRoundCount, setTotalRoundCount ] = useAtom( gameTotalRoundCountAtom )
  const [ roundNumber ] = useAtom( roundNumberAtom )

  // todo: fetch words from file, store in atom
  useEffect( () => { 
    const dummyWords = [
      { word: "loose", context: "a loose thread" },
      { word: "concede", context: "to concede defeat" },
      { word: "idolize", variations: ["idolise"], context: "children idolise their heroes" },
    ]
    setAllWords( dummyWords )
  }, [] )

  // ! - error handle for getting words
  useEffect( () => {
    if ( allWords === null ) return console.error( "Could not load words..." )
    const newTotalRoundCount = ( allWords.length < TOTAL_ROUND_COUNT ) ? allWords.length : TOTAL_ROUND_COUNT 
    setTotalRoundCount( newTotalRoundCount )
    setGameWords( randomSample( allWords, newTotalRoundCount ) )
  }, [ allWords ] )

  // get new word upon new round
  useEffect( () => {
    if ( roundOutcomeState !== RoundOutcomeState.ONGOING ) return
    if ( gameWords.length === 0 ) return

    console.log( {roundNumber, gameWords} )

    setCurrentWord( gameWords[ roundNumber ] )
  }, [ roundOutcomeState, gameWords ] )

  return (
    <Center>
      <Stack gap={"15px"}>
        <SiteHeader />
        <GameHeader />
        <GameBody />
        <Alert colorScheme="orange">
          Testing: word is "{currentWord?.word}"
        </Alert>
      </Stack>
    </Center>
  )
}

export default App
