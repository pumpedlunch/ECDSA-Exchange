const secp = require('@noble/secp256k1');
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3042;


// localhost can have cross origin errors
// depending on the browser you use!
app.use(cors());
app.use(express.json());


//generate 3 public keys with balances
const balances = {};

for(let i = 1; i < 4; i++) {

  //generate private & public keys
  const privateKey = secp.utils.bytesToHex(secp.utils.randomPrivateKey());
  const publicKey = formatPublicKeyToETH(secp.utils.bytesToHex(secp.getPublicKey(privateKey)));

  //save public key and arbitrary balance in balances[]
  balances[publicKey] = i * 50;

  //console log out account info
  console.log(`Account #${i}: \n Public Key: ${publicKey} \n Private Key: ${privateKey} \n Balance: ${balances[`${publicKey}`]}`)
}

//function for formating generated public key to ethereum standard
function formatPublicKeyToETH(publicKey) {
  return `0x${publicKey.slice(publicKey.length - 40)}`
}

app.get('/balance/:address', (req, res) => {
  const {address} = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post('/send', (req, res) => {
  const {sender, recipient, amount, senderPrivateKey} = req.body;
  //derive ethereum formated public key (privateKeyCheck) from provided private key
  const privateKeyCheck = formatPublicKeyToETH(
    secp.utils.bytesToHex(
      secp.getPublicKey(senderPrivateKey)));
  //compare privateKeycheck matches public key
  if(privateKeyCheck !== sender) {
    console.log('invalid private key');
    return
  }
  //verify account has sufficent funds
  if(balances[sender] < amount) {
    console.log('insufficient funds')
    return
  }
  //transfer tokens
  balances[sender] -= amount;
  balances[recipient] = (balances[recipient] || 0) + +amount;
  res.send({ balance: balances[sender] });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});