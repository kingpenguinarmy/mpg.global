// Notification class representing a single notification
class Notification {
  constructor(message, timestamp, priority) {
    this.message = message;
    this.timestamp = timestamp;
    this.priority = priority;
    // Add a snooze duration property
    this.snoozeDuration = 0;
    // Add a reminder property
    this.reminder = false;
    // Add a list of channels to send the notification through
    this.channels = [];
    // Add a category property
    this.category = "General";
    // Add a list of users to forward the notification to
    this.forwardTo = [];
    // Add a retry count property
    this.retryCount = 0;
    // Add an external system property
    this.externalSystem = null;
    // Add a chat system property
    this.chatSystem = null;
  }
}

// User class representing a user with a name and notifications
class User {
  constructor(name) {
    this.name = name;
    this.notifications = [];
    // Add an empty array to store filtered notifications
    this.filteredNotifications = [];
    // Add an empty array to store notification templates
    this.notificationTemplates = [];
    // Add an empty array to store notification history
    this.notificationHistory = [];
  }

  addNotification(notification) {
    this.notifications.push(notification);
    // Trigger real-time notification
    this.notify(notification);
    // Add the notification to the notification history
    this.notificationHistory.push(notification);
  }

  viewNotifications() {
    if (this.filteredNotifications.length === 0) {
      console.log("No new notifications.");
    } else {
      console.log(`Notifications for ${this.name}:`);
      this.filteredNotifications.forEach((notification, index) => {
        console.log(
          `${index + 1}. [${notification.timestamp}] [${
            notification.priority
          }] [${notification.category}] ${notification.message}`
        );
      });
    }
  }

  // Define the notification callback
  notify(notification) {
    // Implement real-time notification logic here, such as displaying a desktop notification, playing a sound, or sending an email.
    console.log(`Real-time notification: ${notification.message}`);
    // Display a desktop notification
    const notificationTitle = "New Notification";
    const notificationOptions = {
      body: notification.message,
      icon: "notification-icon.png",
      image: "notification-image.jpg", // Add an image to the notification
      actions: [ // Add action buttons to the notification
        { action: "reply", title: "Reply" },
        { action: "markAsRead", title: "Mark as Read" },
        { action: "snooze", title: "Snooze" }, // Add a snooze action
        { action: "setReminder", title: "Set Reminder" }, // Add a set reminder action
        { action: "forward", title: "Forward" } // Add a forward action
      ]
    };
    new Notification(notificationTitle, notificationOptions);
    // Play a notification sound
    const audio = new Audio("notification.mp3");
    audio.play();
    // Send an email notification
    const emailSubject = `New Notification: ${notification.message}`;
    const emailBody = `
      <p>You have received a new notification.</p>
      <p><b>Message:</b> ${notification.message}</p>
      <p><b>Priority:</b> ${notification.priority}</p>
      <p><b>Timestamp:</b> ${notification.timestamp}</p>
    `;
    sendEmail(this.email, emailSubject, emailBody);

    // Retry sending the notification if it fails
    if (notification.retryCount < 3) {
      setTimeout(() => {
        this.notify(notification);
        notification.retryCount++;
      }, 1000); // Retry after 1 second
    }

    // Send the notification to external systems
    if (notification.externalSystem) {
      const externalSystem = this.notificationSystem.getExternalSystem(notification.externalSystem);
      if (externalSystem) {
        externalSystem.sendNotification(notification);
      }
    }

    // Send the notification to chat systems
    if (notification.chatSystem) {
      const chatSystem = this.notificationSystem.getChatSystem(notification.chatSystem);
      if (chatSystem) {
        chatSystem.sendNotification(notification);
      }
    }
  }

  // Add a method to filter notifications
  filterNotifications(filterCriteria) {
    // Clear the filtered notifications array
    this.filteredNotifications = [];

    // Filter the notifications based on the given criteria
    this.notifications.forEach((notification) => {
      if (notification.message.includes(filterCriteria)) {
        this.filteredNotifications.push(notification);
      }
    });
  }

  // Add a method to create a notification template
  createNotificationTemplate(templateName, message, priority, channels, category) {
    const template = {
      name: templateName,
      message: message,
      priority: priority,
      channels: channels, // Add the channels to the template
      category: category, // Add the category to the template
    };

    // Add the template to the user's notification templates
    this.notificationTemplates.push(template);
  }

