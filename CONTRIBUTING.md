# Contributing to Plant Disease Detection

Thank you for your interest in contributing to the Plant Disease Detection project! This document provides guidelines for contributing to the project.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Feature Requests](#feature-requests)

---

## Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- Harassment, trolling, or derogatory comments
- Publishing others' private information
- Any conduct that would be inappropriate in a professional setting

---

## Getting Started

### Prerequisites

Before contributing, ensure you have:
- Python 3.10+
- Node.js 18+
- MongoDB 7.0+
- Git
- A GitHub account

### Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/project-interface-2.git
   cd project-interface-2
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/SCSBalaji/project-interface-2.git
   ```

### Setup Development Environment

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

**Frontend:**
```bash
cd frontend
npm install
```

---

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

**Branch naming conventions:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `chore/` - Maintenance tasks

### 2. Make Changes

- Write clean, readable code
- Follow coding standards
- Add comments where necessary
- Update documentation

### 3. Test Changes

**Backend:**
```bash
cd backend
# Run linting
flake8 app/
# Run tests (when available)
pytest
```

**Frontend:**
```bash
cd frontend
# Run linting
npm run lint
# Run tests (when available)
npm test
```

### 4. Commit Changes

```bash
git add .
git commit -m "Brief description of changes"
```

**Commit message format:**
```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance

**Example:**
```
feat: Add multilingual support for Hindi

- Added Hindi translations to constants.js
- Updated Header component to support Hindi
- Updated README with translation instructions

Closes #123
```

### 5. Push Changes

```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request

- Go to GitHub
- Click "New Pull Request"
- Select your branch
- Fill in the PR template
- Submit

---

## Coding Standards

### Python (Backend)

**Style Guide:** PEP 8

```python
# Good
def calculate_confidence(prediction, threshold=0.5):
    """
    Calculate confidence score.
    
    Args:
        prediction (float): Model prediction
        threshold (float): Confidence threshold
    
    Returns:
        float: Confidence score
    """
    return max(prediction, threshold)

# Bad
def calc_conf(p,t=0.5):
    return max(p,t)
```

**Best Practices:**
- Use type hints
- Write docstrings for functions
- Keep functions small and focused
- Use meaningful variable names
- Avoid magic numbers

### JavaScript/React (Frontend)

**Style Guide:** Airbnb JavaScript Style Guide

```javascript
// Good
const PredictionResult = ({ result, onRetry }) => {
  const [loading, setLoading] = useState(false);
  
  const handleRetry = async () => {
    setLoading(true);
    await onRetry();
    setLoading(false);
  };
  
  return (
    <div className="card">
      {/* Component content */}
    </div>
  );
};

// Bad
function PredictionResult(props) {
  var l = false;
  return <div>{/* content */}</div>;
}
```

**Best Practices:**
- Use functional components and hooks
- Use arrow functions
- Destructure props
- Use meaningful component names
- Keep components small and reusable

---

## Testing Guidelines

### Backend Testing

Create tests in `backend/tests/`:

```python
# tests/test_auth.py
import pytest
from app.services.auth_service import auth_service

def test_create_user():
    user = await auth_service.create_user({
        "name": "Test User",
        "phone": "1234567890"
    })
    assert user is not None
    assert user.name == "Test User"
```

### Frontend Testing

Create tests alongside components:

```javascript
// components/Header.test.jsx
import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders app name', () => {
  render(<Header />);
  expect(screen.getByText(/Plant Disease Detection/i)).toBeInTheDocument();
});
```

---

## Pull Request Process

### PR Checklist

Before submitting a PR, ensure:

- [ ] Code follows project style guidelines
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] Commits are well-formatted
- [ ] Branch is up to date with main
- [ ] No merge conflicts
- [ ] PR description is clear

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## Testing
How have you tested these changes?

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented code where needed
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Added tests
```

### Review Process

1. **Automated Checks** - CI/CD runs tests
2. **Code Review** - Maintainers review code
3. **Feedback** - Address review comments
4. **Approval** - Get approval from maintainers
5. **Merge** - PR is merged to main

---

## Reporting Bugs

### Before Reporting

1. Check existing issues
2. Verify you're on the latest version
3. Try to reproduce the issue

### Bug Report Template

```markdown
**Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Screenshots**
Add screenshots if applicable

**Environment**
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 120]
- Version: [e.g., 1.0.0]

**Additional Context**
Any other relevant information
```

---

## Feature Requests

### Feature Request Template

```markdown
**Feature Description**
Clear description of the feature

**Problem it Solves**
What problem does this solve?

**Proposed Solution**
How would you implement this?

**Alternatives Considered**
What alternatives have you considered?

**Additional Context**
Any other relevant information
```

---

## Areas for Contribution

### Priority Areas

1. **Testing**
   - Add unit tests for backend
   - Add integration tests
   - Add frontend component tests

2. **Documentation**
   - Improve API documentation
   - Add code comments
   - Create tutorial videos

3. **Features**
   - Add more language support
   - Implement SMS OTP service
   - Add disease information database
   - Implement user history

4. **UI/UX**
   - Improve mobile responsiveness
   - Add dark mode
   - Enhance accessibility

5. **Performance**
   - Optimize model inference
   - Implement caching
   - Reduce bundle size

---

## Getting Help

If you need help:

1. **Read Documentation** - Check README, API docs, and guides
2. **Search Issues** - Someone may have had the same question
3. **Ask in Discussions** - Use GitHub Discussions
4. **Contact Maintainers** - Email or open an issue

---

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project website (when available)

---

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

**Thank you for contributing! 🙏**

Your contributions help make this project better for farmers worldwide. 🌾
