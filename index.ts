import { get_balance, get_delband } from "./src/dfuse";
import { Asset } from "eos-common";
import blacklist from "./blacklist-games.eos.json"

console.log("account,balance");
(async () => {
  let block_num = 109436100
  let count = 0;
  const total = new Asset("0.0000 EOS")
  for (const account of blacklist ) {
    const balance = await get_balance(account, block_num);
    const delband = await get_delband(account, block_num);
    const sum = Asset.plus( balance, delband );
    total.plus( sum );
    if (sum.amount >= 10 * 10000) {
      console.log(account + "," + Number(sum.amount) / 10000 )
      count +=1
    }
  }
  console.log(total.to_string());
  console.log(count);

  while (true) {
  }
})();