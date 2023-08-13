import { useState, useRef } from 'react';
import { NumberInput, Group, ActionIcon, NumberInputHandlers, rem } from '@mantine/core';
import { makeStyles } from '@mui/material';

function MantineNumberInput({ value, setValue }) {
  const handlers = useRef(0);

  return (
    <Group spacing={0}>
      <div className='flex'>
        <ActionIcon className='dark:border-slate-300/30 text-slate-300 transition-all duration-300' size={42} variant="default" onClick={() => handlers.current.decrement()}>
            –
        </ActionIcon>

        <NumberInput
            hideControls
            value={value}
            onChange={(val) => setValue(val)}
            handlersRef={handlers}
            max={10}
            min={0}
            step={1}
            styles={{ input: { width: rem(54), textAlign: 'center' } }}
            className='transition-all duration-300'
        />

        <ActionIcon className='dark:border-slate-300/30 text-slate-300 transition-all duration-300' size={42} variant="default" onClick={() => handlers.current.increment()}>
            +
        </ActionIcon>
      </div>
    </Group>
  );
}

export default MantineNumberInput;