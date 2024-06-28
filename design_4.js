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

// add the planet (circle) to the final lines
finalLines.push(createCircle(saturn.center, saturn.radius));

// add the rings (ellipses) to the final lines
rings.forEach(ring => {
  finalLines.push(createEllipse(ring.center, ring.radiusX, ring.radiusY, ring.angle));
});

// draw it
drawLines(finalLines);
