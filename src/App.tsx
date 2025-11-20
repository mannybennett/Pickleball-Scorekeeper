import { useState, useEffect } from 'react';
import './App.css';

function App() {
  
const [players, setPlayers] = useState<string[]>(['Player 1','Player 2','Player 3','Player 4']);
const [score, setScore] = useState<number[]>([0, 0, 2]); // [Team1, Team2, Server]
const [turn, setTurn] = useState<number>(1); // 1 = Team1, 2 = Team2
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
  const pointWinner = 1;
  if (turn === pointWinner) {
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
  const pointWinner = 2;
  if (turn === pointWinner) {
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

const handlePlayerNames = (e: React.ChangeEvent<HTMLInputElement>, index: number): void => {
  const newPlayers = [...players];
  newPlayers[index] = e.target.value;
  setPlayers(newPlayers);
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
          {
            players.map((player, i) => (
              <div className='input-container' key={i}>
                <p>{`Player ${i+1}:`}</p>
                <input id={`player${i}`} type="text" maxLength={15} value={player} onChange={(e) => handlePlayerNames(e, i)}/>
              </div>
            ))
          }
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
                {`${score[1] % 2 === 0 ? players[3] : players[2]}`}
              </div>
              <div className='service2'>
                {`${score[1] % 2 === 0 ? players[2] : players[3]}`}
              </div>
            </div>
            <div id='kitchen1'>Team 2</div>
          </section>
          <section id='bottom' onClick={handleTeam1Score}>
            <div id='kitchen2'>Team 1</div>
            <div className='services'>
              <div className='service1'>
                {`${score[0] % 2 === 0 ? players[1] : players[0]}`}
              </div>
              <div className='service2'>
                {`${score[0] % 2 === 0 ? players[0] : players[1]}`}
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