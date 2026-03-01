import { Actor, HttpAgent } from '@dfinity/agent';
import { principalToAccountIdentifier } from './account';

// ICP Ledger canister (mainnet)
const ICP_LEDGER_CANISTER_ID = 'ryjl3-tyaaa-aaaaa-aaaba-cai';

const idlFactory = ({ IDL }: { IDL: { Vec: (t: unknown) => unknown; Nat8: unknown; Record: (fields: Record<string, unknown>) => unknown; Nat64: unknown; Func: (args: unknown[], ret: unknown[], mode: string[]) => unknown; Service: (methods: Record<string, unknown>) => unknown } }) => {
  const AccountIdentifier = IDL.Vec(IDL.Nat8);
  const Tokens = IDL.Record({ e8s: IDL.Nat64 });
  const AccountBalanceArgs = IDL.Record({ account: AccountIdentifier });

  return IDL.Service({
    account_balance: IDL.Func([AccountBalanceArgs], [Tokens], ['query']),
  });
};

export class ICPLedgerClient {
  private static instance: ICPLedgerClient | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private actor: any = null;

  private constructor() {}

  static getInstance(): ICPLedgerClient {
    if (!ICPLedgerClient.instance) {
      ICPLedgerClient.instance = new ICPLedgerClient();
    }
    return ICPLedgerClient.instance;
  }

  private async getActor() {
    if (this.actor) return this.actor;

    const agent = await HttpAgent.create({
      host: 'https://ic0.app',
    });

    this.actor = Actor.createActor(idlFactory as Parameters<typeof Actor.createActor>[0], {
      agent,
      canisterId: ICP_LEDGER_CANISTER_ID,
    });

    return this.actor;
  }

  async getBalance(principalId: string): Promise<bigint> {
    try {
      const { Principal } = await import('@dfinity/principal');
      const principal = Principal.fromText(principalId);
      const accountId = principalToAccountIdentifier(principal);
      const actor = await this.getActor();
      const result = await actor.account_balance({ account: accountId });
      return BigInt(result.e8s);
    } catch (e) {
      console.warn('ICP balance query failed:', e);
      return 0n;
    }
  }
}
