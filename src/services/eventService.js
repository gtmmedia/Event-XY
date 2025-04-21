// Using .js extension as it doesn't contain JSX

// Get API base URL from environment variables
// Fallback to default if not set (though it should be in .env)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com';

/**
 * Fetches all events (using /posts as a mock endpoint)
 * @returns {Promise<Array>} A promise that resolves to an array of events.
 */
export const getEvents = async () => {
  try {
    // Using fetch API to get data
    const response = await fetch(`${API_BASE_URL}/posts?_limit=10`); // Limit for demo
    if (!response.ok) {
      // Throw error if response status is not OK (e.g., 404, 500)
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // Adapt JSONPlaceholder data slightly for our "event" structure
    return data.map(post => ({
        id: post.id,
        title: post.title,
        description: post.body.substring(0, 100) + '...', // Shorten description
        date: `2024-0${(post.id % 9) + 1}-${(post.id % 28) + 1}`, // Mock date
        location: `Venue ${post.userId}` // Mock location
    }));
  } catch (error) {
    console.error("Failed to fetch events:", error);
    throw error; // Re-throw error to be caught by the component
  }
};

/**
 * Fetches a single event by its ID
 * @param {string|number} eventId The ID of the event to fetch.
 * @returns {Promise<Object>} A promise that resolves to the event object.
 */
export const getEventById = async (eventId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${eventId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const post = await response.json();
     // Adapt JSONPlaceholder data
     return {
        id: post.id,
        title: post.title,
        description: post.body, // Full description here
        date: `2024-0${(post.id % 9) + 1}-${(post.id % 28) + 1}`,
        location: `Venue ${post.userId}`
     }
  } catch (error) {
    console.error(`Failed to fetch event with ID ${eventId}:`, error);
    throw error;
  }
};

/**
 * Creates a new event (mocking with /posts endpoint)
 * @param {Object} eventData The data for the new event (e.g., { title, description, date, location })
 * @returns {Promise<Object>} A promise that resolves to the newly created event object.
 */
export const createEvent = async (eventData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      // Adapt our data to what JSONPlaceholder expects (title, body, userId)
      body: JSON.stringify({
        title: eventData.title,
        body: eventData.description,
        userId: 1, // Mock user ID
        // We can't really send date/location to JSONPlaceholder /posts
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const newPost = await response.json();
    // Adapt the response back to our event structure
    // Note: JSONPlaceholder POST response often includes the id (e.g., 101)
     return {
        ...eventData, // Include the original data (like date/location)
        id: newPost.id || Date.now(), // Use returned ID or generate one
        description: newPost.body, // Use body from response if needed
        title: newPost.title,
     };
  } catch (error) {
    console.error("Failed to create event:", error);
    throw error;
  }
};

// Add functions for updateEvent and deleteEvent here if needed later