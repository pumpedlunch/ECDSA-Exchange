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

for (let i = 1; i < 4; i++) {

  //generate private & public keys
  const privateKey = secp.utils.bytesToHex(secp.utils.randomPrivateKey());
  const publicKey = secp.utils.bytesToHex(secp.getPublicKey(privateKey));

  //save public key and arbitrary balance in balances[]
  balances[publicKey] = i * 50;

  //console log out account info
  console.log(`Account #${i}: \n Public Key: ${publicKey} \n Private Key: ${privateKey} \n Balance: ${balances[`${publicKey}`]}`)
}

app.get('/balance/:address', (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post('/generateTxHash', (req, res) => {
  const { sender, recipient, amount } = req.body;
  //verify valid tx
  if (!sender || !recipient) {
    res.send({ hash: 'invalid Tx' });
    return
  }
  //verify sufficient funds
  if (balances[sender] < amount) {
    res.send({ hash: 'insufficient funds' });
    return
  }

  //generate message to be hashed
  const txMessage = `send ${amount} from: ${sender} to: ${recipient}`;

  (async () => {
    //generate Tx Hash
    let txHash = await secp.utils.sha256(txMessage);
    //format Tx Hash to Hex
    txHash = secp.utils.bytesToHex(txHash);
    res.send({ hash: txHash });
  })();

});

app.post('/submitSignature', (req, res) => {
  const { sender, amount, recipient, txHash, signature } = req.body;

  //verify signature
  const verify = secp.verify(signature, txHash, sender);

  if (verify) {
    //transfer tokens
    balances[sender] -= amount;
    balances[recipient] = (balances[recipient] || 0) + +amount;
    res.send({ balance: balances[sender] });
  } else {
    res.send({ message: 'Tx failed: invalid signature' });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

//function for formating generated public key to ethereum standard 
//no longer used as secp.verify requires full public address
/* function formatPublicKeyToETH(publicKey) {
  return `0x${publicKey.slice(publicKey.length - 40)}`
} */