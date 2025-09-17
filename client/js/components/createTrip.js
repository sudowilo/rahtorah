import { authPanel } from "./authPanel.js";
import { isAuthorized } from "../services/auth.js";
import { citySelectButtons } from "./citySelectButtons.js";

const tripForm = () => {
  const body = document.querySelector("body");
  const innerBody = document.querySelector(".inner-body");
  innerBody.classList.add("blurred");
  body.insertAdjacentHTML(
    "beforeend",
    `
    <div class="create-trip-panel">
      <div class="origin-selection row">
        <div class="origin-label sm-label">مبدا</div>
      </div>
      <div class="destination-selection row">
        <div class="destination-label sm-label">مقصد</div>
      </div>
      <div class="departure-date row">
        <div class="departure-label sm-label">تاریخ حرکت</div>
        <div class="date-container">
          <div class="date-year"></div>
          <div class="date-month"></div>
          <div class="date-day"></div>
        </div>
      </div>
      <div class="departure-time row">
        <div class="right-section">
          <div class="sm-label">زمان حرکت</div>
          <div class="time-specifier">از</div>
          <div class="time-container">
            <div class="time-hour"></div>
            <div class="time-minute"></div>
          </div>
        </div>
        <div class="left-section">
          <div class="time-specifier">تا</div>
          <div class="time-container">
            <div class="time-hour"></div>
            <div class="time-minute"></div>
          </div>
        </div>
      </div>
      <div class="suggested-transport-section row">
        <label for="suggested-transport-service"
          >سرویس حمل و نقل پیشنهادی</label
        >
        <input
          type="text"
          id="suggested-transport-service"
          name="suggested-transport-service"
        />
      </div>
      <div class="passengers-info row">
        <div class="passengers-number-section">
          <div class="sm-label">صندلی خالی</div>
          <div class="seats-number"></div>
        </div>
        <div class="passengers-gender-section">
          <div class="sm-label">جنسیت</div>
          <div class="gender-selection"></div>
        </div>
      </div>
      <div class="note-section">
        <div class="label-section">
          <div class="md-label">یادداشت</div>
          <div class="sm-label">نکاتی که قبل ارسال درخواست بهتر بقیه بدونن</div>
        </div>
        <div class="note-input-container">
          <textarea name="trip-note-input" id="trip-note-input"></textarea>
        </div>
      </div>
      <div class="actions-section">
        <div class="submit-trip">ثبت</div>
        <div class="cancel">لغو</div>
      </div>
    </div>`
  );
  const originSection = document.querySelector(".origin-selection");
  const destinationSection = document.querySelector(".destination-selection");

  citySelectButtons(originSection);
  citySelectButtons(destinationSection);
};

export const renderTripForm = async () => {
  const authorized = await isAuthorized();
  if (!authorized) {
    authPanel();
  } else {
    tripForm();
  }
};

export const createTripButton = () => {
  const createTripButton = document.querySelector(".create-trip");

  createTripButton.addEventListener("click", (elem) => {
    renderTripForm();
  });
};
