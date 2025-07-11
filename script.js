document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("auth-form");
  const toggleLink = document.getElementById("toggle-link");
  const formTitle = document.getElementById("form-title");
  const showPassword = document.getElementById("show-password");

  let isLogin = true;

  showPassword.addEventListener("change", function () {
    const passwordInput = document.getElementById("password");
    passwordInput.type = this.checked ? "text" : "password";
  });

  toggleLink.addEventListener("click", () => {
    isLogin = !isLogin;
    formTitle.textContent = isLogin ? "Giriş Yap" : "Kayıt Ol";
    toggleLink.textContent = isLogin ? "Kayıt Ol" : "Giriş Yap";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = form.elements[0].value.trim();
    const password = form.elements[1].value.trim();

    if (!email || !password) {
      alert("E-posta ve şifre boş olamaz!");
      return;
    }

    if (isLogin) {
      window.location.href = "https://deadnegzel61.github.io/Emloxa_site/friends.html";
    } else {
      alert("Kayıt başarılı! Şimdi giriş yapabilirsin.");
      toggleLink.click();
    }
  });
});
