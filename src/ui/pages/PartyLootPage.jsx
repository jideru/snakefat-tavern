import { useParams, Link } from 'react-router-dom';

const gearModules = import.meta.glob('../../data/gear/*.json', { eager: true });
const gearMap = Object.fromEntries(
  Object.entries(gearModules).map(([path, mod]) => [
    path.replace(/.*\/(.+)\.json$/, '$1'),
    mod.default ?? mod,
  ])
);

export default function PartyLootPage() {
  const { slug } = useParams();
  const item = gearMap[slug];

  if (!item) {
    return (
      <div className="container">
        <Link to="/" className="cs-back-link">&#8592; Back</Link>
        <p>Loot not found.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="cs-back-row">
        <Link to="/" className="cs-back-link">&#8592; Back</Link>
      </div>

      <div className="cs-sheet" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', width: '100%' }}>
          {item.image && (
            <img
              src={`/assets/images/${item.image}`}
              alt="Party Loot"
              style={{ width: '240px', flexShrink: 0, borderRadius: '10px', border: '2px solid #c8aa80' }}
            />
          )}

          <table style={{ flex: 1, borderCollapse: 'collapse', fontFamily: 'serif', fontSize: '0.95rem' }}>
            <thead>
              <tr style={{ background: '#4b2e13', color: '#ffe7a0' }}>
                <th style={{ textAlign: 'left', padding: '8px 12px', fontFamily: "'Pirata One', serif", letterSpacing: '0.08em', fontWeight: 'normal' }}>Item</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', fontFamily: "'Pirata One', serif", letterSpacing: '0.08em', fontWeight: 'normal' }}>Type</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', fontFamily: "'Pirata One', serif", letterSpacing: '0.08em', fontWeight: 'normal' }}>Description</th>
                <th style={{ textAlign: 'right', padding: '8px 12px', fontFamily: "'Pirata One', serif", letterSpacing: '0.08em', fontWeight: 'normal' }}>Qty</th>
              </tr>
            </thead>
            <tbody>
              {item.partyloot.map((loot, i) => (
                <tr
                  key={i}
                  style={{ background: i % 2 === 0 ? '#fffaf2' : '#f5ecdf' }}
                >
                  <td style={{ padding: '7px 12px', fontWeight: 600 }}>{loot.name}</td>
                  <td style={{ padding: '7px 12px', color: '#6b4c1b', textTransform: 'capitalize' }}>{loot.type}</td>
                  <td style={{ padding: '7px 12px', color: '#3a2200' }}>{loot.description}</td>
                  <td style={{ padding: '7px 12px', textAlign: 'right', fontWeight: 700 }}>{loot.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
