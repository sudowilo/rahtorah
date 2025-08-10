export const selectCity = () => {
  const cityButtons = document.querySelectorAll('.js-city-selector');
  for (const button of cityButtons) {
    button.addEventListener('click', (elem)=>{
      console.log('hey you clicked', button.dataset.cityType);
    })
  }
}