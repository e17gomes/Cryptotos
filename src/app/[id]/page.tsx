'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios';
import BackgroundDn from '../Components/Background'
import CryptoChart from '../Components/CryptoChart';
import Footer from '../Components/Footer';





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
      console.log(err)
    }
  }
useEffect(()=>{
  getCoinData()
},[])

  return (
    <div>

      <BackgroundDn className='relative'>
        <img src={ImgCoin} alt={Coin} width={80} loading='eager'  className='m-auto min-h-[64px] mb-5 rounded-full' />
        <h1 className='text-3xl min-h-[30px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400  to-blue-700  mt-2 text-center' >{Coin}</h1>
        <div className=' min-h-[35rem] w-[90vw] bg-gray-400/30 border backdrop-blur-sm border-indigo-700 rounded-lg shadow-gray-400 shadow-md text-center' >
          <section className='  min-h-96 w-11/12 rounded-lg m-auto mt-20'>
            <CryptoChart cryptoId={id}/>
          </section>
        </div>
      </BackgroundDn>
      <Footer/>
    </div>
  )
}

export default CoinPage
