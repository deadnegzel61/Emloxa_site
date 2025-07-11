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
