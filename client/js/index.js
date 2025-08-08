import { renderUserCard } from "./components/userCard.js"; 

document.addEventListener("DOMContentLoaded", async () => {
  const userCardContainer = document.querySelector(".user-card");
  await renderUserCard(userCardContainer);
})
