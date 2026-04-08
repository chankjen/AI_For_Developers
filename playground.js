// Playground JavaScript

// Quiz Data - extracted from Quiz.md
const quizQuestions = [
    {
        question: "What is the primary advantage of using Cursor IDE over a traditional text editor?",
        options: [
            "It is completely free forever.",
            "It is an AI-native editor with built-in codebase understanding and agent mode.",
            "It only works with Python code.",
            "It does not require an internet connection."
        ],
        correct: 1
    },
    {
        question: "Which tool is best described as an \"agent-based coding platform\" capable of building apps from natural language descriptions?",
        options: [
            "Cursor",
            "GitHub Copilot",
            "Google Antigravity",
            "VS Code"
        ],
        correct: 2
    },
    {
        question: "In Cursor IDE, what is the keyboard shortcut to open the Chat panel?",
        options: [
            "Cmd+K / Ctrl+K",
            "Cmd+L / Ctrl+L",
            "Cmd+P / Ctrl+P",
            "Cmd+S / Ctrl+S"
        ],
        correct: 0
    },
    {
        question: "According to the \"80/20 Rule\" of AI Development, how should effort be distributed?",
        options: [
            "80% Coding, 20% Planning",
            "50% Human Effort, 50% AI Effort",
            "20% Human Effort (Architecture/Review), 80% AI Acceleration (Boilerplate/Tests)",
            "80% Debugging, 20% Writing new code"
        ],
        correct: 2
    },
    {
        question: "Why is it critical to NEVER include API keys or secrets in your AI prompts?",
        options: [
            "It slows down the AI response time.",
            "The AI might accidentally publish them to GitHub.",
            "Prompts are often stored on external servers, creating a data leak risk.",
            "The AI cannot understand what an API key is."
        ],
        correct: 2
    },
    {
        question: "Statistics show that AI-generated code is how much more likely to introduce security vulnerabilities compared to human-written code?",
        options: [
            "10% more likely",
            "50% more likely",
            "1.5 to 2 times more likely",
            "It is actually safer than human code."
        ],
        correct: 2
    },
    {
        question: "Which of the following is a \"DON'T\" when working with AI tools?",
        options: [
            "Using AI to write unit tests.",
            "Blindly trusting AI output without review.",
            "Asking AI to explain complex error messages.",
            "Using AI to refactor legacy code."
        ],
        correct: 1
    },
    {
        question: "What is the \"Plan Mode\" strategy when using Claude Code?",
        options: [
            "Asking the AI to write the entire application in one go.",
            "Starting with a minimal spec and letting the AI interview you for requirements before coding.",
            "Planning your lunch break while the AI codes.",
            "Writing the code first and asking the AI to plan the architecture later."
        ],
        correct: 1
    },
    {
        question: "Which design pattern is recommended to prevent cascading failures in a distributed system?",
        options: [
            "The Singleton Pattern",
            "The Circuit Breaker Pattern",
            "The Factory Pattern",
            "The Observer Pattern"
        ],
        correct: 1
    },
    {
        question: "What is the primary goal of \"Digital Resilience\" for a developer?",
        options: [
            "To write code that never has bugs.",
            "To rapidly adapt to disruption while minimizing harm and maintaining operations.",
            "To ensure the server never goes offline.",
            "To use the most expensive cloud providers."
        ],
        correct: 1
    },
    {
        question: "When debugging with AI, what is the most effective first step?",
        options: [
            "Rewrite the entire function from scratch.",
            "Paste the error message and relevant code context into the AI chat.",
            "Restart your computer.",
            "Ignore the error and hope it goes away."
        ],
        correct: 1
    },
    {
        question: "Which technique involves asking the AI to \"Explain this code line by line as if I'm a beginner\" to find logic errors?",
        options: [
            "Rubber Duck Debugging",
            "Brute Force Debugging",
            "Binary Search Debugging",
            "Random Mutation Testing"
        ],
        correct: 0
    },
    {
        question: "What is the recommended \"Daily AI-Powered Workflow\" sequence?",
        options: [
            "Code → Debug → Deploy → Plan",
            "Spec → AI Generation → Review → Test → Refinement",
            "Test → Code → Spec → Review",
            "AI Generation → Deploy → Review → Spec"
        ],
        correct: 1
    },
    {
        question: "Which metric is NOT a recommended Key Performance Indicator (KPI) for measuring AI success?",
        options: [
            "Time per feature reduction.",
            "Lines of code written per day.",
            "Code review feedback quality.",
            "Bug fix time reduction."
        ],
        correct: 1
    }
];

