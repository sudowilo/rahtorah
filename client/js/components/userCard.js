import { BASE_URL } from "../config.js";

async function getUserInfo() {
  const url = `${BASE_URL}/api/profile/info`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhiNzBjZmM4LTYzNWUtNDM3Zi04NjIzLTI1NjE4ZjlhYmM0OSIsInVzZXJuYW1lIjoidGhlc3Bpcml0eCIsImlhdCI6MTc1MzYyOTk0MX0.mbJ4UbpvoTpB8A6B-cnFuBMhlIFWYT1JTPPX2kjaGlc`,
    },
  });

  const result = await response.json();
  return { result, response };
}

export async function renderUserCard(element) {
  const { result, response } = await getUserInfo();
  console.log(result, response);
  if (result.success) {
    const user = result.data;
    element.innerHTML = `<div class="up-side">
          <div class="user-info">
            <img
              src="public/profile-picture.svg"
              alt="profile picture"
              class="profile-picture"
            />
            <div class="user-name">${user.first_name} ${user.last_name}</div>
          </div>
          <nav><img src="public/menu.svg" alt="menu" class="menu" /></nav>
        </div>
        <div class="down-side">
          <div class="requests">درخواست‌ها</div>
          <div class="open-trips">سفرهای فعال</div>
        </div>`;
  } else {
    if (response.status === 401) {
      element.innerHTML = `
    <h3>hey there little stranger</h3>
    `;
    }
  }
}
