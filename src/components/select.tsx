import { motion } from 'framer-motion'
import React from 'react'
type selectProps = {
  onButtonClick:(color: string) => void
}

const Select = ({ onButtonClick }:selectProps ) => {
  return (
    <div className='w-full h-fit flex flex-col font-pretendard'>
      <h2 className='text-xl md:text-3xl font-pretendard mt-[200px] font-semibold ml-4'>당신은 오늘 어떤 기분이신가요?</h2>
      <div className='max-w-[1000px] mx-auto mt-10 w-full flex flex-wrap justify-center md:gap-16 gap-6'>
        <motion.div className='flex flex-col items-center' whileHover={{ scale: 1.1 }}>
          <button onClick={() => onButtonClick('yellow')} className='memory_yellow w-24 h-24 md:w-32 md:h-32 rounded-full'></button>
          <p className='font-semibold mt-2'>기쁨</p>
        </motion.div>
        <motion.div className='flex flex-col items-center' whileHover={{ scale: 1.1 }}>
          <button onClick={() => onButtonClick('red')} className='memory_red w-24 h-24 md:w-32 md:h-32 rounded-full'></button>
          <p className='font-semibold mt-2'>분노</p>
        </motion.div>
        <motion.div className='flex flex-col items-center' whileHover={{ scale: 1.1 }}>
          <button onClick={() => onButtonClick('blue')} className='memory_blue w-24 h-24 md:w-32 md:h-32 rounded-full'></button>
          <p className='font-semibold mt-2'>슬픔</p>
        </motion.div>
        <motion.div className='flex flex-col items-center' whileHover={{ scale: 1.1 }}>
          <button onClick={() => onButtonClick('green')} className='memory_green w-24 h-24 md:w-32 md:h-32 rounded-full'></button>
          <p className='font-semibold mt-2'>예민</p>
        </motion.div>
        <motion.div className='flex flex-col items-center' whileHover={{ scale: 1.1 }}>
          <button onClick={() => onButtonClick('purple')} className='memory_purple w-24 h-24 md:w-32 md:h-32 rounded-full'></button>
          <p className='font-semibold mt-2'>걱정</p>
        </motion.div>
      </div>
    </div>
  )
}

export default Select