// Flashcard Data
const flashcards = [
    {
        front: "What is the 80/20 Rule in AI Development?",
        back: "20% Human Effort (Architecture/Review), 80% AI Acceleration (Boilerplate/Tests)"
    },
    {
        front: "Why should you NEVER include API keys in AI prompts?",
        back: "Prompts are stored on external servers, creating a data leak risk"
    },
    {
        front: "What is the Circuit Breaker Pattern used for?",
        back: "Preventing cascading failures in distributed systems"
    },
    {
        front: "What does 'Digital Resilience' mean for developers?",
        back: "Rapidly adapting to disruption while minimizing harm and maintaining operations"
    },
    {
        front: "What is the most effective first step when debugging with AI?",
        back: "Paste the error message and relevant code context into the AI chat"
    },
    {
        front: "What is 'Plan Mode' in Claude Code?",
        back: "Starting with a minimal spec and letting the AI interview you for requirements"
    },
    {
        front: "How much more likely is AI-generated code to have security vulnerabilities?",
        back: "1.5 to 2 times more likely than human-written code"
    },
    {
        front: "What is the recommended daily AI-powered workflow sequence?",
        back: "Spec → AI Generation → Review → Test → Refinement"
    },
    {
        front: "Which AI tool is described as an 'agent-based coding platform'?",
        back: "Google Antigravity"
    },
    {
        front: "What keyboard shortcut opens the Chat panel in Cursor IDE?",
        back: "Cmd+K / Ctrl+K"
    }
];

// Mind Map Challenges
const mindMapChallenges = [
    {
        title: "AI Development Workflow Connections",
        instructions: "Connect the workflow stages in the correct order for effective AI-assisted development",
        nodes: [
            { id: "spec", text: "Spec", x: 400, y: 50, connections: ["ai-gen"] },
            { id: "ai-gen", text: "AI Generation", x: 200, y: 150, connections: ["review"] },
            { id: "review", text: "Review", x: 600, y: 150, connections: ["test"] },
            { id: "test", text: "Test", x: 300, y: 250, connections: ["refine"] },
            { id: "refine", text: "Refinement", x: 500, y: 250, connections: [] }
        ]
    },
    {
        title: "Security Best Practices Mind Map",
        instructions: "Connect security concepts and show how they relate to AI development",
        nodes: [
            { id: "security", text: "Security", x: 400, y: 50, connections: ["api-keys", "review", "vulnerabilities"] },
            { id: "api-keys", text: "Never Share API Keys", x: 150, y: 150, connections: ["data-leak"] },
            { id: "data-leak", text: "Data Leak Risk", x: 100, y: 250, connections: [] },
            { id: "review", text: "Review AI Output", x: 400, y: 150, connections: ["blind-trust"] },
            { id: "blind-trust", text: "Avoid Blind Trust", x: 350, y: 250, connections: [] },
            { id: "vulnerabilities", text: "AI Code Vulnerabilities", x: 650, y: 150, connections: ["higher-risk"] },
            { id: "higher-risk", text: "1.5-2x More Likely", x: 650, y: 250, connections: [] }
        ]
    },
    {
        title: "AI Tools Ecosystem",
        instructions: "Connect the AI development tools and their primary functions",
        nodes: [
            { id: "cursor", text: "Cursor IDE", x: 400, y: 50, connections: ["chat", "agent"] },
            { id: "chat", text: "AI Chat (Cmd+K)", x: 200, y: 150, connections: [] },
            { id: "agent", text: "Agent Mode", x: 600, y: 150, connections: [] },
            { id: "claude", text: "Claude Code", x: 150, y: 250, connections: ["plan-mode"] },
            { id: "plan-mode", text: "Plan Mode", x: 100, y: 350, connections: [] },
            { id: "antigravity", text: "Antigravity", x: 650, y: 250, connections: ["app-building"] },
            { id: "app-building", text: "App Building", x: 650, y: 350, connections: [] }
        ]
    }
];

