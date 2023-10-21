// Function to handle task creation
function createTask(taskData) {
    // Make an AJAX request to the server to create a new task
    fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      if (data.success) {
        // Task created successfully, display success message or update task list
        alert('Task created successfully!');
        // You can update the task list by fetching and rendering the updated task list
        getTasks();
        
        // Trigger task creation notification
        triggerTaskCreationNotification(taskData);
      } else {
        // Task creation failed, display error message or handle the failure scenario
        alert('Task creation failed. Please try again.');
      }
    })
    .catch(error => {
      // Handle any errors that occur during the task creation process
      console.error('Error creating task:', error);
      alert('An error occurred during task creation. Please try again later.');
    });
  }
  
  // Function to handle form submission
  function handleFormSubmission(event) {
    event.preventDefault(); // Prevent the form from submitting via browser's default behavior
    
    // Get task details from the form
    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskAssignees = document.getElementById('taskAssignees').value;
    const taskCollaborators = document.getElementById('taskCollaborators').value;
    const taskDueDate = document.getElementById('taskDueDate').value;
    const taskReminder = document.getElementById('taskReminder').value;
    const taskDependencies = document.getElementById('taskDependencies').value;
    const taskLabels = document.getElementById('taskLabels').value; // Get task labels
    const taskPriority = document.getElementById('taskPriority').value; // Get task priority
  
    // Perform client-side validation on the task details
    if (!taskName || !taskDescription) {
      alert('Please fill in all task details.');
      return;
    }
  
    // Construct the task data object to send to the server
    const taskData = {
      name: taskName,
      description: taskDescription,
      assignees: taskAssignees,
      collaborators: taskCollaborators,
      dueDate: taskDueDate,
      reminder: taskReminder,
      dependencies: taskDependencies,
      labels: taskLabels, // Add task labels to the task data
      priority: taskPriority // Add task priority to the task data
    };
  
    // Create the task
    createTask(taskData);
  }
  
  // Function to handle task filtering and sorting
  function handleTaskFilteringAndSorting(event) {
    // Get the filter and sort options from the UI
    const filterOption = document.getElementById('taskFilter').value;
    const sortOption = document.getElementById('taskSort').value;
  
    // Make an AJAX request to the server to fetch tasks based on the filter and sort options
    fetch('/api/tasks?filter=' + filterOption + '&sort=' + sortOption)
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      if (data.success) {
        // Update the task list with the filtered and sorted tasks
        renderTasks(data.tasks);
      } else {
        // Display an error message or handle the failure scenario
        alert('An error occurred while fetching tasks. Please try again later.');
      }
    })
    .catch(error => {
      // Handle any errors that occur during the task filtering and sorting process
      console.error('Error fetching tasks:', error);
      alert('An error occurred while fetching tasks. Please try again later.');
    });
  }
  
  // Function to handle task comments
  function handleTaskComment(event) {
    // Get the comment text from the UI
    const commentText = document.getElementById('taskCommentText').value;
  
    // Make an AJAX request to the server to post a comment on the task
    fetch('/api/tasks/:taskId/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: commentText
      })
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      if (data.success) {
        // Display a success message or update the task comments
        alert('Comment posted successfully!');
        // You can update the task comments by fetching and rendering the updated comments
        getComments(taskId);
        
        // Trigger task comment notification
        triggerTaskCommentNotification(data.comment);
      } else {
        // Display an error message or handle the failure scenario
        alert('An error occurred while posting the comment. Please try again later.');
      }
    })
    .catch(error => {
      // Handle any errors that occur during the task comment posting process
      console.error('Error posting comment:', error);
      alert('An error occurred while posting the comment. Please try again later.');
    });
  }
  
  // Function to handle task discussions
  function handleTaskDiscussion(event) {
    // Get the discussion text from the UI
    const discussionText = document.getElementById('taskDiscussionText').value;
  
    // Make an AJAX request to the server to post a discussion on the task
    fetch('/api/tasks/:taskId/discussions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: discussionText
      })
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      if (data.success) {
        // Display a success message or update the task discussions
        alert('Discussion posted successfully!');
        // You can update the task discussions by fetching and rendering the updated discussions
        getDiscussions(taskId);
        
        // Trigger task discussion notification
        triggerTaskDiscussionNotification(data.discussion);
      } else {
        // Display an error message or handle the failure scenario
        alert('An error occurred while posting the discussion. Please try again later.');
      }
    })
    .catch(error => {
      // Handle any errors that occur during the task discussion posting process
      console.error('Error posting discussion:', error);
      alert('An error occurred while posting the discussion. Please try again later.');
    });
  }
  
  // Function to trigger task creation notification
  function triggerTaskCreationNotification(taskData) {
    // Prepare notification data
    const notificationData = {
      type: 'task_creation',
      task: taskData
    };
  
    // Make an AJAX request to the server to trigger the notification
    fetch('/api/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(notificationData)
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      if (data.success) {
        // Notification sent successfully
        console.log('Task creation notification sent successfully.');
      } else {
        // Notification sending failed
        console.error('Error sending task creation notification:', data.error);
      }
    })
    .catch(error => {
      // Handle any errors that occur during the notification sending process
      console.error('Error sending task creation notification:', error);
    });
  }
  
  // Function to trigger task comment notification
  function triggerTaskCommentNotification(commentData) {
    // Prepare notification data
    const notificationData = {
      type: 'task_comment',
      comment: commentData
    };
  
    // Make an AJAX request to the server to trigger the notification
    fetch('/api/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(notificationData)
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      if (data.success) {
        // Notification sent successfully
        console.log('Task comment notification sent successfully.');
      } else {
        // Notification sending failed
        console.error('Error sending task comment notification:', data.error);
      }
    })
    .catch(error => {
      // Handle any errors that occur during the notification sending process
      console.error('Error sending task comment notification:', error);
    });
  }
  
  // Function to trigger task discussion notification
  function triggerTaskDiscussionNotification(discussionData) {
    // Prepare notification data
    const notificationData = {
      type: 'task_discussion',
      discussion: discussionData
    };
  
    // Make an AJAX request to the server to trigger the notification
    fetch('/api/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(notificationData)
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      if (data.success) {
        // Notification sent successfully
        console.log('Task discussion notification sent successfully.');
      } else {
        // Notification sending failed
        console.error('Error sending task discussion notification:', data.error);
      }
    })
    .catch(error => {
      // Handle any errors that occur during the notification sending process
      console.error('Error sending task discussion notification:', error);
    });
  }
  
  // Attach an event listener to the form submission button
  const taskForm = document.getElementById('taskForm');
  taskForm.addEventListener('submit', handleFormSubmission);
  
  // Attach an event listener to the filter and sort options
  const taskFilter = document.getElementById('taskFilter');
  taskFilter.addEventListener('change', handleTaskFilteringAndSorting);
  
  const taskSort = document.getElementById('taskSort');
  taskSort.addEventListener('change', handleTaskFilteringAndSorting);
  
  // Attach an event listener to the task comment button
  const taskCommentButton = document.getElementById('taskCommentButton');
  taskCommentButton.addEventListener('click', handleTaskComment);
  
  // Attach an event listener to the task discussion button
  const taskDiscussionButton = document.getElementById('taskDiscussionButton');
  taskDiscussionButton.addEventListener('click', handleTaskDiscussion);
  
  // Add a new function to handle task priority filtering
  function handleTaskPriorityFiltering(event) {
    // Get the priority filter option from the UI
    const priorityFilterOption = document.getElementById('taskPriorityFilter').value;
  
    // Make an AJAX request to the server to fetch tasks based on the priority filter option
    fetch('/api/tasks?priority=' + priorityFilterOption)
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      if (data.success) {
        // Update the task list with the filtered tasks
        renderTasks(data.tasks);
      } else {
        // Display an error message or handle the failure scenario
        alert('An error occurred while fetching tasks. Please try again later.');
      }
    })
    .catch(error => {
      // Handle any errors that occur during the task priority filtering process
      console.error('Error fetching tasks:', error);
      alert('An error occurred while fetching tasks. Please try again later.');
    });
  }
  
  // Attach an event listener to the task priority filter option
  const taskPriorityFilter = document.getElementById('taskPriorityFilter');
  taskPriorityFilter.addEventListener('change', handleTaskPriorityFiltering);
  
  // Add a new function to handle user roles and permissions
  function handleUserRolesAndPermissions(event) {
    // Get the user role and permission data from the UI
    const userRole = document.getElementById('userRole').value;
    const userPermissions = document.getElementById('userPermissions').value;
  
    // Make an AJAX request to the server to update the user's role and permissions
    fetch('/api/users/:userId', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        role: userRole,
        permissions: userPermissions
      })
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      if (data.success) {
        // Display a success message or update the user's role and permissions
        alert('User role and permissions updated successfully!');
        // You can update the user's role and permissions in the UI
        updateUserRoleAndPermissions(data.user);
      } else {
        // Display an error message or handle the failure scenario
        alert("An error occurred while updating the user's role and permissions. Please try again later.");
      }
    })
    .catch(error => {
      // Handle any errors that occur during the user role and permissions update process
      console.error('Error updating user role and permissions:', error);
      alert("An error occurred while updating the user's role and permissions. Please try again later.");
    });
  }
  
  // Attach an event listener to the user role and permissions update button
  const userRoleAndPermissionsButton = document.getElementById('userRoleAndPermissionsButton');
  userRoleAndPermissionsButton.addEventListener('click', handleUserRolesAndPermissions);

  // Function to handle Google Calendar integration
