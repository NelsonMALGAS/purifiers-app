import { User } from "firebase/auth";
import { ObjectId } from "mongodb";

export interface StockItem {
  _id?: ObjectId | undefined;
  name: string;
  price: number;
  quantity: number;
  description: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  expiryDate: Date;
}

interface AuthMessage {
  message: string;
  description: string;
}

export interface AuthMessages {
  login: AuthMessage;
  signup: AuthMessage;
  reset: AuthMessage;
  signout: AuthMessage;
}

/**
 * Return type for the useAuth hook.
 *
 * @property {User | null} currentUser - The current authenticated user or null if not logged in.
 * @property {boolean} loading - Indicates whether authentication state is being determined.
 * @property {(email: string, password: string) => Promise<{ success: boolean; error?: string }>} handleLogin - Signs in a user with email and password.
 * @property {() => Promise<void>} handleSignOut - Signs out the current user.
 * @property {(email: string, password: string) => Promise<{ success: boolean; error?: string }>} handleRegister - Registers a new user with email and password.
 * @property {(email: string) => void} handleSendPasswordReset - Sends a password reset email to the provided address.
 */
export interface UseAuthReturn {
  currentUser: User | null;
  loading: boolean;
  handleLogin: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  handleSignOut: () => Promise<{ success: boolean; error?: string }>;
  handleRegister: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  handlePasswordReset: (email: string) => void;
}

export type AuthErrors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};
