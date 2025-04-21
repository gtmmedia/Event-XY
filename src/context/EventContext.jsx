import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { getEvents, createEvent as apiCreateEvent } from '../services/eventService'; // Import API functions

// 1. Create the context
const EventContext = createContext();

// 2. Create a custom hook for easy consumption
export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};

// 3. Create the Provider component
export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch events, wrapped in useCallback for stability
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      console.error("Error in fetchEvents:", err);
      setError('Failed to load events. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array means this function is created once

  // Fetch events when the provider mounts
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]); // Include fetchEvents in dependency array

  // Function to add a new event
  const addEvent = useCallback(async (newEventData) => {
    setLoading(true); // Indicate loading state for adding
    setError(null);
    try {
      // Call the API service to create the event
      const addedEvent = await apiCreateEvent(newEventData);
      // Update local state optimistically or after confirmation
      // Here, we update after confirmation from API
      setEvents(prevEvents => [addedEvent, ...prevEvents]); // Add to the beginning of the list
      return addedEvent; // Return the added event maybe for redirection or confirmation
    } catch (err) {
        console.error("Error in addEvent:", err);
        setError('Failed to add event. Please try again.');
        throw err; // Re-throw to handle in the form component
    } finally {
        setLoading(false);
    }
  }, []); // Empty dependency array

  // Value object provided to consuming components
  const value = {
    events,
    loading,
    error,
    fetchEvents, // Provide the refetch function if needed elsewhere
    addEvent,
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};