import { ArrowLeft, Star, Package, Pencil, Trash2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate, useParams } from "react-router";
import SessionLoader from "../components/SessionLoader";
import NotFound from "./NotFound";
import { AuthContext } from "./../context/AuthContext";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();

  const { isAuthenticated, productRefresh, accessToken } =
    useContext(AuthContext);

  const param = useParams();

  useEffect(() => {
    const getAProduct = async () => {
      try {
        const product = await api.get(`/products/${param.id}`);

        setProduct(product.data.product);
        setSelectedImage(product.data?.product?.images[0]?.url);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    getAProduct();
  }, []);

  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      const response = await api.delete(`/products/${product._id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      navigate("/");
      productRefresh();
      setLoading(false);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const isLogin = () => {
    if (!isAuthenticated) {
      toast.info("Please login first");
      return;
    }

    setShowDeleteConfirm(true);
  };

  if (loading) {
    return <SessionLoader />;
  }

  if (!product) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#080808] text-white">
      <main className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-5 sm:py-5 lg:px-8 lg:py-6">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="mb-5 flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
        >
          <ArrowLeft size={17} />
          <span>Back to products</span>
        </button>

        <div className="grid w-full min-w-0 gap-8 lg:grid-cols-2 lg:gap-14">
          {/* ================= IMAGE SECTION ================= */}
          <div className="w-full min-w-0">
            {/* Main Image */}
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-[#101010] sm:aspect-4/3 sm:rounded-3xl">
              <img
                src={selectedImage}
                alt={product.title}
                className="h-full w-full object-cover"
              />

              <span className="absolute left-3 top-3 rounded-lg bg-orange-500 px-3 py-1.5 text-xs font-bold text-black sm:left-5 sm:top-5">
                NEW
              </span>
            </div>

            {/* Thumbnails */}
            <div className="mt-3 flex w-full gap-3 overflow-x-auto pb-1 sm:mt-4">
              {product.images?.map((item) => (
                <button
                  key={item.fileId}
                  onClick={() => setSelectedImage(item.url)}
                  type="button"
                  className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border bg-[#101010] sm:h-24 sm:w-24 ${
                    selectedImage === item.url
                      ? "border-orange-500/70"
                      : "border-white/[0.07]"
                  }`}
                >
                  <img
                    src={item.url}
                    alt={item.fileId}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ================= DETAILS ================= */}
          <div className="flex w-full min-w-0 flex-col lg:justify-center">
            {/* Category */}
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-orange-500 sm:mb-3 sm:text-sm">
              {product.category}
            </p>

            {/* Title */}
            <h1 className="min-w-0 break-words text-2xl font-semibold leading-tight tracking-tight sm:text-3xl lg:text-5xl">
              {product.title}
            </h1>

            {/* Price */}
            <div className="mt-5 sm:mt-7">
              <span className="text-2xl font-semibold sm:text-3xl">
                {product.price.currency === "INR" ? "₹" : "$"}
                <span className="ml-1 text-green-500">
                  {product.price.amount}
                </span>
              </span>
            </div>

            {/* Divider */}
            <div className="my-5 h-px bg-white/[0.06] sm:my-7" />

            {/* Description */}
            <div className="min-w-0">
              <h2 className="mb-2 text-sm font-semibold text-zinc-200">
                Description
              </h2>

              <p className="break-words text-sm leading-6 text-zinc-500 sm:leading-7">
                {product.description}
              </p>
            </div>

            {/* Stock */}
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-3 text-sm sm:mt-6">
              {product.sizes?.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />

                  <span className="text-zinc-400">{item.size}</span>

                  <span className="text-zinc-600">
                    · {item.stock} available
                  </span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                onClick={() => {
                  if (!isAuthenticated) {
                    toast.info("Please login first");
                  }
                  navigate("/:id/edit");
                }}
                type="button"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] text-sm text-zinc-400 transition hover:bg-white/[0.06] hover:text-white"
              >
                <Pencil size={15} />
                Edit
              </button>

              <button
                onClick={isLogin}
                type="button"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-red-500/10 bg-red-500/[0.03] text-sm text-red-400 transition hover:bg-red-500/[0.08]"
              >
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          </div>
        </div>
      </main>
      {showDeleteConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={() => setShowDeleteConfirm(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
            className="w-full max-w-sm rounded-2xl border border-white/[0.08] bg-[#151515] p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="delete-dialog-title" className="text-lg font-semibold">
              Delete product?
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="rounded-lg border border-white/[0.1] px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/[0.06]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  deleteProduct(product._id);
                }}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
