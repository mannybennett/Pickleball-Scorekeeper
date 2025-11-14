import { useState } from 'react';
import './App.css';

function App() {
const [player1, _setPlayer1] = useState<string>('Player 1');
const [player2, _setPlayer2] = useState<string>('Player 2');
const [player3, _setPlayer3] = useState<string>('Player 3');
const [player4, _setPlayer4] = useState<string>('Player 4');
const [score, setScore] = useState<number[]>([0, 0, 2]);
const [turn, setTurn] = useState<number>(1);
const [_pointWinner, setPointWinner] = useState<number>(1);

const handleServer = (): void => {
  console.log('Switch server number')
  setScore(prev => {
    const newServer = [...prev];
    newServer[2] === 1 ? newServer[2] = 2 : newServer[2] = 1;
    return newServer;
  });
};

const handleTeam1Score = (): void => {
  const newPointWinner = 1;
  setPointWinner(newPointWinner);
  if (turn === newPointWinner) {
    console.log('Team 1 earned a point')
    setScore(prev => {
      const newScore = [...prev];
      newScore[0] += 1;
      return newScore;
    });
  } else if (score[2] === 1) {
    handleServer();
  } else {
    console.log('Team 1 turn')
    handleServer();
    setTurn(1);
  };
};

const handleTeam2Score = (): void => {
  const newPointWinner = 2;
  setPointWinner(newPointWinner);
  if (turn === newPointWinner) {
    console.log('Team 2 earned a point');
    setScore(prev => {
      const newScore = [...prev];
      newScore[1] += 1;
      return newScore;
    });
  } else if (score[2] === 1) {
    handleServer();
  } else {
    console.log('Team 2 turn')
    handleServer();
    setTurn(2);
  };
};

const handleReset = (): void => {
  setScore([0, 0, 2]);
  setPointWinner(1);
  setTurn(1);
};

  return (
    <main>
      <div id='container'>
        <div id='court'>
          <section id='top' onClick={handleTeam2Score}>
            <div className='services'>
              <div className='service1'>{player3}</div>
              <div className='service2'>{player4}</div>
            </div>
            <div id='kitchen1'>Team 2</div>
          </section>
          <section id='bottom' onClick={handleTeam1Score}>
            <div id='kitchen2'>Team 1</div>
            <div className='services'>
              <div className='service1'>{player2}</div>
              <div className='service2'>{player1}</div>
            </div>
          </section>
        </div>
        <footer>
          <div id='score'>
            {`
              ${turn === 1 ? score[0] : score[1]} : 
              ${turn === 1 ? score[1] : score[0]} : 
              ${score[2]}
            `}
          </div>
          <button id='reset' onClick={handleReset}>Reset</button>
          <button id='players'>Players</button>
        </footer>
      </div>
    </main>
  )
};

export default App;