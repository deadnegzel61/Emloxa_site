document.addEventListener("DOMContentLoaded", () => {
  // Kullanıcı verileri
  let users = JSON.parse(localStorage.getItem("users") || "[]");
  let activeUser = JSON.parse(localStorage.getItem("activeUser") || "null");

  if (!activeUser) {
    alert("Giriş yapmalısın!");
    window.location.href = "./index.html";
    return;
  }

  // Arkadaşlar, istekler, mesajlar localStorage'da saklanacak
  // Formatlar:
  // friendsData = { "kullanici#1234": { friends: [], requests: [], messages: { friendName: [msg1, msg2] } } }
  let friendsData = JSON.parse(localStorage.getItem("friendsData") || "{}");

  // Aktif kullanıcının verisi yoksa oluştur
  if (!friendsData[activeUser.username]) {
    friendsData[activeUser.username] = { friends: [], requests: [], messages: {} };
    localStorage.setItem("friendsData", JSON.stringify(friendsData));
  }

  const myData = friendsData[activeUser.username];

  // Elementler
  const myProfileEl = document.getElementById("my-profile");
  const friendListEl = document.getElementById("friend-list");
  const requestsListEl = document.getElementById("requests-list");
  const addFriendInput = document.getElementById("add-friend-input");
  const sendRequestBtn = document.getElementById("send-request-btn");
  const chatHeader = document.getElementById("chat-header");
  const chatMessages = document.getElementById("chat-messages");
  const messageInput = document.getElementById("message-input");
  const sendMsgBtn = document.getElementById("send-msg-btn");

  let selectedFriend = null;

  // Profil göster
  myProfileEl.textContent = `${activeUser.username}`;

  // Buton aktiflik kontrolü
  addFriendInput.addEventListener("input", () => {
    const val = addFriendInput.value.trim();
    // Kullanıcı adı formata uygun ve farklı biri olmalı
    const validFormat = /^.+#\d{4}$/.test(val);
    const notSelf = val.toLowerCase() !== activeUser.username.toLowerCase();
    sendRequestBtn.disabled = !(validFormat && notSelf);
  });

  // İstek gönderme
  sendRequestBtn.addEventListener("click", () => {
    const targetUsername = addFriendInput.value.trim();

    // Hedef kullanıcı var mı?
    const targetUser = users.find(u => u.username.toLowerCase() === targetUsername.toLowerCase());
    if (!targetUser) {
      alert("Böyle bir kullanıcı bulunamadı.");
      return;
    }

    // Zaten arkadaş mı?
    if (myData.friends.includes(targetUsername)) {
      alert("Bu kullanıcı zaten arkadaşınız.");
      return;
    }

    // Zaten istek gönderilmiş mi?
    if (myData.requests.includes(targetUsername)) {
      alert("Bu kullanıcıdan zaten istek var.");
      return;
    }

    // Karşı tarafın istekleri de kontrol edelim
    if (!friendsData[targetUsername]) {
      friendsData[targetUsername] = { friends: [], requests: [], messages: {} };
    }
    if (friendsData[targetUsername].requests.includes(activeUser.username)) {
      alert("Bu kullanıcı zaten size istek göndermiş.");
      return;
    }

    // İstek gönder
    friendsData[targetUsername].requests.push(activeUser.username);
    localStorage.setItem("friendsData", JSON.stringify(friendsData));
    alert("İstek gönderildi.");
    addFriendInput.value = "";
    sendRequestBtn.disabled = true;
    renderRequests();
  });

  // Gelen istekleri göster
  function renderRequests() {
    requestsListEl.innerHTML = "";
    myData.requests.forEach(req => {
      const li = document.createElement("li");
      li.textContent = req;

      const acceptBtn = document.createElement("button");
      acceptBtn.textContent = "Kabul Et";
      acceptBtn.onclick = () => {
        // Arkadaş olarak ekle
        if (!myData.friends.includes(req)) myData.friends.push(req);

        // Karşı taraf da arkadaş olarak eklemeli
        if (!friendsData[req]) friendsData[req] = { friends: [], requests: [], messages: {} };
        if (!friendsData[req].friends.includes(activeUser.username)) friendsData[req].friends.push(activeUser.username);

        // İstekten çıkar
        myData.requests = myData.requests.filter(r => r !== req);

        localStorage.setItem("friendsData", JSON.stringify(friendsData));
        renderRequests();
        renderFriends();
        alert(`${req} arkadaş olarak eklendi.`);
      };

      const rejectBtn = document.createElement("button");
      rejectBtn.textContent = "Reddet";
      rejectBtn.onclick = () => {
        myData.requests = myData.requests.filter(r => r !== req);
        localStorage.setItem("friendsData", JSON.stringify(friendsData));
        renderRequests();
      };

      li.appendChild(acceptBtn);
      li.appendChild(rejectBtn);
      requestsListEl.appendChild(li);
    });
  }

  // Arkadaşları göster
  function renderFriends() {
    friendListEl.innerHTML = "";
    myData.friends.forEach(friend => {
      const li = document.createElement("li");
      li.textContent = friend;
      li.style.cursor = "pointer";
      li.onclick = () => {
        selectFriend(friend);
      };
      friendListEl.appendChild(li);
    });
  }

  // Mesaj alanını temizle
  function clearChat() {
    chatMessages.innerHTML = "";
    messageInput.value = "";
    messageInput.disabled = true;
    sendMsgBtn.disabled = true;
    chatHeader.textContent = "Bir arkadaş seç";
  }

  // Arkadaş seçildiğinde
  function selectFriend(friend) {
    selectedFriend = friend;
    chatHeader.textContent = friend;
    messageInput.disabled = false;
    sendMsgBtn.disabled = false;
    renderMessages();
  }

  // Mesajları göster
  function renderMessages() {
    chatMessages.innerHTML = "";
    const msgs = myData.messages[selectedFriend] || [];
    msgs.forEach(msg => {
      const div = document.createElement("div");
      div.className = "message";
      div.textContent = msg;
      chatMessages.appendChild(div);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Mesaj gönder
  sendMsgBtn.addEventListener("click", () => {
    const text = messageInput.value.trim();
    if (!text || !selectedFriend) return;

    if (!myData.messages[selectedFriend]) {
      myData.messages[selectedFriend] = [];
    }
    myData.messages[selectedFriend].push(`${activeUser.username}: ${text}`);

    // Karşı tarafın mesajlarına da ekleyelim
    if (!friendsData[selectedFriend]) {
      friendsData[selectedFriend
