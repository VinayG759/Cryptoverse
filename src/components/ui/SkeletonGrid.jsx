import React from 'react';
import { Card, Col, Row, Skeleton } from 'antd';

const SkeletonGrid = ({ count = 8 }) => {
  return (
    <Row gutter={[16, 16]}>
      {Array.from({ length: count }).map((_, i) => (
        <Col xs={24} sm={12} lg={6} key={i}>
          <Card className="premium-card" bodyStyle={{ padding: 18 }}>
            <Skeleton active title paragraph={{ rows: 3 }} />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default SkeletonGrid;

