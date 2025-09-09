import { BASE_URL } from "../config.js";
import { getToken } from "../services/auth.js"; 
import { loginForm } from "./loginForm.js";
import { registerForm } from "./registerForm.js";

async function getUserInfo() {
  const url = `${BASE_URL}/api/profile/info`;
  // const token = getToken();
  const response = await fetch(url, {
    headers: {
      // Authorization: token,
    },
  });

  const result = await response.json();
  return { result, response };
}

export async function renderUserCard(element) {
  const { result, response } = await getUserInfo();

  if (result.success) {
    const user = result.data;
    element.innerHTML = `<div class="up-side">
          <div class="user-info">
            <img
              src="public/profile-picture.svg"
              alt="profile picture"
              class="profile-picture"
            />
            <div class="user-name">${user.first_name} ${user.last_name}</div>
          </div>
          <nav><img src="public/menu.svg" alt="menu" class="menu" /></nav>
        </div>
        <div class="down-side prevent-select">
          <div class="requests">درخواست‌ها</div>
          <div class="open-trips">سفرهای فعال</div>
        </div>`;
  } else {
    if (response.status === 401) {
      element.innerHTML = `
        <div class="authorization-section prevent-select">
          <div class="login-button js-login-button">ورود</div>
          <div class="register-button js-register-button">ثبت‌نام</div>
        </div>
    `;

    const loginButton = element.querySelector(".js-login-button");
    loginButton.addEventListener('click', (elem)=>{
      loginForm();
    })

    const registerButton = element.querySelector(".js-register-button");
    registerButton.addEventListener('click', (elem)=>{
      registerForm();
    })
    } 
  }
}
