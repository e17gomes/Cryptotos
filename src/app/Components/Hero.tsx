/* eslint-disable @next/next/no-img-element */
'use client'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import CryptoInfo from '@/app/Types/CoinType';
import Link from 'next/link';
import { ArrowLeft, ArrowRight,RefreshCcw } from 'lucide-react';

export const HeroSec = () => {
    const token = process.env.apiKey;
    const [Coins, setCoins] = useState<CryptoInfo[]>([]);
    const [page, setPage] = useState<number>(1);
    const [Loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50`;

    const getData = async (page: number) => {
        try {
            setLoading(true);
            setError(null);
            const res = await axios.get(`${url}&page=${page}`, {
                headers: { accept: 'application/json', 'x-cg-pro-api-key': token },
            });
            setCoins(res.data);
        } catch (err: any) {
            if (err.response && err.response.status === 429) {
                setError('Muitas solicitações foram feitas. Por favor, tente novamente mais tarde.');
                console.log(err);
            } else {
                setError('Ocorreu um erro ao buscar os dados. Por favor, tente novamente mais tarde.');
                console.log(err);
            }
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 700);
        }
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        getData(newPage);
    };

    const LoadRenderedItems = useMemo(() => Array(15).fill(null).map((_, index) => (
        <div key={index} className='w-5/6 text-white grid grid-cols-1'>
            <div className='relative font-light mb-2 p-2 border-gray-900 border-2 bg-gradient-to-r from-indigo-900 via-indigo-800 rounded hover:bg-gray-900 transition duration-1000 ease-in-out flex items-center space-x-5 cursor-pointer overflow-hidden'>
                <Skeleton className='animate-pulse' circle={true} height={32} width={32} />
                <Skeleton className='animate-pulse rounded-full' width={220} />
                <Skeleton className='absolute left-[20rem] pr-2 animate-pulse z-50' width={90} />
            </div>
        </div>
    )), []);

    const RenderedItems = useMemo(() => Coins.map((item: any) => (
        <div className='w-5/6 text-white grid grid-cols-1' key={item.id}>
            <Link href={`./${item.id}`} passHref className=''>
                <div className='relative font-light mb-2 p-2 border-gray-400 border-2 bg-gradient-to-r from-indigo-900 via-indigo-800 bg-indigo-400/40 rounded hover:bg-gray-900 transition duration-1000 ease-in-out flex items-center space-x-5 cursor-pointer '>
                    <p className='font-bold'>{item.market_cap_rank}º</p>
                    <img src={item.image} alt={item.name} width={32} height={32} className='rounded-full' />
                    <p>{item.name}</p>
                    <p className='absolute right-0 pr-2  text-shadow stroke-indigo-900'>${item.current_price}</p>
                </div>
            </Link>
        </div>
    )), [Coins]);

    const navOnPages = (
        <div className='space-x-1 flex items-center mb-1 m-auto'>
            <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="rounded-lg px-4 py-2 bg-gray-200 hover:bg-gray-300 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 ease-in-out transition"> <ArrowLeft/> </button>
            
            <button
                disabled
                className="rounded-lg px-4 py-2 text-blue-400 bg-gray-200 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600  ease-in-out transition"
            >
                {page}
            </button>
            <button
                onClick={() => handlePageChange(page + 1)}
                className="rounded-lg px-4 py-2 bg-gray-200 hover:bg-gray-300 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600  ease-in-out transition"
            >
                {page + 1}
            </button>
            <button
                onClick={() => handlePageChange(page + 2)}
                className="rounded-lg px-4 py-2 bg-gray-200 hover:bg-gray-300 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600  ease-in-out transition"
            >
                {page + 2}
            </button>

            <button
                onClick={() => handlePageChange(page + 1)}
                className="rounded-lg px-4 py-2 bg-gray-200 hover:bg-gray-300 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600  ease-in-out transition"
            >
                <ArrowRight/>
            </button>
        </div>
    );

    useEffect(() => {
        const savedPage = localStorage.getItem('currentPage');
        if (savedPage) {
            setPage(parseInt(savedPage, 10));
            getData(parseInt(savedPage, 10));
        } else {
            getData(page);
        }
    }, []);

    return (
        <div className='flex flex-col items-centerr'>
            {navOnPages}

            <section className='relative min-h-[80vh] max-h-[80vh] lg:w-[60rem] sm:w-[30rem] p-4 rounded-lg m-auto overflow-auto bg-gradient-to-t from-indigo-950/90 to-indigo-700/70 backdrop-blur-[3px] flex flex-col items-center '>
                {Loading ? (
                    LoadRenderedItems
                ) : error ? (
                    <div className='text-red-500 font-bold flex flex-col'>
                        <p>{error}</p>
                        <button onClick={()=>getData(page)} className='mt-4 px-4 py-2 bg-red-600 rounded text-white hover:bg-red-700 transition duration-300'>
                            Retry <RefreshCcw />
                        </button>
                    </div>
                ) : (
                    RenderedItems
                )}
            </section>
        </div>
    );
}
