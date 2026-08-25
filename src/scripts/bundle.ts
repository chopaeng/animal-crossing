import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import { directories } from '../util/directories';

/**
 * Map category file names to camelCase keys.
 */
const keyMap: Record<string, string> = {
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

const result: Record<string, unknown> = {};

for (const [fileBase, keyName] of Object.entries(keyMap)) {
  const filePath = join(directories.combined, `${fileBase}.json`);
  if (existsSync(filePath)) {
    result[keyName] = JSON.parse(readFileSync(filePath, 'utf8'));
  }
}

// Write formatted single JSON
writeFileSync(join(directories.root, 'acnh.json'), JSON.stringify(result, null, 2), 'utf8');

// Write minified single JSON
writeFileSync(join(directories.root, 'acnh.min.json'), JSON.stringify(result), 'utf8');
