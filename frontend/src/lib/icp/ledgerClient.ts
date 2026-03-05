import { Actor, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

const ICP_LEDGER_CANISTER_ID = 'ryjl3-tyaaa-aaaaa-aaaba-cai';

const icpIdlFactory = ({ IDL }: { IDL: any }) => {
  const AccountIdentifier = IDL.Vec(IDL.Nat8);
  const Tokens = IDL.Record({ e8s: IDL.Nat64 });
  return IDL.Service({
    account_balance: IDL.Func(
      [IDL.Record({ account: AccountIdentifier })],
      [Tokens],
      ['query']
    ),
  });
};

function principalToAccountId(principal: Principal): Uint8Array {
  const principalBytes = principal.toUint8Array();
  const padding = new Uint8Array(32 - principalBytes.length);
  const accountBytes = new Uint8Array(32);
  accountBytes.set(padding);
  accountBytes.set(principalBytes, padding.length);
  return accountBytes;
}

export class ICPLedgerClient {
  private static instance: ICPLedgerClient;
  private actor: any;

  private constructor() {
    const agent = new HttpAgent({ host: 'https://ic0.app' });
    this.actor = Actor.createActor(icpIdlFactory, {
      agent,
      canisterId: ICP_LEDGER_CANISTER_ID,
    });
  }

  static getInstance(): ICPLedgerClient {
    if (!ICPLedgerClient.instance) {
      ICPLedgerClient.instance = new ICPLedgerClient();
    }
    return ICPLedgerClient.instance;
  }

  async getBalance(principalId: string): Promise<bigint> {
    try {
      const principal = Principal.fromText(principalId);
      const accountId = principalToAccountId(principal);
      const result = await this.actor.account_balance({ account: accountId });
      return result.e8s as bigint;
    } catch {
      return BigInt(0);
    }
  }
}
