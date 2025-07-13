# 🎬 Collectors App - Modern Version

A modern e-commerce application for movie/media collectors.

## 🚀 Major Improvements

### Technology Stack Upgrade
- **React 19** - Latest React version
- **TypeScript** - Type safety
- **Vite** - Fast development environment
- **Redux Toolkit** - Modern state management
- **SCSS Modules** - Component-based styling

### Performance Optimization
- **React.memo** - Prevent unnecessary re-renders
- **Lazy Loading** - Code splitting for faster initial loading
- **Custom Hooks** - Improved logic reusability
- **Error Boundaries** - Stable error handling

### User Experience Improvements
- **Loading Spinner** - Visual feedback
- **Error Messages** - Clear error notifications
- **English Support** - User-friendly interface
- **Responsive Design** - Support for all devices

## 🛠️ Installation and Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── ErrorBoundary.tsx    # Error handling
│   ├── LoadingSpinner.tsx   # Loading component
│   └── ...
├── hooks/              # Custom hooks
│   └── useCart.ts      # Cart logic
├── pages/              # Page components
├── redux/              # State management
├── types/              # TypeScript type definitions
└── firebase/           # Firebase configuration
```

## 🔧 Key Features

### Authentication System
- Firebase Auth integration
- Google login support
- User profile management

### Product Management
- 5 categories (Movies, Animation, TV Series, Rare Collections, Sports/Arts)
- Product search and filtering
- Detailed product information

### Shopping Cart System
- Add/remove products
- Quantity adjustment
- Total calculation
- Local storage persistence

### Payment System
- Stripe Checkout integration
- Secure payment processing

## 🎨 UI/UX Features

- **Modern Design** - Clean and intuitive interface
- **Responsive Layout** - Mobile, tablet, desktop support
- **Accessibility** - ARIA labels and keyboard navigation support
- **Animations** - Smooth transition effects

## 🔒 Security

- **Type Safety** - Prevent runtime errors with TypeScript
- **Input Validation** - User input data validation
- **Error Handling** - Comprehensive error handling and recovery

## 📈 Performance

- **Code Splitting** - Load only necessary code
- **Memoization** - Prevent unnecessary re-renders
- **Image Optimization** - Separate thumbnails and original images
- **Bundle Optimization** - Vite's fast build system

## 🧪 Testing

```bash
# Run tests
npm test

# Test coverage
npm run test:coverage
```

## 📝 Development Guide

### Component Writing
```typescript
import React from 'react';
import type { ComponentProps } from '../types/common';

const MyComponent: React.FC<ComponentProps> = React.memo(({ prop }) => {
  return <div>{prop}</div>;
});

MyComponent.displayName = 'MyComponent';

export default MyComponent;
```

### Using Custom Hooks
```typescript
import { useCart } from '../hooks/useCart';

const MyComponent = () => {
  const { addToCart, cartCount } = useCart();
  // ...
};
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React Team - For the excellent framework
- Vite Team - For the fast build tool
- Redux Toolkit Team - For modern state management
- Firebase Team - For backend services
