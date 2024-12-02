// buatloginwoe.js
document.addEventListener("DOMContentLoaded", function () {
  // Fungsi untuk menampilkan form Sign In
  const signInForm = document.getElementById("signInForm");
  const signUpForm = document.getElementById("signUpForm");
  const errorMessage = document.getElementById("error-message");
  const registerError = document.getElementById("registerError");
  const authContainer = document.getElementById("auth-container");

  const showSignUp = document.getElementById("showSignUp");
  const showSignIn = document.getElementById("showSignIn");

  // Mengecek apakah sudah ada data user di localStorage
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([])); // Inisialisasi localStorage jika belum ada data
  }

  // Form Sign In
  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const loginUsername = document.getElementById("loginUsername").value;
    const loginPassword = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("users"));
    const user = users.find(
      (u) => u.username === loginUsername && u.password === loginPassword
    );

    if (user) {
      // Jika ditemukan, login berhasil
      errorMessage.textContent = "";
      alert("Login berhasil! Selamat datang di Auto Ace.");
      window.location.href = "index.html"; // Arahkan ke halaman home
    } else {
      // Jika login gagal
      errorMessage.textContent = "Username atau password salah!";
    }
  });

  // Form Sign Up
  const registerForm = document.getElementById("registerForm");
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const registerUsername = document.getElementById("registerUsername").value;
    const registerPassword = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const users = JSON.parse(localStorage.getItem("users"));

    // Validasi jika password dan confirm password tidak cocok
    if (registerPassword !== confirmPassword) {
      registerError.textContent =
        "Password dan konfirmasi password tidak cocok!";
      return;
    }

    // Validasi jika username sudah terdaftar
    if (users.find((u) => u.username === registerUsername)) {
      registerError.textContent = "Username sudah digunakan!";
      return;
    }

    // Simpan data pengguna baru
    users.push({
      username: registerUsername,
      password: registerPassword,
    });
    localStorage.setItem("users", JSON.stringify(users));

    registerError.textContent = "";
    alert("Registrasi berhasil! Silakan login.");
    showSignInForm();
  });

  // Menampilkan form Sign Up
  showSignUp.addEventListener("click", function () {
    signInForm.style.display = "none";
    signUpForm.style.display = "block";
  });

  // Menampilkan form Sign In
  showSignIn.addEventListener("click", function () {
    signUpForm.style.display = "none";
    signInForm.style.display = "block";
  });

  // Fungsi untuk menampilkan form Sign In
  function showSignInForm() {
    signUpForm.style.display = "none";
    signInForm.style.display = "block";
  }
});
