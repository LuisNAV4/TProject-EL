import { useState, useCallback } from 'react';

/**
 * Custom hook to manage chat messages between user and admin.
 *
 * Each message object has the form:
 * {
 *   id: string,
 *   sender: "user" | "admin",
 *   text: string,
 *   timestamp: number (epoch ms)
 * }
 *
 * Provides functions to add messages and the current messages list.
 *
 * Usage:
 * const { messages, addUserMessage, addAdminMessage } = useChatMessages();
 */
export default function useChatMessages(initialMessages = []) {
  const [messages, setMessages] = useState(initialMessages);

  // Helper to create unique ID for each message
  const generateId = () => Date.now().toString(36) + Math.random().toString(36).slice(2);

  /**
   * Add a message from user
   * @param {string} text - Message content
   */
  const addUserMessage = useCallback((text) => {
    setMessages((msgs) => [
      ...msgs,
      {
        from: 'user',
        text,
        timestamp: Date.now(),
      },
    ]);
  }, []);

  /**
   * Add a message from admin
   * @param {string} text - Message content
   
  const addAdminMessage = useCallback((text) => {
    setMessages((msgs) => [
      ...msgs,
      {
        id: generateId(),
        sender: 'admin',
        text,
        timestamp: Date.now(),
      },
    ]);
  }, []);


  */
   return {
    messages,
    addUserMessage,
  };
}

