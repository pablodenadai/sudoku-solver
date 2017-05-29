const N = 9;
const B = Math.sqrt(N);
const NOT_SOLVED = 0;
const MAX_LOOPS = 100;

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

const onlyNumberInParallelRowsColumns = (number, x, y, matrix) => {
  // const modX = x % B;
  // const modY = y % B;
  //
  // for (let row = 0; row < B; row++) {
  //   if (row === modX) continue;
  //
  //   if (matrix[(modX * B) + row].includes(number)) {}
  // }

  return false;
};

const onlyPossibleNumber = (number, x, y, matrix, transposed) => {
  return (
    !matrix[x].includes(number) &&
    !transposed[y].includes(number) &&
    !numberInBox(number, x, y, matrix) &&
    onlyNumberInParallelRowsColumns(number, x, y, matrix)
  );
};

const logical = (matrix, transposed, pointer) => {
  if (matrix[pointer.x][pointer.y] !== NOT_SOLVED) return false;

  for (let number = 1; number <= N; number++) {
    if (onlyPossibleNumber(number, pointer.x, pointer.y, matrix, transposed)) {
      matrix[pointer.x][pointer.y] = number;
      transposed[pointer.y][pointer.x] = number;
      return true;
    };
  }

  return false;
};

module.exports = (matrix, transposed) => {
  const matrixCopy = JSON.parse(JSON.stringify(matrix));
  const transposedCopy = JSON.parse(JSON.stringify(transposed));

  for (let loop = 0; loop < MAX_LOOPS; loop++) {
    let pointer = { x: 0, y: 0 };
    let changeDetected = false;

    do {
      if (logical(matrixCopy, transposedCopy, pointer)) {
        changeDetected = true;
      }
    } while (pointer = getNextPointer(pointer.x, pointer.y));

    if (!changeDetected) {
      break;
    }
  }

  return {
    matrix: matrixCopy,
    transposed: transposedCopy
  };
};
