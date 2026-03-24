import { useState } from 'react';
import { Link } from 'react-router-dom';
import mapsData from '../../data/maps/mapsForSale.json';

export default function MapsPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="container">
      <div className="cs-back-row">
        <Link to="/" className="cs-back-link">← Back to Tavern</Link>
      </div>

      <section className="groupbox party" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h2>Maps for Sale</h2>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: '240px' }}>
            <img
              src="/assets/images/maps.png"
              alt="Maps"
              style={{ width: '240px', borderRadius: '10px' }}
            />
            <p style={{
              margin: '10px 0 0',
              fontFamily: 'serif',
              fontSize: '0.9rem',
              fontStyle: 'italic',
              fontWeight: '700',
              color: '#7a1a1a',
              lineHeight: '1.5',
              textAlign: 'center',
            }}>
              We do not guarantee authenticity of these maps, neither are we responsible for any deaths or injuries that might happen in the pursuit of these treasures.
            </p>
          </div>
          <div className="maps-accordion">
            {mapsData.maps.map((map, i) => (
              <div key={i} className={"maps-accordion-item" + (openIndex === i ? " open" : "")}>
                <button className="maps-accordion-header" onClick={() => toggle(i)}>
                  <span>{map.name}</span>
                  <span className="maps-accordion-arrow">{openIndex === i ? '▾' : '▸'}</span>
                </button>
                {openIndex === i && (
                  <div className="maps-accordion-body">
                    <div className="maps-accordion-img-wrap" style={{ width: '249px' }}>
                      <img src={`/assets/images/${map.image}`} alt={map.name} style={{ border: 'none' }} />
                      <span className="maps-price-badge">{map.price}</span>
                    </div>
                    <div className="maps-accordion-info">
                      <h3>{map.name}</h3>
                      <p>{map.description}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
