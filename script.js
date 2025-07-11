// Şifre göster/gizle
document.getElementById("show-password").addEventListener("change", function () {
  const passwordInput = document.getElementById("password");
  passwordInput.type = this.checked ? "text" : "password";
});

// Giriş / Kayıt geçiş kontrolü
const formTitle = document.getElementById("form-title");
const toggleLink = document.getElementById("toggle-link");
const form = document.getElementById("auth-form");

let isLogin = true;

toggleLink.addEventListener("click", () => {
  isLogin = !isLogin;
  formTitle.textContent = isLogin ? "Giriş Yap" : "Kayıt Ol";
  toggleLink.textContent = isLogin ? "Kayıt Ol" : "Giriş Yap";
});

// Form gönderilince
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = form.elements[0].value.trim();
  const password = form.elements[1].value.trim();

  if (!email || !password) {
    alert("E-posta ve şifre boş olamaz!");
    return;
  }

  if (isLogin) {
    // Giriş başarılı → yönlendirme (GitHub Pages uyumlu)
    console.log("Giriş başarılı → yönlendiriliyor...");
    window.location.href = "./friends.html";
  } else {
    alert("Kayıt başarılı! Şimdi giriş yapabilirsin.");
    toggleLink.click(); // Giriş moduna geç
  }
});
