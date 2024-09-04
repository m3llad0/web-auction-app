"use client";
import { useEffect, useState } from "react";
import { Box } from "@/components/ui";
import type { Product } from "@/components/interfaces";
import { API_URL } from "@/config";
import formatDate from "@/components/utils/formatDate";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import Cookies from "js-cookie";

const fetchAPI = async (url: string, options?: RequestInit) => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
    } catch (err) {
        console.error(err);
        return null;
    }
};

export default function AdminPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null);
    const limit = 5;
    const token = Cookies.get("token");

    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await fetchAPI(`${API_URL}/item/admin/my-items`, {
            method: "GET",
            headers: {
              Authorization: `${token}`,
            }
          });
          setProducts(data || []);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };

      fetchData();
    }, [token]);

    const handleAction = async (action: "delete" | "edit", product?: Product) => {
        if (action === "edit" && product) {
            setCurrentProduct(product);
            setIsModalOpen(true);
        } else if (action === "delete" && product?.id) {
            await fetchAPI(`${API_URL}/item/${product.id}`, { 
                method: "DELETE",
                headers: {
                    Authorization: `${token}`,
                  },
         });
            setProducts((prev) => prev.filter(({ id }) => id !== product.id));
        }
    };

    const handleSaveChanges = async () => {
        console.log(token);
        if (currentProduct?.id) {
            const updatedProduct = await fetchAPI(`${API_URL}/item/${currentProduct.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(currentProduct),
            });
            
            if (updatedProduct) {
                setProducts((prev) =>
                    prev.map((p) => (p.id === currentProduct.id ? { ...p, ...currentProduct } : p))
                );
                setIsModalOpen(false);
            }
        }
    };
    

    const paginatedProducts = products.slice((page - 1) * limit, page * limit);
    const totalPages = Math.ceil(products.length / limit);

    const ActionMenu = ({ product }: { product: Product }) => (
        <Menu>
            <MenuButton className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                Actions
            </MenuButton>
            <MenuItems className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <MenuItem>
                    <button
                        onClick={() => handleAction("edit", product)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                        Edit
                    </button>
                </MenuItem>
                <MenuItem>
                    <button
                        onClick={() => handleAction("delete", product)}
                        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                    >
                        Delete
                    </button>
                </MenuItem>
            </MenuItems>
        </Menu>
    );

    return (
        <main className="flex min-h-screen bg-white flex-col p-8">
            <h1 className="text-gray-900 text-2xl font-medium">These are your auctions!</h1>
            <Box className="mt-4">
                <table className="w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            {["Name", "Current Bid", "Starting Date", "Finish Date", "Actions"].map((header) => (
                                <th key={header} className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedProducts.map((product) => (
                            <tr key={product.id}>
                                <td className="px-6 py-4 text-sm text-gray-900">{product.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">${product.currentBid}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{formatDate(product.starting_date)}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{formatDate(product.finish_date)}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    <ActionMenu product={product} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="p-4 flex justify-between items-center">
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md disabled:bg-gray-200"
                    >
                        Previous
                    </button>
                    <span>Page {page} of {totalPages}</span>
                    <button
                        onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
                        disabled={page === totalPages}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md disabled:bg-gray-200"
                    >
                        Next
                    </button>
                </div>
            </Box>

            {isModalOpen && currentProduct && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-medium text-gray-800 mb-4">Edit Product</h2>
                        
                        <input
                            type="text"
                            value={currentProduct.name || ""}
                            onChange={(e) =>
                                setCurrentProduct((prev) => ({ ...prev, product_name: e.target.value }))
                            }
                            placeholder="Product Name"
                            className="mb-4 px-4 py-2 border border-gray-300 rounded-md w-full text-gray-800"
                        />
                        
                        <textarea
                            value={currentProduct.description || ""}
                            onChange={(e) =>
                                setCurrentProduct((prev) => ({ ...prev, description: e.target.value }))
                            }
                            placeholder="Description"
                            className="mb-4 px-4 py-2 border border-gray-300 rounded-md w-full text-gray-800"
                        />
                        
                        <input
                            type="date"
                            value={currentProduct.starting_date?.split('T')[0] || ""}
                            onChange={(e) =>
                                setCurrentProduct((prev) => ({ ...prev, starting_date: e.target.value }))
                            }
                            placeholder="Starting Date"
                            className="mb-4 px-4 py-2 border border-gray-300 rounded-md w-full text-gray-800"
                        />
                        
                        <input
                            type="date"
                            value={currentProduct.finish_date?.split('T')[0] || ""}
                            onChange={(e) =>
                                setCurrentProduct((prev) => ({ ...prev, finish_date: e.target.value }))
                            }
                            placeholder="Finish Date"
                            className="mb-4 px-4 py-2 border border-gray-300 rounded-md w-full text-gray-800"
                        />
                        
                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
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
                </div>
            )}
        </main>
    );
}
