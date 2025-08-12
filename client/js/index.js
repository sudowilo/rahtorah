import { selectCity } from "./components/citySelection.js";
import { renderUserCard } from "./components/userCard.js";
import { renderTrips } from "./components/renderTrips.js";

document.addEventListener("DOMContentLoaded", async () => {
  const userCardContainer = document.querySelector(".user-card");
  await renderUserCard(userCardContainer);
  selectCity();
  await renderTrips();
})
