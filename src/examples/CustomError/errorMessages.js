// errorMessages.js

// Array of status codes with user-friendly messages
const errorStatusCodes = [
    { code: 400, message: "Oops! It seems there was something wrong with your request." },
    { code: 401, message: "You need to log in to access this resource." },
    { code: 403, message: "Sorry, you don't have permission to access this resource." },
    { code: 404, message: "The page or resource you’re looking for can’t be found." },
    { code: 405, message: "This action isn't allowed on the requested resource." },
    { code: 409, message: "There's a conflict with your request. Please try again." },
    { code: 429, message: "You're making too many requests. Please slow down." },
    { code: 500, message: "Something went wrong on our end. Please try again later." },
    { code: 501, message: "This feature isn't available yet. Please check back later." },
    { code: 502, message: "The server encountered a problem. Please try again later." },
    { code: 503, message: "Our service is currently unavailable. Please try again soon." },
    { code: 504, message: "The server took too long to respond. Please try again later." }
  ];
  
  // Function to get the user-friendly error message based on the status code
  export function getErrorMessage(statusCode) {
    const status = errorStatusCodes.find(status => status.code === statusCode);
    return status ? status.message : "An unexpected error occurred. Please try again.";
  }
  