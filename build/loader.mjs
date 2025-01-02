import yaml from 'yaml';
import path from 'node:path';
import fs from 'node:fs/promises';

export async function load (url, context, nextLoad) {
  //url приходит вида file://users/davydova/project/someFile.txt

  const extension = path.extname(url);

  if(extension === '.yml') {
    try {
      const path = new URL(url).pathname;
      const content = await fs.readFile(path, 'utf8');

      return {
        format: 'json',
        shortCircuit: true,
        source: JSON.stringify(yaml.parse(content))
      }
    } catch(err) {
      err.message = `${url}: ${err.message}`;
      throw err;
    }
  }

  return nextLoad(url);
}
