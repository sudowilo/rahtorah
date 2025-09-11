import { login, setToken } from "../services/auth.js";

export const loginForm = () => {
  const body = document.querySelector("body");
  const innerBody = body.querySelector(".inner-body");

  innerBody.classList.add("blurred");
  body.insertAdjacentHTML(
    "beforeend",
    `
    <div class="login-panel">
      <div class="close-button js-close-button">✕</div>
      <div class="info-section">
        <div class="username-section">
          <div class="username-wrapper">
            <label for="username">نام کاربری</label>
            <small class="hint">آیدی، شماره همراه یا ایمیل</small>
          </div>
          <input
            type="text"
            name="username"
            id="username"
          />
        </div>
        <div class="password-section">
          <label for="password">رمز عبور</label>
          <input type="password" name="password" id="password" />
        </div>
      </div>
      <div class="login-button">ورود</div>
    </div>
    `
  );

  const panel = document.querySelector(".login-panel");

  const closeButton = panel.querySelector(".js-close-button");
  closeButton.addEventListener("click", () => {
    innerBody.classList.remove("blurred");
    panel.remove();
  });

  const loginButton = panel.querySelector(".login-button");
  loginButton.addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const { success, message, token } = await login(username, password);

    if (!success) {
      const loginButton = panel.querySelector(".login-button");
      let errorMessage = loginButton.querySelector(".error-message");
      if (errorMessage) {
        errorMessage.remove();
      }
      loginButton.insertAdjacentHTML(
        "beforeend",
        `
              <div class="error-message">${message}</div>
          `
      );

      errorMessage = loginButton.querySelector(".error-message");
      errorMessage.addEventListener("click", (e) => {
        e.stopPropagation();
      });
      setTimeout(() => errorMessage.remove(), "5000");
    } else {
      setToken(token);
      panel.remove();
      innerBody.classList.remove("blurred");
      location.reload();
    }
  });
};
