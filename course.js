// Course Module Data
const courseModules = [
    { id: 'guide', title: 'Introduction & Setup', filename: 'guide.md', order: 0 },
    { id: 'tools', title: 'Mastering AI Tools', filename: 'tools.md', order: 1 },
    { id: 'integration', title: 'Workflow Integration', filename: 'integration.md', order: 2 },
    { id: 'best_practices', title: 'Best Practices', filename: 'best_practices.md', order: 3 },
    { id: 'security', title: 'Security & Resilience', filename: 'security.md', order: 4 },
    { id: 'acceleration', title: 'Acceleration', filename: 'acceleration.md', order: 5 },
    { id: 'dos_donts', title: "Do's & Don'ts", filename: 'dos_donts.md', order: 6 }
];

let currentModule = null;
let completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');

// Configure marked options
marked.setOptions({
    breaks: true,
    gfm: true,
    headerIds: true,
    mangle: true
});

// Custom renderer for marked
const renderer = new marked.Renderer();

renderer.heading = (token) => {
    const level = token.depth;
    const id = token.text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    return `<h${level} id="${id}">${token.text}</h${level}>`;
};

renderer.code = (token) => {
    const language = token.lang || 'javascript';
    let highlighted = token.text;
    
    try {
        if (hljs.getLanguage(language)) {
            highlighted = hljs.highlight(token.text, { language }).value;
        }
    } catch (err) {
        console.error('Syntax highlighting error:', err);
    }

    return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`;
};

renderer.blockquote = (token) => {
    return `<blockquote class="callout info"><p>${token.text}</p></blockquote>`;
};

renderer.link = (token) => {
    // Handle relative links
    let href = token.href;
    if (token.href.endsWith('.md')) {
        const moduleId = token.href.replace('.md', '');
        const module = courseModules.find(m => m.filename === token.href);
        if (module) {
            href = `course.html?file=${module.id}`;
        }
    }
    return `<a href="${href}" target="${token.href.startsWith('http') ? '_blank' : '_self'}">${token.text}</a>`;
};

marked.setOptions({ renderer });

// Load and display course content
async function loadCourseModule(moduleId) {
    const module = courseModules.find(m => m.id === moduleId || m.filename === moduleId);
    
    if (!module) {
        document.getElementById('courseBody').innerHTML = '<p>Module not found</p>';
        return;
    }

    currentModule = module;
    
    try {
        // Load the markdown file
        const response = await fetch(module.filename);
        const markdown = await response.text();
        
        // Convert markdown to HTML
        const html = await marked.parse(markdown);
        
        // Update page
        document.getElementById('moduleTitle').textContent = module.title;
        document.getElementById('courseBody').innerHTML = html;
        
        // Highlight code blocks
        document.querySelectorAll('pre code').forEach(block => {
            hljs.highlightElement(block);
        });
        
        // Update navigation buttons
        updateNavigationButtons();
        
        // Update sidebar active link
        updateSidebarActive(moduleId);
        
        // Update progress
        updateProgress();
        
        // Scroll to top
        window.scrollTo(0, 0);
        
    } catch (error) {
        console.error('Error loading module:', error);
        document.getElementById('courseBody').innerHTML = `<p>Error loading module: ${error.message}</p>`;
    }
}

// Update navigation buttons
function updateNavigationButtons() {
    const currentIndex = courseModules.findIndex(m => m.id === currentModule.id);
    
    // Previous button
    const prevBtn = document.getElementById('prevBtn');
    if (currentIndex > 0) {
        prevBtn.disabled = false;
        prevBtn.textContent = `← ${courseModules[currentIndex - 1].title}`;
    } else {
        prevBtn.disabled = true;
        prevBtn.textContent = '← Previous';
    }
    
    // Next button
    const nextBtn = document.getElementById('nextBtn');
    if (currentIndex < courseModules.length - 1) {
        nextBtn.disabled = false;
        nextBtn.textContent = `${courseModules[currentIndex + 1].title} →`;
    } else {
        nextBtn.disabled = true;
        nextBtn.textContent = 'Next →';
    }
}

// Navigate to previous module
function previousModule() {
    const currentIndex = courseModules.findIndex(m => m.id === currentModule.id);
    if (currentIndex > 0) {
        const previousId = courseModules[currentIndex - 1].id;
        window.location.href = `course.html?file=${previousId}`;
    }
}

// Navigate to next module
function nextModule() {
    const currentIndex = courseModules.findIndex(m => m.id === currentModule.id);
    if (currentIndex < courseModules.length - 1) {
        const nextId = courseModules[currentIndex + 1].id;
        window.location.href = `course.html?file=${nextId}`;
    }
}

// Update sidebar active link
function updateSidebarActive(moduleId) {
    document.querySelectorAll('.module-link').forEach(link => {
        link.classList.remove('active');
        if (link.href.includes(`file=${moduleId}`)) {
            link.classList.add('active');
        }
    });
}

// Update progress tracker
function updateProgress() {
    const progress = (completedModules.length / courseModules.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('progressText').textContent = `${Math.round(progress)}% Complete`;
}

// Mark module as completed
function markModuleCompleted() {
    if (!completedModules.includes(currentModule.id)) {
        completedModules.push(currentModule.id);
        localStorage.setItem('completedModules', JSON.stringify(completedModules));
        updateProgress();
    }
}

// Download module as PDF/HTML
function downloadModule() {
    const content = document.getElementById('courseBody').innerHTML;
    const title = document.getElementById('moduleTitle').textContent;
    
    // Create HTML document
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>${title}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 20px;
                }
                h1, h2, h3 { color: #0ea9e9; }
                code {
                    background: #f4f4f4;
                    padding: 2px 5px;
                    border-radius: 3px;
                }
                pre {
                    background: #f4f4f4;
                    padding: 10px;
                    border-radius: 5px;
                    overflow-x: auto;
                }
                a { color: #0ea9e9; }
            </style>
        </head>
        <body>
            <h1>${title}</h1>
            ${content}
        </body>
        </html>
    `;
    
    // Create blob and download
    const blob = new Blob([html], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '-').toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// Share module
function shareModule() {
    const title = document.getElementById('moduleTitle').textContent;
    const url = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: title,
            text: `Check out this course module: ${title}`,
            url: url
        }).catch(err => console.error('Error sharing:', err));
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(url).then(() => {
            alert('Link copied to clipboard!');
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Get module from URL params
    const params = new URLSearchParams(window.location.search);
    const moduleId = params.get('file') || 'guide';
    
    // Load the module
    loadCourseModule(moduleId);
    
    // Autosave progress on scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Mark as completed if scrolled to bottom
            const scrollPercentage = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
            if (scrollPercentage > 0.8) {
                markModuleCompleted();
            }
        }, 500);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            previousModule();
        } else if (e.key === 'ArrowRight') {
            nextModule();
        }
    });
});

