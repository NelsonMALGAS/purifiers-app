import { AuthMessages } from "@/types";

export const authSuccessMessages: AuthMessages = {
  login: {
    message: "Login Successful",
    description: "You have successfully logged into your account.",
  },
  signup: {
    message: "Account Created",
    description: "Your account has been created. You are now logged in.",
  },
  reset: {
    message: "Password Reset Email Sent",
    description: "Check your inbox for a link to reset your password.",
  },
  signout: {
    message: "Signed Out",
    description: "You have been signed out of your account.",
  },
};

export const authErrorMessages: AuthMessages = {
  login: {
    message: "Login Failed",
    description: "Something went wrong while logging in.",
  },
  signup: {
    message: "Registration Failed",
    description: "Something went wrong while signing up the user.",
  },
  reset: {
    message: "Password Reset Failed",
    description: "Something went wrong while sending the password reset email.",
  },
  signout: {
    message: "Sign Out Failed",
    description: "Something went wrong while trying to sign out.",
  },
};
