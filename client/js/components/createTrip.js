import { authPanel } from "./authPanel.js";
import { isAuthorized } from "../services/auth.js";

const tripForm = ()=> {
  console.log('tripForm');
}

export const renderTripForm = async () => {
  const authorized = await isAuthorized();
  if (!authorized) {
    authPanel();
  } else {
    tripForm();
  }
};

export const createTripButton = () => {
  const createTripButton = document.querySelector('.create-trip');

  createTripButton.addEventListener('click', (elem)=>{
    renderTripForm();
  })
}