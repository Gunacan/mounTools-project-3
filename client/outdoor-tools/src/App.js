import React, { Component } from 'react';
import './App.css';
import HeaderComponent from './components/HeaderComponent'
import CardsComponent from './components/CardsComponent'
import Footer from './components/Footer'


class App extends Component {
  state = {
    activities: []
  }

  componentDidMount = () => {
    fetch('https://trailist-p3.herokuapp.com/')
      .then(response => response.json())
      .then(data => {
        this.setState({
          activities: data
        })
      })
  }
  
  render() {
    return (
      <React.Fragment>
        <HeaderComponent />
        <CardsComponent activities={this.state.activities}/>
        <Footer />
      </React.Fragment>
    )
  }
}

export default App