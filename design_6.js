const width = 125;
const height = 125;

setDocDimensions(width, height);

// Parameters to adjust size and angle
const planetRadius = 35;
const ringInnerRadiusX = 45;
const ringInnerRadiusY = 10;
const ringOuterRadiusX = 60;
const ringOuterRadiusY = 15;
const ringAngle = 30; 

// Number of stars and size of stars
const numStars = 20;
const starRadius = 1;

// Store final lines here
const finalLines = [];

// Create the planet (circle) and rings (ellipses)
const saturn = {
  center: [width / 2, height / 2],
  radius: planetRadius
};

const rings = [
  { center: [width / 2, height / 2], radiusX: ringInnerRadiusX, radiusY: ringInnerRadiusY, angle: ringAngle },
  { center: [width / 2, height / 2], radiusX: ringOuterRadiusX, radiusY: ringOuterRadiusY, angle: ringAngle }
];

// Function to create a circle
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

// Function to generate random stars (small circles)
function createStars(numStars, minX, maxX, minY, maxY, radius, avoidCenter, avoidRadius) {
  const stars = [];
  for (let i = 0; i < numStars; i++) {
    let x, y;
    do {
      x = Math.random() * (maxX - minX) + minX;
      y = Math.random() * (maxY - minY) + minY;
    } while (avoidCenter && Math.sqrt((x - avoidCenter[0]) ** 2 + (y - avoidCenter[1]) ** 2) < avoidRadius);
    const star = createCircle([x, y], radius, 10);
    stars.push(star);
  }
  return stars;
}

// Add the planet (circle) to the final lines
finalLines.push(createCircle(saturn.center, saturn.radius));

// Add the rings (ellipses) to the final lines
rings.forEach(ring => {
  finalLines.push(createEllipse(ring.center, ring.radiusX, ring.radiusY, ring.angle, undefined, 1)); // Pass depth=1 for rings
});

// Add random stars around Saturn, avoiding the center
const minX = 0;
const maxX = width;
const minY = 0;
const maxY = height;
const avoidCenter = saturn.center;
const avoidRadius = planetRadius + 5; // Avoid area slightly larger than planet
const stars = createStars(numStars, minX, maxX, minY, maxY, starRadius, avoidCenter, avoidRadius);
finalLines.push(...stars);

// Draw it
drawLines(finalLines);

// Function to create ellipse
function createEllipse(center, radiusX, radiusY, angle, numPoints = 200, depth = 0) {
  const points = [];
  const radAngle = (Math.PI / 180) * angle; // Convert angle to radians
  for (let i = 0; i <= numPoints; i++) {
    const t = (i / numPoints) * 2 * Math.PI;
    const x = center[0] + radiusX * Math.cos(t);
    const y = center[1] + radiusY * Math.sin(t);
    // Rotate point
    const rotatedX = center[0] + (x - center[0]) * Math.cos(radAngle) - (y - center[0]) * Math.sin(radAngle);
    const rotatedY = center[1] + (x - center[0]) * Math.sin(radAngle) + (y - center[0]) * Math.cos(radAngle);
    // Check if the point is obscured by the planet
    if (!isPointBehindPlanet(rotatedX, rotatedY, center, saturn.radius)) {
      points.push([rotatedX, rotatedY]);
    }
  }
  return points;
}

// Helper function to check if a point is behind the planet
function isPointBehindPlanet(x, y, center, planetRadius) {
  // Calculate the distance from the center of the planet to the point
  const distance = Math.sqrt(Math.pow(x - center[0], 2) + Math.pow(y - center[1], 2));
  // Check if the distance is greater than the planet's radius, meaning the point is behind the planet
  return distance > planetRadius;
}
