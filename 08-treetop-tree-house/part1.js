let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

let forest = [];
const isVisible = (x, y, tree) => {
  let visible = true;
  if (x == 0 || y == 0 || x == forest.length - 1 || y == forest[x].length - 1) return 1;

  let top = right = bottom = left = true;
  for (let i = 0; i < x; i++) {
    if (forest[i][y] >= tree) top = false;
  }
  for (let i = x + 1; i < forest.length; i++) {
    if (forest[i][y] >= tree) bottom = false;
  }
  for (let i = 0; i < y; i++) {
    if (forest[x][i] >= tree) left = false;
  }
  for (let i = y + 1; i < forest[x].length; i++) {
    if (forest[x][i] >= tree) right = false;
  }

  visible = top || right || bottom || left;
  return visible ? 1 : 0;
}

lineReader.on('line', (line) => {
  forest.push(line.split('').map((num) => parseInt(num)));
});

lineReader.on('close', function () {
  let sum = 0;
  forest.forEach((row, x) => {
    row.forEach((tree, y) => {
      sum += isVisible(x, y, tree);
    });
  });

  console.log(sum);
});