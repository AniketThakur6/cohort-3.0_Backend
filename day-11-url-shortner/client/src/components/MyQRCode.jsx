import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download } from "lucide-react";

const MyQRCode = ({url}) => {
  const [favicon, setFavicon] = useState(null);

  useEffect(() => {
    fetch("/favicon.png")
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          setFavicon(reader.result);
        };

        reader.readAsDataURL(blob);
      });
  }, []);

  const downloadQR = () => {
    const svg = document.getElementById("qr-code");

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);

    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });

    const svgUrl = URL.createObjectURL(svgBlob);

    const img = new Image();

    img.onload = () => {
      const scale = 4;

      const canvas = document.createElement("canvas");

      canvas.width = 160 * scale;
      canvas.height = 160 * scale;

      const ctx = canvas.getContext("2d");

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      URL.revokeObjectURL(svgUrl);

      const pngUrl = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = pngUrl;
      const fileName = ''
      link.download = `${fileName}.png`;

      link.click();
    };

    img.src = svgUrl;
  };

  return (
    <div className="bg-zinc-900 border-2 border-gray-500 flex flex-col gap-3 rounded-xl w-fit p-5">
      <div>
        <QRCodeSVG
          className="border-6 border-amber-600 rounded-xl"
          id="qr-code"
          value={url.originalUrl}
          size={160}
          level="H"
          bgColor="#f3dec9"
          marginSize={2}
          imageSettings={{
            src: favicon,
            height: 40,
            width: 40,
            excavate: true,
          }}
        />
      </div>
      <div className="flex">
        <button onClick={downloadQR} className="flex text-nowrap gap-2 items-center px-3 py-2 bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors duration-250">
         <Download size={20}/> Download QR
        </button>
      </div>
    </div>
  );
};

export default MyQRCode;
