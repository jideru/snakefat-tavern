
import CharacterCard from "../components/CharacterCard"
import data from "../../data/characters/index.js"

export default function HomePage() {
  const roleOrder = { player: 1, retainer: 2, hireling: 3 };
  const party = data.filter((c) => c.hired === true && c.role !== "npc").sort((a, b) => roleOrder[a.role] - roleOrder[b.role]);
  const forHire = data.filter((c) => c.hired !== true && c.role !== "npc").sort((a, b) => roleOrder[a.role] - roleOrder[b.role]);

  return (
    <div className="container">
      <div className="logo-row">
        <img src="/assets/images/aa2.png" alt="The Tavern Logo" style={{ minWidth: '196px', minHeight: '196px', width: '196px', height: '196px',  objectFit: 'contain' }} />
        <img src="/assets/images/adventurerAleBoard.png" alt="The Tavern Logo Text" className="logotext-img" style={{ marginRight: '18px', objectFit: 'contain', height: '196px' }} />
      </div>

      <div className="main-content">
        <div className="info-card-multi">
          <div className="info-card-retainer">
            <h3>Retainers:</h3>
            <p>A retainer is a fully playable npc character that joins the party with a class and level. They are paid a share and put their lives on the line for the party. Retainers have a high loyalty score.</p>
          </div>
          <div className="info-card-hireling">
            <h3>Hireling:</h3>
            <p>Hirelings are mules, they carry items and can perform small tasks. Examples are, holding a rope to descend from, hold a torch, carrying items, etc. They receive a fee a day and have a normal loyalty score. Everytime they are put in danger they must succeed a morale check.</p>
          </div>
          <div className="info-card-shares">
            <h3>Shares:</h3>
            <p>Retainers receive a full or part of a share combined with a fee.</p>
          </div>
        </div>

        <div className="party-section">
          <section className="groupbox party">
            <h2 style={{ margin: 0 }}>The Snakefat Four</h2>
            <div style={{ fontSize: '1em', color: '#6b4c1b', margin: '6px 0 14px 2px', fontWeight: 500, letterSpacing: '0.01em' }}>
              They earned their name by being the survivors of the Darkspire Expedition
            </div>
            <div className="grid">
              {party.map((c) => (
                <CharacterCard key={c.name} c={c} />
              ))}
            </div>
          </section>

          <section className="groupbox for-hire">
            <h2>For Hire</h2>
            <div className="grid">
              {forHire.map((c) => (
                <CharacterCard key={c.name} c={c} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
