// Big Challenges
// * How do we generate a maze? - tree data structure + recursion to implement the simplest algorithm.
// * How are we going to draw this thing on the screen? - matter-js
// * How do we make some keyboard keys control the ball? - matter-js
// * How do we detect when the ball touches the green square? - matter-js
// https://brm.io/matter-js/

// Matter JS Terminology

// * World *    Object that contains all of the different 'things' in our matter app
// * Engine *   Reads in the current state of the world from the world object, then calculates changes in position of all the different shapes
// * Runner *   Gets the engine and world to work together. Runs about 60 times per second.
// * Render *   Whenever the engine process an update, Render will take a look at all the different shapes and show them on the screen.
// * Body *     A shape that we are displaying. Can be a circle, rectangle, oval, etc.

const { World, Engine, Runner, Render, Bodies, Body } = Matter;

const cells = 12;
const width = 600;
const height = width;
const unitLength = width / cells;

const engine = Engine.create();
// So, technically when we create an engine, we get a world object along with it.
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: false,
    width,
    height,
  },
});
Render.run(render);
// The runner is what coordinates all these changes from state A to state B of our engine.
Runner.run(Runner.create(), engine);

// Walls
const walls = [
  Bodies.rectangle(width / 2, 0, width, 2, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, 2, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 2, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 2, height, { isStatic: true }),
];

World.add(world, walls);

// Building a Maze

//* Create a grid of 'cells'
//* Pick a random starting cell
//* For that cell, build a randomly-ordered list of neighbors
//* If a neighbor has been visited before, remove it from the list
//* For each remaining neighbor, 'move' to it and remove the wall between those two cells
//* Repeat for this new neighbor

// Maze Generation

const shuffle = (arr) => {
  let counter = arr.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);

    counter--;
    // console.log(counter);
    const temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }

  return arr;
};

const grid = Array(cells) // if we ever wanted to add more row, change that value
  .fill(null)
  .map(() => Array(cells).fill(false)); // if we ever wanted to add more columns, change that value

// verticals
// [[false, false][(false, false)][(false, false)]];

const verticals = Array(cells)
  .fill(null)
  .map(() => Array(cells - 1).fill(false));

// horizontals
// [[false, false, false][(false, false, false)]];

const horizontals = Array(cells - 1)
  .fill(null)
  .map(() => Array(cells).fill(false));

const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

const recurse = (row, column) => {
  // If I have visited the cell at [row, column] then return
  if (grid[row][column] === true) {
    return;
  }

  // Mark this cell as being visited
  grid[row][column] = true;

  // Assemble randomly-ordered list of neighbors
  const neighbors = shuffle([
    [row - 1, column, 'up'],
    [row + 1, column, 'down'],
    [row, column - 1, 'left'],
    [row, column + 1, 'right'],
  ]);
  // console.log(neighbors);

  // For each neighbor...
  for (let neighbor of neighbors) {
    const [nextRow, nextColumn, direction] = neighbor;
    // Check if that neighbor is out of bounds
    if (
      nextRow < 0 ||
      nextRow >= cells ||
      nextColumn < 0 ||
      nextColumn >= cells
    ) {
      // continue key word means don't leave this for loop, just don't do anything else current iteration of the current step.
      continue;
    }

    // If we have visited that neighbor, continue to next neighbor
    if (grid[nextRow][nextColumn]) {
      continue;
    }

    // Remove a wall from either horizontals or verticals array
    if (direction === 'left') {
      verticals[row][column - 1] = true;
    } else if (direction === 'right') {
      verticals[row][column] = true;
    } else if (direction === 'up') {
      horizontals[row - 1][column] = true;
    } else if (direction === 'down') {
      horizontals[row][column] = true;
    }

    // Visit that next cell
    recurse(nextRow, nextColumn);
  }
};

recurse(startRow, startColumn);

horizontals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    }

    // x coordinate: columnIndex * unitLength + unitLength / 2;
    // y coordinate: rowIndex * unitLength + unitLength;
    const wall = Bodies.rectangle(
      columnIndex * unitLength + unitLength / 2,
      rowIndex * unitLength + unitLength,
      unitLength,
      5,
      { isStatic: true }
    );

    World.add(world, wall);
  });
});

verticals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    }

    // x coordinate: rowIndex * unitLength + unitLength;
    // y coordinate: columnIndex * unitLength + unitLength / 2;
    const wall = Bodies.rectangle(
      columnIndex * unitLength + unitLength,
      rowIndex * unitLength + unitLength / 2,
      5,
      unitLength,
      { isStatic: true }
    );

    World.add(world, wall);
  });
});

const goal = Bodies.rectangle(
  width - unitLength / 2,
  height - unitLength / 2,
  unitLength * 0.6,
  unitLength * 0.6,
  {
    isStatic: true,
  }
);

World.add(world, goal);

// Ball

const ball = Bodies.circle(unitLength / 2, unitLength / 2, unitLength / 4);
World.add(world, ball);

// https://www.toptal.com/developers/keycode
document.addEventListener('keydown', (event) => {
  const { x, y } = ball.velocity;
  if (event.keyCode === 87) {
    Body.setVelocity(ball, { x, y: y - 5 });
  }

  if (event.keyCode === 83) {
    Body.setVelocity(ball, { x, y: y + 5 });
  }

  if (event.keyCode === 65) {
    Body.setVelocity(ball, { x: x - 5, y });
  }

  if (event.keyCode === 68) {
    Body.setVelocity(ball, { x: x + 5, y });
  }
});
