class Sudoku {
  constructor(matrix) {
    this.start = Date.now();
    this.time = 0;

    this.matrix = matrix
      .trim()
      .split('\n')
      .map( row => row
        .trim()
        .split('')
        .map((number) => parseInt(number, 10) )
      );
    this.transposed = Sudoku.transpose(this.matrix);
  }

  solve(solver) {
    const solved = solver(this.matrix, this.transposed);

    this.matrix = solved.matrix;
    this.transposed = solved.transposed;

    this.time = Date.now() - this.start;
    return this;
  }

  static transpose(matrix) {
    return matrix[0].map((x, i) => matrix.map(x => x[i]));
  }
}

module.exports = Sudoku;
