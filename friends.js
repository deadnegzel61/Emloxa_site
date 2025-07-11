const users = [
  { id: 1, name: "Ahmet" },
  { id: 2, name: "Zeynep" },
  { id: 3, name: "Mert" },
  { id: 4, name: "Elif" },
  { id: 5, name: "Yusuf" }
];

const friendList = [];
const userListEl = document.getElementById("user-list");
const friendListEl = document.getElementById("friend-list");

users.forEach(user => {
  const card = document.createElement("div");
  card.className = "user-card";

  const name = document.createElement("span");
  name.textContent = user.name;

  const button = document.createElement("button");
  button.textContent = "İstek Gönder";
  button.addEventListener("click", () => {
    if (!friendList.includes(user.name)) {
      friendList.push(user.name);
      updateFriendList();
      button.textContent = "İstek Gönderildi";
      button.disabled = true;
    }
  });

  card.appendChild(name);
  card.appendChild(button);
  userListEl.appendChild(card);
});

function updateFriendList() {
  friendListEl.innerHTML = "";
  friendList.forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    friendListEl.appendChild(li);
  });
}