  // Add a method to use a notification template
  useNotificationTemplate(templateName) {
    // Find the template with the given name
    const template = this.notificationTemplates.find((template) => template.name === templateName);

    // If the template exists, create a notification using its message and channels
    if (template) {
      const notification = new Notification(
        template.message,
        new Date().toLocaleString(),
        template.priority,
        template.channels, // Add the channels to the notification
        template.category // Add the category to the notification
      );
      this.addNotification(notification);
    }
  }

  // Add a method to snooze a notification
  snoozeNotification(notificationIndex, snoozeDuration) {
    // Check if the notification index is valid
    if (notificationIndex >= 0 && notificationIndex < this.notifications.length) {
      // Get the notification
      const notification = this.notifications[notificationIndex];

      // Set the snooze duration
      notification.snoozeDuration = snoozeDuration;

      // Reschedule the notification
      setTimeout(() => {
        // Trigger the notification
        this.notify(notification);
      }, snoozeDuration);
    }
  }

  // Add a method to set a reminder for a notification
  setReminder(notificationIndex, reminderTime) {
    // Check if the notification index is valid
    if (notificationIndex >= 0 && notificationIndex < this.notifications.length) {
      // Get the notification
      const notification = this.notifications[notificationIndex];

      // Set the reminder time
      notification.reminder = reminderTime;

      // Schedule the reminder
      setTimeout(() => {
        // Trigger the notification
        this.notify(notification);
      }, reminderTime - Date.now());
    }
  }

  // Add a method to view notification history
  viewNotificationHistory() {
    if (this.notificationHistory.length === 0) {
      console.log("No notification history.");
    } else {
      console.log(`Notification history for ${this.name}:`);
      this.notificationHistory.forEach((notification, index) => {
        console.log(
          `${index + 1}. [${notification.timestamp}] [${
            notification.priority
          }] [${notification.category}] ${notification.message}`
        );
      });
    }
  }

  // Add a method to forward a notification
  forwardNotification(notificationIndex, recipient) {
    // Check if the notification index is valid
    if (notificationIndex >= 0 && notificationIndex < this.notifications.length) {
      // Get the notification
      const notification = this.notifications[notificationIndex];

      // Check if the recipient is valid
      const recipientUser = this.notificationSystem.findUser(recipient);
      if (recipientUser) {
        // Add the recipient to the notification's forward list
        notification.forwardTo.push(recipientUser);

        // Trigger the notification for the recipient
        recipientUser.notify(notification);
      } else {
        console.log(`User ${recipient} not found.`);
      }
    }
  }
}

// NotificationSystem class managing users and sending notifications
class NotificationSystem {
  constructor() {
    this.users = [];
    // Add an empty array to store external systems
    this.externalSystems = [];
    // Add an empty array to store chat systems
    this.chatSystems = [];
  }

  registerUser(user) {
    this.users.push(user);
    user.notificationSystem = this; // Add a reference to the notification system in the user object
  }

  sendNotification(user, message, priority, channels, category) {
    const notification = new Notification(message, new Date().toLocaleString(), priority, channels, category);
    user.addNotification(notification);
  }

  // Add a method to schedule a notification
  scheduleNotification(user, message, scheduledTime, priority, channels, category) {
    // Convert the scheduled time to a Date object
    const scheduledDate = new Date(scheduledTime);

    // Create a notification object with the scheduled time
    const notification = new Notification(message, scheduledDate, priority, channels, category);

    // Add the notification to the user's notifications array
    user.notifications.push(notification);

    // Set a timeout to trigger the notification at the scheduled time
    setTimeout(() => {
      // Trigger the notification
      user.notify(notification);
    }, scheduledDate - Date.now());
  }

