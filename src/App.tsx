import { useState } from 'react';
import './App.css';

function App() {
const [player1, setPlayer1] = useState<string>('Player 1');
const [player2, setPlayer2] = useState<string>('Player 2');
const [player3, setPlayer3] = useState<string>('Player 3');
const [player4, setPlayer4] = useState<string>('Player 4');
const [score, setScore] = useState<number[]>([0, 0, 2]);
const [turn, setTurn] = useState<number>(1);

const handleTeam1Score = (): void => {
  setScore(prev => {
    const newScore = [...prev];
    newScore[0] += 1;
    return newScore;
  });
};

const handleTeam2Score = (): void => {
  setScore(prev => {
    const newScore = [...prev];
    newScore[1] += 1;
    return newScore;
  });
};

const handleReset = (): void => {
  setScore([0, 0, 2]);
};

  return (
    <main>
      <div id='container'>
        <div id='court'>
          <section id='top' onClick={handleTeam1Score}>
            <div className='services'>
              <div className='service1'>{player1}</div>
              <div className='service2'>{player2}</div>
            </div>
            <div id='kitchen1'>Team 1</div>
          </section>
          <section id='bottom' onClick={handleTeam2Score}>
            <div id='kitchen2'>Team 2</div>
            <div className='services'>
              <div className='service1'>{player3}</div>
              <div className='service2'>{player4}</div>
            </div>
          </section>
        </div>
        <footer>
          <div id='score'>{`${score[0]} : ${score[1]} : ${score[2]}`}</div>
          <button id='reset' onClick={handleReset}>Reset</button>
          <button id='players'>Players</button>
        </footer>
      </div>
    </main>
  )
};

export default App;