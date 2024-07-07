'use client';
import React from 'react';
import Modal from 'react-modal';
import '@/styles/modal.css';

interface ModalInter {
  color: string;
  isOpen: boolean;
}

type AddModalProps = {
  modal: ModalInter|null;
  setModal: (modal: ModalInter) => void;
  handleMemorySubmit: any;
  input: string;
  setInput: any;
}

const emotions = {
  "red": {
    title: "🔥 분노 🔥",
    message: "이런, 오늘 화나는 일이 있으셨군요?",
    bgColor: "#FF8E8E",
    textColor: "#C76464"
  },
  "yellow": {
    title: "☀ 기쁨 ☀",
    message: "당신은 웃음이 잘 어울리는 사람이에요!",
    bgColor: "#FFA655",
    textColor: "#FFA655"
  },
  "green": {
    title: "💢 예민 💢",
    message: "약간 까칠해지는 날이에요...",
    bgColor: "#2FA758",
    textColor: "#2FA758"
  },
  "blue": {
    title: "☔ 슬픔 ☔",
    message: "슬픈 날.... 훌훌 털어내죠~",
    bgColor: "#4044A0",
    textColor: "#4044A0"
  },
  "purple": {
    title: "🌧️ 걱정️ 🌧️",
    message: "걱정되는 일이 있으신가요? 잘 해결해보죠!",
    bgColor: "#C564C7",
    textColor: "#C564C7"
  }
};

const AddModal = ({ modal, setModal, handleMemorySubmit, input, setInput }: AddModalProps) => {
  if (!modal || !modal.color) {
    return null; 
  }

  const emotion = emotions[modal.color as keyof typeof emotions];

  if (!emotion) {
    return null; 
  }

  return (
    <Modal
      isOpen={modal.isOpen}
      onRequestClose={() => setModal({ color: '', isOpen: false })}
      overlayClassName="custom-overlay"
      className={`custom-modal bg-${modal.color}-500 md:w-full w-10/12 h-80 md:h-full`}
      ariaHideApp={false}
      style={{
        content: {
          top: "48%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          maxWidth: 600,
          maxHeight: 400,
          zIndex: 20,
          borderRadius: 8,
        }
      }}
    >
      <form onSubmit={handleMemorySubmit} className={`w-full h-full items-center bg-white rounded-lg flex flex-col`}>
        <h2 className={`mt-16 text-3xl md:text-5xl font-hakgyo font-semibold md:font-bold text-[${emotion.textColor}]`}>{emotion.title}</h2>
        <p className='mt-6 text-lg md:text-2xl font-pretendard font-semibold'>{emotion.message}</p>
        <input 
          type='text' 
          name='emotion' 
          onChange={(e) => setInput(e.currentTarget.value)} 
          value={input} 
          autoFocus 
          placeholder='어떤 일이 있었는지 말해주세요 :)' 
          className='w-[80%] h-[45px] md:h-[60px] mt-12 outline-none text-lg md:text-xl bg-gray-100 rounded-xl placeholder:pl-2' 
        />
        <input 
          type='submit' 
          className={`text-lg md:text-2xl mt-4 md:mt-8 w-32 md:w-40 h-9 font-semibold text-white rounded-lg bg-[${emotion.bgColor}]`} 
          value="등록하기" 
        />
      </form>
    </Modal>
  );
}

export default AddModal;