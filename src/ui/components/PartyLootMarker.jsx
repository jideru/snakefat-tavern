import { Link } from 'react-router-dom';

const gearModules = import.meta.glob('../../data/gear/*.json', { eager: true });
const gearItems = Object.entries(gearModules).map(([path, mod]) => ({
  slug: path.replace(/.*\/(.+)\.json$/, '$1'),
  data: mod.default ?? mod,
}));

const cardTitle = (type) => {
  if (type === 'backpack') return 'Party Loot';
  if (type === 'Human') return 'Hireling';
  if (type === 'Mule') return 'Mule';
  return 'Loot';
};

export default function PartyLootMarker() {
  if (gearItems.length === 0) return null;

  return (
    <>
      {gearItems.map(({ slug, data: item }, i) => (
        <Link key={slug} to={`/party-loot/${slug}`} className="party-loot-marker" style={{ top: `calc(40px + ${i * 110}px)` }}>
          {item.imageThumb && (
            <img
              src={`/assets/thumbs/${item.imageThumb}`}
              alt={cardTitle(item.type)}
              style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px' }}
            />
          )}
          <span>{cardTitle(item.type)}</span>
        </Link>
      ))}
    </>
  );
}
