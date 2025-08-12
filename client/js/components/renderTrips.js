import { BASE_URL } from "../config.js";

function toPersianDigits(str) {
  return str.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
}

function fourDigitTime(time) {
  return toPersianDigits(time.slice(0, 5));
}

const getTripsList = async (origin, destination) => {
  let apiUrl = `${BASE_URL}/api/trip/list-trips?`;

  if (origin) {
    apiUrl += "origin=" + origin;
  }

  if (destination) {
    if (origin) {
      apiUrl += "&";
    }
    apiUrl += "destination=" + destination;
  }

  const response = await fetch(apiUrl);
  const result = await response.json();

  return { result, response };
};

export const renderTrips = async (origin, destination) => {
  const { result, response } = await getTripsList(origin, destination);

  if (result.success) {
    const { data } = result;
    const tripsHtmlElements = [];
    const trips = document.querySelector(".trips");
    for (const trip of data) {
      const origin = trip.origin_text.split("/")[1];
      const destination = trip.destination_text.split("/")[1];
      const departureDate = toPersianDigits(trip.departure_date);
      const timeFrom = fourDigitTime(trip.departure_time_from);
      const timeTo = fourDigitTime(trip.departure_time_to);
      const seats = toPersianDigits(trip.seats_total.toString());

      tripsHtmlElements.push(`
      <div class="trip">
        <div class="direction">
          <div class="origin">${origin}</div>
          <div class="line"></div>
          <div class="destination">${destination}</div>
        </div>
        <div class="info">
          <div class="right-side">
            <div class="attributes">
              <div class="seat">ظرفیت:</div>
              <div class="">جنسیت:</div>
            </div>
            <div class="values">
              <div class="number detail">${seats} نفر</div>
              <div class="gender detail">مهم نیست</div>
            </div>
          </div>
          <div class="left-side">
            <div class="attributes">
              <div>تاریخ:</div>
              <div class="">ساعت:</div>
            </div>
            <div class="values">
              <div class="date detail">${departureDate}</div>
              <div class="time detail">
                <div class="from">${timeFrom}</div>
                <div class="">تا</div>
                <div class="to">${timeTo}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
    }
    trips.innerHTML = tripsHtmlElements.join("");
  } else {
  }
};
