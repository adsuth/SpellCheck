import { Center, Container, Divider, Flex } from '@chakra-ui/react';
import RoundTimer from './RoundTimer';
import RoundCount from './RoundCount';
import GamePoints from './GamePoints';


export default function GameHeader() {

  return (
    <Flex justifyContent={"space-between"} height={"50px"}>
      <Center>
        <Container>
          <RoundCount />
        </Container>
      </Center>

      <Center >
        <Divider orientation='vertical' />
      </Center>

      <Center>
        <Container>
          <RoundTimer />
        </Container>
      </Center>

      <Center>
        <Divider orientation='vertical' />
      </Center>

      <Center>
        <Container>
          <GamePoints></GamePoints>
        </Container>
      </Center>

    </Flex>
  );
}