function integrateWithGoogleCalendar(event) {
    // Get the task details from the form
    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskDueDate = document.getElementById('taskDueDate').value;
    const taskReminder = document.getElementById('taskReminder').value;
  
    // Construct the Google Calendar event object
    const eventObject = {
      summary: taskName,
      description: taskDescription,
      start: {
        dateTime: taskDueDate
      },
      end: {
        dateTime: taskDueDate
      },
      reminders: {
        useDefault: false,
        overrides: [
          {
            method: 'email',
            minutes: taskReminder
          }
        ]
      }
    };
  
    // Make an AJAX request to the Google Calendar API to create the event
    gapi.client.calendar.events.insert({
      calendarId: 'primary',
      resource: eventObject
    })
    .then(response => {
      // Handle the response from the Google Calendar API
      if (response.result.id) {
        // Event created successfully, display success message or update task list
        alert('Event created successfully in Google Calendar!');
        // You can update the task list by fetching and rendering the updated task list
        getTasks();
      } else {
        // Event creation failed, display error message or handle the failure scenario
        alert('An error occurred while creating the event in Google Calendar. Please try again.');
      }
    })
    .catch(error => {
      // Handle any errors that occur during the Google Calendar event creation process
      console.error('Error creating event in Google Calendar:', error);
      alert('An error occurred while creating the event in Google Calendar. Please try again later.');
    });
  }
  
  // Attach an event listener to the Google Calendar integration button
  const googleCalendarIntegrationButton = document.getElementById('googleCalendarIntegrationButton');
  googleCalendarIntegrationButton.addEventListener('click', integrateWithGoogleCalendar);
  
  // Function to handle Google Email integration
  function integrateWithGoogleEmail(event) {
    // Get the task details from the form
    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskAssignees = document.getElementById('taskAssignees').value;
  
    // Construct the Google Email message object
    const messageObject = {
      to: taskAssignees,
      subject: taskName,
      text: taskDescription
    };
  
    // Make an AJAX request to the Google Email API to send the email
    gapi.client.gmail.users.messages.send({
      userId: 'me',
      resource: messageObject
    })
    .then(response => {
      // Handle the response from the Google Email API
      if (response.result.id) {
        // Email sent successfully, display success message or update task list
        alert('Email sent successfully using Google Email!');
        // You can update the task list by fetching and rendering the updated task list
        getTasks();
      } else {
        // Email sending failed, display error message or handle the failure scenario
        alert('An error occurred while sending the email using Google Email. Please try again.');
      }
    })
    .catch(error => {
      // Handle any errors that occur during the Google Email sending process
      console.error('Error sending email using Google Email:', error);
      alert('An error occurred while sending the email using Google Email. Please try again later.');
    });
  }
  
  // Attach an event listener to the Google Email integration button
  const googleEmailIntegrationButton = document.getElementById('googleEmailIntegrationButton');
  googleEmailIntegrationButton.addEventListener('click', integrateWithGoogleEmail);

  // Function to handle recurring task creation
