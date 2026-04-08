import React, { useEffect, useMemo, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Col, Row, Typography } from 'antd'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

const {Title} = Typography;

const LineChart = ({coinHistory, currentPrice, coinName, isHistoryFetching}) => {
    // Keep showing the previous chart while new history loads,
    // then animate smoothly to the new dataset when it arrives.
    const [displayHistory, setDisplayHistory] = useState(coinHistory);

    useEffect(() => {
      if (!isHistoryFetching && coinHistory?.data?.history?.length) {
        setDisplayHistory(coinHistory);
      }
    }, [coinHistory, isHistoryFetching]);

    const { coinPrice, coinTimestamp, change } = useMemo(() => {
      const prices = [];
      const timestamps = [];
      const history = displayHistory?.data?.history || [];

      for (let i = history.length - 1; i >= 0; i--) {
        prices.push(Number(history[i]?.price));
        timestamps.push(new Date(history[i]?.timestamp * 1000).toLocaleDateString());
      }

      return {
        coinPrice: prices,
        coinTimestamp: timestamps,
        change: displayHistory?.data?.change,
      };
    }, [displayHistory]);

    const data ={
        labels: coinTimestamp,
        datasets: [
            {
                label: 'Price in usd',
                data: coinPrice,
                fill: false,
                backgroundColor: '#7c5cff',
                borderColor: '#7c5cff',
                pointRadius: 0,
                borderWidth: 2,
                tension: 0.35,
            }

        ]
    }

    const options ={
        responsive: true,
        maintainAspectRatio: true,
        animation: {
          duration: 550,
          easing: 'easeOutQuart',
        },
        interaction: { mode: 'index', intersect: false },
        scales: {
            y: {
                ticks: { beginAtZero: false },
                grid: { color: 'rgba(255,255,255,0.08)' },
            },
            x: {
                grid: { display: false },
                ticks: { color: 'rgba(255,255,255,0.65)' },
            },
        }
    }
  return (
    <>
        <Row className='chart-header'>
            <Title level={2} className='chart-title'>
              {coinName} Price Chart : ({change ?? '—'}%)
            </Title>
            <Col className='price-container'>
                <Title level={5} className='current-change'>
                  Current {coinName} Price: $
                  {' '}
                  {Number(currentPrice) < 1
                    ? Number(currentPrice).toLocaleString(undefined, { maximumFractionDigits: 8 })
                    : currentPrice
                  }
                </Title>
            </Col>
        </Row>
        <div style={{ opacity: isHistoryFetching ? 0.75 : 1, transition: 'opacity 200ms ease' }}>
          <Line data={data} options={options}/>
        </div>
    </>
  )
}

export default LineChart