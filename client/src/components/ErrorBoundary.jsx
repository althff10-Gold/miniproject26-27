import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('TeenPreneur ErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px',
          margin: '40px auto',
          maxWidth: '600px',
          background: 'rgba(15, 23, 42, 0.9)',
          border: '1px solid rgba(239, 68, 68, 0.4)',
          borderRadius: '16px',
          color: '#fff',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#f87171' }}>Something went wrong</h2>
          <p style={{ color: '#cbd5e1' }}>The incubator platform encountered an unexpected view error.</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '16px',
              padding: '10px 20px',
              background: '#6366f1',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Reload Application
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
