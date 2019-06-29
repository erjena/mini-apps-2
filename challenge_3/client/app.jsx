import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);

    const frames = [];
    for (let i = 0; i < 10; i++) {
      frames.push({
        firstRollScore: null,
        secondRollScore: null,
        totalScore: null
      });
    }

    this.state = {
      frameIndex: 0,
      frames: frames
    }

    this.renderRows = this.renderRows.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateScores = this.updateScores.bind(this);
    this.isSpare = this.isSpare.bind(this);
    this.isStrike = this.isStrike.bind(this);
  }

  handleClick(e) {
    this.updateScores(Number(e.target.value));
  }

  updateScores(currScore) {
    const frame = this.state.frames[this.state.frameIndex];
    let frameDone = false;

    if (frame.firstRollScore === null) {
      frame.firstRollScore = currScore;
      if (frame.firstRollScore === 10) {
        frameDone = true;
        frame.totalScore = 10;
      }
    } else if (frame.secondRollScore === null) {
      const frameSum = frame.firstRollScore + currScore
      if (frameSum > 10) {
        alert('Invalid input!');
      } else {
        frame.secondRollScore = currScore;
        frameDone = true;
        frame.totalScore = frameSum;
      }
    }

    if (frameDone) {
      if (this.state.frameIndex > 0) {
        const prevFrame = this.state.frames[this.state.frameIndex-1];
        if (this.isStrike(prevFrame)) {
          prevFrame.totalScore += frame.totalScore;
        } else if (this.isSpare(prevFrame)) {
          prevFrame.totalScore += frame.firstRollScore;
        }
        frame.totalScore += prevFrame.totalScore;
      }
      this.state.frameIndex++;
    }

    this.setState({});
  }

  isStrike(frame) {
    if (frame.firstRollScore === 10) {
      return true;
    }
    return false;
  }

  isSpare(frame) {
    if (frame.firstRollScore + frame.secondRollScore === 10) {
      return true;
    }
    return false;
  }

  renderRows() {
    return this.state.frames.map((frame, i) => {
      const { firstRollScore, secondRollScore, totalScore } = frame;
      return (
          <td key={i} border="1">
            <table border="1">
              <tbody>
                <tr>
                  <th colSpan="2">
                    Frame {i + 1}
                  </th>
                </tr>
                <tr>
                  <td style={{width: "35px", height: "35px"}}>{firstRollScore}</td>
                  <td style={{width: "35px", height: "35px"}}>{secondRollScore}</td>
                </tr>
                <tr>
                  <td style={{fontSize: "22px", height: "35px"}} colSpan="2">
                    {totalScore}
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
      )
    })
  }

  render() {
    return (
      <div>
        <table border="1">
          <tbody>
            <tr>
            {this.renderRows()}
            </tr>
          </tbody>
        </table>
        <br />
        <div className="keypad">
          <button value="0" onClick={this.handleClick} style={{fontSize: "18px"}}>0</button>
          <button value="1" onClick={this.handleClick} style={{fontSize: "18px"}}>1</button>
          <button value="2" onClick={this.handleClick} style={{fontSize: "18px"}}>2</button>
          <button value="3" onClick={this.handleClick} style={{fontSize: "18px"}}>3</button>
          <button value="4" onClick={this.handleClick} style={{fontSize: "18px"}}>4</button>
          <button value="5" onClick={this.handleClick} style={{fontSize: "18px"}}>5</button>
          <button value="6" onClick={this.handleClick} style={{fontSize: "18px"}}>6</button>
          <button value="7" onClick={this.handleClick} style={{fontSize: "18px"}}>7</button>
          <button value="8" onClick={this.handleClick} style={{fontSize: "18px"}}>8</button>
          <button value="9" onClick={this.handleClick} style={{fontSize: "18px"}}>9</button>
          <button value="10" onClick={this.handleClick} style={{fontSize: "18px"}}>10</button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
