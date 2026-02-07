"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

export default function ProductForm() {
     const [title, setTitle] = useState("");
     const [description, setDescription] = useState("");
     const [price, setPrice] = useState("");
     const [files, setFiles] = useState<File[]>([]);
     const [previews, setPreviews] = useState<string[]>([]);
     const [message, setMessage] = useState("");
     const fileInputRef = useRef<HTMLInputElement>(null);

     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files) {
               const newFiles = Array.from(e.target.files);
               setFiles(newFiles);
               setPreviews(newFiles.map((f) => URL.createObjectURL(f)));
          }
     };

     const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          if (e.dataTransfer.files) {
               const newFiles = Array.from(e.dataTransfer.files);
               setFiles(newFiles);
               setPreviews(newFiles.map((f) => URL.createObjectURL(f)));
          }
     };

     const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
          e.preventDefault();

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          if (!files.length) {
               setMessage("Please select at least one image!");
               return;
          }

          const formData = new FormData();
          formData.append("title", title);
          formData.append("description", description);
          formData.append("price", price);
          files.forEach((f) => formData.append("images", f));

          try {
               const res = await fetch("/api/products", {
                    method: "POST",
                    body: formData,
               });
               if (!res.ok) {
                    const data = await res.json();
                    setMessage("Error: " + data.error);
                    return;
               }

               setMessage("Product uploaded successfully!");
               setTitle("");
               setDescription("");
               setPrice("");
               setFiles([]);
               setPreviews([]);
          } catch {
               setMessage("Failed to upload product");
          }
     };

     return (
          <form
               onSubmit={handleSubmit}
               className="max-w-md mx-auto space-y-4 p-4 border rounded shadow"
          >
               <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input input-bordered w-full"
                    required
               />
               <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="textarea textarea-bordered w-full"
               />
               <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="input input-bordered w-full"
                    required
               />

               <div
                    className="border-2 border-dashed p-4 text-center cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
               >
                    {previews.length ? (
                         <div className="grid grid-cols-3 gap-2">
                              {previews.map((src, idx) => (
                                   <div key={idx} className="relative h-24 w-full">
                                        <Image
                                             src={src}
                                             alt="Preview"
                                             fill
                                             className="object-cover"
                                        />
                                   </div>
                              ))}
                         </div>
                    ) : (
                         <p>Drag & Drop images or click to select</p>
                    )}
                    <input
                         type="file"
                         ref={fileInputRef}
                         hidden
                         multiple
                         accept="image/*"
                         onChange={handleFileChange}
                    />
               </div>

               <button type="submit" className="btn btn-primary w-full">
                    Add Product
               </button>
               {message && <p className="text-sm text-green-600">{message}</p>}
          </form>
     );
}
