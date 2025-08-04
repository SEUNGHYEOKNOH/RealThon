import { Flex, Box, useBreakpointValue } from '@chakra-ui/react';

export default function Main() {
  return (
    <Flex
      direction={useBreakpointValue({ base: 'column', md: 'row' })}
      align="center"
      justify="space-between"
    >
      <Box p={4} bg="gray.100" borderRadius="md">
        Box 1
      </Box>
      <Box p={4} bg="gray.100" borderRadius="md">
        Box 2
      </Box>
    </Flex>
  )
}