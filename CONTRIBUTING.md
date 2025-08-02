# Contributing to TypingPath 🤝

Thank you for your interest in contributing to TypingPath! We welcome contributions from developers of all skill levels.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git
- Basic knowledge of React, TypeScript, and Tailwind CSS

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/TypingPath.git
   cd TypingPath
   ```
3. **Add the upstream remote**:
   ```bash
   git remote add upstream https://github.com/Aditya1156/TypingPath.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   # Add your Gemini API key to .env.local
   ```

## 📋 Types of Contributions

### 🐛 Bug Reports
- Use the GitHub issue template
- Include steps to reproduce
- Provide browser/OS information
- Include screenshots if applicable

### ✨ Feature Requests
- Describe the feature clearly
- Explain the use case and benefits
- Consider implementation complexity
- Check if similar features exist

### 🔧 Code Contributions
- Bug fixes
- New features
- Performance improvements
- UI/UX enhancements
- Documentation updates

## 🛠️ Development Workflow

### Branch Naming Convention
- `feature/feature-name` - New features
- `bugfix/issue-description` - Bug fixes
- `docs/update-description` - Documentation updates
- `refactor/component-name` - Code refactoring

### Commit Message Format
We use conventional commits:
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```bash
feat(dashboard): add session history component
fix(typing-test): resolve caret positioning issue
docs(readme): update installation instructions
```

### Making Changes

1. **Create a new branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**:
   - Follow the existing code style
   - Write TypeScript with proper types
   - Use Tailwind CSS for styling
   - Test your changes thoroughly

3. **Test your changes**:
   ```bash
   npm run dev      # Start development server
   npm run build    # Test production build
   npm run lint     # Check for linting errors
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add amazing new feature"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**:
   - Use the PR template
   - Link related issues
   - Provide clear description
   - Add screenshots for UI changes

## 📏 Code Style Guidelines

### TypeScript
- Use strict TypeScript configuration
- Define proper interfaces and types
- Avoid `any` type when possible
- Use meaningful variable names

### React Components
- Use functional components with hooks
- Implement proper prop types
- Use React.memo for performance optimization
- Follow the single responsibility principle

### CSS/Styling
- Use Tailwind CSS classes
- Follow the existing theme system
- Ensure responsive design
- Test dark/light theme compatibility

### File Organization
- Group related components
- Use descriptive file names
- Keep components focused and small
- Export from index files when appropriate

## 🧪 Testing Guidelines

### Manual Testing Checklist
- [ ] Feature works in development mode
- [ ] Feature works in production build
- [ ] Responsive design on different screen sizes
- [ ] All themes work correctly
- [ ] No console errors or warnings
- [ ] Keyboard navigation works
- [ ] Performance is acceptable

### Areas to Test
- Typing test functionality
- AI features (if applicable)
- Dashboard analytics
- Settings and preferences
- Navigation and routing
- Theme switching
- Mobile responsiveness

## 📚 Documentation

### Code Documentation
- Add JSDoc comments for complex functions
- Document component props with TypeScript
- Include inline comments for complex logic
- Update type definitions as needed

### User Documentation
- Update README for new features
- Add feature documentation in `/docs`
- Include usage examples
- Update changelog

## 🎯 Priority Areas for Contribution

### High Priority
- 🐛 Bug fixes
- ♿ Accessibility improvements
- 📱 Mobile responsiveness
- 🚀 Performance optimizations

### Medium Priority
- ✨ New dashboard features
- 🎨 UI/UX improvements
- 🧪 Test coverage
- 📖 Documentation

### Lower Priority
- 🎵 Sound effects
- 🎮 Gamification features
- 🌐 Internationalization
- 🔌 Third-party integrations

## 🔍 Review Process

### Pull Request Requirements
- [ ] Clear description of changes
- [ ] Links to related issues
- [ ] Screenshots for UI changes
- [ ] No merge conflicts
- [ ] Builds successfully
- [ ] Follows code style guidelines

### Review Criteria
- Code quality and maintainability
- Performance impact
- User experience
- Security considerations
- Documentation completeness

## 🆘 Getting Help

### Communication Channels
- GitHub Issues for bugs and features
- GitHub Discussions for questions
- Code review comments for specific feedback

### Resources
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

## 🎉 Recognition

Contributors will be:
- Listed in the project contributors
- Mentioned in release notes
- Recognized in the community

Thank you for helping make TypingPath better! 🚀