function createRecurringTask(taskData) {
    // Make an AJAX request to the server to create a new recurring task
    fetch('/api/tasks/recurring', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      if (data.success) {
        // Recurring task created successfully, display success message or update task list
        alert('Recurring task created successfully!');
        // You can update the task list by fetching and rendering the updated task list
        getTasks();
        
        // Trigger recurring task creation notification
        triggerRecurringTaskCreationNotification(taskData);
      } else {
        // Recurring task creation failed, display error message or handle the failure scenario
        alert('Recurring task creation failed. Please try again.');
      }
    })
    .catch(error => {
      // Handle any errors that occur during the recurring task creation process
      console.error('Error creating recurring task:', error);
      alert('An error occurred during recurring task creation. Please try again later.');
    });
  }
  
  // Function to handle form submission
  function handleFormSubmission(event) {
    event.preventDefault(); // Prevent the form from submitting via browser's default behavior
    
    // Get task details from the form
    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskAssignees = document.getElementById('taskAssignees').value;
    const taskCollaborators = document.getElementById('taskCollaborators').value;
    const taskDueDate = document.getElementById('taskDueDate').value;
    const taskReminder = document.getElementById('taskReminder').value;
    const taskDependencies = document.getElementById('taskDependencies').value;
    const taskLabels = document.getElementById('taskLabels').value; // Get task labels
    const taskPriority = document.getElementById('taskPriority').value; // Get task priority
    const taskIsRecurring = document.getElementById('taskIsRecurring').checked; // Get task recurring status
    const taskRecurrencePattern = document.getElementById('taskRecurrencePattern').value; // Get task recurrence pattern
    const taskRecurrenceInterval = document.getElementById('taskRecurrenceInterval').value; // Get task recurrence interval
    const taskRecurrenceEndDate = document.getElementById('taskRecurrenceEndDate').value; // Get task recurrence end date

    // Perform client-side validation on the task details
    if (!taskName || !taskDescription) {
      alert('Please fill in all task details.');
      return;
    }
  
    // Construct the task data object to send to the server
    const taskData = {
      name: taskName,
      description: taskDescription,
      assignees: taskAssignees,
      collaborators: taskCollaborators,
      dueDate: taskDueDate,
      reminder: taskReminder,
      dependencies: taskDependencies,
      labels: taskLabels, // Add task labels to the task data
      priority: taskPriority, // Add task priority to the task data
      isRecurring: taskIsRecurring, // Add task recurring status to the task data
      recurrencePattern: taskRecurrencePattern, // Add task recurrence pattern to the task data
      recurrenceInterval: taskRecurrenceInterval, // Add task recurrence interval to the task data
      recurrenceEndDate: taskRecurrenceEndDate // Add task recurrence end date to the task data
    };
  
    // Create the recurring task
    if (taskIsRecurring) {
      createRecurringTask(taskData);
    } else {
      createTask(taskData);
    }
  }
  
  // Function to trigger recurring task creation notification
  function triggerRecurringTaskCreationNotification(taskData) {
    // Prepare notification data
    const notificationData = {
      type: 'recurring_task_creation',
      task: taskData
    };
  
    // Make an AJAX request to the server to trigger the notification
    fetch('/api/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(notificationData)
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      if (data.success) {
        // Notification sent successfully
        console.log('Recurring task creation notification sent successfully.');
      } else {
        // Notification sending failed
        console.error('Error sending recurring task creation notification:', data.error);
      }
    })
    .catch(error => {
      // Handle any errors that occur during the notification sending process
      console.error('Error sending recurring task creation notification:', error);
    });
  }

  // Function to handle task template creation
