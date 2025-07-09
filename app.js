function showMessage(text, color = "red") {
  const message = document.getElementById("message");
  message.textContent = text;
  message.style.color = color;
}

function signup() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) return showMessage("Alanlar boş olamaz!");

  const users = JSON.parse(localStorage.getItem("users") || "{}");
  if (users[email]) return showMessage("Zaten kayıtlı.");

  users[email] = { password };
  localStorage.setItem("users", JSON.stringify(users));
  showMessage("Kayıt başarılı. Şimdi giriş yap.", "green");
}

function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const remember = document.getElementById("remember").checked;

  const users = JSON.parse(localStorage.getItem("users") || "{}");

  if (!users[email] || users[email].password !== password) {
    return showMessage("E-posta veya şifre yanlış.");
  }

  if (remember) {
    localStorage.setItem("session", email);
  } else {
    sessionStorage.setItem("session", email);
  }

  window.location.href = "dashboard.html";
}
