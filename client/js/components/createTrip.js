import { authPanel } from "./authPanel.js";
import { isAuthorized } from "../services/auth.js";

export const createTripForm = async () => {
  const authorized = await isAuthorized();
  if (!authorized) {
    authPanel();
  } else {
    console.log('well hello');
  }
};

export const createTripButton = () => {
  const createTripButton = document.querySelector('.create-trip');

  createTripButton.addEventListener('click', (elem)=>{
    createTripForm();
  })
}