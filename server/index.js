const express = require('express');
const app = express();
const cors = require('cors');
const port = 3042;

// localhost can have cross origin errors
// depending on the browser you use!
app.use(cors());
app.use(express.json());

<<<<<<< Updated upstream
const balances = {
  "1": 100,
  "2": 50,
  "3": 75,
}

=======

//generate 3 public keys with balances
const balances = {};

for(let i = 1; i < 4; i++) {
  //generate public key in hex

  const privateKey = secp.utils.randomPrivateKey();
  const publicKey = formatPublicKeyToETH(secp.utils.bytesToHex(secp.getPublicKey(privateKey)));

  //save address and arbitrary balance in balances
  balances[`${publicKey}`] = i * 50;

  //console log out account info
  console.log(`Account #${i}: \n Public Key: ${publicKey} \n Private Key: ${privateKey} \n Balance: ${balances[`${publicKey}`]}`)
}

console.log(balances);

function formatPublicKeyToETH(publicKey) {
  return `0x${publicKey.substring((publicKey.length - 41), (publicKey.length -1))}`
}

>>>>>>> Stashed changes
app.get('/balance/:address', (req, res) => {
  const {address} = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post('/send', (req, res) => {
  const {sender, recipient, amount, senderPrivateKey} = req.body;
  if(formatPublicKeyToETH(secp.getPublicKey(senderPrivateKey)) !== sender) {
    console.log('invalid private key');
    return
  }
  if(balances[sender] < amount) {
    console.log('insufficient funds')
    return
  }
  balances[sender] -= amount;
  balances[recipient] = (balances[recipient] || 0) + +amount;
  res.send({ balance: balances[sender] });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
