import React, { Component } from 'react';
import Header from './components/header/Header';
import SearchPage from './components/section/SearchPage';
import Footer from './components/footer/Footer';
class Home extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <SearchPage />
        <Footer />
      </div>
    );
  }
}

export default Home;
