# ECDSA-Exchange
Chainshot Ethereum Develope Bootcamp Week 1 Project: ECDSA Exchange
original repo: https://github.com/ChainShot/ECDSA-Exchange/blob/master/server/index.js

Notes on Challenge 1:
-I used secp library (https://github.com/paulmillr/noble-secp256k1) to create public & private keys. Originally formatted public keys to match ethereum, but removed this formatting in challenge 2 as the truncated public key did not allow for signature verification

Notes on Challenge 2:
-I adjusted the client to provide a Tx hash
-User then signs the Tx hash locally by running the script in /pseudo-wallet which console logs a signature
-The signature is then pasted into the client where it is verified to be from the sender and the Tx is completed

Other:
-client throws alerts for invalid Tx requests and insufficient funds
