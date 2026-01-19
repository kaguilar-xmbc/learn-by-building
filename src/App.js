import React, { useState, useEffect } from 'react';
import { tutorials, getTutorialById } from './tutorials';

// ============================================================
// LEARN BY BUILDING - MULTI-TUTORIAL APP
// ============================================================
// This app supports multiple tutorials loaded from separate config files.
// 
// To add a new tutorial:
// 1. Create config file in src/tutorials/[tutorial-id].js
// 2. Add screenshots to public/screenshots/[tutorial-id]/
// 3. Register in src/tutorials/index.js
// 4. Deploy with: npm run deploy
// ============================================================

function App() {
  // Get tutorial ID from URL params (e.g., ?tutorial=create-survey-project)
  const urlParams = new URLSearchParams(window.location.search);
  const tutorialIdFromUrl = urlParams.get('tutorial');
  
  // State
  const [selectedTutorial, setSelectedTutorial] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [debugMode, setDebugMode] = useState(false);
  const [clickPosition, setClickPosition] = useState(null);

  // Load tutorial from URL param on mount
  useEffect(() => {
    if (tutorialIdFromUrl) {
      const tutorial = getTutorialById(tutorialIdFromUrl);
      if (tutorial) {
        setSelectedTutorial(tutorial);
      }
    }
  }, [tutorialIdFromUrl]);

  // Current step data
  const step = selectedTutorial?.steps[currentStep];
  const totalSteps = selectedTutorial?.steps.length || 0;
  const config = selectedTutorial?.config;

  // Reset tutorial state
  const resetTutorial = () => {
    setCurrentStep(0);
    setScore(0);
    setWrongAttempts(0);
    setShowHint(false);
    setCompleted(false);
    setInputValue('');
    setClickPosition(null);
  };

  // Handle tutorial selection
  const handleSelectTutorial = (tutorial) => {
    setSelectedTutorial(tutorial);
    resetTutorial();
    // Update URL without reload
    window.history.pushState({}, '', `?tutorial=${tutorial.config.id}`);
  };

  // Back to tutorial list
  const handleBackToList = () => {
    setSelectedTutorial(null);
    resetTutorial();
    window.history.pushState({}, '', window.location.pathname);
  };

  // Handle correct click
  const handleCorrectClick = () => {
    // Check if input is required and valid
    if (step.requiresInput) {
      if (!inputValue.trim()) {
        return; // Don't proceed without input
      }
      if (step.inputValidation && !step.inputValidation.test(inputValue)) {
        setWrongAttempts(prev => prev + 1);
        return;
      }
    }

    const stepScore = Math.max(100 - (wrongAttempts * 25), 25);
    setScore(prev => prev + stepScore);
    setWrongAttempts(0);
    setShowHint(false);
    setInputValue('');
    setClickPosition(null);

    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleCompletion();
    }
  };

  // Handle wrong click
  const handleWrongClick = (e) => {
    setWrongAttempts(prev => prev + 1);
    
    // Show click position in debug mode
    if (debugMode) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
      const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
      setClickPosition({ x, y });
    }
  };

  // Handle completion
  const handleCompletion = () => {
    setCompleted(true);

    // Send completion to parent (Skilljar)
    window.parent.postMessage({
      type: 'TUTORIAL_COMPLETE',
      event: 'lesson_complete',
      tutorialId: config.id,
      tutorial: config.title,
      score: score + Math.max(100 - (wrongAttempts * 25), 25), // Include final step
      totalSteps: totalSteps,
      timestamp: new Date().toISOString(),
    }, '*');
  };

  // ============================================================
  // TUTORIAL SELECTOR (shown when no tutorial selected)
  // ============================================================
  if (!selectedTutorial) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Learn by Building</h1>
          <p className="text-gray-600 mb-8">Interactive tutorials for mastering Qualtrics</p>

          {tutorials.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500">No tutorials available yet.</p>
              <p className="text-sm text-gray-400 mt-2">Add tutorials in src/tutorials/</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {tutorials.map((tutorial) => (
                <button
                  key={tutorial.config.id}
                  onClick={() => handleSelectTutorial(tutorial)}
                  className="bg-white rounded-lg shadow p-6 text-left hover:shadow-lg transition-shadow border-2 border-transparent hover:border-blue-500"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        {tutorial.config.title}
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">
                        {tutorial.config.description}
                      </p>
                    </div>
                    <span className={`
                      px-2 py-1 text-xs font-medium rounded
                      ${tutorial.config.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' : ''}
                      ${tutorial.config.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${tutorial.config.difficulty === 'Advanced' ? 'bg-red-100 text-red-800' : ''}
                    `}>
                      {tutorial.config.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                    <span>⏱ {tutorial.config.estimatedTime}</span>
                    <span>📝 {tutorial.steps.length} steps</span>
                  </div>
                  {tutorial.config.tags && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {tutorial.config.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ============================================================
  // COMPLETION SCREEN
  // ============================================================
  if (completed) {
    const finalScore = score;
    const maxScore = totalSteps * 100;
    const percentage = Math.round((finalScore / maxScore) * 100);

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">
            {percentage === 100 ? '🏆' : percentage >= 75 ? '🎉' : '✅'}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {percentage === 100 ? 'Perfect score!' : 'Tutorial Complete!'}
          </h2>
          <p className="text-gray-600 mb-6">
            You've completed "{config.title}"
          </p>

          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="text-4xl font-bold" style={{ color: config.brandColor }}>
              {finalScore}
            </div>
            <div className="text-sm text-gray-500">Your Score</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div
                className="h-2 rounded-full transition-all"
                style={{ width: `${percentage}%`, backgroundColor: config.brandColor }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Steps: {totalSteps}/{totalSteps} ✓</span>
              <span>Accuracy: {percentage}%</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={resetTutorial}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              🔄 Try Again
            </button>
            <button
              onClick={handleBackToList}
              className="flex-1 px-4 py-2 rounded-lg text-white hover:opacity-90"
              style={{ backgroundColor: config.brandColor }}
            >
              More Tutorials →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // MAIN TUTORIAL VIEW
  // ============================================================
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header 
        className="text-white px-4 py-3 flex items-center justify-between"
        style={{ backgroundColor: config.brandColor }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={handleBackToList}
            className="text-white/80 hover:text-white text-sm"
          >
            ← Back
          </button>
          <div>
            <h1 className="font-semibold">{config.title}</h1>
            <p className="text-xs text-white/80">{step.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDebugMode(!debugMode)}
            className={`text-xs px-2 py-1 rounded ${debugMode ? 'bg-yellow-400 text-yellow-900' : 'bg-white/20'}`}
          >
            {debugMode ? '🔧 Debug ON' : '⚙️'}
          </button>
          <div className="text-right">
            <div className="text-sm font-medium">{score} pts</div>
            <div className="text-xs text-white/80">Step {currentStep + 1}/{totalSteps}</div>
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="h-1 bg-gray-300">
        <div
          className="h-full transition-all duration-300"
          style={{ 
            width: `${((currentStep + 1) / totalSteps) * 100}%`,
            backgroundColor: config.brandColor 
          }}
        />
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col lg:flex-row">
        {/* Screenshot area */}
        <div className="flex-1 p-4 flex items-center justify-center bg-gray-200">
          <div className="relative max-w-full max-h-full">
            <img
              src={process.env.PUBLIC_URL + step.screenshot}
              alt={`Step ${step.id}`}
              className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-lg"
              onClick={handleWrongClick}
            />

            {/* Hotspot */}
            <div
              onClick={handleCorrectClick}
              className={`absolute cursor-pointer transition-all ${
                debugMode ? 'border-2 border-dashed border-red-500 bg-red-500/20' : ''
              }`}
              style={{
                top: `${step.hotspot.top}%`,
                left: `${step.hotspot.left}%`,
                width: `${step.hotspot.width}%`,
                height: `${step.hotspot.height}%`,
              }}
            />

            {/* Input field overlay (if required) */}
            {step.requiresInput && step.inputField && (
              <div
                className="absolute"
                style={{
                  top: `${step.inputField.top}%`,
                  left: `${step.inputField.left}%`,
                  width: `${step.inputField.width}%`,
                  height: `${step.inputField.height}%`,
                }}
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={step.inputPlaceholder}
                  className="w-full h-full px-2 text-sm border-2 border-blue-500 rounded bg-white/90"
                  onKeyPress={(e) => e.key === 'Enter' && handleCorrectClick()}
                />
              </div>
            )}

            {/* Debug info */}
            {debugMode && clickPosition && (
              <div className="absolute bottom-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                Click: {clickPosition.x}%, {clickPosition.y}%
              </div>
            )}
          </div>
        </div>

        {/* Instruction panel */}
        <div className="lg:w-80 bg-white p-6 border-t lg:border-t-0 lg:border-l">
          <div className="mb-4">
            <span 
              className="text-xs font-medium px-2 py-1 rounded"
              style={{ backgroundColor: `${config.brandColor}20`, color: config.brandColor }}
            >
              Step {step.id} of {totalSteps}
            </span>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h2>
          <p className="text-gray-600 mb-6">{step.instruction}</p>

          {/* Input field (alternative placement) */}
          {step.requiresInput && !step.inputField && (
            <div className="mb-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={step.inputPlaceholder}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}

          {/* Hint */}
          {showHint ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-2">
                <span>💡</span>
                <p className="text-sm text-yellow-800">{step.hint}</p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowHint(true)}
              className="text-sm text-gray-500 hover:text-gray-700 mb-4"
            >
              💡 Need a hint?
            </button>
          )}

          {/* Wrong click message */}
          {wrongAttempts > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800">{step.wrongClickMessage}</p>
              <p className="text-xs text-red-600 mt-1">Attempts: {wrongAttempts}</p>
            </div>
          )}

          {/* Debug panel */}
          {debugMode && (
            <div className="mt-6 p-4 bg-gray-900 text-gray-100 rounded-lg text-xs font-mono">
              <div className="text-yellow-400 mb-2">🔧 Debug Mode</div>
              <div>Hotspot: top:{step.hotspot.top}% left:{step.hotspot.left}%</div>
              <div>Size: {step.hotspot.width}% × {step.hotspot.height}%</div>
              {clickPosition && (
                <div className="text-red-400 mt-2">Last click: {clickPosition.x}%, {clickPosition.y}%</div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