function createTaskTemplate(taskTemplateData) {
    // Make an AJAX request to the server to create a new task template
    fetch('/api/task-templates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskTemplateData)
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      if (data.success) {
        // Task template created successfully, display success message or update task template list
        alert('Task template created successfully!');
        // You can update the task template list by fetching and rendering the updated task template list
        getTaskTemplates();
      } else {
        // Task template creation failed, display error message or handle the failure scenario
        alert('Task template creation failed. Please try again.');
      }
    })
    .catch(error => {
      // Handle any errors that occur during the task template creation process
      console.error('Error creating task template:', error);
      alert('An error occurred during task template creation. Please try again later.');
    });
  }
  
  // Function to handle form submission
  function handleFormSubmission(event) {
    event.preventDefault(); // Prevent the form from submitting via browser's default behavior
    
    // Get task template details from the form
    const taskTemplateName = document.getElementById('taskTemplateName').value;
    const taskTemplateDescription = document.getElementById('taskTemplateDescription').value;
    const taskTemplateAssignees = document.getElementById('taskTemplateAssignees').value;
    const taskTemplateCollaborators = document.getElementById('taskTemplateCollaborators').value;
    const taskTemplateDueDate = document.getElementById('taskTemplateDueDate').value;
    const taskTemplateReminder = document.getElementById('taskTemplateReminder').value;
    const taskTemplateDependencies = document.getElementById('taskTemplateDependencies').value;
    const taskTemplateLabels = document.getElementById('taskTemplateLabels').value; // Get task template labels
    const taskTemplatePriority = document.getElementById('taskTemplatePriority').value; // Get task template priority

    // Perform client-side validation on the task template details
    if (!taskTemplateName || !taskTemplateDescription) {
      alert('Please fill in all task template details.');
      return;
    }
  
    // Construct the task template data object to send to the server
    const taskTemplateData = {
      name: taskTemplateName,
      description: taskTemplateDescription,
      assignees: taskTemplateAssignees,
      collaborators: taskTemplateCollaborators,
      dueDate: taskTemplateDueDate,
      reminder: taskTemplateReminder,
      dependencies: taskTemplateDependencies,
      labels: taskTemplateLabels, // Add task template labels to the task template data
      priority: taskTemplatePriority // Add task template priority to the task template data
    };
  
    // Create the task template
    createTaskTemplate(taskTemplateData);
  }
  
  // Function to handle task template filtering and sorting
  function handleTaskTemplateFilteringAndSorting(event) {
    // Get the filter and sort options from the UI
    const filterOption = document.getElementById('taskTemplateFilter').value;
    const sortOption = document.getElementById('taskTemplateSort').value;
  
    // Make an AJAX request to the server to fetch task templates based on the filter and sort options
    fetch('/api/task-templates?filter=' + filterOption + '&sort=' + sortOption)
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      if (data.success) {
        // Update the task template list with the filtered and sorted task templates
        renderTaskTemplates(data.taskTemplates);
      } else {
        // Display an error message or handle the failure scenario
        alert('An error occurred while fetching task templates. Please try again later.');
      }
    })
    .catch(error => {
      // Handle any errors that occur during the task template filtering and sorting process
      console.error('Error fetching task templates:', error);
      alert('An error occurred while fetching task templates. Please try again later.');
    });
  }
  
  // Function to handle task template comments
  function handleTaskTemplateComment(event) {
    // Get the comment text from the UI
    const commentText = document.getElementById('taskTemplateCommentText').value;
  
    // Make an AJAX request to the server to post a comment on the task template
    fetch('/api/task-templates/:taskTemplateId/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: commentText
      })
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      if (data.success) {
        // Display a success message or update the task template comments
        alert('Comment posted successfully!');
        // You can update the task template comments by fetching and rendering the updated comments
        getComments(taskTemplateId);
        
        // Trigger task template comment notification
        triggerTaskTemplateCommentNotification(data.comment);
      } else {
        // Display an error message or handle the failure scenario
        alert('An error occurred while posting the comment. Please try again later.');
      }
    })
    .catch(error => {
      // Handle any errors that occur during the task template comment posting process
      console.error('Error posting comment:', error);
      alert('An error occurred while posting the comment. Please try again later.');
    });
  }
  
  // Function to handle task template discussions
  function handleTaskTemplateDiscussion(event) {
    // Get the discussion text from the UI
    const discussionText = document.getElementById('taskTemplateDiscussionText').value;
  
    // Make an AJAX request to the server to post a discussion on the task template
    fetch('/api/task-templates/:taskTemplateId/discussions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: discussionText
      })
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      if (data.success) {
        // Display a success message or update the task template discussions
        alert('Discussion posted successfully!');
        // You can update the task template discussions by fetching and rendering the updated discussions
        getDiscussions(taskTemplateId);
        
        // Trigger task template discussion notification
        triggerTaskTemplateDiscussionNotification(data.discussion);
      } else {
        // Display an error message or handle the failure scenario
        alert('An error occurred while posting the discussion. Please try again later.');
      }
    })
    .catch(error => {
      // Handle any errors that occur during the task template discussion posting process
      console.error('Error posting discussion:', error);
      alert('An error occurred while posting the discussion. Please try again later.');
    });
  }
  
  // Function to trigger task template creation notification
  function triggerTaskTemplateCreationNotification(taskTemplateData) {
    // Prepare notification data
    const notificationData = {
      type: 'task_template_creation',
      taskTemplate: taskTemplateData
    };
  
    // Make an AJAX request to the server to trigger the notification
    fetch('/api/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(notificationData)
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      if (data.success) {
        // Notification sent successfully
        console.log('Task template creation notification sent successfully.');
      } else {
        // Notification sending failed
        console.error('Error sending task template creation notification:', data.error);
      }
    })
    .catch(error => {
      // Handle any errors that occur during the notification sending process
      console.error('Error sending task template creation notification:', error);
    });
  }
  
  // Function to trigger task template comment notification
  function triggerTaskTemplateCommentNotification(commentData) {
    // Prepare notification data
    const notificationData = {
      type: 'task_template_comment',
      comment: commentData
    };
  
    // Make an AJAX request to the server to trigger the notification
    fetch('/api/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(notificationData)
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      if (data.success) {
        // Notification sent successfully
        console.log('Task template comment notification sent successfully.');
      } else {
        // Notification sending failed
        console.error('Error sending task template comment notification:', data.error);
      }
    })
    .catch(error => {
      // Handle any errors that occur during the notification sending process
      console.error('Error sending task template comment notification:', error);
    });
  }
  
  // Function to trigger task template discussion notification
  function triggerTaskTemplateDiscussionNotification(discussionData) {
    // Prepare notification data
    const notificationData = {
      type: 'task_template_discussion',
      discussion: discussionData
    };
  
    // Make an AJAX request to the server to trigger the notification
    fetch('/api/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(notificationData)
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      if (data.success) {
        // Notification sent successfully
        console.log('Task template discussion notification sent successfully.');
      } else {
        // Notification sending failed
        console.error('Error sending task template discussion notification:', data.error);
      }
    })
    .catch(error => {
      // Handle any errors that occur during the notification sending process
      console.error('Error sending task template discussion notification:', error);
    });
  }
  
  // Attach an event listener to the form submission button
  const taskTemplateForm = document.getElementById('taskTemplateForm');
  taskTemplateForm.addEventListener('submit', handleFormSubmission);
  
  // Attach an event listener to the filter and sort options
  const taskTemplateFilter = document.getElementById('taskTemplateFilter');
  taskTemplateFilter.addEventListener('change', handleTaskTemplateFilteringAndSorting);
  
  const taskTemplateSort = document.getElementById('taskTemplateSort');
  taskTemplateSort.addEventListener('change', handleTaskTemplateFilteringAndSorting);
  
  // Attach an event listener to the task template comment button
  const taskTemplateCommentButton = document.getElementById('taskTemplateCommentButton');
  taskTemplateCommentButton.addEventListener('click', handleTaskTemplateComment);
  
  // Attach an event listener to the task template discussion button
  const taskTemplateDiscussionButton = document.getElementById('taskTemplateDiscussionButton');
  taskTemplateDiscussionButton.addEventListener('click', handleTaskTemplateDiscussion);

  // Function to handle task time tracking
