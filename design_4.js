// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const width = 125;
const height = 125;

setDocDimensions(width, height);

// parameters to adjust size and angle
const planetRadius = 35;
const ringInnerRadiusX = 45;
const ringInnerRadiusY = 10;
const ringOuterRadiusX = 60;
const ringOuterRadiusY = 15;
const ringAngle = 30; // in degrees

// number of stars and size of stars
const numStars = 20;
const starRadius = 1;

// store final lines here
const finalLines = [];

// create the planet (circle) and rings (ellipses)
const saturn = {
  center: [width / 2, height / 2],
  radius: planetRadius
};

const rings = [
  { center: [width / 2, height / 2], radiusX: ringInnerRadiusX, radiusY: ringInnerRadiusY, angle: ringAngle },
  { center: [width / 2, height / 2], radiusX: ringOuterRadiusX, radiusY: ringOuterRadiusY, angle: ringAngle }
];

// function to create a detailed circle
function createCircle(center, radius, numPoints = 200) {
  const points = [];
  for (let i = 0; i <= numPoints; i++) {
    const angle = (i / numPoints) * 2 * Math.PI;
    const x = center[0] + radius * Math.cos(angle);
    const y = center[1] + radius * Math.sin(angle);
    points.push([x, y]);
  }
  return points;
}

// function to generate random stars (small circles)
function createStars(numStars, minX, maxX, minY, maxY, radius) {
  const stars = [];
  for (let i = 0; i < numStars; i++) {
    const x = Math.random() * (maxX - minX) + minX;
    const y = Math.random() * (maxY - minY) + minY;
    const star = createCircle([x, y], radius, 10);
    stars.push(star);
  }
  return stars;
}

// add the planet (circle) to the final lines
finalLines.push(createCircle(saturn.center, saturn.radius));

// add the rings (ellipses) to the final lines
rings.forEach(ring => {
  finalLines.push(createEllipse(ring.center, ring.radiusX, ring.radiusY, ring.angle));
});

// add random stars around Saturn
const minX = saturn.center[0] - planetRadius;
const maxX = saturn.center[0] + planetRadius;
const minY = saturn.center[1] - planetRadius;
const maxY = saturn.center[1] + planetRadius;
const stars = createStars(numStars, minX, maxX, minY, maxY, starRadius);
finalLines.push(...stars);

// draw it
drawLines(finalLines);

// function to create a detailed ellipse
function createEllipse(center, radiusX, radiusY, angle, numPoints = 200) {
  const points = [];
  const radAngle = (Math.PI / 180) * angle; // convert angle to radians
  for (let i = 0; i <= numPoints; i++) {
    const t = (i / numPoints) * 2 * Math.PI;
    const x = center[0] + radiusX * Math.cos(t);
    const y = center[1] + radiusY * Math.sin(t);
    // rotate point
    const rotatedX = center[0] + (x - center[0]) * Math.cos(radAngle) - (y - center[0]) * Math.sin(radAngle);
    const rotatedY = center[1] + (x - center[0]) * Math.sin(radAngle) + (y - center[0]) * Math.cos(radAngle);
    points.push([rotatedX, rotatedY]);
  }
  return points;
}
