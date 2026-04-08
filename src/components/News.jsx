import React from 'react';
import { Row, Col, Empty } from 'antd';
import moment from 'moment';
import demoImage from '../images/allcrypto.jpg';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';

import { NewsCard, SkeletonGrid } from './ui';

const News = ({ simplified }) => {
  const { data: cryptoNews } = useGetCryptoNewsQuery(
    {
      newsCategory: 'Cryptocurrency',
      count: simplified ? 9 : 18,
    },
    
  );

  const items = cryptoNews?.Data || cryptoNews?.articles || [];
  if (!cryptoNews) return <SkeletonGrid count={simplified ? 6 : 12} />;
  if (!items.length) return <Empty description="No news found" style={{ marginTop: 32 }} />;

  return (
    <Row gutter={[16, 16]}>
      {items.map((news, i) => {
        const url = news.URL || news.url;
        const title = news.TITLE || news.title;
        const body = news.BODY || news.description || '';
        const imageUrl = news.IMAGE_URL || news.urlToImage || demoImage;
        const providerLogo =
          news.SOURCE_DATA?.IMAGE_URL ||
          news.SOURCE_DATA?.LOGO_URL ||
          news.source?.icon ||
          news.source?.logo ||
          imageUrl ||
          demoImage;
        const articleImage = imageUrl === providerLogo ? demoImage : imageUrl;
        const published =
          typeof news.PUBLISHED_ON === 'number'
            ? moment.unix(news.PUBLISHED_ON).fromNow()
            : news.publishedAt
              ? moment(news.publishedAt).fromNow()
              : '';

        return (
          <Col xs={24} sm={12} lg={8} key={i}>
            <NewsCard
              url={url}
              title={title}
              body={body}
              articleImage={articleImage}
              providerLogo={providerLogo}
              providerName={news.SOURCE_DATA?.NAME || news.source?.name || 'CoinDesk'}
              published={published}
            />
          </Col>
        );
      })}
    </Row>
  );
};

export default News;