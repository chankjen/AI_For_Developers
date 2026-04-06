# Building Secure and Resilient Code with AI

This section focuses on using AI to build production-ready applications that are both secure and resilient. Learn how to incorporate security best practices and fault-tolerance patterns into your AI-assisted development workflow.

## Security Fundamentals

### AI-Assisted Security Design

Security should be designed into your application from the beginning, not added as an afterthought. Use AI to help identify and implement security measures throughout the development process.

#### Threat Modeling with AI

**Prompt:**
```
Perform a threat model for a web application that handles user authentication and data storage. Identify:
- Potential attack vectors
- Data flows that need protection
- Security controls needed
- Risk mitigation strategies

Application context: User registration, login, password reset, profile management
```

**AI Analysis Benefits:**
- Comprehensive threat identification
- Systematic security approach
- Proactive vulnerability prevention

## Environment Variable Security

### Secure Configuration Management

Reference: [Env_Variable_Security.js](Env_Variable_Security.js)

**Key Security Principles:**
1. **Never commit secrets**: Use environment variables for sensitive data
2. **Separate environments**: Different configs for development, staging, production
3. **Validate configuration**: Ensure required variables are present
4. **Secure defaults**: Safe fallbacks for missing configurations

**AI-Generated Secure Config:**
```javascript
require('dotenv').config();

const config = {
  development: {
    port: process.env.PORT || 3000,
    database: {
      host: process.env.DB_HOST || 'localhost',
      password: process.env.DB_PASSWORD,
      ssl: false
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: '24h'
    }
  },
  production: {
    port: process.env.PORT || 8080,
    database: {
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      ssl: true
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h'
    }
  }
};

const env = process.env.NODE_ENV || 'development';

// Validate required environment variables
const requiredVars = ['DB_PASSWORD', 'JWT_SECRET'];
requiredVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Required environment variable ${varName} is not set`);
  }
});

module.exports = config[env];
```

**Security Benefits:**
- Secrets never exposed in code
- Environment-specific configurations
- Runtime validation prevents deployment with missing secrets

## Authentication and Authorization

### Secure User Authentication

Reference: [Validator.js](Validator.js)

**AI-Assisted Auth Implementation:**

**Prompt:**
```
Create a secure authentication system with:
- Input validation for email and password
- bcrypt password hashing (cost factor 12)
- JWT token generation with expiration
- Proper error handling without information leakage
- Rate limiting for login attempts
```

**Generated Secure Auth Code:**
```javascript
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.json());

// Rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: 'Too many authentication attempts, please try again later'
});

app.use('/auth/login', authLimiter);

// Input validation
function validateInput(email, password) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' };
  }
  if (!password || password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters' };
  }
  return { valid: true };
}

// Secure login endpoint
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    const validation = validateInput(email, password);
    if (!validation.valid) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    // Find user (simplified - use proper database in production)
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = app;
```

**Security Features:**
- Input validation prevents injection attacks
- bcrypt hashing protects passwords
- JWT tokens for stateless authentication
- Rate limiting prevents brute force attacks
- Generic error messages prevent user enumeration

## Resilience Patterns

### Circuit Breaker for Fault Tolerance

Reference: [Circuit_Breaker_Pattern.py](Circuit_Breaker_Pattern.py)

**AI-Generated Circuit Breaker:**

**Prompt:**
```
Implement a circuit breaker for external API calls that:
- Prevents cascading failures
- Has configurable failure threshold (5) and recovery timeout (30s)
- Supports three states: CLOSED, OPEN, HALF_OPEN
- Logs state transitions for monitoring
```

**Benefits:**
- Protects against service degradation
- Enables graceful failure handling
- Supports automatic recovery

### Exponential Backoff for Retry Logic

Reference: [Exponential_Backoff.py](Exponential_Backoff.py)

**AI-Assisted Retry Implementation:**

**Prompt:**
```
Create retry logic with exponential backoff for HTTP requests that:
- Retries up to 5 times on failure
- Uses exponential delay: 2^attempt seconds
- Caps maximum delay at 10 seconds
- Includes jitter to prevent thundering herd
- Handles different types of HTTP errors appropriately
```

**Generated Code:**
```python
import time
import random
import requests
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type

