'use client';
import React from 'react';
import Modal from 'react-modal';
import '@/styles/modal.css';
import formatDateString from '@/utils/formatDateString'

interface Memory {
    _id: string;
    text: string;
    color: string;
    date: string;
}

type MemoryModalProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    selectMemory: Memory | null;
    deleteMemory: (id: string) => Promise<void>;
    handleCorememories: (selectedMemory: Memory) => Promise<any>;
}

const getColorClass = (color: string) => {
    switch (color) {
        case "red":
            return {
                bgColor: "bg-[#FF8E8E]",
                hoverColor: "hover:bg-[rgba(255,120,120,1)]",
                textColor: "text-[#C76464]",
                emotion: "🔥 분노 🔥"
            };
        case "yellow":
            return {
                bgColor: "bg-[#FFA655]",
                hoverColor: "hover:bg-[rgba(255,186,115,1)]",
                textColor: "text-[#FFA655]",
                emotion: "☀ 기쁨 ☀"
            };
        case "green":
            return {
                bgColor: "bg-[#2FA758]",
                hoverColor: "hover:bg-[rgba(67,197,108,1)]",
                textColor: "text-[#2FA758]",
                emotion: "💢 예민 💢"
            };
        case "blue":
            return {
                bgColor: "bg-[#4044A0]",
                hoverColor: "hover:bg-[rgba(94,98,190,1)]",
                textColor: "text-[#4044A0]",
                emotion: "☔ 슬픔 ☔"
            };
        case "purple":
        default:
            return {
                bgColor: "bg-[#C564C7]",
                hoverColor: "hover:bg-[rgba(217,130,219,1)]",
                textColor: "text-[#C564C7]",
                emotion: "🌧️ 걱정 🌧️"
            };
    }
};

const MemoryModal = ({ isOpen, setIsOpen, selectMemory, deleteMemory, handleCorememories }: MemoryModalProps) => {
    if (!selectMemory) return null;

    const { bgColor, hoverColor, textColor, emotion } = getColorClass(selectMemory.color);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            overlayClassName="custom-overlay"
            className="custom-modal md:w-[600px] md:h-[400px] w-10/12 h-[320px]"
            ariaHideApp={false}
            style={{
                content: {
                    top: "48%",
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    marginRight: "-50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 20,
                    borderRadius: 8,
                }
            }}
        >
            <div className="h-full w-full bg-[rgba(255,255,255,1)] rounded-lg flex flex-col justify-between p-8 md:p-12">
                <div className='w-full h-fit'>
                    <h2 className={`text-center text-3xl md:text-4xl font-pretendard font-bold ${textColor}`}>{emotion}</h2>
                    <p className='md:text-xl text-sm font-pretendard text-right mr-4 mt-4'>{selectMemory.date}에 이런 일이 있었어요.</p>
                    <p className='mt-4 mx-auto font-pretendard font-medium'>{selectMemory.text}</p>
                </div>
                <div className='flex justify-evenly '>
                    <input 
                        type='button' 
                        onClick={() => handleCorememories(selectMemory)} 
                        className={`md:text-2xl w-32 h-8 md:w-44 md:h-9 font-semibold text-white rounded-lg ${bgColor} ${hoverColor}`} 
                        value={"핵심 기억 등록"} 
                    />
                    <input 
                        type='button' 
                        onClick={() => { deleteMemory(selectMemory._id); setIsOpen(false); }} 
                        className={`md:text-2xl w-32 ml-2 h-8 md:w-44 md:h-9 font-semibold text-white rounded-lg ${bgColor} ${hoverColor}`} 
                        value={"삭제하기"} 
                    />
                </div>
            </div>
        </Modal>
    );
}

export default MemoryModal;
