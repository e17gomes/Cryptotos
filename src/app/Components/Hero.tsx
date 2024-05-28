'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoInfo from '@/app/Types/CoinType'
import Link from 'next/link';


export const HeroSec = () => {
    const token = process.env.token
    const [Coins, setCoins] = useState<CryptoInfo[]>([]);
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
        headers: { accept: 'application/json', 'x-cg-pro-api-key': token }
    }

    const getData = async () => {
        try {
            const res = await axios.get(url.coinMarkets)
            console.log(res.data)
            setCoins(res.data)

        } catch (err) {
            console.log(err + 'aqui deu erro lembra de ler o nome do erro')
        }
    }
    // useEffect(()=>{
    //     getData()
    // },[])

    const renderedItems = 
    Coins.map((item: any) => {
        return (
            <div className='overflow-hidden'>
            <Link href={`./${item.id}`} key={item.id} className=' grid grid-cols-1 '>
            <div className='font-light mb-2 p-2 border-gray-400 border-2 bg-indigo-900 rounded hover:bg-gray-200 transition duration-1000 ease-in-out flex items-center space-x-5 cursor-pointer overflow-hidden'>
            <p className='font-bold'>{item.market_cap_rank}º</p>
            <img src={item.image} alt={item.name} width={32} height={32} className='rounded-full'/>
            <p>{item.name}</p>
            <p>Current Price: {item.current_price}</p> 
            </div>
            </Link>
            </div>
        );
    });

    return (
        <section className='relative min-h-[80vh] max-h-[80vh] lg:w-[60rem] sm:w-[30rem] p-4 rounded-lg m-auto bg-indigo-950 overscrol'>
            <button onClick={getData} className='font-extrabold'>CLICA AQUI PRA CHAMAR </button>
            {renderedItems} 

        </section> 
    )
}