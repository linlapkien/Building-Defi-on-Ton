import { getHttpEndpoint } from '@orbs-network/ton-access';
import { mnemonicToWalletKey } from '@ton/crypto';
import { internal, toNano, TonClient, WalletContractV5R1 } from '@ton/ton';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout);
}

async function main() {
  const memonic =
    'judge shove climb august rotate bench twenty coconut boat organ alley kind advice like fix property story guard forum one disagree student bachelor begin';
  const key = await mnemonicToWalletKey(memonic.split(' '));
  const wallet = WalletContractV5R1.create({
    publicKey: key.publicKey,
    workChain: 0,
  });

  const endpoint = await getHttpEndpoint({ network: 'testnet' });
  const client = new TonClient({ endpoint });

  if (!(await client.isContractDeployed(wallet.address))) {
    return console.log('wallet is not deployed');
  }

  const walletContract = client.open(wallet);
  const seqno = await walletContract.getSeqno();

  await walletContract.sendTransfer({
    secretKey: key.secretKey,
    seqno: seqno,
    messages: [
      internal({
        to: 'EQAQlYCcZn_9_dizmW7KGvAyVgK6hcG8QQxIz3QiMp5BSGSX',
        value: toNano('0.05'),
        body: 'Hello',
        bounce: false,
      }),
    ],
  });

  let currentSeqno = seqno;
  while (currentSeqno == seqno) {
    console.log('waiting for transaction to confirm ...');
    sleep(1500);
    currentSeqno = await walletContract.getSeqno();
  }

  console.log('transaction confirmed!');
}

main();
