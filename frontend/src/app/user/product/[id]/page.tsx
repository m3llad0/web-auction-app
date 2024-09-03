'use client'

import { useState, useEffect } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { CountdownTimer } from '@/components/ui';
import { API_URL } from '@/config';
import type { Product } from '@/components/interfaces';
import Cookies from 'js-cookie';

export default function Product({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    console.log(params.id);
    useEffect(() => {
        setLoading(true);
        const token = Cookies.get('token');
        fetch(`${API_URL}/item/${params.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [params.id]);

    if (loading) {
        // Fallback UI for loading state during hydration
        return (
            <div className="bg-white">
                {/* Loading skeleton or a placeholder can be added here */}
                <div className="h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white">
            <div className="pt-6">
                <nav className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <a href="/user" className="font-medium text-gray-500 hover:text-gray-600">
                        <ArrowLeftIcon className="h-5 w-5 inline-block" />
                        <span className="inline-block ml-1">Back</span>
                    </a>
                </nav>

                {/* Centered image display */}
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="flex justify-center">
                        <div className="aspect-w-1 aspect-h-1 w-full max-w-lg overflow-hidden rounded-lg">
                            <img
                                alt={product?.name}
                                src={product?.img}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                    </div>
                </div>

                {/* Product info */}
                <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            {product?.name}
                        </h1>
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-sm font-medium text-gray-500">Current bid</p>
                        <p className="text-3xl tracking-tight text-gray-900">${product?.currentBid}</p>

                        <form className="mt-10">
                            <button
                                type="submit"
                                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Bid now
                            </button>
                        </form>

                        <div className="mt-10">
                            <h3 className="text-lg font-medium text-gray-900">Closes in</h3>
                            <CountdownTimer startDate={product?.starting_date ?? ''} endDate={product?.finish_date ?? ''} />
                        </div>
                    </div>

                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                        {/* Description and details */}
                        <div>
                            <h3 className="sr-only">Description</h3>
                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{product?.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
