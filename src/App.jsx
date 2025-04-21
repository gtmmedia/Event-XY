import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout.jsx';
import HomePage from './pages/HomePage.jsx';
import EventDetailPage from './pages/EventDetailPage.jsx';
import AddEventPage from './pages/AddEventPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function App() {
  return (
    <Layout> {/* Use Layout to wrap all pages */}
      <Routes>
        {/* Define application routes */}
        <Route path="/" element={<HomePage />} />
        {/* Route for displaying details of a specific event */}
        <Route path="/event/:eventId" element={<EventDetailPage />} />
        {/* Route for the add event form */}
        <Route path="/add-event" element={<AddEventPage />} />
        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;