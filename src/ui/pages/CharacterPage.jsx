import { useParams, Link } from "react-router-dom";
import data from "../../data/characters/index.js";

function StatBox({ label, value }) {
  return (
    <div className="cs-stat-box">
      <div className="cs-stat-label">{label}</div>
      <div className="cs-stat-value">{value ?? "—"}</div>
    </div>
  );
}

function SectionBox({ title, children }) {
  return (
    <div className="cs-section">
      <div className="cs-section-title">{title}</div>
      <div className="cs-section-body">{children}</div>
    </div>
  );
}

function Row({ label, value }) {
  if (value === undefined || value === null || value === 0 || value === "") return null;
  return (
    <div className="cs-row">
      <span className="cs-row-label">{label}</span>
      <span className="cs-row-value">{value}</span>
    </div>
  );
}

export default function CharacterPage() {
  const { name } = useParams();
  const c = data.find((ch) => ch.name === decodeURIComponent(name));

  if (!c) {
    return (
      <div className="container" style={{ textAlign: "center", paddingTop: 60 }}>
        <h2>Character not found.</h2>
        <Link to="/" className="cs-back-link">← Back to Tavern</Link>
      </div>
    );
  }

  const imageSrc = c.fullImage ? `/assets/images/characters/${c.fullImage}` : null;

  const abilityMod = (score) => {
    if (score === undefined || score === null) return null;
    const mod = Math.floor((score - 10) / 2);
    return `${score} (${mod >= 0 ? "+" : ""}${mod})`;
  };

  const hasThiefSkills = c.thief_skills_d6 &&
    Object.values(c.thief_skills_d6).some((v) => v > 0);

  const roleLabel = c.role
    ? c.role.charAt(0).toUpperCase() + c.role.slice(1)
    : null;

  return (
    <div className="cs-page">
      {/* Back button */}
      <div className="cs-back-row">
        <Link to="/" className="cs-back-link">← Back to Tavern</Link>
      </div>

      <div className="cs-sheet">
        {/* Left column: image */}
        <div className="cs-left">
          {imageSrc && (
            <img className="cs-portrait" src={imageSrc} alt={c.name} />
          )}
          {/* Bio below image on desktop */}
          {c.bio && (
            <SectionBox title="Background">
              <p className="cs-bio">{c.bio}</p>
            </SectionBox>
          )}
          {c.hireCost && c.role !== "player" && (
            <SectionBox title="Hire Cost">
              <p className="cs-bio">{c.hireCost}</p>
            </SectionBox>
          )}
        </div>

        {/* Right column: all stats */}
        <div className="cs-right">
          {/* Header */}
          <div className="cs-header">
            <h1 className="cs-name adventure-font">{c.name}</h1>
            <div className="cs-identity">
              {[c.race, c.class, c.level ? `Level ${c.level}` : null, c.alignment, roleLabel]
                .filter(Boolean)
                .join(" · ")}
            </div>
          </div>

          <div className="cs-columns">
            {/* Column A */}
            <div className="cs-col">
              {/* Ability Scores */}
              <SectionBox title="Ability Scores">
                <div className="cs-abilities">
                  <StatBox label="STR" value={abilityMod(c.str)} />
                  <StatBox label="DEX" value={abilityMod(c.dex)} />
                  <StatBox label="CON" value={abilityMod(c.con)} />
                  <StatBox label="INT" value={abilityMod(c.int)} />
                  <StatBox label="WIS" value={abilityMod(c.wis)} />
                  <StatBox label="CHA" value={abilityMod(c.cha)} />
                </div>
              </SectionBox>

              {/* Saving Throws */}
              <SectionBox title="Saving Throws">
                <Row label="Death / Poison" value={c.deathSave ?? c.poisonSave} />
                <Row label="Wands" value={c.wandsSave} />
                <Row label="Paralysis / Petrify" value={c.paralySave} />
                <Row label="Breath Attacks" value={c.breathSave} />
                <Row label="Spells / Rods / Staves" value={c.spellSave} />
              </SectionBox>

              {/* Thief Skills */}
              {hasThiefSkills && c.class && c.class.includes('Thief') && (
                <SectionBox title="Thief Skills (d6)">
                  {Object.entries(c.thief_skills_d6)
                    .filter(([, v]) => v > 0)
                    .map(([skill, val]) => (
                      <Row key={skill} label={skill} value={`${val}-in-6`} />
                    ))}
                </SectionBox>
              )}
            </div>

            {/* Column B */}
            <div className="cs-col">
              {/* Combat */}
              <SectionBox title="Combat">
                <Row label="Hit Points" value={c.currentHp !== undefined ? `${c.currentHp} / ${c.maxHp ?? c.hp}` : c.hp} />
                <Row label="Armour Class" value={c.ac} />
                <Row label="Attack Bonus (AB)" value={c.ab !== undefined ? (c.ab >= 0 ? `+${c.ab}` : `${c.ab}`) : null} />
                <Row label="Melee Attack Roll" value={c.meleeAttackRoll !== undefined ? (c.meleeAttackRoll >= 0 ? `+${c.meleeAttackRoll}` : `${c.meleeAttackRoll}`) : null} />
                <Row label="Missile Attack Roll" value={c.missileAttackRoll !== undefined ? (c.missileAttackRoll >= 0 ? `+${c.missileAttackRoll}` : `${c.missileAttackRoll}`) : null} />
                <Row label="Attack" value={c.attack} />
              </SectionBox>

              {/* Movement */}
              <SectionBox title="Movement">
                <Row label="Encounter" value={c.encounterMovement ? `${c.encounterMovement}'` : null} />
                <Row label="Exploration" value={c.explorationMovement ? `${c.explorationMovement}'` : null} />
                <Row label="Overland" value={c.overlandMovement ? `${c.overlandMovement} miles/day` : null} />
              </SectionBox>

              {/* Adventuring Skills */}
              <SectionBox title="Adventuring">
                <Row label="Morale" value={c.morale} />
                <Row label="CHA Reaction Modifier" value={c.chaModReaction !== undefined ? (c.chaModReaction >= 0 ? `+${c.chaModReaction}` : `${c.chaModReaction}`) : null} />
                <Row label="Listen at Door" value={c.listenAtDoor ? `${c.listenAtDoor}-in-6` : null} />
                <Row label="Find Secret Door" value={c.findSecretDoor ? `${c.findSecretDoor}-in-6` : null} />
                <Row label="Open Stuck Door" value={c.openStuckDoor ? `${c.openStuckDoor}-in-6` : null} />
                <Row label="Forage" value={c.forage ? `${c.forage}-in-6` : null} />
                <Row label="Hunt" value={c.hunt ? `${c.hunt}-in-6` : null} />
                <Row label="Find Room" value={c.findRoom ? `${c.findRoom}-in-6` : null} />
                <Row label="WIS Modifier to Spells" value={c.wisModifierToSpells !== undefined && c.wisModifierToSpells !== 0 ? (c.wisModifierToSpells >= 0 ? `+${c.wisModifierToSpells}` : `${c.wisModifierToSpells}`) : null} />
              </SectionBox>
            </div>
          </div>

          {/* Bio on mobile (rendered in right col) */}
          {c.bio && (
            <div className="cs-bio-mobile">
              <SectionBox title="Background">
                <p className="cs-bio">{c.bio}</p>
              </SectionBox>
              {c.hireCost && c.role !== "player" && (
                <SectionBox title="Hire Cost">
                  <p className="cs-bio">{c.hireCost}</p>
                </SectionBox>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Spells Box */}
      {c.spells && c.spells.length > 0 && (
        <div className="cs-spells-box">
          <div className="cs-spells-title">Spells</div>
          <div className="cs-spells">
            {c.spells.map((spell, idx) => (
              <div key={idx} className="cs-spell">
                <div className="cs-spell-header">
                  <h3 className="cs-spell-name">{spell.name}</h3>
                  <span className="cs-spell-level">Level {spell.level}</span>
                </div>
                {spell.range && (
                  <div className="cs-spell-detail">
                    <strong>Range:</strong> {spell.range}
                  </div>
                )}
                {spell.effect && (
                  <div className="cs-spell-detail">
                    <strong>Effect:</strong> {spell.effect}
                  </div>
                )}
                {spell.duration && (
                  <div className="cs-spell-detail">
                    <strong>Duration:</strong> {spell.duration}
                  </div>
                )}
                {spell.description && (
                  <div className="cs-spell-detail">
                    <strong>Description:</strong> {spell.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gear Box */}
      {c.gear && c.gear.length > 0 && (
        <div className="cs-spells-box cs-gear-box">
          <img src="/assets/images/burlap-sack.svg" alt="Gear" className="cs-gear-icon" />
          <div className="cs-gear">
            {c.gear.map((item, idx) => (
              <div key={idx} className="cs-gear-item">{item}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
