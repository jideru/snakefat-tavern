export default function CharacterToolTip({ character, position }) {
  if (!character) return null;

  const isLeft = position.x > window.innerWidth - 360;
  const isBottom = position.y > window.innerHeight - 200; // assuming tooltip height ~200px
  const left = isLeft ? position.x - 16 - 400 : position.x + 16; // 400 is maxWidth
  const top = isBottom ? position.y - 16 - 200 : position.y + 16; // adjust if too low
  const isThief = character.class && character.class.toLowerCase().includes('thief');
  return (
    <div style={{ position: "fixed", left, top, zIndex: 9999, maxWidth: 400, pointerEvents: "none", transform: isLeft ? "translateX(calc(-100% - 32px))" : "none" }}>
      <div style={{ background: "linear-gradient(160deg,#1e160a,#150f06)", border: "1px solid #7a5c2e", borderRadius: 4, padding: "16px 20px", boxShadow: "0 0 0 1px rgba(201,168,76,0.15),0 8px 40px rgba(0,0,0,0.9)", fontFamily: "'Crimson Text',Georgia,serif", fontSize: "14px", lineHeight: "1.6", color: "#e8d5a3" }}>
        <div style={{ fontFamily: "'Cinzel','Times New Roman',serif", color: "#e8d5a3", fontSize: 16, fontWeight: 600, marginBottom: 12, letterSpacing: "0.03em" }}>{character.name}</div>
        <div style={{ whiteSpace: "pre-wrap", marginBottom: isThief && character.thief_skills_d6 ? 12 : 0 }}>
          {character.bio || "No bio available"}
        </div>
        {isThief && character.thief_skills_d6 && (
          <div style={{ background: "#2a1e0e", borderRadius: 6, padding: '10px 12px', marginTop: 4, border: '1px solid #7a5c2e' }}>
            <div style={{ fontWeight: 700, color: '#ffe7a0', marginBottom: 6, fontSize: 15 }}>Thief Skills (d6)</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14 }}>
              {Object.entries(character.thief_skills_d6).map(([skill, value]) => (
                <li key={skill} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span>{skill}</span>
                  <span style={{ fontWeight: 600 }}>{value}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
