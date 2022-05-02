# ECDSA-Exchange
Chainshot Ethereum Develope Bootcamp Week 1 Project: ECDSA Exchange <br />
original repo: https://github.com/ChainShot/ECDSA-Exchange/blob/master/server/index.js<br />
<br />
Notes on Challenge 1:<br />
-I used secp library (https://github.com/paulmillr/noble-secp256k1) to create public & private keys. I originally formatted public keys to match ethereum, but removed this formatting in challenge 2 as the truncated public key did not work with my way of verifying the tx<br />
<br />
Notes on Challenge 2:<br />
-I adjusted the client to provide a Tx hash<br />
-User then signs the Tx hash locally by pasting the Tx hash and their private key into /pseudo-wallet/index.js and running the script locally to console log a signature<br />
-The signature is then pasted into the client. The server verifies the signature is from the sender and matches the current tx info and if so completes the tx<br />
<br />
Other:<br />
-client throws alerts for invalid Tx requests and insufficient funds<br />
<br />
Issues with solution:<br />
-Txs could be replayed as there is no nonce counter included in the hash