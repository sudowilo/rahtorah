import { authPanel } from "./authPanel.js";

export const createTripForm = () => {
  authPanel();
};

export const createTripEvent = () => {
  const createTripButton = document.querySelector('.create-trip');

  createTripButton.addEventListener('click', (elem)=>{
    createTripForm();
  })
}