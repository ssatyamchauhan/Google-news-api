import { Layout } from 'antd';
import fetch from 'isomorphic-unfetch';
import InfiniteScroll from 'react-infinite-scroller';
import '../style/newsfeed.css'
import TimeAgo from 'react-timeago'
import englishString from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

import React from 'react'


const Index = (props) => {

  const [news, setNews] = React.useState(props.news)
  const [totalNews, setTotalNews] = React.useState(20)
  const [isLoad, setIsLoad] = React.useState(true)
  const formatter = buildFormatter(englishString)
  
  // in your react component
  const newsList = news.map(news => {
    return (
      <div className="App">
        <Card className="image-card" >
          <img src={news.urlToImage} alt="Smiley face" />
        </Card>
        <Card className="content-card" >
          <div>
            <h2>
              <a href={news.url}>{news.title}</a></h2>
          </div>
          <div className="myspan">
            <span className="google-news">Google News - </span>
            <span>
              <TimeAgo date={news.publishedAt} formatter={formatter} />
            </span>
          </div>
          <p>{news.description}</p>
        </Card>
      </div>
    )
  })

  const loadMore = async () => {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?pageSize=${totalNews}&country=us&category=business&apiKey=940e132f3a064092a93428e166007ae3`)
    const data = await res.json();
    const total = totalNews + 10;
    setTotalNews(total)
    setNews(data.articles)
    if (totalNews >= 70) {
      setIsLoad(false)
    }
  }

  const overallNews = <InfiniteScroll
    loadMore={loadMore}
    hasMore={isLoad}
    loader={<div className="loader" key={0}>Loading ...</div>}
  >
    {newsList}
  </InfiniteScroll>

  return (
    overallNews
  )
}


Index.getInitialProps = async function () {
  const res = await fetch(`https://newsapi.org/v2/top-headlines?pageSize=${10}&country=us&category=business&apiKey=940e132f3a064092a93428e166007ae3`);
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.articles.length}`);

  return {
    news: data.articles
  };
};

export default Index;