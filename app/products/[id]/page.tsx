// app/products/[id]/page.tsx
export default async function ProductDetailPage({
     params,
}: {
     params: { id: string };
}) {
     const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${params.id}`,
          {
               cache: "no-store",
          }
     );
     const product = await res.json();

     if (product.error) return <div>Product not found</div>;

     return (
          <div className="p-6">
               <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
               <p className="mb-2">{product.description}</p>
               <p className="font-semibold text-lg mb-4">
                    ${product.price} rwf
               </p>

               {/* ✅ Image gallery */}
               <div className="flex gap-2">
                    {product.images?.map((img: any) => (
                         <img
                              key={img.id}
                              src={img.url}
                              alt={product.title}
                              className="h-32 w-32 object-cover border rounded"
                         />
                    ))}
               </div>
          </div>
     );
}
