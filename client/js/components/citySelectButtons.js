import iranProvinces from "../lib/iranProvinces.js";
import iranCities from "../lib/iranCities.js";

const fitTextInContainer = (container) => {
  const body = document.querySelector("body");

  let defaultFontSize = parseFloat(window.getComputedStyle(body).fontSize);
  let fontSize = parseFloat(window.getComputedStyle(container).fontSize);

  container.style.fontSize = defaultFontSize + "px";
  while (container.scrollWidth > container.clientWidth) {
    fontSize -= 1;
    container.style.fontSize = fontSize + "px";
  }
};

const citySelectButtons = (buttonsSection) => {
  const html = `
    <div class="select-button js-province-selector">استان</div>
    <div class="select-button js-city-selector">شهر</div>
  `;

  buttonsSection.insertAdjacentHTML("beforeend", html);

  const provinceSelector = buttonsSection.querySelector(".js-province-selector");
  const citySelector = buttonsSection.querySelector(".js-city-selector");

  provinceSelector.addEventListener("click", (button) => {
    button.stopPropagation();
    if (!provinceSelector.querySelector(".js-locations")) {
      const cityLocationsMenu = citySelector.querySelector(".js-locations");
      cityLocationsMenu?.remove(); //close city menu when clicked on province selector

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
        let errorMessage = citySelector.querySelector(".city-select-fail");
        if (!errorMessage) {
          citySelector.insertAdjacentHTML(
            "beforeend",
            `
              <div class="city-select-fail">استان را انتخاب کنید</div>
            `
          );

          //dynamically put error message below the button
          errorMessage = citySelector.querySelector(".city-select-fail");
          errorMessage.style.top = citySelector.scrollHeight + "px";
          setTimeout(() => errorMessage.remove(), "5000");
        }
        return;
      }

      const provinceLocationsMenu =
        provinceSelector.querySelector(".js-locations");
      provinceLocationsMenu?.remove(); //close province menu when clicked on city selector

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
};
