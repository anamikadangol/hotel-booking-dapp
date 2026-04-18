import algosdk from "algosdk";

const algodClient = new algosdk.Algodv2(
  process.env.ALGORAND_TOKEN || "",
  process.env.ALGORAND_SERVER || "https://testnet-api.algonode.cloud",
  process.env.ALGORAND_PORT || ""
);

function getSenderAccount() {
  const mnemonic = process.env.ALGORAND_MNEMONIC;

  if (!mnemonic) {
    throw new Error("ALGORAND_MNEMONIC is missing in server/.env");
  }

  return algosdk.mnemonicToSecretKey(mnemonic.trim());
}

export async function sendBookingPayment(amountMicroAlgos: number) {
  const sender = getSenderAccount();
  const receiver = process.env.ALGORAND_RECEIVER_ADDRESS;

  if (!receiver) {
    throw new Error("ALGORAND_RECEIVER_ADDRESS is missing in server/.env");
  }

  const suggestedParams = await algodClient.getTransactionParams().do();

  const note = new TextEncoder().encode("Hotel booking payment");

  const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    sender: sender.addr,
    receiver: receiver.trim(),
    amount: amountMicroAlgos,
    note,
    suggestedParams,
  });

  const signedTxn = txn.signTxn(sender.sk);

  const sendResult = await algodClient.sendRawTransaction(signedTxn).do();
  const txId = sendResult.txid;

  const pendingInfo = await algosdk.waitForConfirmation(algodClient, txId, 4);

  return {
    txId,
    confirmedRound: pendingInfo.confirmedRound
      ? pendingInfo.confirmedRound.toString()
      : null,
    explorerUrl: `https://lora.algokit.io/testnet/transaction/${txId}`,
  };
}