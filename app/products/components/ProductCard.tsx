interface ProductCardProps {
  src: string;
  alt: string;
  status: string;
  title: string;
  description: string;
  price: number | string;
}

const ProductCard = ({
  src,
  alt,
  status,
  title,
  description,
  price,
}: ProductCardProps) => {
  return (
    <div className="relative card bg-base-100 shadow-sm h-60 scale-105 hover:scale-110 transition-transform duration-300 border border-green-300">
      <figure>
        <img src={src} alt={alt} className="h-50 w-full object-cover" />
      </figure>
      <div className="px-4 pt-1.5 pb-4">
        <h2 className="font-medium">{title}</h2>
        <p className="font-semibold mt-1">${price} rwf</p>
        <p className="text-[12px]">{description}</p>

        <div className="card-actions justify-end">
          <p className="absolute hover:bg-red-800 top-3 left-3 bg-red-600 text-white px-2 py-1 rounded-full shadow-md text-[9px] font-medium space-x-0.5 uppercase">
            {status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
