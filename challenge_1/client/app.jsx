import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      data: [],
      showData: false,
      listOfData: 10
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      value: event.target.value
    });
  }

  handleSearch(event) {
    axios.get(`/events?q=${this.state.value}&_page=${this.state.listOfData}`)
      .then((response) => {
        this.setState({
          data: response.data,
          showData: true
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    if (this.state.showData) {
      let i = 1;
      const events = this.state.data;
      return (
        <div>
          <ul>
            {events.map((event) =>
              <li key={i++}>
                <p>DATE: {event.date}</p>
                <p>PLACE: {event.category2}</p>
                <p>DESCRIPTION: {event.description}</p>
              </li>
            )}
          </ul>
        </div>
      )
    }
    return (
      <div>
        <h3>Search for historical events</h3>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));