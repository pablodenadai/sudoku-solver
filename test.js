const Sudoku = require('./');

const logical = require('./solvers/logical');
const backtracking = require('./solvers/backtracking');

const sudokus = [{
  name: 'Medium',
  matrix: `
    000200100
    070006008
    401085002
    000004090
    800060001
    020700000
    100320506
    600400010
    007008000
  `
}, {
  name: 'Hard',
  matrix: `
    002406900
    100800000
    064092010
    000204080
    800000004
    020607000
    070940830
    000008009
    008703600
  `
// }, {
//   name: 'Anti-Backtracking',
//   matrix: `
//     000000000
//     000003085
//     001020000
//     000507000
//     004000100
//     090000000
//     500000073
//     002010000
//     000040009
//   `
}]

sudokus.forEach((config) => {
  const sudoku = new Sudoku(config.matrix);

  sudoku
    .solve(logical)
    .solve(backtracking);

  console.log(config.name);
  console.log(sudoku.matrix);
  console.log(`Solved in ${sudoku.time}ms.`);
});
