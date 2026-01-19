// ============================================================
// TUTORIAL: Create a New Survey Project
// ============================================================
// Generated from video recording
// Last updated: 2026-01-19
// ============================================================

export const tutorialConfig = {
  id: 'create-survey-project',
  title: 'Create a New Survey Project',
  description: 'Learn how to create a new survey project in Qualtrics from the Home page.',
  estimatedTime: '2 minutes',
  difficulty: 'Beginner',
  prerequisites: [],
  tags: ['survey', 'getting-started', 'basics', 'project-creation'],
  brandColor: '#0066CC',
};

export const steps = [
  {
    id: 1,
    title: 'Click "Create a new project"',
    instruction: 'From the Home page, locate and click the "Create a new project" button in the left sidebar.',
    screenshot: '/screenshots/create-survey-project/step-1.png',
    hotspot: {
      top: 87,
      left: 1,
      width: 7,
      height: 3,
    },
    hint: 'Look for the blue button at the bottom of the left sidebar, below your recent projects.',
    wrongClickMessage: 'Not quite! Look for the blue "Create a new project" button at the bottom of the left sidebar.',
    requiresInput: false,
  },
  {
    id: 2,
    title: 'Select "Survey"',
    instruction: 'In the project catalog, click on the "Survey" tile under "From scratch" to create a new survey.',
    screenshot: '/screenshots/create-survey-project/step-2.png',
    hotspot: {
      top: 12,
      left: 20,
      width: 12,
      height: 5,
    },
    hint: 'The Survey tile is the first option in the "From scratch" section, with a clipboard icon.',
    wrongClickMessage: 'That\'s not the Survey tile. Look in the "From scratch" section for the first tile labeled "Survey".',
    requiresInput: false,
  },
  {
    id: 3,
    title: 'Click "Get started"',
    instruction: 'Review the Survey details in the right panel, then click "Get started" to proceed.',
    screenshot: '/screenshots/create-survey-project/step-3.png',
    hotspot: {
      top: 92,
      left: 79,
      width: 17,
      height: 4,
    },
    hint: 'Look for the blue "Get started" button at the bottom right of the screen.',
    wrongClickMessage: 'Almost! Find the blue "Get started" button in the bottom-right corner of the panel.',
    requiresInput: false,
  },
  {
    id: 4,
    title: 'Name your project and create it',
    instruction: 'Enter a name for your survey (e.g., "CSAT survey") in the Name field, then click "Create project".',
    screenshot: '/screenshots/create-survey-project/step-4.png',
    hotspot: {
      top: 64,
      left: 40,
      width: 15,
      height: 3,
    },
    hint: 'First type a name in the text field, then click the blue "Create project" button below it.',
    wrongClickMessage: 'Make sure you\'ve entered a project name, then click the blue "Create project" button.',
    requiresInput: true,
    inputPlaceholder: 'CSAT survey',
    inputValidation: /^.{3,}$/,
    inputField: {
      top: 49,
      left: 40,
      width: 15,
      height: 3,
    },
  },
];
