import { register, setToken } from "../services/auth.js";

function displayError(registerButton, message, errorMessage) {
  if (errorMessage) {
    errorMessage.remove();
  }
  registerButton.insertAdjacentHTML(
    "beforeend",
    `
      <div class="error-message">${message}</div>
    `
  );

  errorMessage = registerButton.querySelector(".error-message");
  errorMessage.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  setTimeout(() => errorMessage.remove(), "5000");
}

export const registerForm = () => {
  const body = document.querySelector("body");
  const innerBody = body.querySelector(".inner-body");

  innerBody.classList.add("blurred");
  body.insertAdjacentHTML(
    "beforeend",
    `
    <div class="register-panel prevent-select">
      <div class="close-button js-close-button">✕</div>
      <div class="register-info-section">
        <div class="info-child">
          <label for="first-name">نام</label>
          <input type="text" name="first-name" id="first-name" />
        </div>
        <div class="info-child">
          <label for="last-name">نام‌خانوادگی</label>
          <input type="text" name="last-name" id="last-name" />
        </div>
        <div class="info-child">
          <label for="gender">جنسیت</label>
          <div class="gender-buttons">
            <div class="gender female">خانم</div>
            <div class="gender male">آقا</div>
          </div>
        </div>
        <div class="info-child">
          <label for="username">نام کاربری</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="یه نام کاربری خاص برای خودت انتخاب کن"
          />
        </div>
        <div class="info-child">
          <label for="phone-number">شماره همراه</label>
          <input type="text" name="phone-number" id="phone-number" />
        </div>
        <div class="info-child">
          <label for="password">رمز عبور</label>
          <input type="text" name="password" id="password" />
        </div>
        <div class="info-child">
          <label for="repeat-password">تکرار رمز عبور</label>
          <input type="text" name="repeat-password" id="repeat-password" />
        </div>
        <div class="info-child">
          <label for="email">ایمیل</label>
          <input type="text" name="email" id="email" />
        </div>
      </div>
      <div class="register-button">ثبت‌نام</div>
    </div>
    `
  );

  const panel = document.querySelector(".register-panel");

  const closeButton = panel.querySelector(".js-close-button");
  closeButton.addEventListener("click", () => {
    innerBody.classList.remove("blurred");
    panel.remove();
  });

  let gender = "";
  const female = panel.querySelector(".female");
  const male = panel.querySelector(".male");

  female.addEventListener("click", () => {
    male.classList.remove("selected");
    female.classList.add("selected");
    gender = "female";
  });
  male.addEventListener("click", () => {
    female.classList.remove("selected");
    male.classList.add("selected");
    gender = "male";
  });

  const registerButton = panel.querySelector(".register-button");
  registerButton.addEventListener("click", async () => {
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const username = document.getElementById("username").value;
    const phoneNumber = document.getElementById("phone-number").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const repeatPassword = document.getElementById("repeat-password").value;

    const errorMessage = registerButton.querySelector(".error-message");
    if (password !== repeatPassword) {
      displayError(
        registerButton,
        "رمز عبور و تکرار رمز عبور باید یکسان باشند.",
        errorMessage
      );
      return;
    }

    const { success, message, errors , token} = await register(
      firstName,
      lastName,
      gender,
      username,
      password,
      phoneNumber,
      email
    );

    if (!success) {
      if (errors) {
        delete errors._errors;

        for (const error in errors) {
          const inputErrors = errors[error]._errors;
          const index = inputErrors.length - 1;
          displayError(registerButton, inputErrors[index], errorMessage);
          break;
        }
      } else {
        displayError(registerButton, message, errorMessage);
      }
    } else {
      setToken(token);
      panel.remove();
      innerBody.classList.remove("blurred");
      location.reload();
    }
  });
};
