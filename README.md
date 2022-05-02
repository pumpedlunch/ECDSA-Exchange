# ECDSA-Exchange
Chainshot Ethereum Develope Bootcamp Week 1 Project: ECDSA Exchange <br />
original repo: https://github.com/ChainShot/ECDSA-Exchange/blob/master/server/index.js<br />
<br />
Notes on Challenge 1:<br />
-I used secp library (https://github.com/paulmillr/noble-secp256k1) to create public & private keys. Originally formatted public keys to match ethereum, but removed this formatting in challenge 2 as the truncated public key did not allow for signature verification<br />
<br />
Notes on Challenge 2:<br />
-I adjusted the client to provide a Tx hash<br />
-User then signs the Tx hash locally by running the script in /pseudo-wallet which console logs a signature<br />
-The signature is then pasted into the client where it is verified to be from the sender and the Tx is completed<br />
<br />
Other:<br />
-client throws alerts for invalid Tx requests and insufficient funds
