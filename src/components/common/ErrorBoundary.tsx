import { Component, ErrorInfo, ReactNode } from 'react';
import { Alert, Button } from '@frontend-team/ui-kit';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen p-6">
          <Alert
            variant="error"
            title="Something went wrong"
            description={this.state.error?.message ?? 'An unexpected error occurred'}
            action={
              <Button variant="danger" size="sm" onClick={this.handleReset}>
                Try Again
              </Button>
            }
          />
        </div>
      );
    }

    return this.props.children;
  }
}
