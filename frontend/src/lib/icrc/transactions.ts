import { Actor, HttpAgent } from '@dfinity/agent';
import { Principal } from '@icp-sdk/core/principal';

export interface Transaction {
  kind: 'transfer' | 'mint' | 'burn';
  timestamp: bigint;
  amount: bigint;
  from?: Principal;
  to?: Principal;
  memo?: Uint8Array;
}

interface GetTransactionsResponse {
  transactions: Array<{
    kind: { transfer?: null; mint?: null; burn?: null };
    timestamp: bigint;
    amount: bigint;
    from?: { owner: Principal; subaccount?: Uint8Array[] };
    to?: { owner: Principal; subaccount?: Uint8Array[] };
    memo?: Uint8Array[];
  }>;
}

/**
 * Attempt to query ICRC-1 transactions
 * Returns null if method is not supported
 */
export async function queryICRCTransactions(
  canisterId: string,
  agent: HttpAgent,
  account: Principal,
  limit: number = 10
): Promise<Transaction[] | null> {
  try {
    const actor = Actor.createActor(createTransactionsIdl(), {
      agent,
      canisterId,
    });

    // Try to call icrc1_transactions
    const result = await actor.icrc1_transactions({
      account: {
        owner: account,
        subaccount: [],
      },
      start: [],
      length: BigInt(limit),
    }) as GetTransactionsResponse;

    // Parse and return transactions
    return result.transactions.map((tx) => {
      let kind: 'transfer' | 'mint' | 'burn' = 'transfer';
      if ('mint' in tx.kind) kind = 'mint';
      else if ('burn' in tx.kind) kind = 'burn';

      return {
        kind,
        timestamp: tx.timestamp,
        amount: tx.amount,
        from: tx.from?.owner,
        to: tx.to?.owner,
        memo: tx.memo ? tx.memo[0] : undefined,
      };
    });
  } catch (error: any) {
    // Method not supported or other error
    console.warn('icrc1_transactions not supported:', error.message);
    return null;
  }
}

/**
 * Create IDL for transactions query
 */
function createTransactionsIdl() {
  return ({ IDL }: any) => {
    const Subaccount = IDL.Vec(IDL.Nat8);
    const Account = IDL.Record({
      owner: IDL.Principal,
      subaccount: IDL.Opt(Subaccount),
    });

    const Transaction = IDL.Record({
      kind: IDL.Variant({
        transfer: IDL.Null,
        mint: IDL.Null,
        burn: IDL.Null,
      }),
      timestamp: IDL.Nat64,
      amount: IDL.Nat,
      from: IDL.Opt(Account),
      to: IDL.Opt(Account),
      memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    });

    const GetTransactionsRequest = IDL.Record({
      account: Account,
      start: IDL.Opt(IDL.Nat),
      length: IDL.Nat,
    });

    const GetTransactionsResponse = IDL.Record({
      transactions: IDL.Vec(Transaction),
    });

    return IDL.Service({
      icrc1_transactions: IDL.Func(
        [GetTransactionsRequest],
        [GetTransactionsResponse],
        ['query']
      ),
    });
  };
}
