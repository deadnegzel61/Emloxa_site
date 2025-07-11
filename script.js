document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("auth-form");
  const toggleLink = document.getElementById("toggle-link");
  const formTitle = document.getElementById("form-title");
  const showPassword = document.getElementById("show-password");
  const usernameInput = document.getElementById("username");

  let isLogin = true;

  showPassword.addEventListener("change", function () {
    const passwordInput = document.getElementById("password");
    passwordInput.type = this.checked ? "text" : "password";
  });

  toggleLink.addEventListener("click", () => {
    isLogin = !isLogin;
    formTitle.textContent = isLogin ? "Giriş Yap" : "Kayıt Ol";
    toggleLink.textContent = isLogin ? "Kayıt Ol" : "Giriş Yap";
    usernameInput.style.display = isLogin ? "none" : "block";
  });

  // Başlangıçta kullanıcı adı input gizli, kayıt modunda açılır
  usernameInput.style.display = "none";

  // Kullanıcılar localStorage'da burada tutulacak:
  // Format: [{ username: "MahmutSami#1234", email, password }]
  let users = JSON.parse(localStorage.getItem("users") || "[]");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = form.elements[1].value.trim();
    const password = form.elements[2].value.trim();
    const username = usernameInput.value.trim();

    if (!email || !password || (!isLogin && !username)) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    if (!isLogin) {
      // Kayıt modu: kullanıcı adı benzersiz olmalı
      if (!/^.+#\d{4}$/.test(username)) {
        alert("Kullanıcı adı formatı yanlış. Örnek: MahmutSami#1234");
        return;
      }
      if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
        alert("Bu kullanıcı adı zaten alınmış.");
        return;
      }

      users.push({ username, email, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Kayıt başarılı! Giriş yapabilirsiniz.");
      toggleLink.click();
      form.reset();
      usernameInput.style.display = "none";
      return;
    }

    // Giriş modu:
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) {
      alert("E-posta veya şifre yanlış.");
      return;
    }

    // Başarılı giriş → kullanıcı bilgilerini localStorage'da kaydet (aktif kullanıcı)
    localStorage.setItem("activeUser", JSON.stringify(user));
    window.location.href = "./friends.html";
  });
});
