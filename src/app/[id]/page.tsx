import Link from 'next/link'
import React from 'react'
interface Parametro{
  params:{id:string}
}

const CoinPage = () => {
  return (
    <div>
      Nome da Moeda
      <Link href={'./'}>Home</Link>
   
    </div>
  )
}

export default CoinPage
