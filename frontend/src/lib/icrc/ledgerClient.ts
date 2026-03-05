import { Actor, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { idlFactory } from './icrc.idl';

const QMY_LEDGER_CANISTER_ID = '5o54h-giaaa-aaaad-aentq-cai';

export class ICRCLedgerClient {
  private static instance: ICRCLedgerClient;
  private actor: any;

  private constructor() {
    const agent = new HttpAgent({ host: 'https://ic0.app' });
    this.actor = Actor.createActor(idlFactory, {
      agent,
      canisterId: QMY_LEDGER_CANISTER_ID,
    });
  }

  static getInstance(): ICRCLedgerClient {
    if (!ICRCLedgerClient.instance) {
      ICRCLedgerClient.instance = new ICRCLedgerClient();
    }
    return ICRCLedgerClient.instance;
  }

  async getBalance(principalId: string): Promise<bigint> {
    try {
      const principal = Principal.fromText(principalId);
      const result = await this.actor.icrc1_balance_of({
        owner: principal,
        subaccount: [],
      });
      return result as bigint;
    } catch {
      return BigInt(0);
    }
  }
}
