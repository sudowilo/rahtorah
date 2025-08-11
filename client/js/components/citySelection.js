import iranCities from "../lib/iranCities.js";
import iranProvinces from "../lib/iranProvinces.js";

const locationsNames = (locations) => {
  return locations.map((elem) => elem.name);
};

export const selectCity = async () => {
  const locationButtons = document.querySelectorAll(".js-location-selector");
  const body = document.querySelector("body");
  const innerBody = document.querySelector(".inner-body");

  for (const button of locationButtons) {
    button.addEventListener("click", (elem) => {
      const { locationType } = button.dataset;

      innerBody.classList.add("blurred");
      body.insertAdjacentHTML(
        "beforeend",
        `
      <div class="city-selection-window prevent-select">
        <div class="top-section">
          <div class="close-button js-close-button">✕</div>
          <div class="select-button js-province-selector">استان</div>
          <div class="select-button js-city-selector">شهر</div>
        </div>
        <div class="bottom-section">
          <div class="submit-button js-submit-location">تایید</div>
        </div>
      </div>`
      );

      const panel = document.querySelector(".city-selection-window");
      const closeButton = panel.querySelector(".js-close-button");
      closeButton.addEventListener("click", () => {
        innerBody.classList.remove("blurred");
        panel.remove();
      });

      const provinceSelector = panel.querySelector(".js-province-selector");
      const citySelector = panel.querySelector(".js-city-selector");
      const submit = panel.querySelector(".js-submit-location");

      provinceSelector.addEventListener("click", (elem) => {
        console.log("provence");

        provinceSelector.insertAdjacentHTML(
          "beforebegin",
          `
          <div class="locations"></div>
          `
        );

        

      });

      citySelector.addEventListener("click", () => {
        console.log("city");
        citySelector.dataset.value = "miz";
      });

      submit.addEventListener("click", (elem) => {
        const provence = provinceSelector.dataset.value;
        const city = citySelector.dataset.value;

        console.log(provence + "/" + city);
      });
    });
  }
};
