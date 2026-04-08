# 🧠 AI for Developers: Knowledge Check Challenge

**Test your understanding of AI-powered development workflows, security best practices, and tool mastery.**

---

## **Part 1: Tools & Fundamentals**

**1. What is the primary advantage of using Cursor IDE over a traditional text editor?**
   A) It is completely free forever.
   B) It is an AI-native editor with built-in codebase understanding and agent mode.
   C) It only works with Python code.
   D) It does not require an internet connection.

**2. Which tool is best described as an "agent-based coding platform" capable of building apps from natural language descriptions?**
   A) Cursor
   B) GitHub Copilot
   C) Google Antigravity
   D) VS Code

**3. In Cursor IDE, what is the keyboard shortcut to open the Chat panel?**
   A) `Cmd+K` / `Ctrl+K`
   B) `Cmd+L` / `Ctrl+L`
   C) `Cmd+P` / `Ctrl+P`
   D) `Cmd+S` / `Ctrl+S`

**4. According to the "80/20 Rule" of AI Development, how should effort be distributed?**
   A) 80% Coding, 20% Planning
   B) 50% Human Effort, 50% AI Effort
   C) 20% Human Effort (Architecture/Review), 80% AI Acceleration (Boilerplate/Tests)
   D) 80% Debugging, 20% Writing new code

---

## **Part 2: Security & Best Practices**

**5. Why is it critical to NEVER include API keys or secrets in your AI prompts?**
   A) It slows down the AI response time.
   B) The AI might accidentally publish them to GitHub.
   C) Prompts are often stored on external servers, creating a data leak risk.
   D) The AI cannot understand what an API key is.

**6. Statistics show that AI-generated code is how much more likely to introduce security vulnerabilities compared to human-written code?**
   A) 10% more likely
   B) 50% more likely
   C) 1.5 to 2 times more likely
   D) It is actually safer than human code.

**7. Which of the following is a "DON'T" when working with AI tools?**
   A) Using AI to write unit tests.
   B) Blindly trusting AI output without review.
   C) Asking AI to explain complex error messages.
   D) Using AI to refactor legacy code.

**8. What is the "Plan Mode" strategy when using Claude Code?**
   A) Asking the AI to write the entire application in one go.
   B) Starting with a minimal spec and letting the AI interview you for requirements before coding.
   C) Planning your lunch break while the AI codes.
   D) Writing the code first and asking the AI to plan the architecture later.

---

## **Part 3: Debugging & Resilience**

**9. Which design pattern is recommended to prevent cascading failures in a distributed system?**
   A) The Singleton Pattern
   B) The Circuit Breaker Pattern
   C) The Factory Pattern
   D) The Observer Pattern

**10. What is the primary goal of "Digital Resilience" for a developer?**
    A) To write code that never has bugs.
    B) To rapidly adapt to disruption while minimizing harm and maintaining operations.
    C) To ensure the server never goes offline.
    D) To use the most expensive cloud providers.

**11. When debugging with AI, what is the most effective first step?**
    A) Rewrite the entire function from scratch.
    B) Paste the error message and relevant code context into the AI chat.
    C) Restart your computer.
    D) Ignore the error and hope it goes away.

**12. Which technique involves asking the AI to "Explain this code line by line as if I'm a beginner" to find logic errors?**
    A) Rubber Duck Debugging
    B) Brute Force Debugging
    C) Binary Search Debugging
    D) Random Mutation Testing

---

## **Part 4: Workflow & Efficiency**

**13. What is the recommended "Daily AI-Powered Workflow" sequence?**
    A) Code → Debug → Deploy → Plan
    B) Spec → AI Generation → Review → Test → Refinement
    C) Test → Code → Spec → Review
    D) AI Generation → Deploy → Review → Spec

**14. Which metric is NOT a recommended Key Performance Indicator (KPI) for measuring AI success?**
    A) Time per feature reduction.
    B) Number of lines of code generated per hour.
    C) Security vulnerabilities count.
    D) Test coverage percentage.

**15. What should you do if the AI generates code that works but looks messy or complex?**
    A) Deploy it immediately to save time.
    B) Ignore it and write it yourself.
    C) Ask the AI to "Refactor this for readability and maintainability."
    D) Delete the project and start over.

---

## **🔑 Answer Key & Explanations**

| #      | Answer | Explanation                                                                                                                  |
|:------ |:------:|:---------------------------------------------------------------------------------------------------------------------------- |
| **1**  | **B**  | Cursor is designed as an AI-native editor that understands your whole codebase, unlike standard editors with plugins.        |
| **2**  | **C**  | Google Antigravity is highlighted as the agent-based platform for rapid, natural-language app building.                      |
| **3**  | **B**  | `Cmd+L` (Mac) or `Ctrl+L` (Windows) opens the Chat panel. `Cmd+K` is for inline editing.                                     |
| **4**  | **C**  | Humans should focus on high-level architecture and review (20%), while AI handles the heavy lifting of implementation (80%). |
| **5**  | **C**  | Data privacy is paramount. Prompts sent to LLMs can be logged; never share secrets.                                          |
| **6**  | **C**  | Studies cited in the training indicate a 1.5x to 2x higher risk of vulnerabilities in AI code.                               |
| **7**  | **B**  | Blind trust is the biggest risk. Human review is non-negotiable for security and quality.                                    |
| **8**  | **B**  | Plan Mode ensures the AI understands the *requirements* before writing code, reducing hallucinations.                        |
| **9**  | **B**  | The Circuit Breaker pattern stops requests to a failing service to prevent the whole system from crashing.                   |
| **10** | **B**  | Resilience isn't about perfection; it's about recovery, adaptation, and minimizing impact during failure.                    |
| **11** | **B**  | Context is king. Providing the error + code allows the AI to give a specific solution.                                       |
| **12** | **A**  | "Rubber Ducking" with AI forces a step-by-step logical breakdown that often reveals the bug.                                 |
| **13** | **B**  | This is the core iterative loop: Define what you want, let AI build it, verify it, and refine it.                            |
| **14** | **B**  | Lines of code is a vanity metric. We care about *value* (features), *quality* (security/tests), and *speed*.                 |
| **15** | **C**  | AI is excellent at refactoring. Iterating on the prompt is more efficient than manual rewriting.                             |

---

### **📊 Scoring Guide**

* **13-15 Correct:** 🚀 **AI Native Developer.** You are ready to lead the AI revolution.
* **10-12 Correct:** ⚡ **AI Accelerated.** You have a solid foundation; just refine your security habits.
* **0-9 Correct:** 🌱 **AI Explorer.** Review the slides on Security and Workflow Integration before deploying AI code to production.
