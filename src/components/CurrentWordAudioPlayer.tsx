import { Button } from '@chakra-ui/react'
import React, { MutableRefObject, ReactNode, useEffect, useRef, useState } from 'react'
import { currentWordAtom, hasAudioPlayedOnceAtom, roundOutcomeStateAtom, roundStartTimestampAtom, timerStateAtom } from '../atoms'
import { useAtom } from 'jotai'
import { formatWordContextForSpeech } from '../utils'
import { KEYBINDS } from '../declarations'
import { useTimerReset } from '../contexts/RoundTimerContext'
import { RoundOutcomeState, TimerState } from '../definitions'


export default function CurrentWordAudioPlayer() {
  const [ currentWord ] = useAtom( currentWordAtom )
  const [ roundStartTimestamp, setRoundStartTimestamp ] = useAtom( roundStartTimestampAtom )
  const [ roundOutcomeState ] = useAtom( roundOutcomeStateAtom )

  const [ timerState, setTimerState ] = useAtom( timerStateAtom )
  const [ audioPlaying, setAudioPlaying ] = useState( false )
  const [ hasAudioPlayedOnce, setHasAudioPlayedOnce ] = useAtom( hasAudioPlayedOnceAtom )
  const _playAudioButton = useRef( null )

  /** Handle round ending */
  useEffect( () => {
    if ( roundOutcomeState !== RoundOutcomeState.ONGOING ) return
    window.speechSynthesis.cancel()
    setAudioPlaying( false )
    setHasAudioPlayedOnce( false )
  }, [ roundOutcomeState ] )

  /** Handle Keybinds */
  useEffect( () => {
    window.addEventListener( "keydown", e => {
      if ( e.code === KEYBINDS.playAudio )
      {
        e.preventDefault()
        _playAudioButton?.current?.click()
      }
    } )
  }, [] )

  function playAudio()
  {
    if ( audioPlaying ) return

    setHasAudioPlayedOnce( true )

    const utterThis = new SpeechSynthesisUtterance( formatWordContextForSpeech( currentWord ) )
    utterThis.addEventListener( "end", () => {
      setAudioPlaying( false )
    } )
    
    setRoundStartTimestamp( new Date().getTime() )
    setTimerState( TimerState.STARTED )
    setAudioPlaying( true )
    window.speechSynthesis.speak( utterThis )
  }

  function handleButtonClick() {
    playAudio()
  }

  return (
    <Button ref={_playAudioButton} onClick={handleButtonClick} isLoading={audioPlaying}>
      🔊
    </Button>
  )
}
