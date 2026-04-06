// Code Examples Database
const codeExamples = {
    'Circuit_Breaker_Pattern.py': {
        language: 'python',
        description: 'Implements the Circuit Breaker pattern to prevent cascading failures in distributed systems. Prevents one failed service from crashing the entire system.',
        concepts: [
            'Failure detection and tracking',
            'Three-state model: CLOSED, OPEN, HALF-OPEN',
            'Automatic recovery with timeout',
            'Exception propagation',
            'Request throttling'
        ],
        url: 'Circuit_Breaker_Pattern.py'
    },
    'Exponential_Backoff.py': {
        language: 'python',
        description: 'Implements automatic retry logic with exponential backoff for API calls. Prevents overwhelming failing services and enables graceful degradation.',
        concepts: [
            'Exponential delay calculation',
            'Retry attempt limits',
            'Request timeout handling',
            'Error categorization',
            'Logging and monitoring'
        ],
        url: 'Exponential_Backoff.py'
    },
    'Debbugging_Helper.py': {
        language: 'python',
        description: 'Decorator-based debugging framework that traces function execution with full context. Enables AI-assisted debugging by logging arguments, returns, and exceptions.',
        concepts: [
            'Decorator pattern for instrumentation',
            'Function call tracing',
            'Stack trace capture',
            'Dual logging (file and console)',
            'Error context preservation'
        ],
        url: 'Debbugging_Helper.py'
    },
    'Env_Variable_Security.js': {
        language: 'javascript',
        description: 'Demonstrates secure environment-based configuration management. Prevents credential exposure by using environment variables instead of hardcoded secrets.',
        concepts: [
            'Environment variable loading',
            'Configuration separation by environment',
            'Secret management best practices',
            'Configuration validation',
            'Secure defaults'
        ],
        url: 'Env_Variable_Security.js'
    },
    'Validator.js': {
        language: 'javascript',
        description: 'Express.js authentication endpoint with comprehensive security. Includes input validation, password hashing, JWT token generation, and secure error handling.',
        concepts: [
            'Input validation patterns',
            'bcrypt password hashing',
            'JWT token generation',
            'Secure error messages',
            'Rate limiting for auth'
        ],
        url: 'Validator.js'
    }
};

// Load code file and display it
async function loadExample(filename, language) {
    const example = codeExamples[filename];
    if (!example) return;

    try {
        // Fetch the code file
        const response = await fetch(filename);
        const code = await response.text();

        // Update the code viewer
        const codeElement = document.getElementById('codeContent');
        codeElement.textContent = code;
        codeElement.className = `language-${language}`;

        // Highlight the code
        hljs.highlightElement(codeElement);

        // Update filename
        document.getElementById('codeFilename').textContent = filename;

        // Update description
        document.getElementById('codeDescription').textContent = example.description;

        // Update concepts
        const conceptsList = document.getElementById('codeConcepts');
        conceptsList.innerHTML = example.concepts
            .map(concept => `<li>${concept}</li>`)
            .join('');

        // Store current example for copy functionality
        window.currentCode = code;
        window.currentLanguage = language;

    } catch (error) {
        console.error('Error loading code:', error);
        document.getElementById('codeContent').textContent = 'Error loading code file';
    }
}

// Copy code to clipboard
function copyCode() {
    if (!window.currentCode) return;

    navigator.clipboard.writeText(window.currentCode).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '✓ Copied';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    });
}

// Scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Document loading
document.addEventListener('DOMContentLoaded', () => {
    // Load first example by default
    loadExample('Circuit_Breaker_Pattern.py', 'python');

    // Initialize event listeners
    const exampleLinks = document.querySelectorAll('.examples-list a');
    exampleLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            exampleLinks.forEach(l => l.style.color = 'var(--text-secondary)');
            link.style.color = 'var(--primary)';
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                scrollToSection(href.substring(1));
            }
        });
    });
});

// Code diff functionality for comparing versions
class CodeDiffViewer {
    constructor() {
        this.diffs = {};
    }

    addDiff(name, before, after, description) {
        this.diffs[name] = {
            before,
            after,
            description
        };
    }

