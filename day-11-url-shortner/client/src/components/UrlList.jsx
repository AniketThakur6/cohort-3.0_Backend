import React, { useState } from "react";
import {
  ClipboardCheck,
  Copy,
  QrCode,
  SquareArrowOutUpRight,
  Trash,
} from "lucide-react";
import MyQRCode from "./MyQRCode";
import axios from "axios";

const UrlList = ({ url, openQrId, setOpenQrId }) => {
  const [copy, setCopy] = useState(false);

  const domain = new URL(url.originalUrl).hostname;

  const favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  const handleCopy = async () => {
    console.log("hello");
    await navigator.clipboard.writeText(`http://localhost:3000/${url.shortCode}`);

    setCopy(true);

    setTimeout(() => {
      setCopy(false);
    }, 10000);
  };

  const isQrOpen = openQrId === url._id;
  const onQrToggle = () =>
    setOpenQrId((currentId) => (currentId === url._id ? null : url._id));

  return (
    <div className="flex ml-1 items-center h-17 bg-zinc-900 border-2 border-gray-500 rounded-lg  w-280 px-3">
      <div className="h-10 w-10 flex items-center">
        <img src={favicon} alt="" className="w-8 h-8" />
      </div>
      <div className="flex-1 leading-5.5 ml-2">
        <a
          href={`http://localhost:3000/${url.shortCode}`}
          target="_blank"
          className="flex text-amber-500 w-fit font-medium hover:underline transition-all "
        >
          {url?.shortCode}
        </a>
        <p className="text-gray-400 w-150 truncate">{url.originalUrl}</p>
      </div>
      <div className="flex gap-3">
        <a
          href={`http://localhost:3000/${url.shortCode}`}
          target="_blank" 
         className="flex cursor-pointer items-center gap-1 px-3 py-1 rounded bg-amber-600 hover:bg-amber-700 transition-colors duration-250">
          <SquareArrowOutUpRight size={20} />
          Visit URL
        </a>
        <div className="relative flex">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQrToggle();
            }}
            className="flex cursor-pointer items-center gap-1 px-3 py-1 rounded bg-amber-600 hover:bg-amber-700 transition-colors duration-250"
          >
            <QrCode size={20} /> QR
          </button>
          {isQrOpen && (
            <div className="absolute top-5 left-10 z-10">
              <MyQRCode url={url} />
            </div>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex cursor-pointer items-center gap-1 px-3 py-2 rounded bg-amber-600 hover:bg-amber-700 transition-colors duration-250"
        >
          {copy ? (
            <>
              <ClipboardCheck size={20} /> Copied{" "}
            </>
          ) : (
            <>
              <Copy size={20} /> Copy{" "}
            </>
          )}
        </button>
        <button className="flex cursor-pointer items-center gap-1 px-3 py-1 rounded bg-amber-600 hover:bg-amber-700 transition-colors duration-250">
          <Trash size={20} /> Delete
        </button>
      </div>
    </div>
  );
};

export default UrlList;
