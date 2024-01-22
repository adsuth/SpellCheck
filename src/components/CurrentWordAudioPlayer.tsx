import { Button } from '@chakra-ui/react'
import React, { MutableRefObject, ReactNode, useEffect, useRef, useState } from 'react'
import { currentWordAtom, timerStateAtom } from '../atoms'
import { useAtom } from 'jotai'
import { formatWordContextForSpeech } from '../utils'
import { KEYBINDS } from '../declarations'
import { useTimerReset } from '../contexts/RoundTimerContext'
import { TimerState } from '../definitions'

interface Props {
  _inputRef: ReactNode | React.MutableRefObject<ReactNode>
}

export default function CurrentWordAudioPlayer( { _inputRef }: Props ) {
  const [ currentWord ]                       = useAtom( currentWordAtom )

  const [ timerState, setTimerState ] = useAtom( timerStateAtom )
  const [ audioPlaying, setAudioPlaying ] = useState( false )
  const _playAudioButton = useRef( null )

  /** Handle word changes */
  useEffect( () => {
    if ( currentWord === null ) return
    window.speechSynthesis.cancel()
    setAudioPlaying( false )
  }, [ currentWord ] )

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

    _inputRef?.current?.focus()

    const utterThis = new SpeechSynthesisUtterance( formatWordContextForSpeech( currentWord ) )
    utterThis.addEventListener( "end", () => {
      setAudioPlaying( false )
    } )
    
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
