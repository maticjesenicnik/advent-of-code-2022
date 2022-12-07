let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

let datastream = [];

lineReader.on('line', (line) => {
  datastream.push(line);
});

const STORAGE  = 70000000;
const UPDATE   = 30000000;
const MAX_SIZE = 100000;

const calculateDirectorySizes = (name, dir) => {
  let size = 0;
  const childSizes = [];

  for (const [name, file] of Object.entries(dir)) {
    if (name !== '..') {
      if (typeof file === 'number') {
        size += file;
      } else {
        const nestedSizes = calculateDirectorySizes(name, file);
        size += nestedSizes[0][1];
        childSizes.push(...nestedSizes);
      }
    }
  }

  return [[name, size], ...childSizes];
}

const sum = (arr) => arr.reduce((a, b) => a + b, 0);

lineReader.on('close', function () {
  const root = {};
  let curr = root;

  datastream.forEach(line => {
    if (line.startsWith('$')) {
      if (line === '$ cd /') {
        curr = root;
      } else if (line === '$ cd ..') {
        curr = curr['..'];
      } else if (line.startsWith('$ cd ')) {
        const dirname = line.split(' ')[2];
        curr = curr[dirname];
      }
    } else {
      const [size, name] = line.split(' ');
      if (line.startsWith('dir ')) {
        const dirname = line.split(' ')[1];
        if (!curr[dirname]) {
          curr[dirname] = { '..': curr };
        }
      } else if (!curr[name]) {
        curr[name] = +size;
      }
    }
  });

  const sizes = calculateDirectorySizes('/', root).sort(([_, a], [__, b]) => b - a);
  const free = STORAGE - sizes[0][1];
  const needed = UPDATE - free;

  console.log('Part 1', sum(calculateDirectorySizes('/', root).filter(([_, size]) => size <= MAX_SIZE).map(([_, size]) => size)));
  console.log('Part 2', sizes.slice().reverse().find(([_, size]) => size >= needed)[1]);

});