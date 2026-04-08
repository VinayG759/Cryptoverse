import React from 'react';
import millify from 'millify';
import { Typography , Row , Col } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import {Cryptocurrencies , News} from '../components'
import { StatCard, SkeletonGrid } from './ui';
import { GlobalOutlined, ThunderboltOutlined, FundOutlined, SwapOutlined } from '@ant-design/icons';

const {Title} = Typography;

const Homepage = () => {
  const {data , isFetching} = useGetCryptosQuery(10);

  const globalStats = data?.data?.stats;
  const formatMarketCap = (value) => {
    const n = Number(value);
    if (!Number.isFinite(n) || n <= 0) return '—';
    if (n >= 1e12) return `${(n / 1e12).toFixed(2)}T`;
    return millify(n);
  };

  return (
    <>
      <Title level={2} className='section-title'>Overview</Title>

      {isFetching ? (
        <SkeletonGrid count={4} />
      ) : (
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <StatCard label="Total Cryptocurrencies" value={globalStats?.total ?? '—'} icon={<GlobalOutlined />} />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard label="Total Exchanges" value={globalStats?.totalExchanges ? millify(globalStats.totalExchanges) : '—'} icon={<SwapOutlined />} />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard label="Market Cap" value={formatMarketCap(globalStats?.totalMarketCap)} icon={<FundOutlined />} />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard label="24h Volume" value={globalStats?.total24hVolume ? millify(globalStats.total24hVolume) : '—'} icon={<ThunderboltOutlined />} />
          </Col>
        </Row>
      )}

      <div className='home-heading-container'>
          <Title level={3} className='section-title' style={{ margin: 0 }}>Top Cryptocurrencies</Title>
          <Title level={5} className='show-more' style={{ margin: 0 }}><Link to='/cryptocurrencies'>View all</Link></Title>
      </div>
      <Cryptocurrencies simplified/>
      <div className='home-heading-container'>
          <Title level={3} className='section-title' style={{ margin: 0 }}>Latest News</Title>
          <Title level={5} className='show-more' style={{ margin: 0 }}><Link to='/news'>View all</Link></Title>
      </div>
      <News simplified/>
    </>
  )
}

export default Homepage