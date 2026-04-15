import algosdk from "algosdk";

const algodServer =
  process.env.ALGORAND_SERVER || "https://testnet-api.algonode.cloud";
const algodToken = process.env.ALGORAND_TOKEN || "";
const algodPort = process.env.ALGORAND_PORT || "";

const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

export async function saveBookingProofOnChain(
  bookingProof: string
): Promise<string> {
  const mnemonic = process.env.ALGORAND_MNEMONIC;
  const receiver = process.env.ALGORAND_RECEIVER_ADDRESS;

  if (!mnemonic || !receiver) {
    throw new Error("Algorand environment variables are missing");
  }

  const senderAccount = algosdk.mnemonicToSecretKey(mnemonic);

  const suggestedParams = await algodClient.getTransactionParams().do();

  const note = new TextEncoder().encode(bookingProof);

  const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    sender: senderAccount.addr,
    receiver,
    amount: 1000,
    note,
    suggestedParams,
  });

  const signedTxn = txn.signTxn(senderAccount.sk);
  const response = await algodClient.sendRawTransaction(signedTxn).do();

  const txId = response.txid;

  await waitForConfirmation(txId);

  return txId;
}

async function waitForConfirmation(txId: string): Promise<void> {
  const status = await algodClient.status().do();
  let lastRound = status.lastRound;

  while (true) {
    const pendingInfo = await algodClient.pendingTransactionInformation(txId).do();

    if (
      pendingInfo.confirmedRound !== undefined &&
      pendingInfo.confirmedRound > 0n
    ) {
      return;
    }

    lastRound++;
    await algodClient.statusAfterBlock(lastRound).do();
  }
}