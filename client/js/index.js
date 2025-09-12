import { selectCity } from "./components/citySelection.js";
import { renderUserCard } from "./components/userCard.js";
import { renderTrips } from "./components/renderTrips.js";
import { createTripButton } from "./components/createTrip.js";

document.addEventListener("DOMContentLoaded", async () => {
  createTripButton();
  const userCardContainer = document.querySelector(".user-card");
  await renderUserCard(userCardContainer);
  selectCity();
  await renderTrips();
});
