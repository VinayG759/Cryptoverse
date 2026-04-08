import React from 'react';
import { Card, Skeleton } from 'antd';

const Loader = () => (
  <div className="loader">
    <Card className="premium-card" bodyStyle={{ padding: 18, width: 420, maxWidth: '92vw' }}>
      <Skeleton active title paragraph={{ rows: 4 }} />
    </Card>
  </div>
);

export default Loader;