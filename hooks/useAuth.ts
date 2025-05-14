import { useEffect, useState } from "react";
import { auth } from "@/db/firebase";
import {
  User,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { UseAuthReturn } from "@/types";

/**
 * Custom hook for managing Firebase authentication state and operations.
 *
 * This hook centralizes authentication logic to:
 * - Provide a single source of truth for user authentication state.
 * - Ensure consistent authentication behavior across the application.
 * - Prevent unauthorized access to protected resources.
 * - Simplify integration with the authentication provider.
 *
 * @returns { UseAuthReturn } Object containing auth utilities and state.
 */
const useAuth = (): UseAuthReturn => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(true);
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleRegister = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setCurrentUser(userCredentials?.user);
      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Unknown error during registration";
      console.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setCurrentUser(userCredentials?.user);
      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error during login";
      console.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (email: string) => {
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
      }

      console.error(
        "Something went wrong while sending the password reset email."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);

    try {
      // Attempt to sign out the user (auth is your authentication object)
      await signOut(auth);

      // Return success if sign-out is successful
      return { success: true };
    } catch (err) {
      // Handle error and log the error to console
      if (err instanceof Error) {
        console.error("Error signing out:", err.message);
      } else {
        console.error("Something went wrong while trying to sign out");
      }

      // Return failure if an error occurred
      return {
        success: false,
        error: "Failed to sign out. Please try again.",
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    currentUser,
    handleLogin,
    handleRegister,
    handlePasswordReset,
    handleSignOut,
    loading,
  };
};

export default useAuth;
