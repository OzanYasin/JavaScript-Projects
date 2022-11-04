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

const { World, Engine, Runner, Render, Bodies } = Matter;

const cells = 3;
const width = 600;
const height = 600;

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
  Bodies.rectangle(width / 2, 0, width, 40, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, 40, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 40, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 40, height, { isStatic: true }),
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

console.log(grid);
console.log(verticals);
console.log(horizontals);

const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);
