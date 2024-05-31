import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const CryptoChart = ({ cryptoId = '', vsCurrency = 'usd', }) => {
  const [chartData, setChartData] = useState([]);
  const [days, setDays] = useState('1');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart`,
          {
            params: {
              vs_currency: vsCurrency,
              days: days,
            },
          }
        );

        const prices = response.data.prices.map((price:any) => ({
          date:
            days === '1'
              ? new Date(price[0]).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : new Date(price[0]).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                }),
          price: price[1].toFixed(2),
        }));

        setChartData(prices);
      } catch (error) {
        console.error('Error fetching data from CoinGecko', error);
      }
    };

    fetchData();
  }, [cryptoId, vsCurrency, days]);

  const handleDaysChange = (event:any) => {
    setDays(event.target.value);
  };

  return (
    <div className='relative'>
       <select id="days" value={days} onChange={handleDaysChange}  className=' rounded-full p-1 shadow shadow-black absolute right-12 z-50 mb-10'>
          <option value="1">24 hours</option>
          <option value="7">7 days</option>
          <option value="15">15 days</option>
          <option value="31">31 days</option>
        </select> 
      <h2>{cryptoId.charAt(0).toUpperCase() + cryptoId.slice(1)} Price Chart</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="price"
            dot={false}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CryptoChart
