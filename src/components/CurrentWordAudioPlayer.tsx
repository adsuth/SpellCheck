import { Button } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { currentWordAtom, hasAudioPlayedOnceAtom, modalIsOpenAtom, roundOutcomeStateAtom, roundStartTimestampAtom, timerStateAtom } from '../atoms'
import { useAtom } from 'jotai'
import { formatWordContextForSpeech } from '../utils'
import { KEYBINDS } from '../declarations'
import { RoundOutcomeState, TimerState } from '../definitions'
import { IoMdVolumeHigh } from "react-icons/io";


export default function CurrentWordAudioPlayer() {
  const [ currentWord ] = useAtom( currentWordAtom )
  const [ roundStartTimestamp, setRoundStartTimestamp ] = useAtom( roundStartTimestampAtom )
  const [ roundOutcomeState ] = useAtom( roundOutcomeStateAtom )
  const [ isModalOpen, setIsModalOpen ]   = useAtom( modalIsOpenAtom )

  const [ timerState, setTimerState ] = useAtom( timerStateAtom )
  const [ audioPlaying, setAudioPlaying ] = useState( false )
  const [ hasAudioPlayedOnce, setHasAudioPlayedOnce ] = useAtom( hasAudioPlayedOnceAtom )
  const _playAudioButton = useRef( null )

  function handleKeyBinds( e: KeyboardEvent )
  {
    if ( isModalOpen ) return;
    if ( e.code === KEYBINDS["playAudio"].code )
    {
      e.preventDefault()
      const audioButton = _playAudioButton?.current as HTMLButtonElement | null
      if ( audioButton !== null ) audioButton.click()
    }
  }

  /** Handle round ending */
  useEffect( () => {
    if ( roundOutcomeState !== RoundOutcomeState.ONGOING ) return
    window.speechSynthesis.cancel()
    setAudioPlaying( false )
    setHasAudioPlayedOnce( false )
  }, [ roundOutcomeState ] )

  /** Handle Keybinds */
  useEffect( () => {
    window.removeEventListener( "keydown", handleKeyBinds )
    window.addEventListener( "keydown", handleKeyBinds )
  }, [ isModalOpen ] )

  function playAudio()
  {
    if ( audioPlaying ) return
    if ( roundOutcomeState !== RoundOutcomeState.ONGOING ) return

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
      <IoMdVolumeHigh/>
    </Button>
  )
}
