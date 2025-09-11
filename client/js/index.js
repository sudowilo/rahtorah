import { selectCity } from "./components/citySelection.js";
import { renderUserCard } from "./components/userCard.js";
import { renderTrips } from "./components/renderTrips.js";
import { createTripEvent } from "./components/createTripForm.js";

document.addEventListener("DOMContentLoaded", async () => {
  createTripEvent();
  const userCardContainer = document.querySelector(".user-card");
  await renderUserCard(userCardContainer);
  selectCity();
  await renderTrips();
});
