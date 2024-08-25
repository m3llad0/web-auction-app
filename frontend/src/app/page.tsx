import { Box } from "@/components/ui";
import { API_URL } from "@/config";

interface Product {
  id: string;
  product_name: string;
  current_bid: number;
  description: string;
  starting_date: string;
  finishing_date: string;
  created_by: string;
  img: string;
}

async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/api/v0/products`, {
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <section className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.length > 0 ? (
            products.map((product) => (
              <Box className="flex-col space-y-5" key={product.id}>
                <img
                  src={product.img}
                  alt={product.product_name}
                  className="rounded-md"
                />
                <div>
                  <h3 className="text-gray-900">{product.product_name}</h3>
                  <p className="text-gray-600">{`$${product.current_bid}`}</p>
                </div>
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
