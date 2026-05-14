const form = document.getElementById("loginForm");
const message = document.getElementById("message");

function showMessage(text, type) {
  message.textContent = text;
  message.className = type;
}

function validateLogin(email, password) {
  const errors = [];

  if (!email || email.trim().length === 0) {
    errors.push("Email is required.");
  }

  if (email && !email.includes("@")) {
    errors.push("Email must include @.");
  }

  if (!password || password.trim().length === 0) {
    errors.push("Password is required.");
  }

  if (password && password.length < 8) {
    errors.push("Password must be at least 8 characters.");
  }

  return errors;
}

async function submitLogin(email, password) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: email,
      password,
    }),
  });

  return response.json();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const errors = validateLogin(email, password);

  if (errors.length > 0) {
    showMessage(errors.join(" "), "error");
    return;
  }

  showMessage("Checking login...", "loading");

  try {
    const result = await submitLogin(email, password);

    if (!result.success) {
      showMessage(result.errors.join(" "), "error");
      return;
    }

    showMessage(`Welcome, ${result.user.displayName}!`, "success");
  } catch (error) {
    showMessage("Login request failed. Please try again.", "error");
  }
});
