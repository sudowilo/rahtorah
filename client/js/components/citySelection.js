export const selectCity = () => {
  const cityButtons = document.querySelectorAll(".js-city-selector");
  const body = document.querySelector("body");

  for (const button of cityButtons) {
    button.addEventListener("click", (elem) => {
      const { cityType } = button.dataset;

      body.insertAdjacentHTML(
        "beforeend",
        `
      <div class="city-selection-window prevent-select">
        <div class="top-section">
          <div class="close-button js-close-button">✕</div>
          <div class="select-button">استان</div>
          <div class="select-button">شهر</div>
        </div>
        <div class="bottom-section">
          <div class="submit-button">تایید</div>
        </div>
      </div>`
      );

      const innerBody = document.querySelector(".inner-body");
      innerBody.classList.add("blurred");

      const closeButton = document.querySelector(".js-close-button");
      closeButton.addEventListener("click", () => {
        innerBody.classList.remove("blurred");
        const panel = document.querySelector(".city-selection-window");
        panel.remove();
      });
    });
  }
};
