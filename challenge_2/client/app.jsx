import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Chart from 'chart.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dates: [],
      prices: [],
      startDate: '',
      endDate: '',
      showData: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleClick(event) {
    axios.get('/historicalprice', {
      params: {
        start: this.state.startDate,
        end: this.state.endDate
      }
    })
      .then((response) => {
        let timeArray = [];
        let priceArray = [];
        for (let key in response.data) {
          timeArray.push(key);
          priceArray.push(response.data[key]);
        }
        this.setState({
          dates: timeArray,
          prices: priceArray,
          showData: true
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    if (this.state.showData) {
      const ctx = document.getElementById('myChart');
      let MyChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.state.dates,
          datasets: [{
            label: 'price',
            data: this.state.prices
          }]
        },
        // options: {
        //   xAxes: [{
        //     type: 'time',
        //     time: {
        //       displayFormats: {
        //         day: 'YYYY MMM D'
        //       }
        //     }
        //   }],
        //   yAxes: [{
        //     type: 'price',
        //     ticks: {
        //       beginAtZero: true
        //     }
        //   }]
        // }
      })
      return (
        <MyChart />
      )
    }
    return (
      <div>
        <h3>Input date range in YYYY-MM-DD format</h3>
        <p>Start Date</p>
        <input type="text" required id="startDate" onChange={this.handleChange} />
        <p>End Date</p>
        <input type="text" required id="endDate" onChange={this.handleChange} />
        <button onClick={this.handleClick}>Search..</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));