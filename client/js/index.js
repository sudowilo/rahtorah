import { selectCity } from "./components/citySelection.js";
import { renderUserCard } from "./components/userCard.js";

document.addEventListener("DOMContentLoaded", async () => {
  const userCardContainer = document.querySelector(".user-card");
  await renderUserCard(userCardContainer);
  const request = document.querySelector('.requests');
  request.addEventListener('click', ()=>{
    console.log('request');
  })
  selectCity();
})
