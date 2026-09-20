import React, { useState } from "react";
import ShortenForm from "./components/ShortenForm";
import ResultCard from "./components/ResultCard";
import UrlList from "./components/UrlList";

const App = () => {
  const [urls, setUrls] = useState("");
  const [input, setInput] = useState("");
  const [CurrentUrl, setCurrentUrl] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white text-lg px-40 pt-20 pb-10 ">
      <div className="flex flex-col gap-5 w-full h-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold text-gray-100 select-none">Long links?</h1>
          <p className="text-md text-gray-300 select-none">Paste a link, get a short one, see how many people clicked it.</p>
        </div>
        <ShortenForm />
        <ResultCard />
        <p className="font-semibold select-none">Your links <span>(3)</span></p>
        <div className="flex flex-col gap-2">
          <UrlList />
          <UrlList />
          <UrlList />
        </div>
      </div>
    </div>
  );
};

export default App;
