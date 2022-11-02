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

const { World, Engine, Runner, Render, Bodies, MouseConstraint, Mouse } =
  Matter;

const width = 800;
const height = 600;

const engine = Engine.create();
// So, technically when we create an engine, we get a world object along with it.
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width,
    height,
  },
});
Render.run(render);
// The runner is what coordinates all these changes from state A to state B of our engine.
Runner.run(Runner.create(), engine);

World.add(
  world,
  MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas),
  })
);

// Walls
const walls = [
  Bodies.rectangle(400, 0, 800, 40, { isStatic: true }),
  Bodies.rectangle(400, 600, 800, 40, { isStatic: true }),
  Bodies.rectangle(0, 300, 40, 600, { isStatic: true }),
  Bodies.rectangle(800, 300, 40, 600, { isStatic: true }),
];

World.add(world, walls);

// Random Shapes

World.add(world, Bodies.rectangle(200, 200, 50, 50));
