import iranProvinces from "../lib/iranProvinces.js";
import iranCities from "../lib/iranCities.js";

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
        if (!provinceSelector.querySelector(".js-locations")) {
          provinceSelector.insertAdjacentHTML(
            "beforeend",
            `
          <div class="locations js-locations"></div>
          `
          );

          const locations = provinceSelector.querySelector(".js-locations");

          const provinces = iranProvinces.map(
            (elem) =>
              `<div class="name js-province-name" data-id="${elem.id}">${elem.name}</div>`
          );
          const provinceHTML = provinces.join("");

          locations.insertAdjacentHTML("beforeend", provinceHTML);

          const provinceNames = locations.querySelectorAll(".js-province-name");
          for (const name of provinceNames) {
            name.addEventListener("click", (e) => {
              e.stopPropagation();
              console.log(name.textContent);
              locations.remove();
            });
          }
        }
      });

      citySelector.addEventListener("click", () => {
        console.log("city");
        citySelector.dataset.value = "miz";
      });

      submit.addEventListener("click", (elem) => {
        const province = provinceSelector.dataset.value;
        const city = citySelector.dataset.value;

        console.log(province + "/" + city);
      });
    });
  }
};
