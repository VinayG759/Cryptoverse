import React from 'react';
import { Avatar, Card, Typography } from 'antd';

const { Text, Title } = Typography;

const NewsCard = ({ url, title, body, articleImage, providerLogo, providerName, published }) => {
  return (
    <a href={url} target="_blank" rel="noreferrer" style={{ display: 'block' }}>
      <Card hoverable className="premium-card dashboard-fade-in" bodyStyle={{ padding: 18 }}>
        <div className="news-image-container">
          <Title className="news-title" level={4} style={{ color: 'rgba(255,255,255,0.94)', margin: 0 }}>
            {title}
          </Title>
          <img
            src={articleImage}
            alt="news"
            style={{
              width: "104px",
              height: "104px",
              borderRadius: 14,
              objectFit: "cover",
              border: '1px solid rgba(255,255,255,0.10)',
            }}
          />
        </div>

        <div style={{ marginTop: 12 }}>
          <Text style={{ color: 'rgba(255,255,255,0.74)' }}>
            {body?.length > 160 ? `${body.substring(0, 160)}...` : body}
          </Text>
        </div>

        <div className="provider-container" style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
            <Avatar src={providerLogo} alt="news provider" size={28} />
            <Text className="provider-name" style={{ color: 'rgba(255,255,255,0.85)' }}>
              {providerName}
            </Text>
          </div>
          <Text className="muted" style={{ fontSize: 12 }}>
            {published}
          </Text>
        </div>
      </Card>
    </a>
  );
};

export default NewsCard;

