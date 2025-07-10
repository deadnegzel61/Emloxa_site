function showMessage(text, color = "red") {
  const message = document.getElementById("message");
  message.textContent = text;
  message.style.color = color;
}

function signup() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) return showMessage("Alanlar boş olamaz!");
  if (!email.includes("@")) return showMessage("Geçerli bir e-posta girin (@ şart)");

  const users = JSON.parse(localStorage.getItem("users") || "{}");
  if (users[email]) return showMessage("Bu e-posta zaten kayıtlı.");

  users[email] = { password };
  localStorage.setItem("users", JSON.stringify(users));
  showMessage("✅ Kayıt başarılı. Giriş yapabilirsiniz.", "green");
}

function censorEmail(email) {
  const [name, domain] = email.split('@');
  const visible = name.length > 2 ? name.slice(0, 2) + '****' : name[0] + '****';
  return visible + '@' + domain;
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

  // 🚫 Artık mesaj gösterilmiyor, direkt yönlendirme
  window.location.href = "dashboard.html";
}
