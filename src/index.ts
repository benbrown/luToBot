import { luToBot } from './api';

const luFile = process.argv[2];
const outputFolder = process.argv[3];

const usage = () => {
  console.error('luToBot <lufile> <outputfolder>');
  process.exit(1);
}

console.log(`Generate a new bot called ${ outputFolder } using ${ luFile }`)

if (!luFile || !outputFolder) {
  usage();
}

try {
  const api = new luToBot(luFile);
  api.generate(outputFolder);
} catch(err) {
  console.error(err.message);
  process.exit(1);
}