import React from 'react';
import { useEvents } from '../context/EventContext'; // Use the custom hook
import EventCard from '../components/EventCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const HomePage = () => {
  // Get state and functions from context
  const { events, loading, error } = useEvents();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Upcoming Events</h1>

      {/* Display Loading State */}
      {loading && <LoadingSpinner />}

      {/* Display Error State */}
      {error && <ErrorMessage message={error} />}

      {/* Display Event List */}
      {!loading && !error && events.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}

      {/* Display Message if No Events Found */}
      {!loading && !error && events.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No events found.</p>
      )}
    </div>
  );
};

export default HomePage;