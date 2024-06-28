// Welcome to blot!

// Check out this guide to learn how to program in blot:
// https://blot.hackclub.com/editor?guide=start

const width = 125;
const height = 125;

setDocDimensions(width, height);

// Parameters for Saturn
const planetRadius = 35;
const ringInnerRadiusX = 45;
const ringInnerRadiusY = 10;
const ringOuterRadiusX = 60;
const ringOuterRadiusY = 15;
const ringAngle = 30; // in degrees

// Number of stars and size of stars
const numStars = 20;
const starRadius = 1;

// Store final lines here
const finalLines = [];

// Function to create a detailed circle (for planet)
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

// Function to create a detailed ellipse
function createEllipse(center, radiusX, radiusY, angle, numPoints = 200) {
  const points = [];
  const radAngle = (angle / 180) * Math.PI; // convert angle to radians
  for (let i = 0; i <= numPoints; i++) {
    const t = (i / numPoints) * 2 * Math.PI;
    const x = center[0] + radiusX * Math.cos(t);
    const y = center[1] + radiusY * Math.sin(t);
    // rotate point
    const rotatedX = center[0] + (x - center[0]) * Math.cos(radAngle) - (y - center[1]) * Math.sin(radAngle);
    const rotatedY = center[1] + (x - center[0]) * Math.sin(radAngle) + (y - center[1]) * Math.cos(radAngle);
    points.push([rotatedX, rotatedY]);
  }
  return points;
}

// Function to generate random stars
function createStars(numStars, minX, maxX, minY, maxY, radius) {
  const stars = [];
  for (let i = 0; i < numStars; i++) {
    const x = Math.random() * (maxX - minX) + minX;
    const y = Math.random() * (maxY - minY) + minY;
    const star = createEllipse([x, y], radius, radius / 2, 0, 10); // Star as a small ellipse for perspective
    stars.push(star);
  }
  return stars;
}

// Generate Saturn (planet) with bands
const saturnCenter = [width / 2, height / 2];
const bandRadius = planetRadius / 5; // Width of bands

// Add textured bands to Saturn (planet)
for (let i = 0; i < 5; i++) {
  const bandRadiusOffset = i * bandRadius; // Gap between bands
  finalLines.push(createEllipse(saturnCenter, planetRadius - bandRadiusOffset, planetRadius, 0, 200));
}

// Generate rings with texture
const rings = [
  { center: saturnCenter, radiusX: ringInnerRadiusX, radiusY: ringInnerRadiusY, angle: ringAngle },
  { center: saturnCenter, radiusX: ringOuterRadiusX, radiusY: ringOuterRadiusY, angle: ringAngle }
];

// Add textured rings (ellipses) to final lines
rings.forEach(ring => {
  finalLines.push(createEllipse(ring.center, ring.radiusX, ring.radiusY, ring.angle, 200));
});

// Generate random stars around Saturn
const minX = saturnCenter[0] - planetRadius * 1.5;
const maxX = saturnCenter[0] + planetRadius * 1.5;
const minY = saturnCenter[1] - planetRadius * 1.5;
const maxY = saturnCenter[1] + planetRadius * 1.5;
const stars = createStars(numStars, minX, maxX, minY, maxY, starRadius);
finalLines.push(...stars);

// Draw all lines
drawLines(finalLines);
