import { encode } from "base-64";
import React, { useContext } from 'react';
import { UserContext } from '../context/userContext';

/**
 * Generate a base64 encoded token for API authentication
 * @param {string} userID - User ID
 * @param {string} password - User password
 * @returns {string} Base64 encoded token
 */
export function generateAuthToken(userID, password) {
  return encode(`${userID}:${password}`);
}

/**
 * Custom hook to get authorization header automatically from context
 * @returns {Object} Authorization header object
 */
export function useAuthHeader() {
  const user = useContext(UserContext);
  const token = generateAuthToken(user.UserID, user.Pwd);
  return {
    Authorization: `Basic ${token}`
  };
}