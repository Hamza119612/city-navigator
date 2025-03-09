import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from './pages/Home';

// ✅ Create QueryClient instance
const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}> {/* ✅ Wrap entire app */}
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  </QueryClientProvider>
);

export default App;
