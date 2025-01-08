import { Modal, Text, Center, useDisclosure, ModalCloseButton, ModalOverlay, ModalContent, ModalBody, ModalFooter, Button, Checkbox, Flex, ModalHeader, Link } from "@chakra-ui/react"
import { useAtom } from "jotai"
import React, { useEffect, useRef, useState } from 'react'
import { localStorageAtom, modalIsOpenAtom } from "../atoms"

export default function FirstTimeInfoModal() {
  const [ storage, setStorage ] = useAtom( localStorageAtom )
  const [ isOpen, setIsOpen ]   = useAtom( modalIsOpenAtom )
  const [ hasSettingRetrieved, setHasRetrieved ] = useState( false ) 
  const { onClose } = useDisclosure()

  const _dontShowAgainRef = useRef( null )
  
  useEffect( () => {
    if ( hasSettingRetrieved ) return
    if ( storage === null ) return
    
    setIsOpen( storage.shouldShowFirstTimeStartupDialog )
    setHasRetrieved( true )
  }, [ storage ] )

  function closeModal()
  {
    const dontShowAgainCheckbox = _dontShowAgainRef?.current as HTMLInputElement | null
    if ( dontShowAgainCheckbox === null ) return

    const shouldShowFirstTimeStartupDialog = !dontShowAgainCheckbox.checked
    
    setIsOpen( false )
    setStorage( { ...storage, shouldShowFirstTimeStartupDialog } )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton onClick={ closeModal } />

        <ModalHeader>
          <Center>
            <Text>
              Welcome to SpellCheck!
            </Text>
          </Center>
        </ModalHeader>

        <ModalBody>
          <Text textAlign={"center"}>
            <b>SpellCheck</b> is a take on <Link color="red" href="https://www.merriam-webster.com/games/spell-it">Merriam-Webster's Spell It</Link> game.
            This project was created by me, Adsuth. <br />
            Check my <Link href="https://github.com/adsuth/SpellCheck" color="red">GitHub</Link> here!
          </Text>
          <br />
          <Text textAlign={"center"}>
            Hear a word and spell it correctly. <br />
            The faster you spell it, <b>the more points you'll get.</b> <br /> <br />
            <i>Remember: accuracy and speed is the game here.</i>
          </Text>
          <br />
          <Checkbox ref={_dontShowAgainRef} colorScheme="red">
            Don't Show This Again
          </Checkbox>
        </ModalBody>

        <ModalFooter>
          <Center>
            <Button colorScheme="red" onClick={ closeModal }>Okay</Button>
          </Center>
        </ModalFooter>
        
      </ModalContent>
    </Modal>
  )
}
