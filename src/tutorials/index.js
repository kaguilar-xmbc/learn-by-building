// ============================================================
// TUTORIAL REGISTRY
// ============================================================
// This file registers all available tutorials.
// 
// To add a new tutorial:
// 1. Create your config file in this folder (e.g., my-tutorial.js)
// 2. Import it below
// 3. Add it to the tutorials array
// ============================================================

// Import tutorial configs
import { tutorialConfig as createSurveyConfig, steps as createSurveySteps } from './create-survey-project';
// import { tutorialConfig as addQuestionConfig, steps as addQuestionSteps } from './add-question';
// import { tutorialConfig as yourTutorialConfig, steps as yourTutorialSteps } from './your-tutorial';

// ============================================================
// TUTORIALS ARRAY
// ============================================================
// Add new tutorials here. Each entry should have:
// - config: The tutorialConfig object
// - steps: The steps array
// ============================================================

export const tutorials = [
  {
    config: createSurveyConfig,
    steps: createSurveySteps,
  },
  // Add more tutorials here:
  // {
  //   config: addQuestionConfig,
  //   steps: addQuestionSteps,
  // },
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Get a tutorial by its ID
 * @param {string} id - The tutorial ID (e.g., 'create-survey-project')
 * @returns {object|undefined} The tutorial object or undefined if not found
 */
export function getTutorialById(id) {
  return tutorials.find(t => t.config.id === id);
}

/**
 * Get tutorials by tag
 * @param {string} tag - The tag to filter by
 * @returns {array} Array of matching tutorials
 */
export function getTutorialsByTag(tag) {
  return tutorials.filter(t => t.config.tags?.includes(tag));
}

/**
 * Get tutorials by difficulty
 * @param {string} difficulty - 'Beginner', 'Intermediate', or 'Advanced'
 * @returns {array} Array of matching tutorials
 */
export function getTutorialsByDifficulty(difficulty) {
  return tutorials.filter(t => t.config.difficulty === difficulty);
}

export default tutorials;
