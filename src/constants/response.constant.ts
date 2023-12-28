export const STATUS = {
  SUCCESS: "success",
  FAILED: "failed",
};


export const USER_RESPONSE = {
    SUCCESS: "success",
    FAILED: "failed",
    USER_CREATED: "User Created Successfully",
    USER_EXIST: "User Exist",
    USER_MODIFIED: "User Modified",
    USER_FETCHED: "User Fetched",
    RESENT_CONFIRMATION: "Resent Confirmation Mail",
    EMAIL_CONFIRMED: "Email Confirmed Successfully",
    RESET_PASSWORD_SENT: "Reset Password has been Sent to the E-mail",
    PASSWORD_CHANGED: "Password Changed",
    OTP_SENT: "OTP has been Sent to your registered email",
    OTP_VERIFIED: "OTP has been verified",
    USER_LOGGED_OUT: "User logged out",
    UNAUTHORIZED: "Unauthorized user",
    LOGIN_SUCCESS:'Login successfully',
  
    //errors
    USER_UPDATE_ERROR: "Failed to update user",
    SESSION_UPDATE_ERROR: "Failed to update session",
    NO_TOKEN_PROVIDED: "No token provided",
    INVALID_TOKEN: "Invalid token",
    TOKEN_ERROR: "Failed to authenticate token",
    TOKEN_USER_DOESNT_EXIST: "Token user does not exist",
    USER_DOESNT_EXIST: "User doesn't exist",
    CONFIRMATION_EMAIL_FAILED: "Failed to send confirmation email",
    FAILED_TO_CONFIRM_EMAIL: "Failed to confirm email",
    INCORRECT_PASSWORD: "Incorrect password",
    SIGNUP_FAILED: "Signup failed",
    LOGIN_FAILED: "Login failed",
    EMAIL_ALREADY_EXIST: "Email Already Exists",
    EMAIL_NOT_EXIST: "Email doesn't Exists",
    FAILED_TO_SEND_MAIL: "Failed to Send Mail",
    FAILED_TO_RESET_PASSWORD: "Failed to reset password",
    FAILED_TO_CHANGE_PASSWORD: "Failed to change password",
    FAILED_TO_SEND_OTP: "Failed to send otp message",
    FAILED_TO_VERIFY_OTP: "Failed to verify otp",
    INVALID_OTP: "Invalid OTP",
    FAILED_TO_EDIT_USER: "Failed to edit user",
    FAILED_TO_FETCH_USER: "Failed to fetch user",
    LOGOUT_FAILED: "Failed to fetch user",
    FB_AUTH_FAILED: "Failed to authenticate Facebook account",
    RESET_PASSWORD_TIMEOUT: "Expired the time of reset password",
    RESET_PASSWORD_LINK_EXPIRED:'Reset password link expired',
  };

  export const TOKEN_RESPONSE = {
    TOKEN_CREATE_SUCCESS: "Token created successfully",
    TOKEN_CREATE_FAILED: "Failed to create token",
    TOKEN_EDIT_SUCCESS: "Token edited successfully",
    TOKEN_EDIT_FAILED: "Failed to edit token",
  }