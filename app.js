function showMessage(text, color = "red") {
  const msg = document.getElementById("message");
  msg.textContent = text;
  msg.style.color = color;
}

function signup() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) return showMessage("Boş alan kalmasın!");
  if (!email.includes('@')) return showMessage("Geçerli e-posta girin!");

  const users = JSON.parse(localStorage.getItem("users") || "{}");
  if (users[email]) return showMessage("Zaten kayıtlı!");

  users[email] = { password };
  localStorage.setItem("users", JSON.stringify(users));
  showMessage("✔ Kayıt başarılı. Şimdi giriş yapın.", "green");
}

function censorEmail(email) {
  const [name, domain] = email.split('@');
  const masked = name.slice(0, 2) + "****";
  return masked + "@" + domain;
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

  localStorage.setItem("censoredEmail", censorEmail(email));

  window.location.href = "dashboard.html";
}
