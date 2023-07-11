import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  //c='Ujjawal';
  state = {
    progress:0
  }
  setProgress = (progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
           height = {3}
           color='#f11946'
           progress={this.state.progress}
          //  onLoaderFinished={() => setProgress(0)}
           />
          <Routes>
            <Route
              path="/"
              element={
                <News setProgress = {this.setProgress}  pageSize={9} key="general" country="in" category="general" />
              }
            />
            <Route
              path="/business"
              element={
                <News setProgress = {this.setProgress} 
                  pageSize={9}
                  key="business"
                  country="in"
                  category="business"
                />
              }
            />
            <Route
              path="/entertainment"
              element={
                <News setProgress = {this.setProgress} 
                  pageSize={9}
                  key="entertainment"
                  country="in"
                  category="entertainment"
                />
              }
            />
            <Route
              path="/health"
              element={
                <News setProgress = {this.setProgress} 
                  pageSize={9}
                  key="health"
                  country="in"
                  category="health"
                />
              }
            />
            <Route
              path="/science"
              element={
                <News setProgress = {this.setProgress} 
                  pageSize={9}
                  key="science"
                  country="in"
                  category="science"
                />
              }
            />
            <Route
              path="/sports"
              element={
                <News setProgress = {this.setProgress} 
                  pageSize={9}
                  key="sports"
                  country="in"
                  category="sports"
                />
              }
            />
            <Route
              path="/technology"
              element={
                <News setProgress = {this.setProgress} 
                  pageSize={9}
                  key="technology"
                  country="in"
                  category="technology"
                />
              }
            />
          </Routes>
        </Router>
      </div>
    );
  }
}
