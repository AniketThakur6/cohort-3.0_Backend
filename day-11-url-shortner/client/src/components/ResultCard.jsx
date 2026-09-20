import React from "react";
import { Copy, QrCode, SquareArrowOutUpRight, Trash } from "lucide-react";

const ResultCard = () => {
  const favicon = "https://amazon.com/favicon.ico";
  return (
    <div className="flex ml-1 items-center h-15 bg-zinc-900 border-2 border-gray-500 rounded-lg  w-280 px-3">
      <div className="h-10 w-10 flex items-center">
        <img src={favicon} alt="" className="w-8 h-8" />
      </div>
      <div className="flex-1 ml-2 flex gap-6">
        <p className="flex">https://tinyurl.com/t568977c</p>
      <p className="w-90 text-gray-400 truncate">https://www.amazon.com/Instant-Pot-Multi-Use-Programmable-Pressure/dp/B00FLYWNYQ?_encoding=UTF8&content-id=amzn1.sym.8158743a-e3ec-4239-b3a8-31bfee7d4a15&dib=eyJ2IjoiMSJ9.y4LLAMvRXyF-GJ</p>
      </div>
      <div className="flex gap-3">
        <button className="flex cursor-pointer items-center gap-1 px-3 py-1 rounded bg-amber-600 hover:bg-amber-700 transition-colors duration-250">
         <SquareArrowOutUpRight size={20} />
         Visit URL
        </button>
        <button className="flex cursor-pointer items-center gap-1 px-3 py-1 rounded bg-amber-600 hover:bg-amber-700 transition-colors duration-250">
          
          <QrCode size={20} /> QR
        </button>
        <button className="flex cursor-pointer items-center gap-1 px-3 py-1 rounded bg-amber-600 hover:bg-amber-700 transition-colors duration-250">
          
          <Copy size={20} /> Copy
        </button>
        <button className="flex cursor-pointer items-center gap-1 px-3 py-1 rounded bg-amber-600 hover:bg-amber-700 transition-colors duration-250">
          
          <Trash size={20} /> Delete
        </button>
      </div>
    </div>
  );
};

export default ResultCard;
