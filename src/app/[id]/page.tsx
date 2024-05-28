'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios';




const CoinPage = () => {
  const params = useParams<{ tag: string; item:string; id:string }>()  
  const id = params.id
  const token = process.env.token
  const [Coin, setCoin] = useState('')
  const [Description, SetDescription] = useState('')
  const options = {
    method: 'GET',
    url: 'https://api.coingecko.com/api/v3/coins/'+id,
    headers: {accept: 'application/json', 'x-cg-demo-api-key': token}
  };
  
  const getCoinData = async () => {
    try {
        const res = await axios.get(options.url)
        console.log(res.data)
        SetDescription(res.data.description.en);
        setCoin(res.data.name)

    } catch (err) {
        console.log(err + 'aqui deu erro lembra de ler o nome do erro')
    }
}
  return (
    <div className=' bg-red-300 flex flex-col'>
      <h1 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-t from-slate-800 via-slate-500 to-slate-900'>{Coin}</h1>
      <Link href={'./'}>Home show</Link>
      {id}
    <button onClick={getCoinData}> clica 
    {Description}
    </button>
    </div>
  )
}

export default CoinPage
