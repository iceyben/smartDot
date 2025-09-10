import Image from "next/image";

interface CategoryCardProps {
  src: string;
  alt: string;
  className?: string; // optional class for grid placement
  btn: string;
  title: string;
  description: string;
}

export default function CategoryCard({
  src,
  alt,
  className = "",
  btn,
  title,
  description,
}: CategoryCardProps) {
  return (
    <div
      className={`relative shadow-lg rounded-lg overflow-hidden border-green-300 border-2 ${className} aspect-square hover:scale-110 transition-transform duration-300`}
    >
      
      <Image src={src} alt={alt} fill className="object-cover" />

      {/* Button positioned over image */}
      <div>
        <p className="absolute top-20 left-3 text-white text-sm font-bold">
          {description}
        </p>
        <h2 className="absolute top-24 left-3 text-3xl text-gray-200 font-bold opacity-50 uppercase">
          {title}
        </h2>
        <button className="absolute bottom-4 hover:bg-red-800 right-4 bg-red-600 text-white px-2 py-1 rounded-lg shadow-md text-sm">
          {btn}
        </button>
      </div>
    </div>
  );
}