    generateDiff(before, after) {
        // Use a simple diff algorithm
        const beforeLines = before.split('\n');
        const afterLines = after.split('\n');

        let diff = '';
        const maxLines = Math.max(beforeLines.length, afterLines.length);

        for (let i = 0; i < maxLines; i++) {
            const beforeLine = beforeLines[i] || '';
            const afterLine = afterLines[i] || '';

            if (beforeLine !== afterLine) {
                if (beforeLine) {
                    diff += `- ${beforeLine}\n`;
                }
                if (afterLine) {
                    diff += `+ ${afterLine}\n`;
                }
            } else {
                diff += `  ${beforeLine}\n`;
            }
        }

        return diff;
    }

    displayDiff(name) {
        const diffData = this.diffs[name];
        if (!diffData) return;

        const diffOutput = this.generateDiff(diffData.before, diffData.after);
        return {
            description: diffData.description,
            diff: diffOutput
        };
    }
}

// Initialize diff viewer
const diffViewer = new CodeDiffViewer();

// Add example diffs
diffViewer.addDiff(
    'circuit_breaker_improvement',
    `def on_failure(self):
    self.failure_count += 1
    if self.failure_count >= self.failure_threshold:
        self.state = 'OPEN'`,
    `def on_failure(self):
    self.failure_count += 1
    self.last_failure_time = time.time()
    if self.failure_count >= self.failure_threshold:
        self.state = 'OPEN'
        logger.warning(f"Circuit opened after {self.failure_count} failures")`,
    'Added timestamp tracking and logging to circuit breaker failure handling'
);

diffViewer.addDiff(
    'validator_enhancement',
    `app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = User.findOne({ email });
  const isValid = bcrypt.compare(password, user.password);
  res.json({ user });
});`,
    `app.post('/login', authLimiter, async (req, res) => {
  try {
    const validation = validateInput(req.body.email, req.body.password);
    if (!validation.valid) {
      return res.status(400).json({ error: 'Invalid input' });
    }
    
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});`,
    'Enhanced authentication with rate limiting, input validation, error handling, and security improvements'
);

// Export for use in other scripts
window.CodeDiffViewer = CodeDiffViewer;
window.diffViewer = diffViewer;

// Analytics and interactivity tracking
class AnalyticsTracker {
    constructor() {
        this.events = [];
    }

    trackEvent(eventName, eventData) {
        this.events.push({
            name: eventName,
            data: eventData,
            timestamp: new Date().toISOString()
        });
    }

    trackCodeView(filename) {
        this.trackEvent('code_view', { filename });
    }

    trackSectionView(sectionId) {
        this.trackEvent('section_view', { sectionId });
    }

    getReport() {
        return {
            totalEvents: this.events.length,
            events: this.events
        };
    }
}

const tracker = new AnalyticsTracker();

// Track section views
document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
            tracker.trackSectionView(section.id);
        }
    });
});

// Update code viewer click tracking
const exampleLinks = document.querySelectorAll('.examples-list a');
exampleLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const filename = link.textContent.trim();
        // Find the actual filename from the click handler
        const match = link.onclick?.toString().match(/'([^']+)'/);
        if (match) {
            tracker.trackCodeView(match[1]);
        }
    });
});

// Lazy loading for images and code blocks
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.course-card, .tool-card, .feature-item').forEach(el => {
    observer.observe(el);
});

// Search functionality (for potential future use)
class CodeSearcher {
    constructor(codeBase) {
        this.codeBase = codeBase;
    }

    search(query) {
        const results = [];
        
        for (const [filename, content] of Object.entries(this.codeBase)) {
            if (content.includes(query)) {
                const lines = content.split('\n');
                lines.forEach((line, index) => {
                    if (line.includes(query)) {
                        results.push({
                            filename,
                            lineNumber: index + 1,
                            line: line.trim(),
                            context: lines.slice(Math.max(0, index - 2), Math.min(lines.length, index + 3))
                        });
                    }
                });
            }
        }
        
        return results;
    }
}

// Export tracker for debugging
window.tracker = tracker;

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Dev tools shortcut (Ctrl+Shift+D)
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        console.log('Analytics Report:', tracker.getReport());
        console.log('Code Examples:', codeExamples);
    }

    // Copy code shortcut (Ctrl+Shift+C)
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        copyCode();
    }
});

// Progressive enhancement - ensure fallbacks work
if (!window.hljs) {
    console.warn('Highlight.js not loaded, syntax highlighting disabled');
}
