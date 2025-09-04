const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, '../public/ai-advisor-4.0.png');
const outputDir = path.join(__dirname, '../public');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateFavicons() {
  try {
    const sizes = [16, 32, 48, 64, 128, 180, 192, 512];

    // Generate different sizes
    for (const size of sizes) {
      await sharp(source)
        .resize(size, size)
        .png()
        .toFile(path.join(outputDir, `favicon-${size}x${size}.png`));
      console.log(`Generated favicon-${size}x${size}.png`);
    }

    // Generate Apple touch icon (180x180)
    await sharp(source)
      .resize(180, 180)
      .png()
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));
    console.log('Generated apple-touch-icon.png');

    // Generate Android icon (192x192)
    await sharp(source)
      .resize(192, 192)
      .png()
      .toFile(path.join(outputDir, 'android-chrome-192x192.png'));
    console.log('Generated android-chrome-192x192.png');

    // Generate Android icon (512x512)
    await sharp(source)
      .resize(512, 512)
      .png()
      .toFile(path.join(outputDir, 'android-chrome-512x512.png'));
    console.log('Generated android-chrome-512x512.png');

    // Copy original as main favicon
    fs.copyFileSync(source, path.join(outputDir, 'favicon.ico'));
    console.log('Copied main favicon.ico');

    console.log('All favicons generated successfully!');

  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons();
