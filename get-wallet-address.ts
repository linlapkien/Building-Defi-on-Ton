import {
  mnemonicIndexesToBytes,
  mnemonicToWalletKey,
} from '@ton/crypto/dist/mnemonic/mnemonic';
import { WalletContractV5R1 } from '@ton/ton';

async function main() {
  const memonic =
    'judge shove climb august rotate bench twenty coconut boat organ alley kind advice like fix property story guard forum one disagree student bachelor begin';
  const key = await mnemonicToWalletKey(memonic.split(' '));
  const wallet = WalletContractV5R1.create({
    publicKey: key.publicKey,
    workChain: 0,
  });

  console.log(wallet.address.toString({ testOnly: true }));
  console.log('workchain: ', wallet.address.workChain);
}

// kQAUl3xWKXQgRa5mZGNyPz9mKRdkla1czMuyaP2My0_9Asak
//EQAUl3xWKXQgRa5mZGNyPz9mKRdkla1czMuyaP2My0_9An0u

main();