// Global variables
let currentQuizQuestion = 0;
let quizAnswers = [];
let currentFlashcard = 0;
let flashcardFlipped = false;
let currentMindMapChallenge = 0;
let mindMapAnswerRevealed = false;

// Modal functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

// Quiz functions
function startQuiz() {
    currentQuizQuestion = 0;
    quizAnswers = [];
    showQuizQuestion();
    openModal('quizModal');
}

function showQuizQuestion() {
    const question = quizQuestions[currentQuizQuestion];
    const quizContent = document.getElementById('quizContent');

    quizContent.innerHTML = `
        <div class="quiz-question">
            <h3>Question ${currentQuizQuestion + 1} of ${quizQuestions.length}</h3>
            <p>${question.question}</p>
            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <div class="quiz-option" onclick="selectQuizOption(${index})">
                        ${String.fromCharCode(65 + index)}. ${option}
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="quiz-navigation">
            <div class="quiz-progress">
                Progress: ${currentQuizQuestion + 1}/${quizQuestions.length}
            </div>
            <div>
                ${currentQuizQuestion > 0 ? `<button class="btn-quiz btn-secondary-quiz" onclick="previousQuizQuestion()">Previous</button>` : ''}
                <button class="btn-quiz btn-primary-quiz" onclick="nextQuizQuestion()" id="nextBtn">
                    ${currentQuizQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next'}
                </button>
            </div>
        </div>
    `;

    // Restore previous selection if exists
    if (quizAnswers[currentQuizQuestion] !== undefined) {
        document.querySelectorAll('.quiz-option')[quizAnswers[currentQuizQuestion]].classList.add('selected');
    }
}

function selectQuizOption(optionIndex) {
    document.querySelectorAll('.quiz-option').forEach(option => option.classList.remove('selected'));
    document.querySelectorAll('.quiz-option')[optionIndex].classList.add('selected');
    quizAnswers[currentQuizQuestion] = optionIndex;
}

function nextQuizQuestion() {
    if (quizAnswers[currentQuizQuestion] === undefined) {
        alert('Please select an answer before proceeding.');
        return;
    }

    if (currentQuizQuestion < quizQuestions.length - 1) {
        currentQuizQuestion++;
        showQuizQuestion();
    } else {
        showQuizResults();
    }
}

function previousQuizQuestion() {
    if (currentQuizQuestion > 0) {
        currentQuizQuestion--;
        showQuizQuestion();
    }
}

