// ErrorBoundary.jsx
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Erreur capturée dans ErrorBoundary :", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Une erreur est survenue dans cette section.</h2>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
