import React from "react";
const copyright = String.fromCodePoint(0x00a9);

const Footer = () => {
  return (
    <div className="bg-black">
      <h1 className="py-1 font-poppins italic font-semibold text-center text-white text-xs sm:text-sm">{`Copyright${copyright} 2023 - Abu Dzar Al Ghifari`}</h1>
    </div>
  );
};

export default Footer;
