import iranProvinces from "../lib/iranProvinces.js";
import iranCities from "../lib/iranCities.js";

const fitTextInContainer = (container) => {
  const body = document.querySelector('body');
  
  let defaultFontSize = parseFloat(window.getComputedStyle(body).fontSize);
  let fontSize = parseFloat(window.getComputedStyle(container).fontSize);

  container.style.fontSize = defaultFontSize + "px";
  while (container.scrollWidth > container.clientWidth) {
    fontSize -= 1;
    container.style.fontSize = fontSize + "px";
  }
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
      panel.addEventListener("click", (e) => {
        e.stopPropagation();
        const locationsMenu = panel.querySelector(".js-locations");
        locationsMenu?.remove();
      });

      const closeButton = panel.querySelector(".js-close-button");
      closeButton.addEventListener("click", () => {
        innerBody.classList.remove("blurred");
        panel.remove();
      });

      const provinceSelector = panel.querySelector(".js-province-selector");
      const citySelector = panel.querySelector(".js-city-selector");
      const submit = panel.querySelector(".js-submit-location");

      provinceSelector.addEventListener("click", (button) => {
        button.stopPropagation();
        if (!provinceSelector.querySelector(".js-locations")) {
          const cityLocationsMenu = citySelector.querySelector(".js-locations");
          cityLocationsMenu?.remove();

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
              provinceSelector.textContent = name.textContent;
              provinceSelector.dataset.id = name.dataset.id;
              fitTextInContainer(provinceSelector);
              locations.remove();
            });
          }
        }
      });

      citySelector.addEventListener("click", (button) => {
        button.stopPropagation();
        if (!citySelector.querySelector(".js-locations")) {
          const provinceId = provinceSelector.dataset.id;
          if (!provinceId) {
            citySelector.insertAdjacentHTML(
              "beforeend",
              `
              <div class="city-select-fail">استان را انتخاب کنید</div>
              `
            );

            const errorMessage =
              citySelector.querySelector(".city-select-fail");
            errorMessage.style.top = citySelector.scrollHeight + "px";
            setTimeout(() => errorMessage.remove(), "5000");
            return;
          }

          const provinceLocationsMenu =
            provinceSelector.querySelector(".js-locations");
          provinceLocationsMenu?.remove();

          citySelector.insertAdjacentHTML(
            "beforeend",
            `
          <div class="locations js-locations"></div>
          `
          );

          const locations = citySelector.querySelector(".js-locations");
          const cities = iranCities
            .filter((elem) => elem.province_id == provinceId)
            .map(
              (elem) =>
                `<div class="name js-city-name" data-id="${elem.id}">${elem.name}</div>`
            );
          const cityHTML = cities.join("");

          locations.insertAdjacentHTML("beforeend", cityHTML);

          const cityNames = locations.querySelectorAll(".js-city-name");
          for (const name of cityNames) {
            name.addEventListener("click", (e) => {
              e.stopPropagation();
              citySelector.textContent = name.textContent;
              citySelector.dataset.id = name.dataset.id;
              
              locations.remove();
            });
          }
        }
      });

      submit.addEventListener("click", (elem) => {
        const province = provinceSelector.textContent;
        const city = citySelector.textContent;

        console.log(province + "/" + city);
      });
    });
  }
};
