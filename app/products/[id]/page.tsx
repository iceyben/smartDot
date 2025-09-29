// app/products/[id]/page.tsx
import { ProductDetailCard } from "../components/ProductDetail";

interface ProductDetailPageProps {
     params: { id: string };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
     const { id } = params;

     return (
          <div className="p-6">
               <h1 className="text-2xl font-bold mb-2">Product {id}</h1>
              <ProductDetailCard/>
          </div>
     );
}
