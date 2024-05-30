/* eslint-disable @next/next/no-img-element */
'use client'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoInfo from '@/app/Types/CoinType'
import Link from 'next/link';


export const HeroSec = () => {

    const token = process.env.apyKey
    const [Coins, setCoins] = useState<CryptoInfo[]>([]);
    const [Loading, setLoading] = useState(false)
    const [error, setError] = useState(null);


    const url = {
        ping: 'https://api.coingecko.com/api/v3/ping',
        priceID: `https://api.coingecko.com/api/v3/simple/price?ids=${'bitcoin'}&vs_currencies=${'usd'}`,
        tokenPrice: 'https://api.coingecko.com/api/v3/simple/token_price/CRYPTOCOIN?contract_addresses=NUMEROGRANDEDAPORRA&vs_currencies=MOEDA',
        listaMoedasReais: 'https://api.coingecko.com/api/v3/simple/supported_vs_currencies',
        listaCryptos: 'https://api.coingecko.com/api/v3/coins/list?include_platform=false',
        coinMarkets: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${'usd'}&order=market_cap_${'desc'}&per_page=${'15'}`
    }

    const options = {
        method: 'GET',
        url: url.coinMarkets ,
        headers: { accept: 'application/json', 'x-cg-pro-api-key': token }
    }

    const getData = async () => {
        try {
            setLoading(true)
                const res = await axios.get(options.url)
                console.log(res.data)
                setCoins(res.data)
                
     
            
        } catch (err) {
            console.log(err + 'aqui deu erro lembra de ler o nome do erro')
        }
        finally{
            setTimeout(() => {
                setLoading(false)
              
            }, 700);
        }
    }
    // useEffect(()=>{
    //     getData()
    // },[])

    const LoadRenderedItems= 
    Array(15).fill(null).map((_, index) => {
       return (
           <div key={index} className='w-5/6 text-white grid grid-cols-1'>
               <div className='relative font-light mb-2 p-2 border-gray-900 border-2 bg-gradient-to-r from-indigo-900 via-indigo-800 rounded hover:bg-gray-900 transition duration-1000 ease-in-out flex items-center space-x-5 cursor-pointer overflow-hidden'>
                   <Skeleton className='animate-pulse' circle={true} height={32} width={32} />
                   <Skeleton className='animate-pulse rounded-full' width={220} />
                   <Skeleton className='absolute left-[20rem] pr-2 animate-pulse z-50' width={90} />
               </div>
           </div>
       );
   });

    const RenderedItems = 
    Coins.map((item:any) => {
        return (    
            <div className='w-5/6 text-white grid grid-cols-1  ' key={item.id}>
                <Link href={`./${item.id}`} property={item.id} passHref className=''>
                    <div className='relative font-light mb-2 p-2 border-gray-400 border-2 bg-gradient-to-r from-indigo-900 via-indigo-800 bg-indigo-400/40 rounded hover:bg-gray-900 transition duration-1000 ease-in-out flex items-center space-x-5 cursor-pointer '>
                        <p className='font-bold'>{item.market_cap_rank}º</p>
                        <img src={item.image} alt={item.name} width={32} height={32} className='rounded-full' />
                        <p>{item.name}</p>
                        <p className='absolute right-0 pr-2 z-50 text-shadow stroke-indigo-900'>  $ {item.current_price}</p>
                    </div>
                </Link>
            </div>
        );
    });

    return (
        <section className='relative min-h-[80vh] max-h-[80vh] lg:w-[60rem] sm:w-[30rem] p-4 rounded-lg m-auto overflow-auto bg-gradient-to-t from-indigo-950/90 to-indigo-700/70 backdrop-blur-[3px] flex flex-col items-center'>
        <button onClick={getData} className='font-extrabold'>CLICA AQUI PRA CHAMAR </button>
        {Loading ?LoadRenderedItems: RenderedItems}
    </section> 
    )
}