import { useState, useEffect } from 'react';
import './App.css';

function App() {
const [player1, setPlayer1] = useState<string>('Player 1');
const [player2, setPlayer2] = useState<string>('Player 2');
const [player3, setPlayer3] = useState<string>('Player 3');
const [player4, setPlayer4] = useState<string>('Player 4');
const [score, setScore] = useState<number[]>([0, 0, 2]); // [Team1, Team2, Server]
const [turn, setTurn] = useState<number>(1); // 1 = Team1, 2 = Team2
const [_pointWinner, setPointWinner] = useState<number>(1); // 1 = Team1, 2 = Team2
const [gameWinner, setGameWinner] = useState<string>('Team');
const [winnerDisplay, setWinnerDisplay] = useState<string>('none');
const [playersDisplay, setPlayersDisplay] = useState<string>('none');
const [courtDisplay, setCourtDisplay] = useState<string>('flex');

useEffect(() => {
  if (score[0] >= 10 && score[1] >= 10) {
    if (score[0] - score[1] === 2 || score[0] - score[1] === -2) {
      handleGameWinner();
      return;
    }
  } else if (score[0] === 11 || score[1] === 11) {
      handleGameWinner();
  }
}, [score]);

const handleGameWinner = (): void => {
  if (score[0] > score[1]) {
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
  setPlayersDisplay('none');
  setCourtDisplay('flex');
  setGameWinner('Team');
};

const handlePlayers = (): void => {
  setPlayersDisplay('flex');
  setCourtDisplay('none');
  setWinnerDisplay('none');
};

const handlePlayerNames = (e: React.ChangeEvent<HTMLInputElement>): void => {
  const { id, value } = e.target;
  switch (id) {
    case 'player1':
      setPlayer1(value);
      break;
    case 'player2':
      setPlayer2(value);
      break;
    case 'player3':
      setPlayer3(value);
      break;
    case 'player4':
      setPlayer4(value);
      break;
    default:
      break;
  }
};

const handleDone = (): void => {
  setPlayersDisplay('none');
  if (gameWinner === 'Team') {
    setCourtDisplay('flex');
    setWinnerDisplay('none');
  } else {
    setCourtDisplay('none');
    setWinnerDisplay('flex');
  };
};

  return (
    <main>
      <div id='container'>
        <div id='instruction'>Tap on the rally winner</div>
        {/********************* PLAYERS *********************/}
        <div id='players' style={{ display: playersDisplay }}>
          <div className='input-container'>
            <p>Player 1:</p>
            <input id='player1' type="text" maxLength={15} value={player1} onChange={(e) => handlePlayerNames(e)}/>
          </div>
          <div className='input-container'>
            <p>Player 2:</p>
            <input id='player2' type="text" maxLength={15} value={player2} onChange={(e) => handlePlayerNames(e)}/>
          </div>
          <div className='input-container'>
            <p>Player 3:</p>
            <input id='player3' type="text" maxLength={15} value={player3} onChange={(e) => handlePlayerNames(e)}/>
          </div>
          <div className='input-container'>
            <p>Player 4:</p>
            <input id='player4' type="text" maxLength={15} value={player4} onChange={(e) => handlePlayerNames(e)}/>
          </div>
          <button id='done' onClick={handleDone}>Done</button>
        </div>
        {/********************* WINNER *********************/}
        <div id='winner' style={{ display: winnerDisplay }}>
          <h2>WINNER</h2>
          <h1>{gameWinner}</h1>
        </div>
        {/********************* COURT *********************/}
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
        {/********************* SCORE/BUTTONS *********************/}
        <footer>
          <div id='score'>
            {`
              ${turn === 1 ? score[0] : score[1]} : 
              ${turn === 1 ? score[1] : score[0]} : 
              ${score[2]}
            `}
          </div>
          <button onClick={handleReset}>Reset</button>
          <button onClick={handlePlayers}>Players</button>
        </footer>
      </div>
    </main>
  )
};

export default App;