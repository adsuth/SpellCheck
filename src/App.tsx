import { Alert, Center, Slide, SlideFade, Stack, VStack } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import { allWordsAtom, currentWordAtom, gameStateAtom, gameTotalRoundCountAtom, gameWordsAtom, localStorageAtom, roundNumberAtom, roundOutcomeStateAtom, totalPointsAtom } from "./atoms"
import GameHeader from "./components/GameHeader"
import GameBody from "./components/GameBody"
import SiteHeader from "./components/SiteHeader"
import { GameState, RoundOutcomeState } from "./definitions"
import { randomSample } from "./utils"
import { DEFAULT_LOCAL_STORAGE, TOTAL_ROUND_COUNT } from "./declarations"
import ALL_WORDS from "./assets/words.json"
import FirstTimeInfoModal from "./components/FirstTimeInfoModal"

function App() 
{
  const [ gameState, setGameState ] = useAtom( gameStateAtom )
  const [ gameWords, setGameWords ] = useAtom( gameWordsAtom )
  const [ allWords, setAllWords ] = useAtom( allWordsAtom )
  const [ roundOutcomeState, setRoundOutcomeState ] = useAtom( roundOutcomeStateAtom )
  const [ currentWord, setCurrentWord ] = useAtom( currentWordAtom )
  const [ totalRoundCount, setTotalRoundCount ] = useAtom( gameTotalRoundCountAtom )

  const [ roundNumber, setRoundNumber ] = useAtom( roundNumberAtom )
  const [ totalPoints, setTotalPoints ] = useAtom( totalPointsAtom )
  const [ storage, setStorage ]         = useAtom( localStorageAtom )

  useEffect( () => {
    if ( storage === null ) return
    localStorage.setItem( "storage", JSON.stringify( storage ) )
  }, [ storage ] )

  // todo: fetch words from file, store in atom
  useEffect( () => { 
    setAllWords( ALL_WORDS )

    localStorage.clear() // ! - for testing!!
    const storageJsonString = localStorage.getItem( "storage" )
    setStorage( storageJsonString !== null ? JSON.parse( storageJsonString ) : DEFAULT_LOCAL_STORAGE )
  }, [] )

  // ! - error handle for getting words
  useEffect( () => {
    if ( allWords === null ) return console.error( "Could not load words..." )
    if ( gameState === GameState.ENDED ) return

    const newTotalRoundCount = ( allWords.length < TOTAL_ROUND_COUNT ) ? allWords.length : TOTAL_ROUND_COUNT 
    setTotalRoundCount( newTotalRoundCount )
    setGameWords( randomSample( allWords, newTotalRoundCount ) )

  }, [ allWords, gameState ] )

  // handle new game generation
  useEffect( () => {
    console.log( {gameState, roundOutcomeState, gameWords, allWords} )
    if ( gameState !== GameState.NEW ) return
    
    // resets
    setRoundNumber( 0 )
    setTotalPoints( 0 )
    setRoundOutcomeState( RoundOutcomeState.ONGOING )
    setGameState( GameState.ONGOING )

  }, [ gameState ] )

  // get new word upon new round
  useEffect( () => {
    if ( gameState === GameState.ENDED ) return
    if ( roundOutcomeState !== RoundOutcomeState.ONGOING ) return
    if ( gameWords.length === 0 ) return

    setCurrentWord( gameWords[ roundNumber ] )
  }, [ gameState, roundOutcomeState, gameWords ] )

  return (
    <Center>
      <VStack spacing={1}>
        <FirstTimeInfoModal />
        
        <SiteHeader />
        <GameHeader />
        <GameBody />
        <Alert colorScheme="orange">
          Testing: word is "{currentWord?.word}"
        </Alert>

      </VStack>
    </Center>
  )
}

export default App
