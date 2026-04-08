import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Row, Col, Input, Empty } from 'antd';

import {useGetCryptosQuery} from '../services/cryptoApi'
import { CryptoCard, SkeletonGrid } from './ui';

const formatPrice = (value) => {
  const n = Number(value);
  if (!Number.isFinite(n)) return value;
  if (Math.abs(n) < 1) {
    // Show a readable decimal for sub-$1 prices (no millify)
    return n.toLocaleString(undefined, { maximumFractionDigits: 8 });
  }
  return millify(n);
};

const Cryptocurrencies = ({simplified}) => {
  const count = simplified ? 10 : 100;
  const {data: cryptoList , isFetching} = useGetCryptosQuery(count);
  const [cryptos , setCryptos] = useState([]);
  const [searchTerm , setSerachTerm] = useState('');

  useEffect(()=>{
    
    const filteredData = cryptoList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()));
    setCryptos(filteredData)
    
  },[cryptoList,searchTerm])

  if(isFetching) return (<SkeletonGrid count={simplified ? 4 : 12} />);
    return (
      <>
        {!simplified && (
          <div className='search-crypto'>
            <Input
              type="text"
              placeholder='Search cryptocurrencies'
              onChange={(e) => setSerachTerm(e.target.value)}
              className='search-input'
              allowClear
            />
          </div>
        )}
        
        {!cryptos?.length ? (
          <Empty description="No cryptocurrencies found" style={{ marginTop: 32 }} />
        ) : (
          <Row gutter={[16,16]} className='crypto-card-container'>
            {cryptos?.map((currency)=>(
              <Col xs={24} sm={12} lg={6} key={currency.uuid}>
                <CryptoCard
                  currency={currency}
                  price={formatPrice(currency.price)}
                  marketCap={millify(currency.marketCap)}
                  change={currency.change}
                />
              </Col>
            ))}
          </Row>
        )}
      </>
    )
}

export default Cryptocurrencies