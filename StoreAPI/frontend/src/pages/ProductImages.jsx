import { useRef, useState } from "react";
import { ImagePlus, Package, X } from "lucide-react";

export default function ProductImages({images,setImages}) {
  const inputRef = useRef(null);


  const handleImageChange = (e)=>{
    const files = Array.from(e.target.files || [])

    const newImage = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }))

    setImages(prev => [...newImage,...prev].slice(0,5))

    e.target.value = ""
  }

  const removeImage = (index)=>{
    setImages((prev)=>{
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_,i)=> i !== index);
    })
  }

  return (
    <aside>
      <div className="rounded-3xl border border-white/[0.07] bg-[#101010] p-5">
        {/* Header */}
        <div className="mb-5">
          <h2 className="font-semibold text-white">Product images</h2>

          <p className="mt-1 text-xs text-zinc-600">
            Upload up to 5 images for your product.
          </p>
        </div>

        {/* Upload button */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="group flex w-full py-3 flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.1] bg-white/[0.02] transition hover:border-orange-500/50 hover:bg-orange-500/[0.03]"
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.05] text-zinc-500 transition group-hover:bg-orange-500/10 group-hover:text-orange-500">
            <ImagePlus size={25} />
          </div>

          <p className="text-sm font-medium text-zinc-300">
            Upload product images
          </p>

          <p className="mt-1 text-xs text-zinc-600">PNG, JPG or WEBP</p>
        </button>

        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          multiple
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Image previews */}
        {images.length > 0 ? (
          <div className="mt-4 grid grid-cols-2 gap-3">
            {images.map((image, index) => (
              <div
                key={image.preview}
                className="group relative aspect-square overflow-hidden rounded-xl border border-white/[0.07] bg-[#111111]"
              >
                <img
                  src={image.preview}
                  alt={`Product preview ${index + 1}`}
                  className="h-full w-full object-cover"
                />

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-zinc-400 opacity-0 backdrop-blur-sm transition group-hover:opacity-100 hover:bg-red-500 hover:text-white"
                >
                  <X size={14} />
                </button>

                {/* Image number */}
                <div className="absolute bottom-2 left-2 rounded-md bg-black/70 px-2 py-1 text-[10px] text-zinc-300 backdrop-blur-sm">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900">
              <Package size={18} className="text-zinc-600" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-zinc-400">
                No images selected
              </p>

              <p className="mt-0.5 text-[11px] text-zinc-700">
                Product preview
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Tip */}
      <div className="mt-4 rounded-2xl border border-orange-500/10 bg-orange-500/[0.03] p-4">
        <p className="text-xs font-medium text-orange-500">Product tip</p>

        <p className="mt-1 text-xs leading-5 text-zinc-600">
          Use clear product images from different angles and provide accurate
          pricing and stock information.
        </p>
      </div>
    </aside>
  );
}
