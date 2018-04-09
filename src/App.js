import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      entries: [],
      loading: true
    };
  }
  
  async componentDidMount() {
    
    await fetch('https://dev.userlite.com/apps/userlitestoreapps/devprojects/v999/sample.htp?v=2').then(results => {
      return results.json();
    }).then(data => {
      this.setState({
        entries: data.entries,
        loading: false
      });
    });
  }
  render() {
    const DisplayEntries = this.state.entries.filter(entry => {
      return entry.API.includes(this.state.search);
    }).map((entry, index) => {
      return React.createElement(
        'div',
        {
          key: index
        },
        entry.API
      );
    });
    return this.state.loading ? React.createElement(
      'div',
      null,
      'Loading...',
      console.log('loading...')
    ) : React.createElement(
      'div',
      { className: 'App' },
      React.createElement('input', { type: 'text', onChange: e => {
          this.setState({ search: e.target.value });
        } }),
      React.createElement(
        'div',
        null,
        DisplayEntries
      )
    );
  }
}

export default App;