const prices = {
  "Áo thun": 150000,
  "Quần jean": 350000,
  "Giày thể thao": 500000,
  "Túi xách": 250000,
  "Mũ lưỡi trai": 120000,
};

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
function calcTotal() {
  const productVal = document.getElementById("product").value;
  const qtyVal = parseInt(document.getElementById("quantity").value);

  if (!productVal || !qtyVal || qtyVal < 1) {
    document.getElementById("total-display").textContent = "0 đ";
    return;
  }

  const total = prices[productVal] * qtyVal;
  document.getElementById("total-display").textContent =
    total.toLocaleString("vi-VN") + " đ";
}

document.getElementById("product").addEventListener("change", calcTotal);
document.getElementById("quantity").addEventListener("input", calcTotal);
document.getElementById("note").addEventListener("input", function () {
  const len = this.value.length;
  const countEl = document.getElementById("char-count");
  countEl.textContent = len + "/200";

  if (len > 200) {
    countEl.classList.add("over");
    showError("note", "Ghi chú không được quá 200 ký tự.");
  } else {
    countEl.classList.remove("over");
    clearError("note");
  }
});
function validateProduct() {
  const val = document.getElementById("product").value;
  if (val === "") {
    showError("product", "Vui lòng chọn sản phẩm.");
    return false;
  }
  clearError("product");
  return true;
}

function validateQuantity() {
  const val = document.getElementById("quantity").value;
  if (val === "") {
    showError("quantity", "Vui lòng nhập số lượng.");
    return false;
  }
  const num = Number(val);
  if (!Number.isInteger(num) || num < 1 || num > 99) {
    showError("quantity", "Số lượng phải là số nguyên từ 1 đến 99.");
    return false;
  }
  clearError("quantity");
  return true;
}

function validateDeliveryDate() {
  const val = document.getElementById("delivery-date").value;
  if (val === "") {
    showError("delivery-date", "Vui lòng chọn ngày giao hàng.");
    return false;
  }

  const selected = new Date(val);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  maxDate.setHours(0, 0, 0, 0);

  if (selected < today) {
    showError("delivery-date", "Ngày giao không được là ngày trong quá khứ.");
    return false;
  }
  if (selected > maxDate) {
    showError(
      "delivery-date",
      "Ngày giao không được quá 30 ngày kể từ hôm nay.",
    );
    return false;
  }
  clearError("delivery-date");
  return true;
}

function validateAddress() {
  const val = document.getElementById("address").value.trim();
  if (val === "") {
    showError("address", "Vui lòng nhập địa chỉ giao hàng.");
    return false;
  }
  if (val.length < 10) {
    showError("address", "Địa chỉ phải có ít nhất 10 ký tự.");
    return false;
  }
  clearError("address");
  return true;
}

function validateNote() {
  const val = document.getElementById("note").value;
  if (val.length > 200) {
    showError("note", "Ghi chú không được quá 200 ký tự.");
    return false;
  }
  clearError("note");
  return true;
}

function validatePayment() {
  const selected = document.querySelector('input[name="payment"]:checked');
  if (!selected) {
    showError("payment", "Vui lòng chọn phương thức thanh toán.");
    return false;
  }
  clearError("payment");
  return true;
}
document.getElementById("product").addEventListener("blur", validateProduct);
document.getElementById("quantity").addEventListener("blur", validateQuantity);
document
  .getElementById("delivery-date")
  .addEventListener("blur", validateDeliveryDate);
document.getElementById("address").addEventListener("blur", validateAddress);
document.querySelectorAll('input[name="payment"]').forEach(function (r) {
  r.addEventListener("change", validatePayment);
});
["quantity", "address", "delivery-date"].forEach(function (id) {
  document.getElementById(id).addEventListener("input", function () {
    clearError(id);
  });
});
document.getElementById("product").addEventListener("change", function () {
  clearError("product");
});
document.getElementById("order-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const isValid =
    validateProduct() &
    validateQuantity() &
    validateDeliveryDate() &
    validateAddress() &
    validateNote() &
    validatePayment();

  if (!isValid) return;

  const product = document.getElementById("product").value;
  const quantity = document.getElementById("quantity").value;
  const date = document.getElementById("delivery-date").value;
  const address = document.getElementById("address").value.trim();
  const payment = document.querySelector('input[name="payment"]:checked').value;
  const total =
    (prices[product] * Number(quantity)).toLocaleString("vi-VN") + " đ";

  document.getElementById("cf-product").textContent = product;
  document.getElementById("cf-quantity").textContent = quantity + " cái";
  document.getElementById("cf-total").textContent = total;
  document.getElementById("cf-date").textContent = date;
  document.getElementById("cf-address").textContent = address;
  document.getElementById("cf-payment").textContent = payment;

  document.getElementById("confirm-box").style.display = "block";
  document.getElementById("confirm-box").scrollIntoView({ behavior: "smooth" });
});
document.getElementById("btn-confirm").addEventListener("click", function () {
  const product = document.getElementById("product").value;
  const total = document.getElementById("cf-total").textContent;

  document.getElementById("order-form").style.display = "none";
  document.getElementById("confirm-box").style.display = "none";

  document.getElementById("success-product").textContent = product;
  document.getElementById("success-total").textContent = total;
  document.getElementById("success-screen").style.display = "block";
});
document.getElementById("btn-cancel").addEventListener("click", function () {
  document.getElementById("confirm-box").style.display = "none";
});