function trackTaskTime(taskId, timeData) {
    // Make an AJAX request to the server to track time for the task
    fetch('/api/tasks/:taskId/time', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(timeData)
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      if (data.success) {
        // Time tracking started successfully, display success message or update task time tracking
        alert('Time tracking started successfully!');
        // You can update the task time tracking by fetching and rendering the updated task time tracking data
        getTaskTimeTracking(taskId);
      } else {
        // Time tracking failed, display error message or handle the failure scenario
        alert('Time tracking failed. Please try again.');
      }
    })
    .catch(error => {
      // Handle any errors that occur during the task time tracking process
      console.error('Error tracking task time:', error);
      alert('An error occurred during task time tracking. Please try again later.');
    });
  }
  
  // Function to handle form submission
  function handleFormSubmission(event) {
    event.preventDefault(); // Prevent the form from submitting via browser's default behavior
    
    // Get task details from the form
    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskAssignees = document.getElementById('taskAssignees').value;
    const taskCollaborators = document.getElementById('taskCollaborators').value;
    const taskDueDate = document.getElementById('taskDueDate').value;
    const taskReminder = document.getElementById('taskReminder').value;
    const taskDependencies = document.getElementById('taskDependencies').value;
    const taskLabels = document.getElementById('taskLabels').value; // Get task labels
    const taskPriority = document.getElementById('taskPriority').value; // Get task priority
  
    // Perform client-side validation on the task details
    if (!taskName || !taskDescription) {
      alert('Please fill in all task details.');
      return;
    }
  
    // Construct the task data object to send to the server
    const taskData = {
      name: taskName,
      description: taskDescription,
      assignees: taskAssignees,
      collaborators: taskCollaborators,
      dueDate: taskDueDate,
      reminder: taskReminder,
      dependencies: taskDependencies,
      labels: taskLabels, // Add task labels to the task data
      priority: taskPriority // Add task priority to the task data
    };
  
    // Create the task
    createTask(taskData);
  }
  
  // Function to handle task filtering and sorting
  function handleTaskFilteringAndSorting(event) {
    // Get the filter and sort options from the UI
    const filterOption = document.getElementById('taskFilter').value;
    const sortOption = document.getElementById('taskSort').value;
  
    // Make an AJAX request to the server to fetch tasks based on the filter and sort options
    fetch('/api/tasks?filter=' + filterOption + '&sort=' + sortOption)
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      if (data.success) {
        // Update the task list with the filtered and sorted tasks
        renderTasks(data.tasks);
      } else {
        // Display an error message or handle the failure scenario
        alert('An error occurred while fetching tasks. Please try again later.');
      }
    })
    .catch(error => {
      // Handle any errors that occur during the task filtering and sorting process
      console.error('Error fetching tasks:', error);
      alert('An error occurred while fetching tasks. Please try again later.');
    });
  }
  
  // Function to handle task comments
  function handleTaskComment(event) {
    // Get the comment text from the UI
    const commentText = document.getElementById('taskCommentText').value;
  
    // Make an AJAX request to the server to post a comment on the task
    fetch('/api/tasks/:taskId/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: commentText
      })
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      if (data.success) {
        // Display a success message or update the task comments
        alert('Comment posted successfully!');
        // You can update the task comments by fetching and rendering the updated comments
        getComments(taskId);
        
        // Trigger task comment notification
        triggerTaskCommentNotification(data.comment);
      } else {
        // Display an error message or handle the failure scenario
        alert('An error occurred while posting the comment. Please try again later.');
      }
    })
    .catch(error => {
      // Handle any errors that occur during the task comment posting process
      console.error('Error posting comment:', error);
      alert('An error occurred while posting the comment. Please try again later.');
    });
  }
  
  // Function to handle task discussions
  function handleTaskDiscussion(event) {
    // Get the discussion text from the UI
    const discussionText = document.getElementById('taskDiscussionText').value;
  
    // Make an AJAX request to the server to post a discussion on the task
    fetch('/api/tasks/:taskId/discussions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: discussionText
      })
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      if (data.success) {
        // Display a success message or update the task discussions
        alert('Discussion posted successfully!');
        // You can update the task discussions by fetching and rendering the updated discussions
        getDiscussions(taskId);
        
        // Trigger task discussion notification
        triggerTaskDiscussionNotification(data.discussion);
      } else {
        // Display an error message or handle the failure scenario
        alert('An error occurred while posting the discussion. Please try again later.');
      }
    })
    .catch(error => {
      // Handle any errors that occur during the task discussion posting process
      console.error('Error posting discussion:', error);
      alert('An error occurred while posting the discussion. Please try again later.');
    });
  }
  
  // Function to trigger task creation notification
  function triggerTaskCreationNotification(taskData) {
    // Prepare notification data
    const notificationData = {
      type: 'task_creation',
      task: taskData
    };
  
    // Make an AJAX request to the server to trigger the notification
    fetch('/api/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(notificationData)
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      if (data.success) {
        // Notification sent successfully
        console.log('Task creation notification sent successfully.');
      } else {
        // Notification sending failed
        console.error('Error sending task creation notification:', data.error);
      }
    })
    .catch(error => {
      // Handle any errors that occur during the notification sending process
      console.error('Error sending task creation notification:', error);
    });
  }
  
  // Function to trigger task comment notification
  function triggerTaskCommentNotification(commentData) {
    // Prepare notification data
    const notificationData = {
      type: 'task_comment',
      comment: commentData
    };
  
    // Make an AJAX request to the server to trigger the notification
    fetch('/api/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(notificationData)
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      if (data.success) {
        // Notification sent successfully
        console.log('Task comment notification sent successfully.');
      } else {
        // Notification sending failed
        console.error('Error sending task comment notification:', data.error);
      }
    })
    .catch(error => {
      // Handle any errors that occur during the notification sending process
      console.error('Error sending task comment notification:', error);
    });
  }
  
  // Function to trigger task discussion notification
  function triggerTaskDiscussionNotification(discussionData) {
    // Prepare notification data
    const notificationData = {
      type: 'task_discussion',
      discussion: discussionData
    };
  
    // Make an AJAX request to the server to trigger the notification
    fetch('/api/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(notificationData)
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      if (data.success) {
        // Notification sent successfully
        console.log('Task discussion notification sent successfully.');
      } else {
        // Notification sending failed
        console.error('Error sending task discussion notification:', data.error);
      }
    })
    .catch(error => {
      // Handle any errors that occur during the notification sending process
      console.error('Error sending task discussion notification:', error);
    });
  }

  // Add a new function to handle task time tracking
  function handleTaskTimeTracking(event) {
    // Get the task ID from the UI
    const taskId = document.getElementById('taskId').value;
  
    // Get the time tracking data from the UI
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
  
    // Construct the time tracking data object
    const timeData = {
      startTime: startTime,
      endTime: endTime
    };
  
    // Call the trackTaskTime function to start tracking time for the task
    trackTaskTime(taskId, timeData);
  }
  
  // Attach an event listener to the task time tracking button
  const taskTimeTrackingButton = document.getElementById('taskTimeTrackingButton');
  taskTimeTrackingButton.addEventListener('click', handleTaskTimeTracking);

  // Function to handle task cloning
