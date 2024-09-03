"use client";
import { Box } from "@/components/ui";
import { useState } from "react";
import { API_URL } from "@/config";
import type { Product } from "@/components/interfaces";
import firebaseStorageService from "@/components/utils/firebaseStorage";
import Cookies from "js-cookie";

export default function AdminNewAuction() {
    const [product, setProduct] = useState<Product>({
        id: "",
        name: "",
        description: "",
        currentBid: 0, // Starting price for the auction
        starting_date: new Date().toISOString().split("T")[0], 
        finish_date: "",
        created_by: "", // You'll set this based on the user ID
        img: "",
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Track input errors
    const [apiError, setApiError] = useState<string | null>(null); // Track API errors

    const handleImageUpload = async (file: File) => {
        try {
            const downloadURL = await firebaseStorageService.uploadFile(file);
            return downloadURL;
        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }
    };

    const validateInputs = () => {
        const newErrors: { [key: string]: string } = {};

        if (!product.name.trim()) {
            newErrors.product_name = "Product name is required";
        }

        if (!product.description.trim()) {
            newErrors.description = "Description is required";
        }

        if (product.currentBid <= 0) {
            newErrors.currentBid = "Starting price must be greater than zero";
        }

        if (!product.finish_date) {
            newErrors.finish_date = "Finish date is required";
        } else if (new Date(product.finish_date) < new Date(product.starting_date)) {
            newErrors.finish_date = "Finish date cannot be earlier than the starting date";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleSaveChanges = async () => {
        setApiError(null); // Reset API error before making the request

        if (!validateInputs()) {
            return; // Stop the process if validation fails
        }

        try {
            let updatedProduct = { ...product };

            const token = Cookies.get("token");

            if (imageFile) {
                const imgUrl = await handleImageUpload(imageFile);
                if (imgUrl) {
                    console.log("Image URL obtained:", imgUrl);
                    updatedProduct = { ...updatedProduct, img: imgUrl };
                }
            }

            console.log("Product data being sent:", updatedProduct);

            const response = await fetch(`${API_URL}/item/new-item`, {
                method: "POST",
                headers: {
                    Authorization: `${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
            });

            if (response.ok) {
                alert("Product created successfully");
            } else {
                setApiError("Failed to create product. Please try again.");
            }
        } catch (error) {
            console.error("Error creating product:", error);
            setApiError("An error occurred while creating the product. Please try again.");
        }
    };

    return (
        <main className="flex min-h-screen bg-white flex-col p-8">
            <h1 className="text-gray-900 text-2xl font-medium">Create New Auction</h1>
            <Box>
                <div className="bg-white p-6 rounded-lg shadow-lg w-full">
                    <h2 className="text-xl font-medium text-gray-800 mb-4">Add Product</h2>

                    {apiError && (
                        <div className="mb-4 text-red-500 font-medium">
                            {apiError}
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="product_name">
                            Product Name
                        </label>
                        <input
                            id="product_name"
                            type="text"
                            value={product.name}
                            onChange={(e) =>
                                setProduct((prev) => ({ ...prev, name: e.target.value }))
                            }
                            placeholder="Product Name"
                            className={`px-4 py-2 border rounded-md w-full text-gray-800 ${
                                errors.product_name ? "border-red-500" : "border-gray-300"
                            }`}
                        />
                        {errors.product_name && (
                            <p className="text-red-500 text-sm mt-1">{errors.product_name}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={product.description}
                            onChange={(e) =>
                                setProduct((prev) => ({ ...prev, description: e.target.value }))
                            }
                            placeholder="Description"
                            className={`px-4 py-2 border rounded-md w-full text-gray-800 ${
                                errors.description ? "border-red-500" : "border-gray-300"
                            }`}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="currentBid">
                            Starting Price
                        </label>
                        <input
                            id="currentBid"
                            type="number"
                            value={product.currentBid}
                            onChange={(e) =>
                                setProduct((prev) => ({ ...prev, currentBid: parseFloat(e.target.value) }))
                            }
                            placeholder="Starting Price"
                            className={`px-4 py-2 border rounded-md w-full text-gray-800 ${
                                errors.currentBid ? "border-red-500" : "border-gray-300"
                            }`}
                        />
                        {errors.currentBid && (
                            <p className="text-red-500 text-sm mt-1">{errors.currentBid}</p>
                        )}
                    </div>

                    <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:gap-8">
                        <div className="w-full sm:w-1/2">
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="starting_date">
                                Starting Date
                            </label>
                            <input
                                id="starting_date"
                                type="date"
                                value={product.starting_date}
                                disabled
                                className="px-4 py-2 border border-gray-300 rounded-md w-full text-gray-800"
                            />
                        </div>

                        <div className="w-full sm:w-1/2">
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="finish_date">
                                Finish Date
                            </label>
                            <input
                                id="finish_date"
                                type="date"
                                value={product.finish_date}
                                onChange={(e) =>
                                    setProduct((prev) => ({ ...prev, finish_date: e.target.value }))
                                }
                                placeholder="Finish Date"
                                className={`px-4 py-2 border rounded-md w-full text-gray-800 ${
                                    errors.finish_date ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {errors.finish_date && (
                                <p className="text-red-500 text-sm mt-1">{errors.finish_date}</p>
                            )}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="image_file">
                            Product Image
                        </label>
                        <input
                            id="image_file"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files) {
                                    setImageFile(e.target.files[0]);
                                }
                            }}
                            className="px-4 py-2 border border-gray-300 rounded-md w-full text-gray-800"
                        />
                    </div>

                    <div className="flex justify-end space-x-4 mt-4">
                        <button
                            onClick={() => window.history.back()}
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSaveChanges}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </Box>
        </main>
    );
}
