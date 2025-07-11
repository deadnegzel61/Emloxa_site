document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("auth-form");
  const toggleLink = document.getElementById("toggle-link");
  const formTitle = document.getElementById("form-title");
  const showPassword = document.getElementById("show-password");
  const usernameInput = document.getElementById("username");

  let isLogin = true;

  showPassword.addEventListener("change", () => {
    const passwordInput = document.getElementById("password");
    passwordInput.type = showPassword.checked ? "text" : "password";
  });

  toggleLink.addEventListener("click", () => {
    isLogin = !isLogin;
    formTitle.textContent = isLogin ? "Giriş Yap" : "Kayıt Ol";
    toggleLink.textContent = isLogin ? "Kayıt Ol" : "Giriş Yap";
  });

  function generateUniqueCode(name, users) {
    // 0001 - 9999 arası kod üretip benzersiz yapacak
    for (let i = 1; i <= 9999; i++) {
      const code = i.toString().padStart(4, "0");
      const username = `${name}#${code}`;
      if (!users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
        return code;
      }
    }
    return null; // Kod bulunamazsa
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = usernameInput.value.trim();
    const email = form.elements[1].value.trim();
    const password = form.elements[2].value.trim();

    if (!name || !email || !password) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users") || "[]");

    if (!isLogin) {
      // Kayıt modu: isim sadece harf ve rakamlardan oluşsun, boşluk olmasın (istersen regex'i değiştirebilirsin)
      if (!/^[a-zA-Z0-9]+$/.test(name)) {
        alert("Kullanıcı adı sadece harf ve rakamlardan oluşmalı, boşluk veya özel karakter yok.");
        return;
      }

      // Kullanıcı adı + # + kod benzersiz olmalı
      const code = generateUniqueCode(name, users);
      if (!code) {
        alert("Maalesef, benzersiz kullanıcı kodu bulunamadı.");
        return;
      }

      const username = `${name}#${code}`;

      users.push({ username, email, password });
      localStorage.setItem("users", JSON.stringify(users));

      alert(`Kayıt başarılı! Kullanıcı adınız: ${username}`);
      toggleLink.click(); // Giriş moduna geç
      form.reset();
      return;
    }

    // Giriş modu
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

    if (!user) {
      alert("E-posta veya şifre yanlış.");
      return;
    }

    localStorage.setItem("activeUser", JSON.stringify(user));
    window.location.href = "./home.html";
  });
});
