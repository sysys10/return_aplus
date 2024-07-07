'use client'
import { useState, useEffect, FormEvent, memo } from 'react';
import './globals.css';
import { motion } from 'framer-motion';
import AddModal from '@/components/ui/addModal';
import formatDateString from '@/utils/formatDateString';
import MemoryModals from '@/components/ui/MemoryModals';
import Select from '@/components/select'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import CoreModals from '@/components/ui/CoreModals';
import Banner from '@/components/ui/banner';
interface Memory {
  _id: string;
  text: string;
  color: string;
  date: string;
}

interface Modal {
  color: string;
  isOpen: boolean;
}

export default function Home() {
  const router = useRouter()
  const [memories, setMemories] = useState<Memory[]>([]);
  const [modal, setModal] = useState<Modal>({ color: '', isOpen: false });
  const [selectMemory, setSelectMemory] = useState<Memory | null>(null);
  const [input, setInput] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [corememories, setCorememories] = useState<Memory[]>([])
  const [selectCoremomory, setSelectCorememory] = useState<Memory | null>(null);
  const [coreModalOpen, setCoreModalOpen] = useState<boolean>(false)
  useEffect(() => {
    fetchMemories()
    fetchCorememories()
  }, [])

  const fetchMemories = async () => {
    const response = await fetch('/api/memories')
    const data = await response.json()
    setMemories(data)
  }
  const fetchCorememories = async () => {
    const res = await fetch('/api/corememories')
    const data = await res.json()
    setCorememories(data);
  }

  const handleMemorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const date = formatDateString(new Date().toISOString());
    try {
      const res = await fetch('/api/memories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: input, date: date, color: modal.color })
      })
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'POST 실패')
      }

      setInput('');
      setModal({ color: '', isOpen: false });
      fetchMemories();
      router.refresh();
    } catch (error) {
      console.error("POST 실패", error)
    }
  };
  const deleteMemory = async (id: string) => {
    const response = await fetch(`/api/memories?id=${id}`, {
      method: 'DELETE',
    })
    if (response.ok) {
      fetchMemories()
      router.refresh()
    }
  }

  const deleteCore = async (id: string) => {
    const res = await fetch(`/api/corememories?id=${id}`, {
      method: 'DELETE'
    })
    if (res.ok) {
      fetchCorememories()
      router.refresh()
    }
  }

  const handleCorememories = async () => {
    console.log(selectMemory)
    setIsOpen(false);
    if (corememories.length === 5) {
      alert("핵심기억은 5개까지 등록 가능합니다.")
    } else {
      const response = await fetch('/api/corememories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: selectMemory?.text, date: selectMemory?.date, color: selectMemory?.color, _id: selectMemory?._id }),
      });
      if (!response.ok) {
        throw new Error('Failed to add');
      }
      fetchCorememories();
      router.refresh()
    }
  }



  const onButtonClick = (color: string) => {
    setModal({ color, isOpen: true });
  };

  const onMemoryClick = (memory: Memory) => {
    setSelectMemory(memory);
    setIsOpen(true);
  };
  const onCoreMemoryClick = (CoreMemory: Memory) => {
    setSelectCorememory(CoreMemory);
    setCoreModalOpen(true);
  }
  let CoreColor: string[] = [];
  for (let i = corememories.length - 1; i >= 0; i--) {
    let temp: string;
    if (corememories[i].color === 'red') temp = "#FFCEFF";
    else if (corememories[i].color === 'yellow') temp = "#FFFFD1";
    else if (corememories[i].color === 'blue') temp = "#ADCDFF";
    else if (corememories[i].color === 'purple') temp = "#D6BBFF";
    else temp = "#C9E7DB";

    CoreColor.push(`${temp}`);
  }
  const Corebg = CoreColor.join(', ');
  return (
    <main className={`h-full w-full mb-40`}>
      <Banner Corebg={Corebg}/>
      <div className='max-w-[1280px] w-full mx-auto relative pt-[230px]'>
        <motion.h1 className="w-full text-center text-2xl md:text-4xl font-pretendard text-black font-bold">
          당신의 기억을 보관하세요
        </motion.h1>
        <Select onButtonClick={onButtonClick} />
        {corememories && (<div className='w-full'>
          <h2 className='font-pretendard font-semibold text-3xl ml-4 mt-24'>핵심기억 보관함</h2>
          <div className='w-full mt-4'>
            <div className='flex w-full max-w-[1000px] h-64 flex-wrap mx-auto pt-12'>
              {corememories.slice().reverse().map((corememory, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 12,
                      duration: 0.6
                    }
                  }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }} key={` corememory-${idx}`} className='flex mx-auto flex-col items-center'>
                  <button onClick={() => { onCoreMemoryClick(corememory) }} className={`memory_${corememory.color} w-24 h-24 md:w-32 md:h-32 rounded-full`}></button>
                  <p className='mobile:text-base text-sm whitespace-nowrap'>{corememory?.date}</p>
                </motion.div>))}
            </div>
          </div>
        </div>)
        }<div>
          <h2 className='text-3xl font-pretendard font-semibold mt-24 ml-4'>기억 보관함</h2>
          <div className='max-w-[1000px] flex-wrap gap-5 mx-auto mt-10 w-full flex'>
            {memories.slice().reverse().map((value, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 12,
                    duration: 0.6
                  }
                }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                key={`value-${index}`}
                className=' flex flex-col mx-auto items-center'
              >
                <button onClick={() => { onMemoryClick(value) }} className={`memory_${value.color}  w-24 h-24 md:w-32 md:h-32  rounded-full`}></button>
                <p className='mobile:text-base text-sm'>{value.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <CoreModals coreModalOpen={coreModalOpen} setCoreModalOpen={setCoreModalOpen} deleteCore={deleteCore} selectCoremomory={selectCoremomory} />
        <MemoryModals isOpen={isOpen} setIsOpen={setIsOpen} selectMemory={selectMemory} deleteMemory={deleteMemory} handleCorememories={handleCorememories} />
        <AddModal modal={modal} setModal={setModal} input={input} setInput={setInput} handleMemorySubmit={handleMemorySubmit} />
      </div>
    </main>
  );
}