  // Add a method to group notifications
  groupNotifications(user, groupingCriteria) {
    // Create a map to store the grouped notifications
    const groupedNotifications = new Map();

    // Group the notifications by the given criteria
    user.notifications.forEach((notification) => {
      const groupKey = notification[groupingCriteria];
      if (!groupedNotifications.has(groupKey)) {
        groupedNotifications.set(groupKey, [notification]);
      } else {
        groupedNotifications.get(groupKey).push(notification);
      }
    });

    // Display the grouped notifications
    console.log(`Grouped notifications for ${user.name}:`);
    groupedNotifications.forEach((notifications, groupKey) => {
      console.log(`Group: ${groupKey}`);
      notifications.forEach((notification) => {
        console.log(
          `  - [${notification.timestamp}] [${
            notification.priority
          }] [${notification.category}] ${notification.message}`
        );
      });
    });
  }

  // Add a method to find a user by name
  findUser(userName) {
    return this.users.find((user) => user.name === userName);
  }

  // Add a method to register an external system
  registerExternalSystem(externalSystem) {
    this.externalSystems.push(externalSystem);
  }

  // Add a method to get an external system by name
  getExternalSystem(externalSystemName) {
    return this.externalSystems.find((externalSystem) => externalSystem.name === externalSystemName);
  }

  // Add a method to register a chat system
  registerChatSystem(chatSystem) {
    this.chatSystems.push(chatSystem);
  }

  // Add a method to get a chat system by name
  getChatSystem(chatSystemName) {
    return this.chatSystems.find((chatSystem) => chatSystem.name === chatSystemName);
  }
}

// Example usage
const notificationSystem = new NotificationSystem();

const user1 = new User("John");
const user2 = new User("Alice");

notificationSystem.registerUser(user1);
notificationSystem.registerUser(user2);

// Create notification templates for user1 with different priorities, channels, and categories
user1.createNotificationTemplate(
  "Task Complete", 
  "Task {taskName} is complete!", 
  "high", 
  ["email", "desktop"],
  "Tasks"
);
user1.createNotificationTemplate(
  "Task Assigned", 
  "New task assigned: {taskName}", 
  "medium", 
  ["desktop"],
  "Tasks"
);
user1.createNotificationTemplate(
  "Task Reminder", 
  "Task {taskName} is due tomorrow", 
  "low", 
  ["email"],
  "Tasks"
);
user1.createNotificationTemplate(
  "New Message", 
  "You have a new message from {senderName}", 
  "high", 
  ["email", "desktop"],
  "Messages"
);
user1.createNotificationTemplate(
  "Calendar Reminder", 
  "You have a calendar reminder for {eventName} at {eventTime}", 
  "medium", 
  ["desktop"],
  "Calendar"
);

// Create notification templates for user2 with different priorities, channels, and categories
user2.createNotificationTemplate(
  "Task In Progress", 
  "Task {taskName} is in progress", 
  "high", 
  ["desktop", "sms"],
  "Tasks"
);
user2.createNotificationTemplate(
  "Task Overdue", 
  "Task {taskName} is overdue!", 
  "urgent", 
  ["email", "sms"],
  "Tasks"
);
user2.createNotificationTemplate(
  "Task Update", 
  "Task {taskName} has been updated", 
  "low", 
  ["desktop"],
  "Tasks"
);
user2.createNotificationTemplate(
  "New Message", 
  "You have a new message from {senderName}", 
  "high", 
  ["email", "desktop"],
  "Messages"
);
user2.createNotificationTemplate(
  "Calendar Reminder", 
  "You have a calendar reminder for {eventName} at {eventTime}", 
  "medium", 
  ["desktop"],
  "Calendar"
);

// Schedule notifications for user1 with different priorities, channels, and categories
notificationSystem.scheduleNotification(
  user1, 
  "Task 1 is complete!", 
  "2023-03-08T10:00:00", 
  "high", 
  ["email", "desktop"],
  "Tasks"
);
notificationSystem.scheduleNotification(
  user1, 
  "Task 2 is assigned to you", 
  "2023-03-09T11:30:00", 
  "medium", 
  ["desktop"],
  "Tasks"
);
notificationSystem.scheduleNotification(
  user1, 
  "Task 3 is due tomorrow", 
  "2023-03-10T14:00:00", 
  "low", 
  ["email"],
  "Tasks"
);
notificationSystem.scheduleNotification(
  user1, 
  "You have a new message from Bob", 
  "2023-03-11T16:30:00", 
  "high", 
  ["email", "desktop"],
  "Messages"
);
notificationSystem.scheduleNotification(
  user1, 
  "You have a calendar reminder for Meeting at 10:00 AM", 
  "2023-03-12T18:00:00", 
  "medium", 
  ["desktop"],
  "Calendar"
);

