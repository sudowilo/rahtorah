import { selectCity } from "./components/citySelection.js";
import { renderUserCard } from "./components/userCard.js";
import { renderTrips } from "./components/renderTrips.js";
import { setToken } from "./services/auth.js";
import { createTripEvent } from "./components/createTripForm.js";

document.addEventListener("DOMContentLoaded", async () => {
  setToken(
    `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE4MDI5NmRiLTJjOGUtNDExMy05MjBhLWNkNTEwY2E0YTVhMSIsInVzZXJuYW1lIjoic3Vkb3dpbG8iLCJpYXQiOjE3NTQ2NjMzODV9.Iwug3AKCU_Iiw7tlOsEASFOgIAZ76AYXkTtF4vtjKtc`
  );
  createTripEvent();
  const userCardContainer = document.querySelector(".user-card");
  await renderUserCard(userCardContainer);
  selectCity();
  await renderTrips();
});
