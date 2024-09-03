"use client";
import { useEffect, useState } from "react";
import { Box } from "@/components/ui";
import { API_URL } from "@/config";
import type { Product } from "@/components/interfaces";
import Cookies from "js-cookie";
import useSession from "@/components/utils/useSession";

export default function Home() {
  const { role, loading, error } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productError, setProductError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = Cookies.get("token");
        const response = await fetch(`${API_URL}/item/`, {
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        });

        // console.log(response.json());
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setProductError("Failed to fetch products.");
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading session...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <section className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {loadingProducts ? (
            <p>Loading products...</p>
          ) : productError ? (
            <p>{productError}</p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <Box className="flex-col space-y-5 px-5 py-6" key={product.id}>
                <a href={`/user/product/${product.id}`}>
                  <img
                    src={product.img}
                    alt={product.name}
                    className="rounded-md"
                  />
                  <div>
                    <h3 className="text-gray-900">{product.name}</h3>
                    <p className="text-gray-600">{`$${product.currentBid}`}</p>
                  </div>
                </a>
              </Box>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </section>
      </div>
    </main>
  );
}
