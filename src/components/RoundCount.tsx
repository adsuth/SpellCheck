import React, { useEffect } from 'react'
import { Text } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { currentWordAtom, gameTotalRoundCountAtom, roundNumberAtom, roundOutcomeStateAtom } from '../atoms';
import { RoundOutcomeState } from "../definitions";

export default function RoundCount() {
  const [ roundNumber, setRoundNumber ] = useAtom( roundNumberAtom )
  const [ totalRoundCount ]             = useAtom( gameTotalRoundCountAtom )
  const [ roundOutcomeState ]           = useAtom( roundOutcomeStateAtom )

  /** Handle word changes */
  useEffect( () => {
    if ( roundOutcomeState === RoundOutcomeState.ONGOING ) return
    setRoundNumber( roundNumber + 1 )
  }, [ roundOutcomeState ] )

  return (
    <Text>
      {roundNumber} of {totalRoundCount}
    </Text>
  )
}
