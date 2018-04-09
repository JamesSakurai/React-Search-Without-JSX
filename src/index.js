import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

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
      return entry.API.toLowerCase().includes(this.state.search);
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
    ) : React.createElement(
      'div',
      { className: 'App' },
      React.createElement('input', { type: 'text', onChange: e => {
          this.setState({ search: e.target.value.toLowerCase() });
        } }),
      React.createElement(
        'div',
        null,
        DisplayEntries
      )
    );
  }
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));
registerServiceWorker();
