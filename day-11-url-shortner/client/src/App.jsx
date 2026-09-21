import React, { useEffect, useState } from "react";
import ShortenForm from "./components/ShortenForm";
import ResultCard from "./components/ResultCard";
import UrlList from "./components/UrlList";
import api from "./apis/api";

const App = () => {
  const [urls, setUrls] = useState([]);
  const [CurrentUrl, setCurrentUrl] = useState(null);
  const [openQrId, setOpenQrId] = useState(null);

  const fetchUrls = async () => {
    const response = await api.get("/");
    setUrls(response?.data?.data?.urls);
    setCurrentUrl(response?.data?.data?.urls[0]);
  };

  const createUrl = async (formData)=>{
    const response = await api.post('/',formData);
    setCurrentUrl(response.data.data)

    fetchUrls();
  }

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleQr = () => {
    setOpenQrId(null);
  };


  
  return (
    <div
      onClick={handleQr}
      className="min-h-screen bg-black text-white text-lg px-50 pt-20 pb-10 "
    >
      <div className="flex flex-col gap-5 min-h-full">
        <div className="flex flex-col gap-1 self-start">
          <h1 className="text-3xl font-semibold text-gray-100 select-none">
            Long links?
          </h1>
          <p className="text-md text-gray-300 select-none">
            Paste a link, get a short one, see how many people clicked it.
          </p>
        </div>
        <ShortenForm createUrl={createUrl} />
        {urls && <p className="font-semibold select-none">
          Current links
        </p>}
        {CurrentUrl ? (
          <ResultCard
            key={CurrentUrl?.id}
            url={CurrentUrl}
            openQrId={openQrId}
            setOpenQrId={setOpenQrId}
          />
        ) : null}
        <p className="font-semibold select-none">
          Your links <span>({urls? urls?.length - 1 : 0})</span>
        </p>
        <div className="flex flex-col gap-3">
          {urls?.slice(1).map((url) => (
            <UrlList
              key={url._id}
              url={url}
              openQrId={openQrId}
              setOpenQrId={setOpenQrId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
