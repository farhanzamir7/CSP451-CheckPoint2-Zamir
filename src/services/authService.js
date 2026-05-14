const demoUsers = [
  {
    username: "student",
    password: "Password123!",
    displayName: "CSP451 Student",
  },
];

function validateLoginInput(username, password) {
  const errors = [];

  if (!username || username.trim().length === 0) {
    errors.push("Username is required.");
  }

  if (!password || password.trim().length === 0) {
    errors.push("Password is required.");
  }

  if (password && password.length < 8) {
    errors.push("Password must be at least 8 characters.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

function authenticateUser(username, password) {
  const validation = validateLoginInput(username, password);

  if (!validation.valid) {
    return {
      success: false,
      status: 400,
      errors: validation.errors,
    };
  }

  const user = demoUsers.find(
    (account) =>
      account.username.toLowerCase() === username.trim().toLowerCase() &&
      account.password === password
  );

  if (!user) {
    return {
      success: false,
      status: 401,
      errors: ["Invalid username or password."],
    };
  }

  return {
    success: true,
    status: 200,
    user: {
      username: user.username,
      displayName: user.displayName,
    },
  };
}

module.exports = {
  authenticateUser,
  validateLoginInput,
};
