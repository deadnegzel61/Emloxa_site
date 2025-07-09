const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const rememberCheckbox = document.getElementById("remember");
const messageBox = document.getElementById("message");

function signup() {
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) return showMessage("Alanlar boş olamaz!");

  const users = JSON.parse(localStorage.getItem("users") || "{}");

  if (users[email]) return showMessage("Bu e-posta zaten kayıtlı!");

  users[email] = { password, verified: true }; // e-posta doğrulama yerine true
  localStorage.setItem("users", JSON.stringify(users));
  showMessage("Kayıt başarılı. Şimdi giriş yapabilirsiniz.", "green");
}

function login() {
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const users = JSON.parse(localStorage.getItem("users") || "{}");

  if (!users[email]) return showMessage("Kullanıcı bulunamadı.");
  if (users[email].password !== password) return showMessage("Şifre yanlış.");

  if (!users[email].verified) return showMessage("E-posta doğrulanmadı.");

  if (rememberCheckbox.checked) {
    localStorage.setItem("session", email);
  } else {
    sessionStorage.setItem("session", email);
  }

  showMessage("Giriş başarılı!", "green");
  // Gerçek projede yönlendirme yapılır: window.location.href = "panel.html"
}

function showMessage(msg, color = "red") {
  messageBox.textContent = msg;
  messageBox.style.color = color;
}

// Otomatik giriş:
window.onload = () => {
  const session = localStorage.getItem("session") || sessionStorage.getItem("session");
  if (session) {
    showMessage("Zaten giriş yapılmış: " + session, "green");
  }
};
