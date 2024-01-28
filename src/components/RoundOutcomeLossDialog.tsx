import { Alert, Box, Card, Center, HStack, Text, VStack } from "@chakra-ui/react"
import { useAtom } from "jotai"
import React from 'react'
import { currentWordAtom, roundTimeAtom } from "../atoms"
import GameContinueButton from "./GameContinueButton"
import { isRoundTimeUp } from "../utils"
import GameRestartButton from "./GameRestartButton"

export default function RoundOutcomeLossDialog() {
  const [ currentWord ] = useAtom( currentWordAtom )
  const [ time ] = useAtom( roundTimeAtom )

  function getExtraSpellingsIfAny()
  {
    // ? there are no variations
    if ( ( currentWord?.variations?.length ?? -1 ) <= 0 ) return <></>

    const variations = currentWord?.variations?.join("").toString()

    return <>
      <Text fontSize={"small"} fontStyle={"italic"}>
        Alternative spellings include: 
      </Text>
      <Text fontSize={"small"} fontWeight={700}>
        {variations}
      </Text>
    </>

  }

  return (
    <Alert colorScheme="red" textAlign={"center"}>
      <VStack spacing={3} margin={"0 auto"}>
        <Text fontSize={"2xl"} fontWeight={600}>
          {
            isRoundTimeUp( time ) ?
            "Time Up!" :
            "That's not Quite Right!"
          }
        </Text> 
        
        <Box>
          <Text>
            The word was <b>{currentWord?.word}</b>
          </Text>
          <Text fontStyle={"italic"}>
            "{currentWord?.example}"
          </Text>
        </Box>
        
        <Box>
          {getExtraSpellingsIfAny()}
        </Box>
        
        <Center>
          <HStack spacing={3}>
            <GameContinueButton/>
            <GameRestartButton/>
          </HStack>
        </Center>

      </VStack>
    </Alert>
  )
}
