'use client';
import React from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Banner({ Corebg }): string {
    const settings = {
        infinite: true,
        speed: 300,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        autoplay: true,
        autoplaySpeed: 5000,
    };
    return (
        <div className="h-[720px] fixed w-full -z-9999">
            <div className="w-full h-[720px] bg-rare-wind flex items-center justify-center" style={{ backgroundImage: `linear-gradient(to right, ${Corebg})` }}></div>
            <div className=' absolute h-[320px] left-0 right-0 top-[400px] bg-white-gradation'></div>
        </div>
    );
}
