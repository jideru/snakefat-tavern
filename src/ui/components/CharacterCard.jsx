import { useState } from 'react';
import { Link } from 'react-router-dom';
import CharacterToolTip from './CharacterToolTip.jsx';

export default function CharacterCard({ c }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const imageSrc = c.image ? `/assets/thumbs/${c.image}` : null;

  const handleMouseEnter = (e) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY });
    setShowTooltip(true);
  };

  const handleMouseMove = (e) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <>
      <Link
        to={`/character/${encodeURIComponent(c.name)}`}
        className="card-link"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className={`card ${c.role}`}>
        <div className="card-header">
          {imageSrc && (
            <img className="card-image" src={imageSrc} alt={`${c.name} thumbnail`} />
          )}

          <div className="card-header-info">
            <h2>{c.name}</h2>
            {c.role === 'retainer' && (
              <p style={{ margin: 0, fontSize: '0.85em', letterSpacing: '0.08em' }}>
                RETAINER
              </p>
            )}
            {c.role === 'hireling' ? (
              <p style={{ margin: 0, fontSize: '0.85em', letterSpacing: '0.08em' }}>
                HIRELING
              </p>
            ) : (
              c.role !== 'hireling' && (
                <>
                  <div style={{ fontSize: '0.95em', fontWeight: 500, marginBottom: '-2px' }}>{c.race}</div>
                  <div style={{ fontSize: '0.95em', fontWeight: 500, marginBottom: '-2px' }}>{c.class}</div>
                  <div style={{ fontSize: '0.95em', fontWeight: 500, marginBottom: '-2px' }}>Level {c.level}</div>
                </>
              )
            )}
          </div>
        </div>

        <div className="basic-stats">
          HP: {c.hp} • AC: {c.ac}
        </div>

        <div className="card-left">
          <div className="ability-grid">
            <div className="ability">
              <div className="ability-label">STR</div>
              <div className="ability-value">{c.str}</div>
            </div>
            <div className="ability">
              <div className="ability-label">INT</div>
              <div className="ability-value">{c.int}</div>
            </div>
            <div className="ability">
              <div className="ability-label">DEX</div>
              <div className="ability-value">{c.dex}</div>
            </div>
            <div className="ability">
              <div className="ability-label">WIS</div>
              <div className="ability-value">{c.wis}</div>
            </div>
            <div className="ability">
              <div className="ability-label">CON</div>
              <div className="ability-value">{c.con}</div>
            </div>
            <div className="ability">
              <div className="ability-label">CHA</div>
              <div className="ability-value">{c.cha}</div>
            </div>
          </div>

          <div className="save-line">
            D: {c.deathSave} / P: {c.poisonSave} / W: {c.wandsSave}
            <br />
            B: {c.breathSave} / S: {c.spellSave}
          </div>
        </div>

        <div className="card-body">
          <p style={{ margin: '10px 0 0', fontSize: '0.9em', fontWeight: 600 }}>
            Attack: {c.attack}
          </p>

          {c.hireCost && c.role !== 'player' && (
            <p style={{ margin: '10px 0 0', fontSize: '1em', color: '#4b2e13', fontWeight: 700 }}>
              <b>HIRE COST:</b> {c.hireCost}
            </p>
          )}
        </div>
        </div>
      </Link>
      {showTooltip && <CharacterToolTip character={c} position={tooltipPosition} />}
    </>
  );
}
