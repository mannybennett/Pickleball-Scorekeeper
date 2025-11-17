import { useState, useEffect } from 'react';
import './App.css';

function App() {
const [player1, _setPlayer1] = useState<string>('Player 1');
const [player2, _setPlayer2] = useState<string>('Player 2');
const [player3, _setPlayer3] = useState<string>('Player 3');
const [player4, _setPlayer4] = useState<string>('Player 4');
const [score, setScore] = useState<number[]>([0, 0, 2]); // [Team1, Team2, Server]
const [turn, setTurn] = useState<number>(1); // 1 = Team1, 2 = Team2
const [_pointWinner, setPointWinner] = useState<number>(1); // 1 = Team1, 2 = Team2
const [gameWinner, setGameWinner] = useState<string>('Team');
const [winnerDisplay, setWinnerDisplay] = useState<string>('none');
const [courtDisplay, setCourtDisplay] = useState<string>('flex');

useEffect(() => {
  if (score[0] === 11 || score[1] === 11) {
    handleGameWinner();
  };
}, [score]);

const handleGameWinner = (): void => {
  if (score[0] === 11) {
    setGameWinner('Team 1');
  } else {
    setGameWinner('Team 2');
  };
  setCourtDisplay('none');
  setWinnerDisplay('flex');
};

const handleServer = (): void => {
  console.log('Switch server')
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
  setWinnerDisplay('none');
  setCourtDisplay('flex');
  setGameWinner('Team');
};

  return (
    <main>
      <div id='container'>
        <div id='winner' style={{ display: winnerDisplay }}>
          <h2>WINNER</h2>
          <h1>{gameWinner}</h1>
        </div>
        <div id='court' style={{ display: courtDisplay }}>
          <section id='top' onClick={handleTeam2Score}>
            <div className='services'>
              <div className='service1'>
                {`${score[1] % 2 === 0 ? player4 : player3}`}
              </div>
              <div className='service2'>
                {`${score[1] % 2 === 0 ? player3 : player4}`}
              </div>
            </div>
            <div id='kitchen1'>Team 2</div>
          </section>
          <section id='bottom' onClick={handleTeam1Score}>
            <div id='kitchen2'>Team 1</div>
            <div className='services'>
              <div className='service1'>
                {`${score[0] % 2 === 0 ? player2 : player1}`}
              </div>
              <div className='service2'>
                {`${score[0] % 2 === 0 ? player1 : player2}`}
              </div>
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