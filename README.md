# Learn by Building

Interactive, gamified tutorials for mastering Qualtrics — built for XM Basecamp.

## 🎯 Overview

Learn by Building provides screenshot-based interactive tutorials where users click through actual Qualtrics interface screenshots to learn platform features. Each tutorial includes:

- Step-by-step guided instructions
- Clickable hotspots on real UI screenshots
- Scoring system with hints
- Completion tracking for Skilljar integration

## 📁 Project Structure

```
learn-by-building/
├── public/
│   ├── index.html
│   └── screenshots/           # Tutorial screenshots
│       ├── create-survey-project/
│       │   ├── step-1.png
│       │   ├── step-2.png
│       │   └── ...
│       └── [tutorial-id]/     # Add folders for new tutorials
│
├── src/
│   ├── App.js                 # Main application component
│   ├── index.js               # Entry point
│   ├── index.css              # Tailwind CSS
│   └── tutorials/             # Tutorial configurations
│       ├── index.js           # Tutorial registry
│       ├── _template.js       # Template for new tutorials
│       ├── create-survey-project.js
│       └── [your-tutorial].js # Add new tutorials here
│
├── package.json
├── tailwind.config.js
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- Git configured
- GitHub account with repo access

### Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Open http://localhost:3000
```

### Deployment

```bash
# Deploy to GitHub Pages
npm run deploy

# Wait ~1 minute, then access at:
# https://kaguilar-xmbc.github.io/learn-by-building
```

## 📝 Adding a New Tutorial

### Step 1: Create the configuration file

```bash
# Copy the template
cp src/tutorials/_template.js src/tutorials/my-new-tutorial.js
```

### Step 2: Edit the configuration

```javascript
// src/tutorials/my-new-tutorial.js

export const tutorialConfig = {
  id: 'my-new-tutorial',        // Must match filename
  title: 'My New Tutorial',
  description: 'What users will learn.',
  estimatedTime: '3 minutes',
  difficulty: 'Beginner',
  tags: ['relevant', 'tags'],
  brandColor: '#0066CC',
};

export const steps = [
  {
    id: 1,
    title: 'First action',
    instruction: 'Click the button to proceed.',
    screenshot: '/screenshots/my-new-tutorial/step-1.png',
    hotspot: { top: 50, left: 50, width: 10, height: 5 },
    hint: 'Look in the center of the screen.',
    wrongClickMessage: 'Not there! Try the center.',
  },
  // Add more steps...
];
```

### Step 3: Add screenshots

```bash
# Create folder for your tutorial
mkdir -p public/screenshots/my-new-tutorial

# Add your screenshots
# step-1.png, step-2.png, etc.
```

### Step 4: Register the tutorial

```javascript
// src/tutorials/index.js

import { tutorialConfig as myTutorialConfig, steps as myTutorialSteps } from './my-new-tutorial';

export const tutorials = [
  // ... existing tutorials
  {
    config: myTutorialConfig,
    steps: myTutorialSteps,
  },
];
```

### Step 5: Deploy

```bash
npm run deploy
```

## 🔧 Debug Mode

Click the ⚙️ button in the tutorial header to enable debug mode:

- Shows hotspot boundaries (red dashed border)
- Displays click coordinates
- Helps fine-tune hotspot positioning

### Calculating Hotspot Coordinates

Coordinates are percentages of the image dimensions:

```
top = (pixels from top / image height) × 100
left = (pixels from left / image width) × 100
width = (hotspot width / image width) × 100
height = (hotspot height / image height) × 100
```

**Tip:** Use debug mode to click where you want the hotspot, then use the displayed coordinates as a starting point.

## 🔗 Embedding in Skilljar

### Basic Embed

1. In Skilljar, create a new lesson
2. Select "Files or Web Content"
3. Choose "Embed Link" → "Any Website (Via iFrame)"
4. Enter URL: `https://kaguilar-xmbc.github.io/learn-by-building`

### Direct Tutorial Link

To link directly to a specific tutorial:

```
https://kaguilar-xmbc.github.io/learn-by-building?tutorial=create-survey-project
```

### Completion Tracking

The app sends a `postMessage` event when tutorials complete:

```javascript
{
  type: 'TUTORIAL_COMPLETE',
  event: 'lesson_complete',
  tutorialId: 'create-survey-project',
  tutorial: 'Create a New Survey Project',
  score: 400,
  totalSteps: 4,
  timestamp: '2026-01-19T...'
}
```

## 📐 Screenshot Guidelines

- **Resolution:** 1920×1080 recommended
- **Format:** PNG for best quality
- **Naming:** `step-1.png`, `step-2.png`, etc.
- **Content:** Capture BEFORE the action (show what user should see)
- **Privacy:** Remove any personal/sensitive data

## 🎨 Customization

### Brand Colors

Each tutorial can have its own brand color:

```javascript
tutorialConfig = {
  // ...
  brandColor: '#0066CC',  // Header, buttons, accents
}
```

### Common Qualtrics Colors
- Qualtrics Blue: `#0066CC`
- Success Green: `#22C55E`
- Warning Yellow: `#EAB308`

## 🛠 Troubleshooting

### "Tutorial not found"
- Check that the tutorial is registered in `src/tutorials/index.js`
- Verify the `?tutorial=` param matches the `id` in the config

### Screenshots not loading
- Verify path: `/screenshots/[tutorial-id]/step-X.png`
- Check that files are in `public/screenshots/` folder
- Case-sensitive: `Step-1.png` ≠ `step-1.png`

### Hotspots misaligned
- Use debug mode to get accurate coordinates
- Remember coordinates are percentages, not pixels
- Account for browser zoom levels during testing

### Deploy fails
- Ensure `homepage` in `package.json` is correct
- Check GitHub Pages is enabled in repo settings
- Wait 1-2 minutes after deploy for changes to propagate

## 📊 Generating Tutorials with Claude

Use the "Learn by Building Tutorial Generator" Claude Project to create tutorials from:

- Screen recordings
- Video scripts
- Course content
- Step-by-step descriptions

See the Claude Project setup guide for details.

---

## 📄 License

Internal use only - Qualtrics XM Basecamp

## 👥 Contributors

- XM Basecamp / CCLA Team
