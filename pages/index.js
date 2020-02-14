import { Layout, Spin } from 'antd';
import fetch from 'isomorphic-unfetch';
import InfiniteScroll from 'react-infinite-scroller';
<<<<<<< HEAD
=======
import '../style/newsfeed.css'
>>>>>>> 9a70d3a7451e0dc6341c8eb53c956005e0d1e9f3
import TimeAgo from 'react-timeago'
import englishString from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import React from 'react'
const { Header } = Layout;


const Index = (props) => {

  const [news, setNews] = React.useState(props.news)
  const [totalNews, setTotalNews] = React.useState(20)
  const [isLoad, setIsLoad] = React.useState(true)
  const formatter = buildFormatter(englishString)

  // in your react component
  const jsx = news.map((news, ind) => {
    let author = (news.author) ? news.author + " -     " : "Google News -      "
    return (
<<<<<<< HEAD
      <div className="card" key={ind}>
=======
      <div className="Card" key={ind}>
>>>>>>> 9a70d3a7451e0dc6341c8eb53c956005e0d1e9f3
        <div className="content">
          <div>
            <article>
              <div className="first-div">
                <div className="img">
                  <img src={news.urlToImage} alt="Low Internet Connectivity" />
                </div>
                <div className="img-details">
                  <div className="details">
                    <div className="news-name">
                      <h1>{news.title}</h1>
                    </div>
                    <a href={news.url} target="_blank"><div>{news.description}</div></a>
                    <div className="news-place">
                      {author}
                      <TimeAgo className="time" date={news.publishedAt} formatter={formatter} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="divider div-transparent"></div>
            </article>
          </div>
        </div>
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
    loader={<div className="loader" key={0}> <Spin size="large" /></div>}
  >
    {jsx}
  </InfiniteScroll>

  return (
    <div>
      <Layout>
      <Header className="header"><h1>News Api</h1></Header>
      </Layout>
      {overallNews}
    </div>

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