import { Box, Text, Center } from '@mantine/core';
import { mdiCheck, mdiClose } from '@mdi/js';
import Icon from '@mdi/react';

export default function PasswordRequirement({ meets, label }) {
  return (
    <Text component="div" c={meets ? 'teal' : 'red'} size="sm" dir="rtl">
      <Center inline>
        {meets ? (
          <Icon path={mdiCheck} size={0.65} />
        ) : (
          <Icon path={mdiClose} size={0.65} />
        )}
        <Box>{label}</Box>
      </Center>
    </Text>
  );
}
