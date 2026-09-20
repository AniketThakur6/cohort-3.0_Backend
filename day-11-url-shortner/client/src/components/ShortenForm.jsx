import { Link2, PencilLine, QrCode, Send } from "lucide-react";
import React from "react";

const ShortenForm = () => {
  return (
    <div className="w-280">
      <form action="" className="flex p-1 gap-3 justify-center">
        <div className="flex-1 flex gap-3">
          <div className="flex-1 flex flex-col gap-1">
            <p className="flex items-center gap-2 font-medium select-none">
              <Send stroke="#E17100" size={15} /> Long URL
            </p>
            <input
              name="originalUrl"
              className="flex border border-gray-500 outline-none bg-zinc-900 rounded-lg px-5 py-3"
              type="text"
              placeholder="Paste a long URL here…"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="flex items-center gap-2 font-medium select-none">
              <PencilLine stroke="#E17100" size={15} />
              Alias (optional)
            </p>
            <input
              name="alias"
              className="flex  w-60 border border-gray-500 outline-none bg-zinc-900 rounded-lg px-5 py-3"
              type="text"
              placeholder="Add alias here…"
            />
          </div>
        </div>
        <div className="flex gap-3 items-end">
          <button className="bg-amber-600 hover:bg-amber-700 transition-colors duration-250 flex gap-2 items-center cursor-pointer px-4 py-3 rounded-lg">
            <Link2 />
            Shorten
          </button>
          <button className="bg-amber-600 hover:bg-amber-700 transition-colors duration-250 flex gap-2 items-center cursor-pointer px-4 py-3 rounded-lg">
            <QrCode size={23} />
            Generate QR
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShortenForm;
