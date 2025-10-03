import React from 'react';
import { Dashboard } from './components/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-background text-text-primary font-sans">
      <header className="bg-surface border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">Product Team Skills Dashboard</h1>
          <p className="text-sm text-text-secondary mt-1">AI-Powered Insights for Executive Decisions</p>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <Dashboard />
      </main>
      <footer className="text-center py-4 text-xs text-text-secondary">
        <p>&copy; 2024 Skills Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;