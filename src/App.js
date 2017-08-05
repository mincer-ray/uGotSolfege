import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      context: new AudioContext,
      freqs: [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25],
      translate: {
        261.63 : 'DO',
        293.66 : 'RE',
        329.63 : 'MI',
        349.23 : 'FA',
        392.00 : 'SOL',
        440.00 : 'LA',
        493.88 : 'TI',
        523.25 : 'DO',
      },
      guess: 0,
      secret: 100,
    }
    this.playScale = this.playScale.bind(this);
    this.playRandom = this.playRandom.bind(this);
    this.setGuess = this.setGuess.bind(this);
  }

  componentDidMount() {
    const source = this.state.context.createOscillator();
    source.connect(this.state.context.destination);
    source.frequency.value = 0;
    source.start()

    this.setState({
      source,
    });
  }

  playScale() {
    let i = 0;
    let id = setInterval(() => {
      if (i === this.state.freqs.length) {
        clearInterval(id);
        this.state.source.frequency.value = 0;
        this.playRandom()
        return;
      }
      this.state.source.frequency.value = this.state.freqs[i];
      i++;
    }, 500)
  }

  playRandom() {
    const secret = this.state.freqs[Math.floor(Math.random() * 8)];
    this.state.source.frequency.value = secret;
    setTimeout(() => {
      this.getGuess()
      this.state.source.frequency.value = 0;
    }, 500);

    this.setState({
      secret,
    })
  }

  rightOrWrong() {
    if (this.state.guess === this.state.secret) {
      return "Correct"
    } else {
      return "Incorrect"
    }
  }

  getGuess() {
  }

  setGuess(e) {
    this.setState({
      guess: parseFloat(e.currentTarget.value),
    })
  }

  render() {
    return (
      <div className="App">
        <h1>This is a game for learning your solfèggèè</h1>
        <button onClick={this.playScale}>play scale</button>
        <ul>
          {this.state.freqs.map((freq) => {
            return <li><button value={freq} onClick={this.setGuess}>{this.state.translate[freq]}</button></li>
          })
          }
        </ul>
        <div className="guess">{this.rightOrWrong()}</div>
      </div>
    );
  }
}

export default App;
