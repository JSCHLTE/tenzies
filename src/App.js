import { useState, useEffect } from 'react';
import './App.css';
import Die from './Die';
import { v4 as uuidv4 } from 'uuid'; //Generates unique keys for dice.
import Particle from './Particle';

function App() {
  const [dice, setDice] = useState(allNewDice()); //Holds all dice in state.
  const [tenzies, setTenzies] = useState(false); //If true game is won.
  const [rollCount, setRollCount] = useState(0); //Tracks how many times the user clicked the roll button.

  //Everytime dice state changes this will check if game win conditions are met.
  useEffect(()=> {
    let checkIfHeld = dice.every((die) => die.isHeld);
    let checkIfSame = dice.every((die) => die.value === dice[0].value);
    if(checkIfHeld && checkIfSame) {
      winGame();
    }
  }, [dice]);

  //This will run when tenzies is true, aka they win the game.
  function winGame() {
    setTenzies(true);
  };

  //Resets the game.
  function resetGame() {
    setTenzies(false)
    setDice(allNewDice());
    setRollCount(0);
  }

  //How the dice is generated.
  function genDie() {
    return {
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
      key: uuidv4()
    };
  };

  //Will generate all new dice even if the dice are held.
  function allNewDice() {
    const arr = [];
    for(let i = 0; i < 10; i++) {
      arr.push(genDie())
    };
    return arr;
  };

  //Once re-roll is clicked will check if the die is held or not, if the die isn't held a new die number will be generated.
  function getDice() {
    if(tenzies) {
      window.location.reload();
    };
    setRollCount(oldCount => {
      return oldCount + 1;
    });
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? die : genDie();
    }));
  };

  //Changes the isHeld key on the die to true or false.
  function handleDieClick(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.key === id ? {...die, isHeld: !die.isHeld} : die;
    }));
  };

  const tenDie = dice.map(die => {
    return <Die dieValue={die.value} key={die.key} isDieHeld={die.isHeld} dieClick={() => handleDieClick(die.key)}/>;
  });

  return (
    <div className='wrapper'>
    {tenzies ? <Particle /> : ""}
      <div className="appWrapper">
        <div>
          {tenzies ? "" : <p>Number of Rolls: {rollCount}</p>}
        </div>
          {tenzies ? "" : <div className='diceWrapper'>{tenDie}</div>}
          {tenzies ? <h2 className='winMsg'>You rolled tenzies in {rollCount} rolls!</h2> : ""}
            <div className='buttonWrapper'>
              <button onClick={getDice} id='rollBtn'>{tenzies ? "New Game" : "Re-roll"}</button>
              {rollCount && !tenzies ? <button onClick={resetGame} id='resetBtn'>Reset Game</button> : ""}
            </div>
      </div>
      <a className='watermark' href="jschlte.github.io" target='_blank'>Jordan Developed</a>
    </div>
  );
};

export default App;