// Table of contents generator
function generateTableOfContents() {
    const headings = document.querySelectorAll('.course-body h1, .course-body h2, .course-body h3');
    const toc = document.createElement('nav');
    toc.className = 'table-of-contents';
    
    const ul = document.createElement('ul');
    let currentLevel = 1;
    let list = ul;
    const stack = [ul];
    
    headings.forEach(heading => {
        const level = parseInt(heading.tagName[1]);
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${heading.id}`;
        a.textContent = heading.textContent;
        li.appendChild(a);
        
        if (level > currentLevel) {
            // Go deeper
            for (let i = currentLevel; i < level; i++) {
                const newList = document.createElement('ul');
                const parent = stack[stack.length - 1];
                if (parent.lastChild && parent.lastChild.tagName === 'LI') {
                    parent.lastChild.appendChild(newList);
                } else {
                    const li = document.createElement('li');
                    li.appendChild(newList);
                    parent.appendChild(li);
                }
                stack.push(newList);
            }
            currentLevel = level;
        } else if (level < currentLevel) {
            // Go shallower
            for (let i = level; i < currentLevel; i++) {
                stack.pop();
            }
            currentLevel = level;
        }
        
        stack[stack.length - 1].appendChild(li);
    });
    
    return toc;
}

// Search functionality within course
class CourseSearch {
    constructor(courseBody) {
        this.courseBody = courseBody;
        this.searchResults = [];
    }

    search(query) {
        const text = this.courseBody.innerText;
        const lines = text.split('\n');
        this.searchResults = [];

        lines.forEach((line, index) => {
            if (line.toLowerCase().includes(query.toLowerCase())) {
                this.searchResults.push({
                    lineNumber: index,
                    text: line.trim(),
                    context: lines.slice(Math.max(0, index - 2), Math.min(lines.length, index + 3))
                });
            }
        });

        return this.searchResults;
    }

    displayResults() {
        return this.searchResults.map(result => `
            <div class="search-result">
                <p>${result.text}</p>
            </div>
        `).join('');
    }
}

// Export for global access
window.CourseSearch = CourseSearch;
window.markModuleCompleted = markModuleCompleted;
window.previousModule = previousModule;
window.nextModule = nextModule;
window.downloadModule = downloadModule;
window.shareModule = shareModule;
