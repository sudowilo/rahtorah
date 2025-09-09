import { loginForm } from "./loginForm.js";
import { registerForm } from "./registerForm.js";

export const authPanel = () => {
  const body = document.querySelector("body");
  const innerBody = body.querySelector(".inner-body");

  innerBody.classList.add("blurred");
  body.insertAdjacentHTML(
    "beforeend",
    `
    <div class="authorization-panel prevent-select">
      <div class="close-button js-close-button">✕</div>
      <div class="login-button">ورود</div>
      <div class="register-button">ثبت‌نام</div>
    </div>
    `
  );

  const panel = document.querySelector(".authorization-panel");

  const closeButton = panel.querySelector(".js-close-button");
  closeButton.addEventListener("click", () => {
    innerBody.classList.remove("blurred");
    panel.remove();
  });

  const loginButton = panel.querySelector('.login-button');
  loginButton.addEventListener('click', ()=> {
    panel.remove();
    loginForm();
  })

  const registerButton = panel.querySelector('.register-button');
  registerButton.addEventListener('click', ()=> {
    panel.remove();
    registerForm();
  })
};
