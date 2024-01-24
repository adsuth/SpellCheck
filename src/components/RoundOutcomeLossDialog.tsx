import { Alert, Box, Card, Center } from "@chakra-ui/react"
import { useAtom } from "jotai"
import React from 'react'
import { currentWordAtom } from "../atoms"
import GameContinueButton from "./GameContinueButton"

export default function RoundOutcomeLossDialog() {
  const [ currentWord ] = useAtom( currentWordAtom )

  return (
    <Alert colorScheme="red">
      <Box>
        Too Bad! <br/>
        The word was {currentWord?.word}; as in {currentWord?.context}.<br/><br/>
        {
          ( ( currentWord?.variations?.length ?? -1 ) > 0 ) 
          ? "Alternative spellings include: " + currentWord?.variations?.join("").toString()
          : ""
        }
        
        <Center>
          <GameContinueButton/>
        </Center>
      </Box>
    </Alert>
  )
}
