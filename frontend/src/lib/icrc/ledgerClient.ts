import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from './icrc.idl';

// QMY Ledger canister — Carteira A
const QMY_LEDGER_CANISTER_ID = '5o54h-giaaa-aaaad-aentq-cai';

export class ICRCLedgerClient {
  private static instance: ICRCLedgerClient | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private actor: any = null;

  private constructor() {}

  static getInstance(): ICRCLedgerClient {
    if (!ICRCLedgerClient.instance) {
      ICRCLedgerClient.instance = new ICRCLedgerClient();
    }
    return ICRCLedgerClient.instance;
  }

  private async getActor() {
    if (this.actor) return this.actor;

    const agent = await HttpAgent.create({
      host: 'https://ic0.app',
    });

    this.actor = Actor.createActor(idlFactory, {
      agent,
      canisterId: QMY_LEDGER_CANISTER_ID,
    });

    return this.actor;
  }

  async getBalance(principalId: string): Promise<bigint> {
    try {
      const { Principal } = await import('@dfinity/principal');
      const actor = await this.getActor();
      const principal = Principal.fromText(principalId);
      const result = await actor.icrc1_balance_of({
        owner: principal,
        subaccount: [],
      });
      return BigInt(result);
    } catch (e) {
      console.warn('QMY balance query failed:', e);
      return 0n;
    }
  }
}
