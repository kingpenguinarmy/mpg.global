import React, { useState, useEffect } from "react";
import axios from "axios";

// Function to send a new message
const sendMessage = async (message) => {
  // Encrypt the message using end-to-end encryption
  const encryptedMessage = encryptMessage(message);

  // Send the encrypted message to the server
  await axios.post("/api/messages", encryptedMessage)
    .then((response) => {
      console.log("Encrypted message sent successfully!");
    })
    .catch((error) => {
      console.error("Error sending encrypted message:", error);
    });
};

// Function to retrieve messages for a specific conversation/thread
const getMessages = async (conversationId) => {
  // Retrieve the encrypted messages for the conversation from the server
  const encryptedMessages = await axios.get(`/api/messages?conversationId=${conversationId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error retrieving encrypted messages:", error);
    });

  // Decrypt the encrypted messages
  const messages = decryptMessages(encryptedMessages);

  // Process the decrypted messages and update the UI
  console.log("Received decrypted messages:", messages);
};

const Messages = () => {
  const [conversationId, setConversationId] = useState(""); // State to store the current conversation ID
  const [messageText, setMessageText] = useState(""); // State to store the message text
  const [messages, setMessages] = useState([]); // State to store the messages for the current conversation
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const [taggedMessages, setTaggedMessages] = useState([]); // State to store the tagged messages
  const [notifyByEmail, setNotifyByEmail] = useState(false); // State to store the user's preference for email notifications
  const [notifyBySMS, setNotifyBySMS] = useState(false); // State to store the user's preference for SMS notifications
  const [readReceipts, setReadReceipts] = useState([]); // State to store the read receipts for messages
  const [files, setFiles] = useState([]); // State to store the files shared in the conversation
  const [draft, setDraft] = useState(""); // State to store the draft message
  const [messageHistory, setMessageHistory] = useState([]); // State to store the message history
  const [pinnedMessages, setPinnedMessages] = useState([]); // State to store the pinned messages
  const [reactions, setReactions] = useState([]); // State to store the reactions for each message

  useEffect(() => {
    // Fetch messages for the initial conversation/thread
    getMessages(conversationId);
  }, [conversationId]);

  const handleSendMessage = async () => {
    const message = {
      conversationId,
      text: messageText,
      timestamp: Date.now(),
    };

    // Encrypt the message using end-to-end encryption
    const encryptedMessage = encryptMessage(message);

    // Call the sendMessage function to send the encrypted message
    await sendMessage(encryptedMessage);

    // Send email and SMS notifications if the user has enabled them
    if (notifyByEmail) {
      // Implement the logic to send an email notification
    }
    if (notifyBySMS) {
      // Implement the logic to send an SMS notification
    }

    // Save the message to the draft
    setDraft(messageText);

    // Add the message to the message history
    setMessageHistory([...messageHistory, message]);
  };

  const handleSearch = () => {
    // Implement the search functionality here
    // Make an API call to search for messages based on the search query
    // Update the UI with the search results
    const searchResults = messages.filter((message) =>
      message.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setMessages(searchResults);
  };

  const handleTagMessage = (messageId) => {
    // Implement the tagging functionality here
    // Update the taggedMessages state to include the message with the given ID
    // Update the UI to indicate that the message is tagged
  
    // Find the message with the given ID
    const messageIndex = messages.findIndex((message) => message._id === messageId);
    if (messageIndex === -1) {
      return;
    }
  
    // Update the taggedMessages state
    const updatedTaggedMessages = [...taggedMessages];
    updatedTaggedMessages.push(messages[messageIndex]);
    setTaggedMessages(updatedTaggedMessages);
  
    // Update the UI to indicate that the message is tagged
    // ...
  };
  const handleReadReceipt = (messageId) => {
    // Implement the read receipt functionality here
    // Update the readReceipts state to include the message with the given ID
    // Update the UI to indicate that the message has been read
  
    // Find the message with the given ID
    const messageIndex = messages.findIndex((message) => message._id === messageId);
    if (messageIndex === -1) {
      return;
    }
  
    // Update the read receipts state
    const updatedReadReceipts = [...readReceipts, messageId];
    setReadReceipts(updatedReadReceipts);
  
    // Update the UI to indicate that the message has been read
    const updatedMessages = [...messages];
    updatedMessages[messageIndex].read = true;
    setMessages(updatedMessages);
  };

  const handleFileChange = (event) => {
    // Get the selected files from the event
    const selectedFiles = event.target.files;

    // Convert the selected files to base64 strings
    const filesToUpload = [];
    for (const file of selectedFiles) {
      const reader = new FileReader();
      reader.onload = (event) => {
        filesToUpload.push({
          name: file.name,
          type: file.type,
          data: event.target.result,
        });
      };
      reader.readAsDataURL(file);
    }

    // Update the files state with the converted base64 strings
    setFiles(filesToUpload);
  };

  const handleSendFiles = () => {
    // Send the files to the server
    axios.post("/api/messages/files", {
      conversationId,
      files,
    })
      .then((response) => {
        console.log("Files sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending files:", error);
      });
  };

  const handleSaveDraft = () => {
    // Save the current message text as a draft
    setDraft(messageText);
  };

  const handleLoadDraft = () => {
    // Load the draft message text into the message input
    setMessageText(draft);
  };

  const handleViewMessageHistory = () => {
    // Show the message history in a modal or separate view
    // Allow the user to view and navigate through the message history
    const modal = document.getElementById("messageHistoryModal");
    modal.style.display = "block";

    // Populate the modal with the message history
    const messageHistoryContainer = document.getElementById("messageHistoryContainer");
    messageHistoryContainer.innerHTML = "";
    for (const message of messageHistory) {
      const messageElement = document.createElement("div");
      messageElement.classList.add("message");
      messageElement.innerHTML = `
        <div class="message-sender">${message.sender}</div>
        <div class="message-timestamp">${message.timestamp}</div>
        <div class="message-text">${message.text}</div>
      `;
      messageHistoryContainer.appendChild(messageElement);
    }

    // Add an event listener to the close button to close the modal
    const closeButton = document.getElementById("messageHistoryCloseButton");
    closeButton.addEventListener("click", () => {
      modal.style.display = "none";
    });
  };


  const handlePinMessage = (messageId) => {
    // Implement the message pinning functionality here
    // Update the pinnedMessages state to include the message with the given ID
    // Update the UI to indicate that the message is pinned

    // Find the message with the given ID
    const messageIndex = messages.findIndex((message) => message._id === messageId);
    if (messageIndex === -1) {
      return;
    }

    // Update the pinnedMessages state
    const updatedPinnedMessages = [...pinnedMessages];
    updatedPinnedMessages.push(messages[messageIndex]);
    setPinnedMessages(updatedPinnedMessages);

    // Update the UI to indicate that the message is pinned
    // ...
  };

const handleReaction = (messageId, reaction) => {
  // Implement the reaction functionality here
  // Update the reactions state to include the reaction for the given message ID
  // Update the UI to show the reaction

  // Find the message with the given ID
  const messageIndex = messages.findIndex((message) => message._id === messageId);
  if (messageIndex === -1) {
    return;
  }

  // Create a new reaction object
  const newReaction = {
    emoji: reaction,
    userId: "user-id", // Replace this with the ID of the logged-in user
  };

  // Add the reaction to the message
  const updatedReactions = [...messages[messageIndex].reactions, newReaction];
  const updatedMessages = [...messages];
  updatedMessages[messageIndex].reactions = updatedReactions;

  // Update the state
  setReactions(updatedReactions);
  setMessages(updatedMessages);
};

  return (
    <div>
      <h1>Messages</h1>
      {/* Render the conversation/thread list */}
      {/* Render the messages for the selected conversation/thread */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search messages"
      />
      <button onClick={handleSearch}>Search</button>
      <input
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
      <button onClick={handleSaveDraft}>Save Draft</button>
      <button onClick={handleLoadDraft}>Load Draft</button>
      <button onClick={handleViewMessageHistory}>View Message History</button>
      <ul>
        {messages.map((message) => (
          <li key={message._id}>
            {message.text}
            <button onClick={() => handleTagMessage(message._id)}>Tag</button>
            <button onClick={() => handleReadReceipt(message._id)}>Mark as Read</button>
            <button onClick={() => handlePinMessage(message._id)}>Pin</button>
            <div>
              {reactions.map((reaction) => (
                <span key={reaction._id}>{reaction.emoji}</span>
              ))}
            </div>
            <button onClick={() => handleReaction(message._id, "👍")}>👍</button>
            <button onClick={() => handleReaction(message._id, "👎")}>👎</button>
            <button onClick={() => handleReaction(message._id, "❤️")}>❤️</button>
          </li>
        ))}
      </ul>
      <ul>
        {taggedMessages.map((message) => (
          <li key={message._id}>
            {message.text}
            <span>(Tagged)</span>
          </li>
        ))}
      </ul>
      <ul>
        {pinnedMessages.map((message) => (
          <li key={message._id}>
            {message.text}
            <span>(Pinned)</span>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="checkbox"
          checked={notifyByEmail}
          onChange={(e) => setNotifyByEmail(e.target.checked)}
        />
        <label>Notify me by email when I receive a new message</label>
      </div>
      <div>
        <input
          type="checkbox"
          checked={notifyBySMS}
          onChange={(e) => setNotifyBySMS(e.target.checked)}
        />
        <label>Notify me by SMS when I receive a new message</label>
      </div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleSendFiles}>Send Files</button>
      <CodeSnippet language="javascript" code={codeSnippet} />
      <div>
        {files.map((file) => (
          <div key={file.name}>
            <img src={file.data} alt={file.name} />
            <p>{file.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;