// Schedule notifications for user2 with different priorities, channels, and categories
notificationSystem.scheduleNotification(
  user2, 
  "Task 4 is in progress", 
  "2023-03-13T20:00:00", 
  "high", 
  ["desktop", "sms"],
  "Tasks"
);
notificationSystem.scheduleNotification(
  user2, 
  "Task 5 is overdue!", 
  "2023-03-14T22:00:00", 
  "urgent", 
  ["email", "sms"],
  "Tasks"
);
notificationSystem.scheduleNotification(
  user2, 
  "Task 6 has been updated", 
  "2023-03-15T00:00:00", 
  "low", 
  ["desktop"],
  "Tasks"
);
notificationSystem.scheduleNotification(
  user2, 
  "You have a new message from Alice", 
  "2023-03-16T02:00:00", 
  "high", 
  ["email", "desktop"],
  "Messages"
);
notificationSystem.scheduleNotification(
  user2, 
  "You have a calendar reminder for Appointment at 11:00 AM", 
  "2023-03-17T04:00:00", 
  "medium", 
  ["desktop"],
  "Calendar"
);

// Group notifications for user1 by category
notificationSystem.groupNotifications(user1, "category");

// Group notifications for user2 by priority
notificationSystem.groupNotifications(user2, "priority");

// Add search functionality to the notification system
notificationSystem.searchNotifications = function (user, searchCriteria) {
  // Clear the filtered notifications array
  user.filteredNotifications = [];

  // Filter the notifications based on the given search criteria
  user.notifications.forEach((notification) => {
    if (notification.message.includes(searchCriteria)) {
      user.filteredNotifications.push(notification);
    }
  });

  // Display the filtered notifications
  if (user.filteredNotifications.length === 0) {
    console.log("No notifications found.");
  } else {
    console.log(`Search results for '${searchCriteria}':`);
    user.filteredNotifications.forEach((notification, index) => {
      console.log(
        `${index + 1}. [${notification.timestamp}] [${
          notification.priority
        }] [${notification.category}] ${notification.message}`
      );
    });
  }
};

// Example usage of the search functionality
notificationSystem.searchNotifications(user1, "Task 2"); // Search for notifications containing "Task 2"
notificationSystem.searchNotifications(user2, "overdue"); // Search for notifications containing "overdue"

// Forward a notification from user1 to user2
user1.forwardNotification(0, "Alice"); // Forward the first notification to user2

// Register an external system
const externalSystem1 = {
  name: "CRM System",
  sendNotification(notification) {
    // Implement logic to send the notification to the CRM system
    console.log(`Sending notification to CRM system: ${notification.message}`);
  }
};
notificationSystem.registerExternalSystem(externalSystem1);

// Send a notification to the external system
user1.addNotification(new Notification("New customer added", new Date().toLocaleString(), "high", [], "CRM"));

// Register a chat system
const chatSystem1 = {
  name: "Slack",
  sendNotification(notification) {
    // Implement logic to send the notification to Slack
    console.log(`Sending notification to Slack: ${notification.message}`);
  }
};
notificationSystem.registerChatSystem(chatSystem1);

// Send a notification to the chat system
user1.addNotification(new Notification("New message from John", new Date().toLocaleString(), "high", [], "Chat"));

// Add a method to integrate notifications with chat systems
Notification.prototype.sendToChatSystem = function () {
  // Get the chat system name from the notification
  const chatSystemName = this.chatSystem;

  // Get the chat system instance from the notification system
  const chatSystem = notificationSystem.getChatSystem(chatSystemName);

  // If the chat system exists, send the notification
  if (chatSystem) {
    chatSystem.sendNotification(this);
  }
};

// Add a method to the user class to send notifications to chat systems
User.prototype.sendNotificationToChatSystem = function (notification) {
  // Set the chat system property of the notification
  notification.chatSystem = this.chatSystem;

  // Send the notification to the chat system
  notification.sendToChatSystem();
};

// Example usage of the chat system integration
user1.sendNotificationToChatSystem(new Notification("New message from John", new Date().toLocaleString(), "high", [], "Chat"));