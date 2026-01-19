// ============================================================
// TUTORIAL TEMPLATE
// ============================================================
// Copy this file and rename it to create a new tutorial.
// 
// File naming: use-kebab-case.js (should match the id)
// 
// After creating:
// 1. Update tutorialConfig with your tutorial's info
// 2. Add your steps
// 3. Add screenshots to public/screenshots/[tutorial-id]/
// 4. Register in src/tutorials/index.js
// ============================================================

export const tutorialConfig = {
  // Unique identifier - use kebab-case, must match filename
  id: 'your-tutorial-id',
  
  // Display title
  title: 'Your Tutorial Title',
  
  // Brief description (1-2 sentences)
  description: 'What the learner will accomplish in this tutorial.',
  
  // Estimated completion time
  estimatedTime: '5 minutes',
  
  // Difficulty level
  difficulty: 'Beginner', // 'Beginner' | 'Intermediate' | 'Advanced'
  
  // Tutorial IDs that should be completed first (optional)
  prerequisites: [],
  
  // Tags for filtering/categorization
  tags: ['tag1', 'tag2'],
  
  // Brand color for UI accents (Qualtrics blue default)
  brandColor: '#0066CC',
};

export const steps = [
  {
    // Step number (sequential)
    id: 1,
    
    // Short title starting with action verb
    title: 'Click the button',
    
    // Clear instruction for what user should do
    instruction: 'Describe exactly what the user needs to do in this step.',
    
    // Path to screenshot (relative to public folder)
    screenshot: '/screenshots/your-tutorial-id/step-1.png',
    
    // Clickable area coordinates (percentages)
    hotspot: {
      top: 50,      // % from top edge
      left: 50,     // % from left edge
      width: 10,    // % of image width
      height: 5,    // % of image height
    },
    
    // Help text shown when user requests hint
    hint: 'A helpful clue that guides without giving away the answer.',
    
    // Message shown when user clicks wrong area
    wrongClickMessage: 'Friendly message redirecting to the correct area.',
    
    // Set to true if step requires text input
    requiresInput: false,
    
    // Placeholder text for input field (if requiresInput is true)
    inputPlaceholder: '',
    
    // Regex validation pattern (if requiresInput is true)
    inputValidation: null,
    
    // Position of simulated input field on screenshot (if requiresInput is true)
    inputField: null,
    // inputField: {
    //   top: 50,
    //   left: 50,
    //   width: 20,
    //   height: 3,
    // },
  },
  
  // Add more steps...
  {
    id: 2,
    title: 'Second action',
    instruction: 'Description of the second step.',
    screenshot: '/screenshots/your-tutorial-id/step-2.png',
    hotspot: {
      top: 30,
      left: 60,
      width: 15,
      height: 4,
    },
    hint: 'Hint for step 2.',
    wrongClickMessage: 'Wrong click message for step 2.',
    requiresInput: false,
  },
];

// ============================================================
// SCREENSHOT CHECKLIST
// ============================================================
/*
Create these screenshots and save to public/screenshots/your-tutorial-id/

□ step-1.png
  - Capture when: [describe the exact UI state]
  - Key elements visible: [list what must be in the screenshot]
  
□ step-2.png
  - Capture when: [describe the exact UI state]
  - Key elements visible: [list what must be in the screenshot]

Tips:
- Use consistent browser window size (recommend 1920x1080)
- Clear any personal data from screenshots
- Capture at the moment BEFORE the action (not after)
- Use debug mode to fine-tune hotspot coordinates
*/
