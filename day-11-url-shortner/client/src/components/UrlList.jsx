import React from "react";
import { Copy, QrCode, SquareArrowOutUpRight, Trash } from "lucide-react";

const favicon = "https://amazon.com/favicon.ico";

const UrlList = () => {
  return (
    <div className="flex ml-1 items-center h-17 bg-zinc-900 border-2 border-gray-500 rounded-lg  w-280 px-3">
      <div className="h-10 w-10 flex items-center">
        <img src={favicon} alt="" className="w-8 h-8" />
      </div>
      <div className="flex-1 leading-5.5 ml-2">
        <p className="text-amber-500">https://tinyurl.com/t568977c</p>
        <p className="text-gray-400 w-150 truncate">
          https://www.amazon.com/Instant-Pot-Multi-Use-Programmable-Pressure/dp/B00FLYWNYQ?_encoding=UTF8&content-id=amzn1.sym.8158743a-e3ec-4239-b3a8-31bfee7d4a15&dib=eyJ2IjoiMSJ9.y4LLAMvRXyF-GJBFF44Ypojh0SaxetuluODx2l4kU-WLXjMP8y5swTBFL_RMsAzUocnZFOIuhxytsjRFnfVwRcWOS4usyT0tXH_2kR3bG9ChY7In-cP5R_y7ksGRVdYqjkT607PD0i2VnHoaZA9pLC_sJoqY-9zcompwje0ZfnYGAX0jUFKOEjLAX89Zk_6Z2vBRIMsKFvch6wvc7lGlBdZNBB1j8wDyjrhCCbx-ia4.7g9IoiWnroB-5i0FMCrS8BmT8Jo0KcoBVJwMt1FW9ZQ&dib_tag=se&keywords=cooker&pd_rd_r=1c607a57-b25d-42cd-b2f6-7b5d188f9499&pd_rd_w=kHUvm&pd_rd_wg=R87Gs&qid=1789911981&sr=8-3&th=1
        </p>
      </div>
      <div className="flex gap-3">
        <button className="flex cursor-pointer items-center gap-1 px-3 py-1 rounded bg-amber-600 hover:bg-amber-700 transition-colors duration-250">
          <SquareArrowOutUpRight size={20} />
          Visit URL
        </button>
        <button className="flex cursor-pointer items-center gap-1 px-3 py-1 rounded bg-amber-600 hover:bg-amber-700 transition-colors duration-250">
          <QrCode size={20} /> QR
        </button>
        <button className="flex cursor-pointer items-center gap-1 px-3 py-2 rounded bg-amber-600 hover:bg-amber-700 transition-colors duration-250">
          <Copy size={20} /> Copy
        </button>
        <button className="flex cursor-pointer items-center gap-1 px-3 py-1 rounded bg-amber-600 hover:bg-amber-700 transition-colors duration-250">
          <Trash size={20} /> Delete
        </button>
      </div>
    </div>
  );
};

export default UrlList;
