const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const rememberCheckbox = document.getElementById("remember");
const messageBox = document.getElementById("message");

function signup() {
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  if (!email || !password) return showMessage("Boş alan olamaz!");
  
  const users = JSON.parse(localStorage.getItem("users") || "{}");
  if (users[email]) return showMessage("Bu e-posta zaten kayıtlı!");

  users[email] = { password };
  localStorage.setItem("users", JSON.stringify(users));
  showMessage("Kayıt başarılı. Şimdi giriş yap.", "green");
}

function login() {
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const users = JSON.parse(localStorage.getItem("users") || "{}");

  if (!users[email]) return showMessage("Kullanıcı bulunamadı.");
  if (users[email].password !== password) return showMessage("Şifre hatalı.");

  if (rememberCheckbox.checked) {
    localStorage.setItem("session", email);
  } else {
    sessionStorage.setItem("session", email);
  }

  window.location.href = "dashboard.html";
}

function showMessage(text, color = "red") {
  messageBox.textContent = text;
  messageBox.style.color = color;
}
