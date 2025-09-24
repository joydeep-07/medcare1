export const baseURL = "https://medcare1-ufgh.onrender.com/";

export const endPoint = {
  doctors: `${baseURL}/doctors`,
  appointments: `${baseURL}/appointments`,
  contact: `${baseURL}/contacts/create`,
  contacts: `${baseURL}/contacts/all`,
  contactDelete: `${baseURL}/contacts/delete`,
  contactReply: `${baseURL}/contacts/reply`,
  reviews: `${baseURL}/reviews`,
  users: `${baseURL}/users`,

  register: `${baseURL}/auth/register`,
  login: `${baseURL}/auth/login`,
  verifyAuth: `${baseURL}/auth/verify`,
  requestPasswordReset: `${baseURL}/auth/request-password-reset`,
  verifyResetOtp: `${baseURL}/auth/verify-reset-otp`,
  resetPassword: `${baseURL}/auth/reset-password`,

  newsletterSubscribe: `${baseURL}/newsletter/subscribe`,
  newsletterUnsubscribe: `${baseURL}/newsletter/unsubscribe`,
  newsletterCheck: (email) => `${baseURL}/newsletter/check-subscription/${email}`,
  newsletterSend: `${baseURL}/newsletter/send`,
};
