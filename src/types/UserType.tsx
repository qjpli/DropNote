// src/types.ts
export interface AuthPayload {
  user: {
    id: string;
    username: string;
    email: string;
    // Add other user-specific fields here (name, role, etc.)
  };
  session: {
    // Define the structure of the session here (e.g., session token, expiration, etc.)
    token: string;
    expiresAt: string;
    // Add other session-specific fields here
  } | null; // Session may be null if not available
}
