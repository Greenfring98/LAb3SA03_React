import React from 'react';
import './App.css';
import _ from 'lodash';
import CharacterCard from './CharacterCard';
import cat1 from './cat.png'


let message = 'cat'
 
const prepareStateFromWord = (given_word) => {
  let word = given_word.toUpperCase()
  let chars = _.shuffle(Array.from(word))
  return {
    word,
    chars,
    attempt: 1,
    guess: [],
    completed: false,
    reset: 1
  }
}
 
class App extends React.Component {

  state = prepareStateFromWord(message);
  reset =()=>{
    this.setState({
      reset: this.state.reset + 1,
      completed: !this.state.completed
    })
  }
  activationHandler = (c) => {
    let guess = [...this.state.guess, c]
    this.setState({ guess })
    if (guess.length === this.state.chars.length) {
      if (guess.join('').toString() === this.state.word) {
        this.setState({ guess: [], completed: true })
      } else {
        this.setState({ guess: [], attempt: this.state.attempt + 1 })
      }
    }
  }
 
  render() {
    return (
      <center>
      <div>
        <h3>CARD-GAME BY 6035512067 NATTHAPON CHUAISENG SECTION 01</h3>
        <div>
        <img src={cat1} width="300" height="350" />
        </div>
        {
          Array.from(this.state.chars).map((item, index) => (
            <CharacterCard
              value={item}
              key={index}
              attempt={this.state.attempt}
              activationHandler={this.activationHandler}
              reset = {this.state.reset}
            />
          ))
        }
        <h2>Selected</h2>
    
        {
          Array.from(this.state.guess).map((item, index) => (
            <CharacterCard
              value={item}
              key={index}
              activationHandler={this.activationHandler}
            />
          ))
        }  

     
        <div>Round {this.state.attempt}</div>
        {
          this.state.completed && <h4>Complete</h4>
        }
        {
          this.state.completed &&<button onClick={this.reset}>Reset</button>
        }
        
      </div>
      </center>
    )
  }
}
export default App
