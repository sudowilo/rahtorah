import iranProvinces from "../lib/iranProvinces.js";
import iranCities from "../lib/iranCities.js";
import { renderTrips } from "./renderTrips.js";

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

const renderDefaultLocationButtons = () => {
  const locationButtons = document.querySelectorAll(".js-location-selector");

  const originText = localStorage.getItem("origin");
  const destinationText = localStorage.getItem("destination");

  const origin = originText?.split("/");
  const destination = destinationText?.split("/");

  for (const button of locationButtons) {
    const locationType = button.dataset.locationType;
    const locationFullName = localStorage.getItem(locationType)?.split("/");
    if (locationFullName) {
      const province = locationFullName[0] + "/";
      const city = locationFullName[1];

      button.innerHTML = `
          <div class="province"></div>
          <div class="city"></div>`;

      const provinceElem = button.querySelector(".province");
      const cityElem = button.querySelector(".city");

      provinceElem.textContent = province;
      cityElem.textContent = city;
    }
  }
};

export const selectCity = async () => {
  swapCities();
  renderDefaultLocationButtons();
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
        <div class="close-button js-close-button">✕</div>
        <div class="top-section">
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

      submit.addEventListener("click", async (elem) => {
        if (!provinceSelector.dataset.id && !citySelector.dataset.id) {
          let errorMessage = submit.querySelector(".submit-fail");
          if (!errorMessage) {
            submit.insertAdjacentHTML(
              "beforeend",
              `
              <div class="submit-fail">شهر را انتخاب کنید</div>
              `
            );

            errorMessage = submit.querySelector(".submit-fail");
            errorMessage.style.top = -submit.scrollHeight / 2 + "px";
            setTimeout(() => errorMessage.remove(), "5000");
          }
          return;
        }

        button.innerHTML = `
          <div class="province"></div>
          <div class="city"></div>`;

        const province = button.querySelector(".province");
        const city = button.querySelector(".city");

        const provinceText = provinceSelector.textContent + "/";
        const cityText = citySelector.textContent;

        province.textContent = provinceText;
        city.textContent = cityText;

        localStorage.setItem(
          button.dataset.locationType,
          provinceText + cityText
        );

        const originText = localStorage.getItem("origin");
        const destinationText = localStorage.getItem("destination");

        await renderTrips(originText, destinationText);

        innerBody.classList.remove("blurred");
        panel.remove();
      });
    });
  }
};

const swapCities = () => {
  const swapButton = document.querySelector(".swap-button");
  swapButton.addEventListener("click", async () => {
    const destination = localStorage.getItem("origin");
    const origin = localStorage.getItem("destination");

    localStorage.setItem("origin", origin);
    localStorage.setItem("destination", destination);

    renderDefaultLocationButtons();
    await renderTrips(origin, destination);
  });
};
