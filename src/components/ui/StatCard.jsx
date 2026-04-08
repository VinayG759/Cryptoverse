import React from 'react';
import { Card, Typography } from 'antd';

const { Text, Title } = Typography;

const StatCard = ({ label, value, hint, icon }) => {
  return (
    <Card className="premium-card dashboard-fade-in" bodyStyle={{ padding: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ minWidth: 0 }}>
          <Text className="muted" style={{ display: 'block', fontWeight: 600 }}>
            {label}
          </Text>
          <Title level={3} style={{ margin: '8px 0 2px', color: 'rgba(255,255,255,0.96)' }}>
            {value}
          </Title>
          {hint ? (
            <Text className="muted" style={{ fontSize: 12 }}>
              {hint}
            </Text>
          ) : null}
        </div>
        {icon ? (
          <div className="chip" style={{ height: 40, width: 40, justifyContent: 'center' }}>
            {icon}
          </div>
        ) : null}
      </div>
    </Card>
  );
};

export default StatCard;

