import React from 'react';
import './App.css';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {value:'',data:[],firstLoad : true}

    this._handleChange = this._handleChange.bind(this);
  }

  _handleChange(e){
    this.setState({ value: e.target.value });
  }
  
  _handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
        const eventSource = await fetch('http://localhost:8080/search?q=' + this.state.value)
        const data = await eventSource.json()
        this.setState({data : data,firstLoad : false, statusCode: eventSource.status})
    }
  }

  render() {
      return (
        <div>
          <div className="container">
            <label htmlFor="search">Search: </label>
            <input id="search" className="searchBox" type="search" onChange={this._handleChange} onKeyDown={this._handleKeyDown} placeholder="for albums and books"></input>
          </div>
          <div className="container">
          {
              this.state.statusCode === 400 && (
                <div>Query parameter should not be empty. Please try with other query string.</div>
              )
          }
          {this.state.data.length === 0 && !this.state.firstLoad && (
              <div>No results found, please search with another term</div>
          )}
          {this.state.data.length > 0  && (
            <table>
              <thead>
              <tr>
                <th>Title</th>
                <th>Authors</th>
                <th>Type</th>
              </tr>
              </thead>
              <tbody>
              {this.state.data.map((item,idx) => {
                return (
                  <tr>
                      <td>{item['title']}</td>
                      <td>{item['authors'].join(",")}</td>
                      <td>{item['type']}</td>
                  </tr>
                 )
              })
              }
              </tbody>
            </table>
          )}
          </div>
        </div>
      );
  }
}

export default App;
