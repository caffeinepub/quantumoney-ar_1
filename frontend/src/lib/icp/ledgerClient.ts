import { Actor, HttpAgent } from '@dfinity/agent';
import { principalToAccountIdentifier } from './account';

// Carteira A — ICP Ledger (standard mainnet ICP ledger)
const ICP_LEDGER_CANISTER_ID = '5o54h-giaaa-aaaad-aentq-cai';

const idlFactory = ({ IDL }: any) => {
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

export class ICPLedgerClient {
  private actor: any;

  constructor(agent: HttpAgent, canisterId: string = ICP_LEDGER_CANISTER_ID) {
    this.actor = Actor.createActor(idlFactory, { agent, canisterId });
  }

  async getBalance(principalId: string): Promise<bigint> {
    try {
      const { Principal } = await import('@dfinity/principal');
      const principal = Principal.fromText(principalId);
      const accountHex = principalToAccountIdentifier(principal as any);
      const accountBytes = hexToBytes(accountHex);
      const result = await this.actor.account_balance({ account: accountBytes });
      return result.e8s as bigint;
    } catch {
      return 0n;
    }
  }
}

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

export function formatE8s(e8s: bigint): string {
  const icp = Number(e8s) / 1e8;
  return icp.toFixed(4);
}

// Keep legacy export for backward compatibility
export { ICP_LEDGER_CANISTER_ID };
