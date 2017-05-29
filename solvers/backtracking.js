const N = 9;
const B = Math.sqrt(N);
const NOT_SOLVED = 0;

const getNextPointer = (x, y) => {
  if ((y += 1) > N - 1) {
    y = 0;

    if ((x += 1) > N - 1) {
      return false;
    }
  }

  return { x, y };
};

const numberInBox = (number, x, y, matrix) => {
  const startX = Math.floor(x / B) * B;
  const startY = Math.floor(y / B) * B;

  for (let i = startX; i < startX + B; i++) {
    if (matrix[i].slice(startY, startY + B).includes(number)) {
      return true;
    }
  }

  return false;
};

const numberIsValid = (number, x, y, matrix, transposed) => {
  return (
    !matrix[x].includes(number) &&
    !transposed[y].includes(number) &&
    !numberInBox(number, x, y, matrix)
  );
};

const backtrack = (matrix, transposed, pointer) => {
  if (!pointer) return true;

  while (matrix[pointer.x][pointer.y] !== NOT_SOLVED) {
    pointer = getNextPointer(pointer.x, pointer.y);
    if (!pointer) return true;
  }

  for (let number = 1; number <= N; number++) {
    if (numberIsValid(number, pointer.x, pointer.y, matrix, transposed)) {
      matrix[pointer.x][pointer.y] = number;
      transposed[pointer.y][pointer.x] = number;

      if (!backtrack(matrix, transposed, getNextPointer(pointer.x, pointer.y))) {
        matrix[pointer.x][pointer.y] = NOT_SOLVED;
        transposed[pointer.y][pointer.x] = NOT_SOLVED;
      } else {
        break;
      }
    }
  }

  if (matrix[pointer.x][pointer.y] === NOT_SOLVED) {
    return false;
  }

  return true;
}

module.exports = (matrix, transposed) => {
  const matrixCopy = JSON.parse(JSON.stringify(matrix));
  const transposedCopy = JSON.parse(JSON.stringify(transposed));

  backtrack(matrixCopy, transposedCopy, { x: 0, y: 0 }, 1);

  return {
    matrix: matrixCopy,
    transposed: transposedCopy
  };
}
