const fetch = require("node-fetch");

const username = new URLSearchParams(window.location.search).get("username");
const token = new URLSearchParams(window.location.search).get("token");
const ids = new URLSearchParams(window.location.search).get("ids").split(",");
const currency = new URLSearchParams(window.location.search).get("currency");
const from = new URLSearchParams(window.location.search).get("from");
const to = new URLSearchParams(window.location.search).get("to");

const fetchData = async () => {
  const response = await fetch(`../utils.php?username=${username}&token=${token}&ids=${ids.join(",")}&currency=${currency}&from=${from}&to=${to}`);
  const data = await response.json();
  if (response.ok) {
    if (new URLSearchParams(window.location.search).get("background") === "true") {
      console.log({ message: "Fetched historical data." });
    } else {
      console.log(data);
    }
  } else {
    console.log({ error: "You need to be logged in to do that." });
  }
};

fetchData();