function cloneTask(taskId) {
    // Make an AJAX request to the server to clone the task
    fetch('/api/tasks/' + taskId + '/clone', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      if (data.success) {
        // Task cloned successfully, display success message or update task list
        alert('Task cloned successfully!');
        // You can update the task list by fetching and rendering the updated task list
        getTasks();
        
        // Trigger task cloning notification
        triggerTaskCloningNotification(data.task);
      } else {
        // Task cloning failed, display error message or handle the failure scenario
        alert('Task cloning failed. Please try again.');
      }
    })
    .catch(error => {
      // Handle any errors that occur during the task cloning process
      console.error('Error cloning task:', error);
      alert('An error occurred during task cloning. Please try again later.');
    });
  }
  
  // Function to handle form submission
  function handleFormSubmission(event) {
    event.preventDefault(); // Prevent the form from submitting via browser's default behavior
    
    // Get task details from the form
    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskAssignees = document.getElementById('taskAssignees').value;
    const taskCollaborators = document.getElementById('taskCollaborators').value;
    const taskDueDate = document.getElementById('taskDueDate').value;
    const taskReminder = document.getElementById('taskReminder').value;
    const taskDependencies = document.getElementById('taskDependencies').value;
    const taskLabels = document.getElementById('taskLabels').value; // Get task labels
    const taskPriority = document.getElementById('taskPriority').value; // Get task priority
  
    // Perform client-side validation on the task details
    if (!taskName || !taskDescription) {
      alert('Please fill in all task details.');
      return;
    }
  
    // Construct the task data object to send to the server
    const taskData = {
      name: taskName,
      description: taskDescription,
      assignees: taskAssignees,
      collaborators: taskCollaborators,
      dueDate: taskDueDate,
      reminder: taskReminder,
      dependencies: taskDependencies,
      labels: taskLabels, // Add task labels to the task data
      priority: taskPriority // Add task priority to the task data
    };
  
    // Create the task
    createTask(taskData);
  }
  
  // Function to handle task filtering and sorting
  function handleTaskFilteringAndSorting(event) {
    // Get the filter and sort options from the UI
    const filterOption = document.getElementById('taskFilter').value;
    const sortOption = document.getElementById('taskSort').value;
  
    // Make an AJAX request to the server to fetch tasks based on the filter and sort options
    fetch('/api/tasks?filter=' + filterOption + '&sort=' + sortOption)
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      if (data.success) {
        // Update the task list with the filtered and sorted tasks
        renderTasks(data.tasks);
      } else {
        // Display an error message or handle the failure scenario
        alert('An error occurred while fetching tasks. Please try again later.');
      }
    })
    .catch(error => {
      // Handle any errors that occur during the task filtering and sorting process
      console.error('Error fetching tasks:', error);
      alert('An error occurred while fetching tasks. Please try again later.');
    });
  }
  
  // Function to handle task comments
  function handleTaskComment(event) {
    // Get the comment text from the UI
    const commentText = document.getElementById('taskCommentText').value;
  
    // Make an AJAX request to the server to post a comment on the task
    fetch('/api/tasks/:taskId/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: commentText
      })
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      if (data.success) {
        // Display a success message or update the task comments
        alert('Comment posted successfully!');
        // You can update the task comments by fetching and rendering the updated comments
        getComments(taskId);
        
        // Trigger task comment notification
        triggerTaskCommentNotification(data.comment);
      } else {
        // Display an error message or handle the failure scenario
        alert('An error occurred while posting the comment. Please try again later.');
      }
    })
    .catch(error => {
      // Handle any errors that occur during the task comment posting process
      console.error('Error posting comment:', error);
      alert('An error occurred while posting the comment. Please try again later.');
    });
  }
  
  // Function to handle task discussions
  function handleTaskDiscussion(event) {
    // Get the discussion text from the UI
    const discussionText = document.getElementById('taskDiscussionText').value;
  
    // Make an AJAX request to the server to post a discussion on the task
    fetch('/api/tasks/:taskId/discussions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: discussionText
      })
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      if (data.success) {
        // Display a success message or update the task discussions
        alert('Discussion posted successfully!');
        // You can update the task discussions by fetching and rendering the updated discussions
        getDiscussions(taskId);
        
        // Trigger task discussion notification
        triggerTaskDiscussionNotification(data.discussion);
      } else {
        // Display an error message or handle the failure scenario
        alert('An error occurred while posting the discussion. Please try again later.');
      }
    })
    .catch(error => {
      // Handle any errors that occur during the task discussion posting process
      console.error('Error posting discussion:', error);
      alert('An error occurred while posting the discussion. Please try again later.');
    });
  }
  
  // Function to trigger task creation notification
  function triggerTaskCreationNotification(taskData) {
    // Prepare notification data
    const notificationData = {
      type: 'task_creation',
      task: taskData
    };
  
    // Make an AJAX request to the server to trigger the notification
    fetch('/api/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(notificationData)
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      if (data.success) {
        // Notification sent successfully
        console.log('Task creation notification sent successfully.');
      } else {
        // Notification sending failed
        console.error('Error sending task creation notification:', data.error);
      }
    })
    .catch(error => {
      // Handle any errors that occur during the notification sending process
      console.error('Error sending task creation notification:', error);
    });
  }
  
  // Function to trigger task comment notification
  function triggerTaskCommentNotification(commentData) {
    // Prepare notification data
    const notificationData = {
      type: 'task_comment',
      comment: commentData
    };
  
    // Make an AJAX request to the server to trigger the notification
    fetch('/api/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(notificationData)
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      if (data.success) {
        // Notification sent successfully
        console.log('Task comment notification sent successfully.');
      } else {
        // Notification sending failed
        console.error('Error sending task comment notification:', data.error);
      }
    })
    .catch(error => {
      // Handle any errors that occur during the notification sending process
      console.error('Error sending task comment notification:', error);
    });
  }
  
  // Function to trigger task discussion notification
  function triggerTaskDiscussionNotification(discussionData) {
    // Prepare notification data
    const notificationData = {
      type: 'task_discussion',
      discussion: discussionData
    };
  
    // Make an AJAX request to the server to trigger the notification
    fetch('/api/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(notificationData)
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      if (data.success) {
        // Notification sent successfully
        console.log('Task discussion notification sent successfully.');
      } else {
        // Notification sending failed
        console.error('Error sending task discussion notification:', data.error);
      }
    })
    .catch(error => {
      // Handle any errors that occur during the notification sending process
      console.error('Error sending task discussion notification:', error);
    });
  }
  
  // Add a new function to handle task cloning
  function handleTaskCloning(event) {
    // Get the task ID from the UI
    const taskId = document.getElementById('taskId').value;
  
    // Call the cloneTask function to clone the task
    cloneTask(taskId);
  }
  
  // Attach an event listener to the task clone button
  const taskCloneButton = document.getElementById('taskCloneButton');
  taskCloneButton.addEventListener('click', handleTaskCloning);

  // Function to handle bulk task actions
