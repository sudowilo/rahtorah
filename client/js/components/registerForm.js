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
          <label for="user-name">نام کاربری</label>
          <input
            type="text"
            name="user-name"
            id="user-name"
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
};
