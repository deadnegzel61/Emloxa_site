document.addEventListener("DOMContentLoaded", () => {
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  if (!activeUser) {
    alert("Giriş yapmalısın!");
    window.location.href = "./index.html";
    return;
  }

  document.getElementById("profile-info").textContent = activeUser.username;

  // Arkadaş verileri localStorage'da saklanacak:
  let friendsData = JSON.parse(localStorage.getItem("friendsData") || "{}");

  if (!friendsData[activeUser.username]) {
    friendsData[activeUser.username] = { friends: [] };
    localStorage.setItem("friendsData", JSON.stringify(friendsData));
  }

  const myData = friendsData[activeUser.username];

  const friendListEl = document.getElementById("friend-list");

  function renderFriends() {
    friendListEl.innerHTML = "";
    myData.friends.forEach(friend => {
      const li = document.createElement("li");
      li.textContent = friend;
      friendListEl.appendChild(li);
    });
  }

  renderFriends();
});
