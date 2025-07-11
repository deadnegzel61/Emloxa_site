document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll("nav ul.tabs li.tab");
  const iframe = document.getElementById("page-frame");
  const profileInfo = document.getElementById("profile-info");

  const activeUser = JSON.parse(localStorage.getItem("activeUser"));

  if (!activeUser) {
    alert("Giriş yapmalısın!");
    window.location.href = "./index.html";
    return;
  }

  profileInfo.textContent = activeUser.username;

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      iframe.src = tab.getAttribute("data-page");
    });
  });
});
