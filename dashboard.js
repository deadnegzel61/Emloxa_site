const email = localStorage.getItem("session") || sessionStorage.getItem("session");
if (!email) {
  window.location.href = "index.html";
} else {
  document.getElementById("user-email").textContent = email;
}

function logout() {
  localStorage.removeItem("session");
  sessionStorage.removeItem("session");
  window.location.href = "index.html";
}
