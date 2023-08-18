import { useState, useRef, useEffect } from 'react';
import { NumberInput, Group, ActionIcon, NumberInputHandlers, rem } from '@mantine/core';
import { makeStyles } from '@mui/material';

function MantineNumberInput({ value, setValue, adult, oppValue }) {
  const handlers = useRef(0);
  let min = 0;

  const [max, setMax] = useState(9);

  if (adult) {
    min = 1;
  }

  useEffect(() => {
    if (oppValue) {
        setMax(9 - oppValue);
        console.log(max)
    }
  }, [value, oppValue]);
 
  return (
    <Group spacing={5}>
      <div className='flex'>
        <ActionIcon className={`dark:border-slate-300/30 text-slate-300 transition-all duration-100 ${value == min ? 'bg-slate-100/20 scale-0 active:translate-y-0 hover:bg-slate-100/20 duration-300' : ''}`} size={42} variant="default" onClick={() => handlers.current.decrement()}>
            –
        </ActionIcon>

        <NumberInput
            size={42}

            hideControls
            value={value}
            onChange={setValue}
            handlersRef={handlers}
            max={max}
            min={min}
            step={1}
            styles={{ input: { width: rem(54), textAlign: 'center', fontSize: '1rem' } }}
            className='transition-all duration-300 text-sm'
            classNames={
              {input: 'dark:bg-[#202124]'}
            }
        />

        <ActionIcon className={`dark:border-slate-300/30 text-slate-300 transition-all duration-300 ${value == max ? 'bg-slate-100/20 scale-0 active:translate-y-0 hover:bg-slate-100/20 duration-300' : ''}`} size={42} variant="default" onClick={() => handlers.current.increment()}>
            +
        </ActionIcon>
      </div>
    </Group>
  );
}

export default MantineNumberInput;