// script.js
document.addEventListener("DOMContentLoaded", function () {
  // Mengecek apakah sudah ada data user di localStorage
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([])); // Inisialisasi localStorage jika belum ada data
  }

  const authContainer = document.querySelector(".auth-container");
  const signInForm = document.getElementById("signInForm");
  const signUpForm = document.getElementById("signUpForm");
  const errorMessage = document.getElementById("error-message");
  const registerError = document.getElementById("registerError");

  const showSignUp = document.getElementById("showSignUp");
  const showSignIn = document.getElementById("showSignIn");

  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  // Menampilkan form Sign Up
  showSignUp.addEventListener("click", function () {
    authContainer.classList.add("show-signup");
  });

  // Menampilkan form Sign In
  showSignIn.addEventListener("click", function () {
    authContainer.classList.remove("show-signup");
  });

  // Form Sign In
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const loginUsername = document.getElementById("loginUsername").value;
    const loginPassword = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("users"));
    const user = users.find(
      (u) => u.username === loginUsername && u.password === loginPassword
    );

    if (user) {
      errorMessage.textContent = "";
      errorMessage.style.opacity = 0;
      alert("Login berhasil! Selamat datang.");
      window.location.href = "beranda.html"; // Arahkan ke halaman beranda
    } else {
      errorMessage.textContent = "Username atau password salah!";
      errorMessage.style.opacity = 1;
    }
  });

  // Form Sign Up
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const registerUsername = document.getElementById("registerUsername").value;
    const registerPassword = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const users = JSON.parse(localStorage.getItem("users"));

    if (registerPassword !== confirmPassword) {
      registerError.textContent =
        "Password dan konfirmasi password tidak cocok!";
      return;
    }

    if (users.find((u) => u.username === registerUsername)) {
      registerError.textContent = "Username sudah digunakan!";
      return;
    }

    users.push({
      username: registerUsername,
      password: registerPassword,
    });
    localStorage.setItem("users", JSON.stringify(users));

    registerError.textContent = "";
    alert("Registrasi berhasil! Silakan login.");
    authContainer.classList.remove("show-signup");
  });
});
