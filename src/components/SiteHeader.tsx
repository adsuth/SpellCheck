import { Center, Flex, Text, Image, Stack, HStack, Box, Heading } from '@chakra-ui/react'
import React from 'react'
import LOGO_IMAGE from "../assets/spellcheck.png"

export default function SiteHeader() {
  return (
    <HStack height={"100px"}>
      <Image src={LOGO_IMAGE} height="25%"/>
      <Heading placeItems={"center"} fontSize="4xl" variant="site_header" textDecoration={"underline wavy red"}>
        SpellCheck
      </Heading>
    </HStack>
  )
}
