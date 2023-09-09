// Simulated API call to fetch initial notifications
export const getInitialNotifications = async () => {
  try {
    // Replace this with an actual API call
    const mockData = [
      { message: 'Welcome to the platform!', type: 'info' },
      // ... more notifications
    ];
    return mockData;
  } catch (error) {
    throw new Error('Failed to fetch notifications.');
  }
};
