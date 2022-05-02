import "./index.scss";

const server = "http://localhost:3042";

document.getElementById("exchange-address").addEventListener('input', ({ target: { value } }) => {
  if (value === "") {
    document.getElementById("balance").innerHTML = 0;
    return;
  }

  fetch(`${server}/balance/${value}`).then((response) => {
    return response.json();
  }).then(({ balance }) => {
    document.getElementById("balance").innerHTML = balance;
  });
});

document.getElementById("generate-hash").addEventListener('click', () => {
  const sender = document.getElementById("exchange-address").value;
  const amount = document.getElementById("send-amount").value;
  const recipient = document.getElementById("recipient").value;

  const body = JSON.stringify({
    sender, amount, recipient
  });

  const request = new Request(`${server}/generateTxHash`, { method: 'POST', body });

  fetch(request, { headers: { 'Content-Type': 'application/json' } }).then(response => {
    return response.json();
  }).then(({ hash, message }) => {
    if (hash) {
      document.getElementById("tx-hash").innerHTML = hash;
    }
    if (message) {
      alert(message);
    }
  });
});

document.getElementById("submit-signature").addEventListener('click', () => {
  const sender = document.getElementById("exchange-address").value;
  const amount = document.getElementById("send-amount").value;
  const recipient = document.getElementById("recipient").value;
  const txHash = document.getElementById("tx-hash").innerHTML;
  const signature = document.getElementById("signature").value;

  const body = JSON.stringify({
    sender, amount, recipient, txHash, signature
  });

  const request = new Request(`${server}/submitSignature`, { method: 'POST', body });

  fetch(request, { headers: { 'Content-Type': 'application/json' } })
    .then(response => {
      return response.json();
    }).then(({ balance, message }) => {
      document.getElementById("balance").innerHTML = balance;
      if (message) {
        alert(message);
      }
    });
});