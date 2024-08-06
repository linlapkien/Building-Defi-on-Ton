import { getHttpEndpoint } from '@orbs-network/ton-access';
import { mnemonicToWalletKey } from '@ton/crypto';
import { fromNano, TonClient, WalletContractV5R1 } from '@ton/ton';

async function main() {
  const memonic =
    'judge shove climb august rotate bench twenty coconut boat organ alley kind advice like fix property story guard forum one disagree student bachelor begin';
  const key = await mnemonicToWalletKey(memonic.split(' '));
  const wallet = WalletContractV5R1.create({
    publicKey: key.publicKey,
    workChain: 0,
  });

  console.log(wallet.address.toString({ testOnly: true }));

  const endpoint = await getHttpEndpoint({ network: 'testnet' });
  const client = new TonClient({ endpoint });

  const balance = await client.getBalance(wallet.address);
  console.log('balance: ', fromNano(balance));

  const walletContract = client.open(wallet);
  const seqno = await walletContract.getSeqno();
  console.log('seqno', seqno);
}

main();
