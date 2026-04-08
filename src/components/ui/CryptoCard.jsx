import React from 'react';
import { Card, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Text } = Typography;

const CryptoCard = ({ currency, price, marketCap, change }) => {
  if (!currency) return null;

  return (
    <Link to={`/crypto/${currency.uuid}`} style={{ display: 'block' }}>
      <Card
        hoverable
        className="premium-card dashboard-fade-in"
        bodyStyle={{ padding: 18 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
          <div style={{ minWidth: 0 }}>
            <Text style={{ fontWeight: 800, color: 'rgba(255,255,255,0.95)' }}>
              {currency.rank}. {currency.name}
            </Text>
          </div>
          <img
            src={currency.iconUrl}
            alt={currency.symbol || currency.name}
            style={{ width: 34, height: 34, flex: '0 0 auto' }}
          />
        </div>

        <div style={{ marginTop: 14, display: 'grid', gap: 8 }}>
          <Text className="muted">Price: <span style={{ color: 'rgba(255,255,255,0.92)', fontWeight: 700 }}>{price}</span></Text>
          <Text className="muted">Market Cap: <span style={{ color: 'rgba(255,255,255,0.92)', fontWeight: 700 }}>{marketCap}</span></Text>
          <Text className="muted">
            Daily Change:{' '}
            <span style={{ color: Number(change) >= 0 ? 'var(--success)' : 'var(--danger)', fontWeight: 800 }}>
              {change}%
            </span>
          </Text>
        </div>
      </Card>
    </Link>
  );
};

export default CryptoCard;

