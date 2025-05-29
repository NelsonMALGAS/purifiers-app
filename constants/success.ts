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
  profileUpdate: {
    message: "Profile Updated",
    description: "Your profile information has been updated successfully.",
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
  profileUpdate: {
    message: "Profile Update Failed",
    description: "Something went wrong while trying to update your profile.",
  },
};

export const links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Dashboard",
    path: "/dashboard",
  },
];
