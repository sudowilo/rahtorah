import { BASE_URL } from "./config.js";

async function getUserInfo() {
  const url = `${BASE_URL}/api/profile/info`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhiNzBjZmM4LTYzNWUtNDM3Zi04NjIzLTI1NjE4ZjlhYmM0OSIsInVzZXJuYW1lIjoidGhlc3Bpcml0eCIsImlhdCI6MTc1MzYyOTk0MX0.mbJ4UbpvoTpB8A6B-cnFuBMhlIFWYT1JTPPX2kjaGlc`,
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

getUserInfo();
