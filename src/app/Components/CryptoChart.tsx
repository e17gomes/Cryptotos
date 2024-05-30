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

const CryptoChart = ({ cryptoId = '', vsCurrency = 'usd', days = '30' }) => {
  const [chartData, setChartData] = useState([]);

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
          date: new Date(price[0]).toLocaleDateString(),
          price: price[1].toFixed(2),
        }));

        setChartData(prices);
      } catch (error) {
        console.error('Error fetching data from CoinGecko', error);
      }
    };

    fetchData();
  }, [cryptoId, vsCurrency, days]);

  return (
    <div>
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
