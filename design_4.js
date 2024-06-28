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
  center: [100, 100],
  radius: 40
};

const rings = [
  { center: [100, 100], radiusX: 70, radiusY: 30, angle: 0 },
  { center: [100, 100], radiusX: 80, radiusY: 35, angle: 0 },
  { center: [100, 100], radiusX: 90, radiusY: 40, angle: 0 }
];

// add the planet (circle) to the final lines
const circlePoints = [];
const numPoints = 100;
for (let i = 0; i < numPoints; i++) {
  const angle = (i / numPoints) * 2 * Math.PI;
  const x = saturn.center[0] + saturn.radius * Math.cos(angle);
  const y = saturn.center[1] + saturn.radius * Math.sin(angle);
  circlePoints.push([x, y]);
}
circlePoints.push(circlePoints[0]); // close the circle
finalLines.push(circlePoints);

// add the rings (ellipses) to the final lines
rings.forEach(ring => {
  const ellipsePoints = [];
  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * 2 * Math.PI;
    const x = ring.center[0] + ring.radiusX * Math.cos(angle);
    const y = ring.center[1] + ring.radiusY * Math.sin(angle);
    ellipsePoints.push([x, y]);
  }
  ellipsePoints.push(ellipsePoints[0]); // close the ellipse
  bt.rotate(ellipsePoints, ring.angle);
  finalLines.push(ellipsePoints);
});

// draw it
drawLines(finalLines);
