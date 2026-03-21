import { useState } from 'react';
import rumours from '../../data/rumours/snakefat-rumours.json';

export default function RumourPage() {
  const [currentRumour, setCurrentRumour] = useState('');

  const getRumour = (level) => {
    const rumourArray = rumours[`level${level}`];
    const randomRumour = rumourArray[Math.floor(Math.random() * rumourArray.length)];
    setCurrentRumour(randomRumour);
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <a href="/" className="rumour-back-link">
          &#8592; Back
        </a>

        {currentRumour && (
          <div className="speech-bubble">
            <p>{currentRumour}</p>
          </div>
        )}

        <div className="bartender-container">
          <img src="/assets/images/bartender.png" alt="Tavern Owner" className="bartender-image" />
        </div>

        <div style={{ display: 'flex', gap: '16px', marginTop: '8px', width: '100%', maxWidth: '469px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => getRumour(1)} className="rumour-tile">
            <img src="/assets/images/copperCoins.png" alt="Copper Coins" className="tile-image" />
            <span className="tile-label">5 Copper</span>
          </button>
          <button onClick={() => getRumour(2)} className="rumour-tile">
            <img src="/assets/images/silverCoins.png" alt="Silver Coins" className="tile-image" />
            <span className="tile-label">5 Silver</span>
          </button>
          <button onClick={() => getRumour(3)} className="rumour-tile">
            <img src="/assets/images/goldCoins.png" alt="Gold Coins" className="tile-image" />
            <span className="tile-label">5 Gold</span>
          </button>
        </div>
      </div>
    </div>
  )
}
