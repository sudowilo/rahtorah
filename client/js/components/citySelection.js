export const selectCity = () => {
  const cityButtons = document.querySelectorAll('.js-city-selector');
  const body = document.querySelector('body');
  const innerBody = document.querySelector('.inner-body');

  for (const button of cityButtons) {
    button.addEventListener('click', (elem)=>{
      const {cityType} = button.dataset;
      innerBody.classList.add('blurred');

      body.innerHTML = body.innerHTML + `
      <div class="city-selection-window prevent-select">
        <div class="top-section">
          <div class="close-button">✕</div>
          <div class="select-button">استان</div>
          <div class="select-button">شهر</div>
        </div>
        <div class="bottom-section">
          <div class="submit-button">تایید</div>
        </div>
      </div>`;
    })
  }
}