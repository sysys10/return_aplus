/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        mobile: "1120px",
      },
      dropShadow: {
        "white-md": "0 0px 3px rgba(255,255,255,0.75)",
        "white-lg": "0 0px 5px rgba(255,255,255.1)",
      },
      fontFamily: {
        pretendard: "Pretendard",
        coolguy: "coolguy",
        hakgyo:"TTHakgyoansimMonggeulmonggeulR"
      },
      backgroundColor: {
        "hanyang-blue": "#0E4A84",
      },
      backgroundImage: {
        'rare-wind': 'linear-gradient(to left, #a8edea 0%, #fed6e3 100%)',
        'wind-apple': 'linear-gradient(to left, #d299c2 0%, #fef9d7 100%)',
        'blessing': 'linear-gradient(to left, #fddb92 0%, #d1fdff 100%)',
        'SharpeyeEagle': 'linear-gradient(to left, #9890e3 0%, #b1f4cf 100%)',
        'white-gradation':'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);',
      }
    },
  },
  plugins: [],
};
