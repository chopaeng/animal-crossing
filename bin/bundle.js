const fs = require('fs');
const path = require('path');

const combinedDir = path.resolve(__dirname, '../json/combined');
const jsonDir = path.resolve(__dirname, '../json');
const rootDir = path.resolve(__dirname, '..');
const moduleDataDir = path.resolve(__dirname, '../module/data');

const keyMap = {
  Achievements: 'achievements',
  Construction: 'construction',
  Creatures: 'creatures',
  Items: 'items',
  NPCs: 'npcs',
  Other: 'other',
  Reactions: 'reactions',
  Recipes: 'recipes',
  SeasonsAndEvents: 'seasonsAndEvents',
  Translations: 'translations',
  Villagers: 'villagers',
};

const result = {};

for (const [fileBase, keyName] of Object.entries(keyMap)) {
  const filePath = path.join(combinedDir, fileBase + '.json');
  if (fs.existsSync(filePath)) {
    result[keyName] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
}

const prettyTargets = [
  path.join(jsonDir, 'acnh.json'),
  path.join(rootDir, 'acnh.json'),
];

const minTargets = [
  path.join(jsonDir, 'acnh.min.json'),
  path.join(rootDir, 'acnh.min.json'),
  path.join(moduleDataDir, 'acnh.json'),
];

const pretty = JSON.stringify(result, null, 2);
for (const p of prettyTargets) {
  fs.writeFileSync(p, pretty, 'utf8');
  console.log(`Saved ${p} (${fs.statSync(p).size} bytes)`);
}

const minified = JSON.stringify(result);
for (const p of minTargets) {
  fs.writeFileSync(p, minified, 'utf8');
  console.log(`Saved ${p} (${fs.statSync(p).size} bytes)`);
}
