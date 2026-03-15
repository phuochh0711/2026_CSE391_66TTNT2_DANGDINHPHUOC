function showError(fieldId, message) {
  const errEl = document.getElementById("err-" + fieldId);
  errEl.textContent = message;
  errEl.classList.add("visible");

  const input = document.getElementById(fieldId);
  if (input) input.classList.add("error");
}

function clearError(fieldId) {
  const errEl = document.getElementById("err-" + fieldId);
  errEl.textContent = "";
  errEl.classList.remove("visible");

  const input = document.getElementById(fieldId);
  if (input) input.classList.remove("error");
}

function validateFullname() {
  const val = document.getElementById("fullname").value.trim();
  if (val === "") {
    showError("fullname", "Họ và tên không được để trống.");
    return false;
  }
  if (val.length < 3) {
    showError("fullname", "Họ và tên phải có ít nhất 3 ký tự.");
    return false;
  }
  if (!/^[a-zA-ZÀ-ỹ\s]+$/u.test(val)) {
    showError("fullname", "Họ và tên chỉ được chứa chữ cái và khoảng trắng.");
    return false;
  }
  clearError("fullname");
  return true;
}

function validateEmail() {
  const val = document.getElementById("email").value.trim();
  if (val === "") {
    showError("email", "Email không được để trống.");
    return false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
    showError("email", "Email không đúng định dạng (vd: ten@domain.com).");
    return false;
  }
  clearError("email");
  return true;
}

function validatePhone() {
  const val = document.getElementById("phone").value.trim();
  if (val === "") {
    showError("phone", "Số điện thoại không được để trống.");
    return false;
  }
  if (!/^0\d{9}$/.test(val)) {
    showError("phone", "Số điện thoại phải có 10 chữ số và bắt đầu bằng 0.");
    return false;
  }
  clearError("phone");
  return true;
}

function validatePassword() {
  const val = document.getElementById("password").value;
  if (val === "") {
    showError("password", "Mật khẩu không được để trống.");
    return false;
  }
  if (val.length < 8) {
    showError("password", "Mật khẩu phải có ít nhất 8 ký tự.");
    return false;
  }
  if (!/[A-Z]/.test(val)) {
    showError("password", "Mật khẩu phải có ít nhất 1 chữ hoa.");
    return false;
  }
  if (!/[a-z]/.test(val)) {
    showError("password", "Mật khẩu phải có ít nhất 1 chữ thường.");
    return false;
  }
  if (!/[0-9]/.test(val)) {
    showError("password", "Mật khẩu phải có ít nhất 1 chữ số.");
    return false;
  }
  clearError("password");
  return true;
}

function validateConfirm() {
  const pw = document.getElementById("password").value;
  const val = document.getElementById("confirm").value;
  if (val === "") {
    showError("confirm", "Vui lòng xác nhận mật khẩu.");
    return false;
  }
  if (val !== pw) {
    showError("confirm", "Mật khẩu xác nhận không khớp.");
    return false;
  }
  clearError("confirm");
  return true;
}

function validateGender() {
  const selected = document.querySelector('input[name="gender"]:checked');
  if (!selected) {
    showError("gender", "Vui lòng chọn giới tính.");
    return false;
  }
  clearError("gender");
  return true;
}

function validateTerms() {
  const checked = document.getElementById("terms").checked;
  if (!checked) {
    showError("terms", "Bạn cần đồng ý với điều khoản để tiếp tục.");
    return false;
  }
  clearError("terms");
  return true;
}
document.getElementById("fullname").addEventListener("blur", validateFullname);
document.getElementById("email").addEventListener("blur", validateEmail);
document.getElementById("phone").addEventListener("blur", validatePhone);
document.getElementById("password").addEventListener("blur", validatePassword);
document.getElementById("confirm").addEventListener("blur", validateConfirm);

document.querySelectorAll('input[name="gender"]').forEach(function (radio) {
  radio.addEventListener("change", validateGender);
});

document.getElementById("terms").addEventListener("change", validateTerms);

["fullname", "email", "phone", "password", "confirm"].forEach(function (id) {
  document.getElementById(id).addEventListener("input", function () {
    clearError(id);
  });
});

document
  .getElementById("register-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const isValid =
      validateFullname() &
      validateEmail() &
      validatePhone() &
      validatePassword() &
      validateConfirm() &
      validateGender() &
      validateTerms();
    if (!isValid) return;
    const name = document.getElementById("fullname").value.trim();
    document.getElementById("register-form").style.display = "none";
    document.getElementById("success-name").textContent = name;
    document.getElementById("success-screen").style.display = "block";
  });
