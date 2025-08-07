async function getUserCardHtml() {
  const url = "http://localhost:3000/render/userCard";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

const renderUserCard = async () => {
  const userCard = document.querySelector(".user-card");
  const userCardHtml = await getUserCardHtml();

  userCard.innerHTML = userCardHtml.data;
};

renderUserCard();
