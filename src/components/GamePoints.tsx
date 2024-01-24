import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import { roundOutcomeStateAtom, roundPointsAtom, roundTimeAtom, totalPointsAtom } from '../atoms'
import { calculateRoundPoints } from '../utils'
import { Text } from '@chakra-ui/react'
import { RoundOutcomeState } from '../definitions'

export default function GamePoints() {
  const [ totalPoints, setTotalPoints ] = useAtom( totalPointsAtom )
  const [ , setRoundPoints ] = useAtom( roundPointsAtom )
  const [ roundOutcomeState ] = useAtom( roundOutcomeStateAtom )
  const [ timeLeft ] = useAtom( roundTimeAtom )
  
  useEffect( () => {
    if ( roundOutcomeState === RoundOutcomeState.ONGOING ) return
    if ( roundOutcomeState === RoundOutcomeState.LOSS ) return

    const newPoints = calculateRoundPoints( timeLeft )
    setRoundPoints( newPoints ) 
    setTotalPoints( totalPoints + newPoints )
  }, [ roundOutcomeState ] )
  
  return (
    <Text>
      {totalPoints} Points
    </Text>
  )
}
