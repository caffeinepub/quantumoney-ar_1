import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from './icrc.idl';

// Carteira A — QMY Logic/Ledger canister
const QMY_LEDGER_CANISTER_ID = 'ckmsk-taaaa-aaaah-atfca-cai';

export interface ICRCLedgerMetadata {
  name: string;
  symbol: string;
  decimals: number;
}

export interface ICRCBalance {
  balance: bigint;
  decimals: number;
  symbol: string;
}

export class ICRCLedgerClient {
  private actor: any;

  constructor(agent: HttpAgent, canisterId: string = QMY_LEDGER_CANISTER_ID) {
    this.actor = Actor.createActor(idlFactory, { agent, canisterId });
  }

  async getBalance(principalId: string): Promise<bigint> {
    try {
      const { Principal } = await import('@dfinity/principal');
      const principal = Principal.fromText(principalId);
      const result = await this.actor.icrc1_balance_of({
        owner: principal,
        subaccount: [],
      });
      return result as bigint;
    } catch {
      return 0n;
    }
  }

  async getMetadata(): Promise<ICRCLedgerMetadata> {
    try {
      const [name, symbol, decimals] = await Promise.all([
        this.actor.icrc1_name(),
        this.actor.icrc1_symbol(),
        this.actor.icrc1_decimals(),
      ]);
      return {
        name: name || 'QMY',
        symbol: symbol || 'QMY',
        decimals: Number(decimals) || 8,
      };
    } catch {
      return { name: 'QMY', symbol: 'QMY', decimals: 8 };
    }
  }

  async getBalanceWithMetadata(principalId: string): Promise<ICRCBalance> {
    const [balance, metadata] = await Promise.all([
      this.getBalance(principalId),
      this.getMetadata(),
    ]);
    return { balance, decimals: metadata.decimals, symbol: metadata.symbol };
  }
}

export function formatBalance(balance: bigint, decimals = 8): string {
  const divisor = Math.pow(10, decimals);
  return (Number(balance) / divisor).toFixed(decimals);
}

export function formatICRC1(amount: bigint, decimals = 8): string {
  return formatBalance(amount, decimals);
}
