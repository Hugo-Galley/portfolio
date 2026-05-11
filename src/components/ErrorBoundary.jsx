import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Une erreur est survenue.</h1>
          <p>Veuillez recharger la page.</p>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
