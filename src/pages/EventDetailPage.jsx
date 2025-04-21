import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getEventById } from '../services/eventService'; // Use specific fetch function
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import Button from '../components/Button';

const EventDetailPage = () => {
  const { eventId } = useParams(); // Get eventId from URL parameters
  const navigate = useNavigate(); // Hook for programmatic navigation

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getEventById(eventId);
        setEvent(data);
      } catch (err) {
         console.error("Error fetching event details:", err);
         if (err.message.includes('404')) {
             setError(`Event with ID ${eventId} not found.`);
         } else {
             setError('Failed to load event details. Please try again later.');
         }
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]); // Re-fetch if eventId changes

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!event) return <p className="text-center text-gray-500 mt-10">Event details could not be loaded.</p>; // Should be caught by error state usually

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-blue-800">{event.title}</h1>
      <div className="mb-4 space-y-2 text-gray-700">
          <p><strong className="font-semibold">Date:</strong> {event.date || 'N/A'}</p>
          <p><strong className="font-semibold">Location:</strong> {event.location || 'N/A'}</p>
      </div>
      <div className="prose max-w-none text-gray-800 mb-6">
         {/* Using 'prose' class from Tailwind typography for basic text formatting */}
         <p>{event.description}</p>
      </div>

      {/* Back button */}
       <Button onClick={() => navigate(-1)} variant="secondary"> {/* navigate(-1) goes back */}
          ← Back to Events
       </Button>

       {/* Placeholder for Edit/Delete buttons if implemented later */}
       {/* <div className="mt-4 space-x-2">
           <Button variant="primary">Edit Event</Button>
           <Button variant="danger">Delete Event</Button>
       </div> */}
    </div>
  );
};

export default EventDetailPage;