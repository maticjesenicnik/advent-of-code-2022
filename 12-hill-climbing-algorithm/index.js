let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

let mountain = [];
let startingPositions = [];
let paths = [];

lineReader.on('line', function (line) {
  mountain.push(line.split('').map((char, index) => { 
    return { 
      x: mountain.length, 
      y: index, 
      char,
      value: char === 'S' ? 'a'.charCodeAt(0) : char === 'E' ? 'z'.charCodeAt(0) : char.charCodeAt(0), 
      visited: false 
    } 
  }));
});

lineReader.on('close', function () {
  let start = { x: 0, y: 0 };
  let end = { x: 0, y: 0 };

  for (let i = 0; i < mountain.length; i++) {
    for (let j = 0; j < mountain[i].length; j++) {
      if (mountain[i][j].char === 'S') {
        start = { x: i, y: j };
      } else if (mountain[i][j].char === 'E') {
        end = { x: i, y: j };
      }
      if (mountain[i][j].char === 'S' || mountain[i][j].char === 'a') {
        startingPositions.push({ x: i, y: j });
      }
    }
  }
  console.log('Part 1:', minDistance(start, end));
  startingPositions.forEach(startingPosition => paths.push(minDistance(startingPosition, end)));
  console.log('Part 2:', paths.filter(el => el > 0).sort((a, b) => a - b)[0]);
});


const minDistance = (start, end) => {
  let source = { x: start.x, y: start.y, dist: 0};
  mountain.forEach(row => row.forEach(cell => cell.visited = row === start.x && cell === start.y));

  let queue = [source];

  while (queue.length > 0) {
    let current = queue.shift();

    if (current.x === end.x && current.y === end.y) {
      return current.dist;
    }

    let value = mountain[current.x][current.y].value;

    if (current.x !== 0 && checkNeighbour(value, mountain[current.x - 1][current.y])) {
      addNeighbour(queue, current, mountain[current.x - 1][current.y]);
    }
    if (current.x !== mountain.length - 1 && checkNeighbour(value, mountain[current.x + 1][current.y])) {
      addNeighbour(queue, current, mountain[current.x + 1][current.y]);
    }
    if (current.y !== 0 && checkNeighbour(value, mountain[current.x][current.y - 1])) {
      addNeighbour(queue, current, mountain[current.x][current.y - 1]);
    }
    if (current.y !== mountain[current.x].length - 1 && checkNeighbour(value, mountain[current.x][current.y + 1])) {
      addNeighbour(queue, current, mountain[current.x][current.y + 1]);
    }
  }
  return -1;
}

const checkNeighbour = (value, neighbour) => {
  return neighbour.value <= value + 1 && !neighbour.visited;
}

const addNeighbour = (queue, current, neighbour) => {
  mountain[neighbour.x][neighbour.y].visited = true;
  queue.push({ x: neighbour.x, y: neighbour.y, dist: current.dist + 1});
}