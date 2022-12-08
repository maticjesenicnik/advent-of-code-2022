let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

let forest = [];

lineReader.on('line', (line) => {
  forest.push(line.split('').map((num) => parseInt(num)));
});

lineReader.on('close', function () {
  let views = [];
  forest.forEach((row, x) => {
    row.forEach((tree, y) => {
      if (!(x == 0 || y == 0 || x == forest.length - 1 || y == forest[x].length - 1)) {
        views.push(viewingDistance(x, y, tree));
      }
    });
  });

  console.log(views.sort((a, b) => b - a)[0]);
});

const viewingDistance = (x, y, tree) => {
  if (x == 0 || y == 0 || x == forest.length - 1 || y == forest[x].length - 1) return 0;

  let top = right = bottom = left = 0;
  for (let i = x - 1; i >= 0; i--) {
    if (forest[i][y] < tree) top++;
    else {
      top++;
      break;
    }
  }
  for (let i = x + 1; i < forest.length; i++) {
    if (forest[i][y] < tree) bottom++;
    else {
      bottom++;
      break;
    }
  }
  for (let i = y - 1; i >= 0; i--) {
    if (forest[x][i] < tree) left++;
    else {
      left++;
      break;
    }
  }
  for (let i = y + 1; i < forest[x].length; i++) {
    if (forest[x][i] < tree) right++;
    else {
      right++;
      break;
    }
  }

  return top * right * bottom * left;
}