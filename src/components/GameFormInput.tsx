import { Center, FormControl, FormErrorMessage, HStack, Stack} from "@chakra-ui/react"

import { Button, FormLabel, Input, Flex, Divider } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import CurrentWordAudioPlayer from "./CurrentWordAudioPlayer";
import { useAtom } from "jotai";
import { allWordsAtom, currentWordAtom, hasAudioPlayedOnceAtom, roundNumberAtom, roundOutcomeStateAtom as roundOutcomeStateAtom } from "../atoms";
import { compareStrings, randomSample, wasUserCorrect } from "../utils";
import { RoundOutcomeState } from "../definitions";


export default function GameFormInput() {
  const [ currentInput, setCurrentInput ] = useState("");
  
  const [ allWords ]   = useAtom(allWordsAtom);
  const [ currentWord, setCurrentWord ]   = useAtom(currentWordAtom);
  const [ roundOutcomeState, setRoundOutcomeState  ]  = useAtom(roundOutcomeStateAtom);
  const [ hasAudioPlayedOnce ] = useAtom( hasAudioPlayedOnceAtom )

  const _inputRef = useRef( null )

  // guarantees focus on the input when enabled
  useEffect( () => {
    if ( !hasAudioPlayedOnce ) return
    _inputRef?.current.focus()
  }, [ hasAudioPlayedOnce ] )

  function onAnswerSubmit() {
    if (currentWord === null) return;
    
    // todo: check the variations list if it exists
    // todo: store if user was correct or not in state
    
    setCurrentInput("");
    let outcomeState = RoundOutcomeState.LOSS

    if ( wasUserCorrect( currentInput, currentWord ) )
      outcomeState = RoundOutcomeState.WIN
    
    setRoundOutcomeState( outcomeState )
  }

  function onInputEnterKey(key: string) {
    if (key !== "Enter") return;
    onAnswerSubmit();
  }

  return (
    <Stack gap={"10px"}>
      <Center>
        <Flex>
          <Center>
            Hear it
          </Center>

          <Center width={"50px"}>
            <Divider orientation='vertical' />
          </Center>

          <Center>
            <CurrentWordAudioPlayer/>
          </Center>
        </Flex>
      </Center>

      <HStack spacing={3}>
        <Input
          ref={_inputRef}
          type="text"
          placeholder="Spell it..."
          value={currentInput}
          onChange={e => setCurrentInput(e.target.value)}
          onKeyDown={e => onInputEnterKey(e.key)}
          isDisabled={!hasAudioPlayedOnce}
        />

        <Button
          type="submit"
          colorScheme="red"
          onClick={onAnswerSubmit}
          isDisabled={currentInput === ""}
        >
          Submit
        </Button>
      </HStack>
    </Stack>
  );
}
