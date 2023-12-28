
export const EMAIL = {
	SENDER_EMAIL: "shaik@brownbutton.io",
	SENDER_NAME: "Shaik",
	CONFIRM_EMAIL_SUBJECT: "Node-base | Confirm Your Account",
};



export const EMAIL_TEMPLATES = {
  forgotPassword: (id: any) => {
    return `<h4>Please click here to reset your password</h4>
   <a href="${process.env.DOMAIN}/reset_password/${id}">Reset Password</a>;`;
  },
};