function handleBulkTaskActions(event) {
    // Get the selected task IDs from the UI
    const selectedTaskIds = getSelectedTaskIds();
  
    // Get the selected action from the UI
    const selectedAction = document.getElementById('bulkTaskAction').value;
  
    // Make an AJAX request to the server to perform the bulk action
    fetch('/api/tasks/bulk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        taskIds: selectedTaskIds,
        action: selectedAction
      })
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      if (data.success) {
        // Bulk action performed successfully, display success message or update task list
        alert('Bulk action performed successfully!');
        // You can update the task list by fetching and rendering the updated task list
        getTasks();
      } else {
        // Bulk action failed, display error message or handle the failure scenario
        alert('Bulk action failed. Please try again.');
      }
    })
    .catch(error => {
      // Handle any errors that occur during the bulk action process
      console.error('Error performing bulk action:', error);
      alert('An error occurred during bulk action. Please try again later.');
    });
  }
  
  // Function to get selected task IDs
  function getSelectedTaskIds() {
    // Get all the checkboxes for tasks
    const taskCheckboxes = document.querySelectorAll('input[type="checkbox"][name="taskIds"]');
  
    // Get the IDs of the checked tasks
    const selectedTaskIds = [];
    taskCheckboxes.forEach(checkbox => {
      if (checkbox.checked) {
        selectedTaskIds.push(checkbox.value);
      }
    });
  
    return selectedTaskIds;
  }
  
  // Attach an event listener to the bulk task action button
  const bulkTaskActionButton = document.getElementById('bulkTaskActionButton');
  bulkTaskActionButton.addEventListener('click', handleBulkTaskActions);

  