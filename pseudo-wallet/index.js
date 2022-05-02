const secp = require('@noble/secp256k1');

//run this file locally as a psuedo-wallet to sign a transaction

//input tx hash below
const TX_HASH = '33aa1a3c22636ca1e132ed034c2b313de70aa3ecb80742cfec8fcbb034b7515b';

//input private key below
const PRIVATE_KEY = '4171bc929d5375f29409ab45df1d19a4d076f6cca0632e52751b6f425bb20514';

async function signTx() {
    //generate signature in hex
    let txSignature = await secp.sign(TX_HASH, PRIVATE_KEY);
    txSignature = secp.utils.bytesToHex(txSignature);
    //console log signature to be used for signing tx
    console.log('Tx Signature: ', txSignature);
}

signTx();