// app/products/[id]/page.tsx

interface ProductDetailPageProps {
     params: { id: string };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
     const { id } = params;

     return (
          <div className="p-6">
               <h1 className="text-2xl font-bold mb-2">Product {id}</h1>
               <p className="mb-2">
                    This is the product detail page for product ID {id}.
               </p>
               <p className="font-semibold text-lg mb-4">$0 rwf</p>

               {/* Placeholder image gallery */}
               <div className="flex gap-2">
                    <img
                         src="/placeholder.png"
                         alt="Placeholder"
                         className="h-32 w-32 object-cover border rounded"
                    />
                    <img
                         src="/placeholder.png"
                         alt="Placeholder"
                         className="h-32 w-32 object-cover border rounded"
                    />
               </div>
          </div>
     );
}
