import Image from "next/image";

interface CategoryCardProps {
  src: string;
  alt: string;
  className?: string; // optional class for grid placement
}

export default function CategoryCard({
  src,
  alt,
  className = "",
}: CategoryCardProps) {
  return (
    <div
      className={`relative shadow-lg rounded-lg overflow-hidden ${className} aspect-square`}
    >
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}