def is_retryable_exception(exception):
    """Determine if an exception should trigger a retry"""
    if isinstance(exception, requests.exceptions.RequestException):
        if hasattr(exception, 'response') and exception.response:
            status_code = exception.response.status_code
            # Retry on server errors, timeouts, and rate limits
            return status_code >= 500 or status_code == 429 or status_code == 408
    return False

@retry(
    stop=stop_after_attempt(5),
    wait=wait_exponential(multiplier=2, min=1, max=10),
    retry=retry_if_exception_type(requests.exceptions.RequestException),
    before_sleep=lambda retry_state: print(f"Retry attempt {retry_state.attempt_number} after {retry_state.idle_for} seconds")
)
def resilient_api_call(url, data=None, headers=None):
    """
    Make a resilient API call with automatic retry and exponential backoff
    """
    try:
        response = requests.post(url, json=data, headers=headers, timeout=30)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"API call failed: {e}")
        raise
```

**Resilience Benefits:**
- Handles transient failures automatically
- Prevents overwhelming failing services
- Provides configurable retry behavior
- Includes proper logging for monitoring

## AI-Assisted Security Testing

### Automated Security Testing

**Prompt:**
```
Generate security tests for the authentication endpoint that check for:
- SQL injection prevention
- XSS vulnerability protection
- CSRF token validation
- Secure password policies
- Proper session management
- Input sanitization
```

### Vulnerability Scanning

Use AI to identify potential security issues:

**Prompt:**
```
Analyze this code for security vulnerabilities:
[List code]

Check for:
- Input validation flaws
- Authentication bypasses
- Authorization issues
- Data exposure risks
- Injection vulnerabilities
- Cryptographic weaknesses
```

## Monitoring and Logging

### Secure Logging Practices

**AI-Generated Logging:**

**Prompt:**
```
Create a secure logging utility that:
- Never logs sensitive information
- Sanitizes log data
- Supports different log levels
- Includes structured logging
- Handles log rotation securely
```

**Example Implementation:**
```python
import logging
import json
from typing import Dict, Any

class SecureLogger:
    def __init__(self, name: str, level: int = logging.INFO):
        self.logger = logging.getLogger(name)
        self.logger.setLevel(level)

        # Create console handler
        handler = logging.StreamHandler()
        handler.setLevel(level)

        # Create formatter
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        handler.setFormatter(formatter)

        self.logger.addHandler(handler)

    def _sanitize_data(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Remove sensitive information from log data"""
        sensitive_keys = ['password', 'token', 'secret', 'key', 'credit_card']
        sanitized = {}

        for key, value in data.items():
            if any(sensitive in key.lower() for sensitive in sensitive_keys):
                sanitized[key] = '[REDACTED]'
            else:
                sanitized[key] = value

        return sanitized

    def info(self, message: str, extra: Dict[str, Any] = None):
        if extra:
            extra = self._sanitize_data(extra)
            self.logger.info(message, extra=extra)
        else:
            self.logger.info(message)

    def error(self, message: str, error: Exception = None, extra: Dict[str, Any] = None):
        if extra:
            extra = self._sanitize_data(extra)

        if error:
            self.logger.error(f"{message}: {str(error)}", extra=extra, exc_info=True)
        else:
            self.logger.error(message, extra=extra)
```

## Production Deployment Security

### AI-Assisted Deployment Checklist

**Prompt:**
```
Generate a security checklist for deploying a web application to production that includes:
- Environment configuration verification
- Secret management validation
- Network security settings
- Access control verification
- Monitoring setup
- Backup procedures
```

### Container Security

**AI-Generated Dockerfile Security:**

**Prompt:**
```
Create a secure Dockerfile for a Node.js application that:
- Uses a minimal base image
- Runs as non-root user
- Includes security updates
- Exposes only necessary ports
- Handles secrets securely
```

## Incident Response Planning

### AI-Assisted Incident Response

**Prompt:**
```
Create an incident response plan for a web application that covers:
- Detection and alerting
- Containment procedures
- Eradication steps
- Recovery processes
- Post-incident analysis
- Communication protocols
```

## Continuous Security

### Security in CI/CD

Integrate AI into your security pipeline:
- Automated security scanning
- AI-powered code review for security
- Continuous vulnerability assessment
- Automated security testing

## Next Steps

With secure and resilient code foundations in place, learn how to [Accelerate Development Speed](acceleration.md) while maintaining quality.

---

*Security is not a one-time implementation but a continuous process. Use AI to maintain and improve your security posture over time.*