// Define the canvas dimensions
const width = 150;
const height = 150;
setDocDimensions(width, height);

// Function to draw a repeating line pattern
function drawRepeatingPattern() {
    const polylines = [];

    // Define the pattern parameters
    const numLines = 15;
    const lineSpacing = width / (numLines - 1);

    // Draw horizontal lines
    for (let i = 0; i < numLines; i++) {
        const y = i * (height / (numLines - 1));
        const line = bt.catmullRom([[0, y], [width, y]]);
        polylines.push(line);
    }

    // Draw diagonal lines
    for (let i = 0; i < numLines; i++) {
        const x = i * lineSpacing;
        const line = bt.catmullRom([[0, 0], [x, height], [width, 0]]);
        polylines.push(line);
    }

    return polylines;
}

// Generate the repeating pattern
const repeatingPattern = drawRepeatingPattern();

// Draw the pattern
drawLines(repeatingPattern);
