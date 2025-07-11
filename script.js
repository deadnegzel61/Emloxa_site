document.getElementById("show-password").addEventListener("change", function () {
  const passwordInput = document.getElementById("password");
  passwordInput.type = this.checked ? "text" : "password";
});

const formTitle = document.getElementById("form-title");
const toggleLink = document.getElementById("toggle-link");
const form = document.getElementById("auth-form");

let isLogin = true;

toggleLink.addEventListener("click", () => {
  isLogin = !isLogin;
  formTitle.textContent = isLogin ? "Giriş Yap" : "Kayıt Ol";
  toggleLink.textContent = isLogin ? "Kayıt Ol" : "Giriş Yap";
});

// 💥 BURASI YENİ: Giriş/Kayıt simülasyonu
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Sayfa yenilenmesini engelle
  const email = form.elements[0].value;
  const password = form.elements[1].value;

  if (!email || !password) {
    alert("E-posta ve şifre boş olamaz!");
    return;
  }

  // Giriş veya kayıt yapıldığında yönlendirme
  if (isLogin) {
    alert("Giriş başarılı! Yönlendiriliyor...");
    window.location.href = "friends.html"; // veya chat.html
  } else {
    alert("Kayıt başarılı! Giriş yapabilirsin.");
    toggleLink.click(); // Kayıt olduktan sonra giriş moduna geç
  }
});
