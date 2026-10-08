import { DollarSign, IndianRupee } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

const ProductCard = ({ product }) => {
  const { _id:id, title, description, category, price, images, seller } = product;

  const navigate = useNavigate()

  return (
    <div
      key={id}
      className="group overflow-hidden rounded-2xl border border-white/[0.07] bg-[#101010] transition duration-300 hover:-translate-y-1  hover:border-orange-500/[0.2]"
    >
      <div
       onClick={()=> navigate(`/${id}`)} 
      className="relative aspect-4/3 overflow-hidden bg-zinc-900">
        <div className="flex h-full items-center justify-center">
          <img
            src={images?.[0]?.url}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-zinc-600">{category}</span>

          <div className="flex items-center gap-1 text-xs text-zinc-400">
            <p>Seller: {seller?.name}</p>
          </div>
        </div>

        <h2 className="truncate font-medium text-zinc-100">{title}</h2>

        <p className="mt-1 truncate text-xs text-zinc-600">{description}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="flex flex-row items-center text-xl font-semibold text-zinc-100">
            {price?.currency === "INR" ? <IndianRupee size={16} /> : <DollarSign size={17} />} <span className="text-green-500">{price?.amount}</span>
          </span>

          <button
          onClick={()=> navigate(`/${id}`)} 
          className="rounded-lg bg-white/[0.06] px-3 py-2 text-xs font-medium text-zinc-300 transition hover:bg-orange-500 hover:text-black">
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
