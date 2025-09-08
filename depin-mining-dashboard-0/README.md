# Stacks DePIN Mining Dashboard

## Overview

A production-grade blockchain mining dashboard built for the Stacks ecosystem, implementing Proof of Transfer (PoX) consensus mechanism. This application enables device registration and participation in decentralized mining operations through a modern web interface.

![Build Status](https://img.shields.io/badge/build-passing-success)
![Next.js](https://img.shields.io/badge/Next.js-15.5.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Architecture

### Core Components
- **Blockchain Integration**: Native Stacks Connect SDK implementation
- **Device Management**: Multi-device registration and monitoring system  
- **Mining Operations**: Real-time Proof of Transfer mining participation
- **Wallet Integration**: Secure wallet connectivity with Leather wallet support
- **Network Analytics**: Live blockchain statistics and performance metrics

### Technical Specifications
- **Framework**: Next.js 15.5.2 with App Router
- **Language**: TypeScript with strict type checking
- **Styling**: Tailwind CSS with custom design system
- **Animations**: GSAP for performance-optimized animations
- **Build Tool**: Webpack with SWC compiler
- **Font System**: JetBrains Mono for optimal code readability

## Installation

### Prerequisites
- Node.js 18.0 or higher
- npm package manager
- Git version control

### Setup Process

1. **Clone Repository**
   ```bash
   git clone https://github.com/your-username/stacks-mining-dashboard.git
   cd stacks-mining-dashboard
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env.local
   # Configure your environment variables
   ```

4. **Development Server**
   ```bash
   npm run dev
   ```

5. **Access Application**
   ```
   http://localhost:3000
   ```

### Production Deployment
```bash
npm run build
npm run start
```

## Configuration

### Smart Contract Integration
Configure blockchain contract parameters in `src/app/page.tsx`:

```typescript
const NETWORK = STACKS_TESTNET
const CONTRACT_ADDRESS = 'YOUR_CONTRACT_ADDRESS'
const CONTRACT_NAME = 'depin-mining-v10'
```

### Environment Variables
Required environment variables for production:

```env
NEXT_PUBLIC_NETWORK=testnet
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
NEXT_PUBLIC_API_URL=your_api_endpoint
```

## Feature Specification

### Device Registration
- Multi-device support (Desktop/Mobile/IoT)
- Unique device identification system
- Blockchain-verified registration process
- Fee-based registration mechanism

### Mining Operations
- Proof of Transfer consensus participation
- Bitcoin commitment requirements (minimum 0.01 BTC)
- Automated winner selection algorithm
- Real-time reward distribution

### User Interface
- Responsive design for all device types
- Dark theme with accessibility compliance
- Real-time data visualization
- Progressive loading with optimized performance

### Security Implementation
- No private key storage or handling
- Wallet-based authentication only
- Input validation and sanitization
- Smart contract interaction validation

## API Integration

### Blockchain Connectivity
- Stacks Node API integration
- Hiro API fallback support
- Real-time balance tracking
- Transaction monitoring system

### Smart Contract Functions
- `register-device`: Device registration
- `start-block-mining`: Mining round initialization  
- `commit-btc`: Bitcoin commitment submission
- `claim-mining-reward`: Reward distribution

## Development Guidelines

### Code Structure
```
src/
├── app/
│   ├── page.tsx          # Main application logic
│   ├── layout.tsx        # Application layout
│   └── globals.css       # Global styling
├── components/           # Reusable components
├── utils/               # Utility functions
└── types/               # Type definitions
```

### Component Architecture
- Functional components with React hooks
- TypeScript interfaces for all props
- Error boundary implementation
- Loading state management

## Performance Optimization

### Build Optimization
- Next.js automatic code splitting
- Image optimization and compression
- Font loading optimization
- Bundle size analysis and optimization

### Runtime Performance  
- React component memoization
- Efficient re-rendering strategies
- GSAP hardware acceleration
- Lazy loading implementation

## Deployment Options

### Vercel (Recommended)
Zero-configuration deployment with automatic CI/CD:
1. Connect GitHub repository
2. Automatic deployments on push
3. Preview deployments for pull requests

### Alternative Platforms
- **Netlify**: Static site deployment
- **Railway**: Full-stack deployment
- **Docker**: Containerized deployment
- **Traditional VPS**: Custom server deployment

## Testing

### Development Testing
```bash
npm run test          # Run test suite
npm run test:watch    # Watch mode testing
npm run test:coverage # Coverage reporting
```

### Production Validation
- End-to-end testing with Playwright
- Integration testing for blockchain operations
- Performance testing and monitoring
- Security audit and vulnerability assessment

## Monitoring and Analytics

### Performance Monitoring
- Real-time error tracking
- Performance metrics collection
- User interaction analytics
- Blockchain transaction monitoring

### Network Statistics
- Mining participation rates
- Success/failure ratios
- Average response times
- System health monitoring

## Contributing

### Development Workflow
1. Fork repository
2. Create feature branch
3. Implement changes with tests
4. Submit pull request
5. Code review and merge

### Code Standards
- ESLint configuration compliance
- Prettier formatting standards
- TypeScript strict mode
- Comprehensive documentation

## License

MIT License - see LICENSE file for full details.

## Support

For technical support and documentation:
- GitHub Issues for bug reports
- GitHub Discussions for feature requests
- Documentation wiki for detailed guides

---

**Production Status**: Ready for deployment
**Maintenance**: Active development and support
**Compatibility**: Modern browsers, Node.js 18+
