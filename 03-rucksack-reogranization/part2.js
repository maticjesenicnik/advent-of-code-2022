var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

let inputs = [];
let groups = [];

const getPoints = (character) => {
  let code = character.charCodeAt(0);
  if (code >= 97 && code <= 122) {
    return code - 96;
  } else if (code >= 65 && code <= 90) {
    return code - 38;
  }
}

lineReader.on('line', function (line) {
  inputs.push(line);
});

const getCommonCharacter = (array1, array2, array3) => {
  let commonCharacter = '';
  array1.forEach(character => {
    if (array2.includes(character) && array3.includes(character)) {
      commonCharacter = character;
    }
  });
  return commonCharacter;
}

lineReader.on('close', function () {
  let group = [];
  inputs.forEach(input => {
    group.push(input);
    if (group.length === 3) {
      groups.push(group);
      group = [];
    }
  });

  let badges = [];
  groups.forEach(group => {
    let [item1, item2, item3] = group;
    let sameItem = getCommonCharacter(item1.split(''), item2.split(''), item3.split(''));
    badges.push(sameItem);
  });

  console.log(badges.reduce((sum, item) => sum + getPoints(item), 0));
});

