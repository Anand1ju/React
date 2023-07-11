import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 10,
    category: "General",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    };
  }

  async newsHandler() {
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fa497e531a0849788e798dfcbbb1a8ca&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.newsHandler();
  }

  // prevButtHandler = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.newsHandler();
  // };

  // nextButtHandler = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.newsHandler();
  // };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fa497e531a0849788e798dfcbbb1a8ca&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  render() {
    return (
      <div>
        <div className="container my-3">
          <h1 className="text-center">News Monkey - Top Headlines</h1>
          {/* {this.state.loading && <Spinner />} */}
          <div className="row my-3">
            <InfiniteScroll
              dataLength={this.state.articles.length}
              next={this.fetchMoreData}
              hasMore={this.state.articles.length !== this.state.totalResults}
              loader={this.state.page<Math.ceil(this.state.totalResults/this.props.pageSize)&&<Spinner />}
            >
              <div className="container">
                <div className="row">
                  {this.state.articles.map((element) => {
                    return (
                      <div className="col md-3" key={element.url}>
                        <NewsItem
                          title={
                            element.title ? element.title.slice(0, 40) : " "
                          }
                          description={
                            element.description
                              ? element.description.slice(0, 80)
                              : " "
                          }
                          imageUrl={
                            element.urlToImage
                              ? element.urlToImage
                              : "https://static.india.com/wp-content/uploads/2023/01/motorola-2.jpg"
                          }
                          newsUrl={element.url}
                          author={element.author}
                          date={element.publishedAt}
                          name={element.source.name}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </InfiniteScroll>
          </div>
        </div>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-primary "
            onClick={this.prevButtHandler}
          >
            &larr; Prev
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-primary "
            onClick={this.nextButtHandler}
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
  }
}
