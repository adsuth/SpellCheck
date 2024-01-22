import { Center, FormControl, FormErrorMessage, HStack, Stack} from "@chakra-ui/react"

import { Button, FormLabel, Input, Flex, Divider } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import CurrentWordAudioPlayer from "./CurrentWordAudioPlayer";
import { useAtom } from "jotai";
import { currentWordAtom, roundNumberAtom, roundOutcomeStateAtom as roundOutcomeStateAtom } from "../atoms";
import { compareStrings, wasUserCorrect } from "../utils";
import { RoundOutcomeState } from "../definitions";


export default function GameFormInput() {
  const [currentInput, setCurrentInput] = useState("");
  const [currentWord, setCurrentWord]   = useAtom(currentWordAtom);
  const [roundNumber, setRoundNumber]   = useAtom(roundNumberAtom);
  const [roundOutcomeState, setRoundOutcomeState ]  = useAtom(roundOutcomeStateAtom);

  const _inputRef = useRef( null )

  
  function fetchNewWord() {
    setCurrentWord({ word: "among", context: "they were among us" });
  }

  function onAnswerSubmit() {
    if (currentWord === null) return;
    
    // todo: check the variations list if it exists
    // todo: store if user was correct or not in state
    
    setCurrentInput("");
    let outcomeState = RoundOutcomeState.LOSS

    if ( wasUserCorrect( currentInput, currentWord ) )
      outcomeState = RoundOutcomeState.WIN
    
    setRoundOutcomeState( outcomeState )
    fetchNewWord();
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
            <CurrentWordAudioPlayer _inputRef={_inputRef} />
          </Center>
        </Flex>
      </Center>

      <Flex>
        <Input
          ref={_inputRef}
          type="text"
          placeholder="Spell it..."
          value={currentInput}
          onChange={e => setCurrentInput(e.target.value)}
          onKeyDown={e => onInputEnterKey(e.key)}
        />

        <Button
          type="submit"
          colorScheme="red"
          onClick={onAnswerSubmit}
          isDisabled={currentInput === ""}
        >
          Submit
        </Button>
      </Flex>
    </Stack>
  );
}
