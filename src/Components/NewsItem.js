import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, author, date, name} = this.props;
    return (
      <div className="my-3">
        <div className="card" style = {{width:'23rem'}}>
          <img src={imageUrl} className="card-img-top" style = {{height:'15rem', width:'23rem'}} alt="..." />
          <div className="card-body">
            <span className="badge rounded-pill text-bg-danger float-right float-right" >{name}</span>
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">
              {description}...
            </p>
            
            <a href={newsUrl} rel = "noreferrer" target="_blank" className="btn btn-primary">
              Read More
            </a>
            <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
          </div>
        </div>
      </div>
    );
  }
} 