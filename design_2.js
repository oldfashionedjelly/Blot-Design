const width = 125;
const height = 125;
const centerX = 62.5;
const centerY = 62.5;
const size = 10;
const layers = 4; // Increase for more complexity
const simplification = 2;
setDocDimensions(width, height);

const finalLines = [];
const t = new bt.Turtle();

// Function to draw a complex recursive pattern
function drawComplexPattern(marker, level, x, y, length, maxLevel) {
    if (level === maxLevel) {
        return;
    }

    // Draw a circle at the current position
    marker.jump([x, y - length]);
    marker.arc(360, length);

    // Recursively draw additional shapes around the circle
    for (let i = 0; i < 6; i++) {
        let angle = i * Math.PI / 3;
        let newX = x + Math.sin(angle) * length * 2;
        let newY = y + Math.cos(angle) * length * 2;

        // Draw shapes around the circle
        marker.jump([newX, newY - length]);
        marker.arc(360, length);

        // Recursively draw more complex patterns
        drawComplexPattern(marker, level + 1, newX, newY, length / 2, maxLevel);
    }
}

// Generate the complex pattern
drawComplexPattern(t, 0, centerX, centerY, size, layers);

// Simplify and draw the pattern
bt.join(finalLines, bt.simplify(t.lines(), simplification));
drawLines(finalLines);
