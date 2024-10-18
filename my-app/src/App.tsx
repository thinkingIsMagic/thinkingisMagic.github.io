import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePageView from './page/home-page/HomePageView';
import DocsPageView from './page/docs-page/DocsPageView';

/**
 * 入口，主要包含路由逻辑
 * @returns 
 */
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePageView />} />
        <Route path="/docs" element={<DocsPageView />} />
      </Routes>
    </Router>
  );
};

export default App;
