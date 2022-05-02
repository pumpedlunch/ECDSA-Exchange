const secp = require('@noble/secp256k1');

//run this file locally as a psuedo-wallet to sign a transaction

//input tx hash below
const TX_HASH = '';

//input private key below
const PRIVATE_KEY = '';

async function signTx() {
    //generate signature in hex
    let txSignature = await secp.sign(TX_HASH, PRIVATE_KEY);
    txSignature = secp.utils.bytesToHex(txSignature);
    //console log signature to be used for signing tx
    console.log('Tx Signature: ', txSignature);
}

signTx();