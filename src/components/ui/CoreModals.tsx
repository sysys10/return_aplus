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

type CoreMemoryProps = {
    coreModalOpen: boolean;
    setCoreModalOpen: (coreModalOpen: boolean) => void;
    selectCoremomory: Memory | null;
    deleteCore: (id: string) => Promise<void>;
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

const CoreModals = ({ coreModalOpen, setCoreModalOpen, selectCoremomory, deleteCore }: CoreMemoryProps) => {
    if (!selectCoremomory) return null;

    const { bgColor, hoverColor, textColor, emotion } = getColorClass(selectCoremomory.color);

    return (
        <Modal
            isOpen={coreModalOpen}
            onRequestClose={() => setCoreModalOpen(false)}
            overlayClassName="custom-overlay"
            className="custom-modal md:w-[600px] md:h-[400px] w-11/12 h-[320px]"
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
            <div className="w-full h-full bg-[rgba(255,255,255,1)] rounded-lg flex flex-col justify-between p-8 md:p-12">
                <div className='w-full'>
                    <h2 className={`mx-auto text-center text-3xl md:text-4xl font-hakgyo font-bold ${textColor}`}>{emotion}</h2>
                    <p className='md:text-xl text-sm font-pretendard text-right mr-4 mt-4'>{selectCoremomory.date}에 이런 일이 있었어요.</p>
                    <p className='mt-4 mx-auto font-pretendard font-medium'>{selectCoremomory.text}</p>
                </div>
                <div className='flex justify-evenly'>
                    <input 
                        type='button' 
                        onClick={() => { deleteCore(selectCoremomory._id); setCoreModalOpen(false); }} 
                        className={`md:text-2xl w-32 h-8 md:w-44 md:h-9 font-semibold text-white rounded-lg ${bgColor} ${hoverColor}`} 
                        value={"삭제하기"} 
                    />
                </div>
            </div>
        </Modal>
    );
}

export default CoreModals;
