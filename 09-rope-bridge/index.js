let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

let instructions = [];
// Get the rope length as a command line argument
let ropeLength = process.argv[2] || 2;

let rope = [];
for (let i = 0; i < ropeLength; i++) {
  rope.push({x: 0, y: 0});
}
let visited = [{x: 0, y: 0}];

lineReader.on('line', (line) => {
  instructions.push({ direction: line.split(' ')[0], length: +line.split(' ')[1]});
});

lineReader.on('close', function () {
  instructions.forEach(instruction => {
    let { direction, length } = instruction;

    for (let i = 0; i < length; i++) {
      switch (direction) {
        case 'R': rope[0].y++; break;
        case 'L': rope[0].y--; break;
        case 'U': rope[0].x--; break;
        case 'D': rope[0].x++; break;
      }
      
      for (let j = 1; j < rope.length; j++) {
				let follow = rope[j - 1]
				let [hDist, vDist] = [follow.x - rope[j].x, follow.y - rope[j].y]

				if (Math.abs(hDist) > 1 || Math.abs(vDist) > 1) {
					rope[j].x += Math.max(-1, Math.min(1, hDist))
					rope[j].y += Math.max(-1, Math.min(1, vDist))
				}
			}
      
      if (!isVisitedAlready(rope[rope.length - 1]))
        visited.push({ x: rope[rope.length - 1].x, y: rope[rope.length - 1].y })
    }
  });
  
  console.log(visited.length);
});

const isVisitedAlready = (value) => {
  return visited.some((v) => v.x === value.x && v.y === value.y);
}