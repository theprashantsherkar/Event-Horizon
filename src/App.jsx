import React from 'react';
import Leaderboard from './leaderboard';
import Bg from './Bg';

function App() {
  return (
    <div>
    <div className='bg-black overflow-y-auto'>
      <Bg />
    </div>
    <Leaderboard />
    </div>
  );
}

export default App;