function showQuizResults() {
    const correctAnswers = quizAnswers.reduce((count, answer, index) => {
        return count + (answer === quizQuestions[index].correct ? 1 : 0);
    }, 0);

    const percentage = Math.round((correctAnswers / quizQuestions.length) * 100);
    const passed = percentage >= 70;

    let resultsHTML = `
        <div class="quiz-results">
            <h2>Quiz Complete!</h2>
            <div class="results-score ${passed ? 'results-pass' : 'results-fail'}">
                ${percentage}%
            </div>
            <p>You got ${correctAnswers} out of ${quizQuestions.length} questions correct.</p>
            <p class="${passed ? 'results-pass' : 'results-fail'}">
                ${passed ? 'Congratulations! You passed the quiz.' : 'You did not meet the 70% pass mark. Would you like to retake the quiz?'}
            </p>
            ${!passed ? '<button class="btn-quiz btn-primary-quiz" onclick="startQuiz()">Retake Quiz</button>' : ''}
        </div>
    `;

    // Show wrong answers
    const wrongAnswers = quizAnswers.map((answer, index) => {
        if (answer !== quizQuestions[index].correct) {
            return {
                question: quizQuestions[index].question,
                yourAnswer: quizQuestions[index].options[answer],
                correctAnswer: quizQuestions[index].options[quizQuestions[index].correct]
            };
        }
        return null;
    }).filter(item => item !== null);

    if (wrongAnswers.length > 0) {
        resultsHTML += `
            <div class="results-details">
                <h3>Review Incorrect Answers:</h3>
                ${wrongAnswers.map(item => `
                    <div class="wrong-answer">
                        <h4>${item.question}</h4>
                        <p><strong>Your answer:</strong> ${item.yourAnswer}</p>
                        <p><strong class="correct-answer">Correct answer:</strong> ${item.correctAnswer}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    document.getElementById('quizContent').innerHTML = resultsHTML;
}

// Flashcard functions
function startFlashcards() {
    currentFlashcard = 0;
    flashcardFlipped = false;
    showFlashcard();
    openModal('flashcardsModal');
}

function showFlashcard() {
    const flashcard = flashcards[currentFlashcard];
    const flashcardsContent = document.getElementById('flashcardsContent');

    flashcardsContent.innerHTML = `
        <div class="flashcard-container">
            <div class="flashcard ${flashcardFlipped ? 'flipped' : ''}" onclick="flipFlashcard()">
                <div class="flashcard-front ${!flashcardFlipped ? 'show' : ''}">
                    <h3>Question</h3>
                    <p>${flashcard.front}</p>
                </div>
                <div class="flashcard-back ${flashcardFlipped ? 'show' : ''}">
                    <h3>Answer</h3>
                    <p>${flashcard.back}</p>
                </div>
            </div>
            <div class="flashcard-navigation">
                <div class="flashcard-progress">
                    Card ${currentFlashcard + 1} of ${flashcards.length}
                </div>
                <div>
                    <button class="btn-quiz btn-secondary-quiz" onclick="previousFlashcard()" ${currentFlashcard === 0 ? 'disabled' : ''}>Previous</button>
                    <button class="btn-quiz btn-secondary-quiz" onclick="flipFlashcard()">Flip</button>
                    <button class="btn-quiz btn-primary-quiz" onclick="nextFlashcard()">
                        ${currentFlashcard === flashcards.length - 1 ? 'Finish' : 'Next'}
                    </button>
                </div>
            </div>
        </div>
    `;
}

function flipFlashcard() {
    flashcardFlipped = !flashcardFlipped;
    const flashcard = document.querySelector('.flashcard');
    flashcard.classList.toggle('flipped');

    const front = document.querySelector('.flashcard-front');
    const back = document.querySelector('.flashcard-back');

    if (flashcardFlipped) {
        front.classList.remove('show');
        back.classList.add('show');
    } else {
        back.classList.remove('show');
        front.classList.add('show');
    }
}

function nextFlashcard() {
    if (currentFlashcard < flashcards.length - 1) {
        currentFlashcard++;
        flashcardFlipped = false;
        showFlashcard();
    } else {
        closeModal();
        alert('Flashcard session complete! Great job mastering these concepts.');
    }
}

function previousFlashcard() {
    if (currentFlashcard > 0) {
        currentFlashcard--;
        flashcardFlipped = false;
        showFlashcard();
    }
}

// Mind Map functions
function startMindMaps() {
    currentMindMapChallenge = 0;
    showMindMapChallenge();
    openModal('mindmapsModal');
}

function showMindMapChallenge() {
    const challenge = mindMapChallenges[currentMindMapChallenge];
    const mindmapsContent = document.getElementById('mindmapsContent');
    mindMapAnswerRevealed = false;

    mindmapsContent.innerHTML = `
        <div class="mindmap-container">
            <div class="mindmap-challenge">
                <h3 class="mindmap-title">${challenge.title}</h3>
                <div class="mindmap-instructions">
                    <h4>Instructions:</h4>
                    <p>${challenge.instructions}</p>
                </div>
                <div class="mindmap-canvas" id="mindmapCanvas">
                    ${challenge.nodes.map(node => `
                        <div class="mindmap-node ${node.id === 'spec' ? 'center' : ''}" 
                             style="left: ${node.x}px; top: ${node.y}px;" 
                             data-id="${node.id}">
                            ${node.text}
                        </div>
                    `).join('')}
                </div>
                <div class="mindmap-answer-display" id="answerDisplay">
                    <h4>✓ Correct Answer Revealed</h4>
                    <p><strong>Challenge:</strong> ${challenge.title}</p>
                    <p><strong>Objective:</strong> ${challenge.instructions}</p>
                    <p>You may now proceed to the next challenge.</p>
                </div>
                <div class="mindmap-navigation" style="text-align: center; margin-top: 1rem;">
                    <button class="btn-quiz btn-secondary-quiz" onclick="revealMindMapAnswer()" id="checkAnswerBtn">Check Answer</button>
                    <button class="btn-quiz btn-secondary-quiz" onclick="previousMindMap()" ${currentMindMapChallenge === 0 ? 'disabled' : ''}>Previous Challenge</button>
                    <button class="btn-quiz btn-primary-quiz" id="nextBtn" onclick="nextMindMap()" disabled>
                        ${currentMindMapChallenge === mindMapChallenges.length - 1 ? 'Finish' : 'Next Challenge'}
                    </button>
                </div>
            </div>
        </div>
    `;

    // Make nodes draggable
    makeNodesDraggable();
}

function makeNodesDraggable() {
    const nodes = document.querySelectorAll('.mindmap-node');
    let draggedElement = null;

    nodes.forEach(node => {
        node.addEventListener('mousedown', (e) => {
            draggedElement = e.target;
            draggedElement.style.zIndex = '1000';
        });
    });

    document.addEventListener('mousemove', (e) => {
        if (draggedElement) {
            const canvas = document.getElementById('mindmapCanvas');
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left - draggedElement.offsetWidth / 2;
            const y = e.clientY - rect.top - draggedElement.offsetHeight / 2;

            draggedElement.style.left = Math.max(0, Math.min(x, rect.width - draggedElement.offsetWidth)) + 'px';
            draggedElement.style.top = Math.max(0, Math.min(y, rect.height - draggedElement.offsetHeight)) + 'px';
        }
    });

    document.addEventListener('mouseup', () => {
        if (draggedElement) {
            draggedElement.style.zIndex = '';
            draggedElement = null;
        }
    });
}

function revealMindMapAnswer() {
    mindMapAnswerRevealed = true;
    const answerDisplay = document.getElementById('answerDisplay');
    const checkAnswerBtn = document.getElementById('checkAnswerBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (answerDisplay) {
        answerDisplay.classList.add('show');
    }
    if (checkAnswerBtn) {
        checkAnswerBtn.style.display = 'none';
    }
    if (nextBtn) {
        nextBtn.disabled = false;
    }
}

function nextMindMap() {
    if (currentMindMapChallenge < mindMapChallenges.length - 1) {
        currentMindMapChallenge++;
        showMindMapChallenge();
    } else {
        closeModal();
        alert('Mind map challenges complete! You\'ve successfully explored the connections between AI development concepts.');
    }
}

function previousMindMap() {
    if (currentMindMapChallenge > 0) {
        currentMindMapChallenge--;
        showMindMapChallenge();
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal();
    }
}