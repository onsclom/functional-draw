const example = `import { image } from "functional-draw";

const range = (n) => [...Array(n).keys()];

const background = {
  type: "rect",
  x: 0,
  y: 0,
  width: 500,
  height: 500,
  color: "white",
};

const circles = range(100).map((i) => ({
  type: "circle",
  x: (i % 10) * 50 + 25,
  y: Math.floor(i / 10) * 50 + 25,
  radius: 20 + Math.sin(i / 2) * 10,
  color: "black",
}));

image([background, ...circles], {
  canvasId: "image-example",
  width: 500,
  height: 500,
});`;

export default example;
