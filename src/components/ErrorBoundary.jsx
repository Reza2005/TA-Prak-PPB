import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-2xl bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-2">
              Terjadi kesalahan pada tampilan
            </h2>
            <p className="text-sm text-gray-700 mb-4">
              Aplikasi mengalami error saat merender halaman. Silakan cek konsol
              (DevTools) untuk detail.
            </p>
            <details className="text-xs text-gray-500 whitespace-pre-wrap">
              {String(this.state.error && this.state.error.stack)}
            </details>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
