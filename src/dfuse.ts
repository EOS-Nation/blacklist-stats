import { client } from "./config";
import { Asset } from "eos-common";

export async function get_balance( account: string, block_num: number ) {
  try {
    const result = await get_state_table_row<{balance: string}>( "eosio.token", account, "accounts", "EOS", block_num );
    return new Asset( result.balance );
  } catch {
    return new Asset("0.0000 EOS");
  }
}

export async function get_delband( account: string, block_num: number ) {
  try {
    const result = await get_state_table_row<{cpu_weight: string, net_weight: string }>( "eosio", account, "delband", account, block_num );
    const cpu = new Asset( result.cpu_weight )
    const net = new Asset( result.net_weight )
    return Asset.plus( cpu, net );
  } catch {
    return new Asset("0.0000 EOS")
  }
}

export async function get_state_table_row<T>(code: string, scope: string, table: string, primaryKey: string, block_num: number) {
  try {
    const { row } = await client.stateTableRow<T>(code, scope, table, primaryKey, {blockNum: block_num, json: true } );
    if (!row.json) throw new Error(primaryKey + " `primaryKey` not found");
    return row.json;
  } catch (e) {
    throw new Error(`missing ${code}:${scope}:${table}:${primaryKey}`);
  }
}
