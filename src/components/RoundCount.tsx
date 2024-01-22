import React, { useEffect } from 'react'
import { Text } from '@chakra-ui/react';
import { TOTAL_ROUND_COUNT } from '../declarations';
import { useAtom } from 'jotai';
import { currentWordAtom, roundNumberAtom } from '../atoms';

export default function RoundCount() {
  const [ roundNumber, setRoundNumber ] = useAtom( roundNumberAtom )
  const [ currentWord, setCurrentWord ] = useAtom( currentWordAtom )

  /** Handle word changes */
  useEffect( () => {
    if ( currentWord === null ) return
    setRoundNumber( roundNumber + 1 )
  }, [ currentWord ] )

  return (
    <Text>
      {roundNumber} of {TOTAL_ROUND_COUNT}
    </Text>
  )
}
