// Auto-load all character JSON files from this folder.
// Drop in new *.json and the site will include them automatically.

const modules = import.meta.glob('./*.json', { eager: true });

const requiredKeys = ["name", "role"];

const characters = Object.entries(modules)
  .map(([file, m]) => ({ file, obj: (m.default !== undefined ? m.default : m) }))
  .filter(({ obj }) => Boolean(obj))
  .filter(({ file, obj }) => {
    const missing = requiredKeys.filter((k) => !(k in obj));
    if (missing.length) {
      console.warn(
        `Skipping character file ${file}: missing required key(s): ${missing.join(", ")}`
      );
      return false;
    }
    return true;
  })
  .map(({ obj }) => obj);

export default characters;
