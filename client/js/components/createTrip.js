import { authPanel } from "./authPanel.js";

export const createTripForm = () => {
  authPanel();
};

export const createTripButton = () => {
  const createTripButton = document.querySelector('.create-trip');

  createTripButton.addEventListener('click', (elem)=>{
    createTripForm();
  })
}