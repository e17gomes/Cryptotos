'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios';
import BackgroundDn from '../Components/Background'
import CryptoChart from '../Components/CryptoChart';





const CoinPage = () => {
  const params = useParams<{ tag: string; item: string; id: string }>()
  const id = params.id
  const token = process.env.apiKey
  const [Coin, setCoin] = useState('')
  const [ImgCoin, setImgCoin] = useState('')
  const options = {
    method: 'GET',
    url: 'https://api.coingecko.com/api/v3/coins/' + id,
    headers: { accept: 'application/json', }
  };

  const getCoinData = async () => {
    try {
      const res = await axios.get(options.url)
      console.log(res.data)
      setImgCoin(res.data.image.large)
      setCoin(res.data.name)

    } catch (err) {
      console.log(err + 'aqui deu erro lembra de ler o nome do erro')
    }
  }
  return (
    <div>

      <BackgroundDn className='relative'>
        <img src={ImgCoin} alt={Coin} width={64} className='m-auto min-h-[64px]' />
        <article>
        </article>
          
        <button onClick={getCoinData} className='absolute z-50 '> clica</button>
        <div className=' min-h-[35rem] w-[90vw] bg-gray-400/30 border backdrop-blur-sm border-indigo-700 rounded-lg shadow-gray-400 shadow-md text-center' >
        <h1 className='text-3xl min-h-[30px] font-bold text-transparent bg-clip-text bg-gradient-to-t from-slate-800 via-slate-500 to-slate-900 mt-2' >{Coin}</h1>
          <section className='  min-h-96 w-11/12 rounded-lg m-auto mt-20'>
            <CryptoChart cryptoId={id}/>
          </section>
        </div>
      </BackgroundDn>
    </div>
  )
}

export default CoinPage
