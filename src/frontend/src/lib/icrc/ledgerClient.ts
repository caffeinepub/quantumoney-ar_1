import { Actor, HttpAgent } from '@dfinity/agent';
import { Principal } from '@icp-sdk/core/principal';
import { idlFactory as icrcIdlFactory } from './icrc.idl';

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

/**
 * ICRC-1 Ledger Client for read-only queries
 */
export class ICRCLedgerClient {
  private actor: any;
  private canisterId: string;

  constructor(canisterId: string, agent: HttpAgent) {
    this.canisterId = canisterId;
    this.actor = Actor.createActor(icrcIdlFactory, {
      agent,
      canisterId,
    });
  }

  /**
   * Get token metadata (name, symbol, decimals)
   */
  async getMetadata(): Promise<ICRCLedgerMetadata> {
    try {
      const [name, symbol, decimals] = await Promise.all([
        this.actor.icrc1_name(),
        this.actor.icrc1_symbol(),
        this.actor.icrc1_decimals(),
      ]);

      return {
        name: name || 'Unknown',
        symbol: symbol || 'UNKNOWN',
        decimals: Number(decimals) || 8,
      };
    } catch (error) {
      console.error('Failed to fetch ICRC metadata:', error);
      throw new Error('Unable to fetch token metadata');
    }
  }

  /**
   * Get balance for a specific account (principal)
   */
  async getBalance(owner: Principal): Promise<bigint> {
    try {
      const account = {
        owner,
        subaccount: [],
      };
      const balance = await this.actor.icrc1_balance_of(account);
      return balance;
    } catch (error) {
      console.error('Failed to fetch ICRC balance:', error);
      throw new Error('Unable to fetch balance');
    }
  }

  /**
   * Get balance with metadata in one call
   */
  async getBalanceWithMetadata(owner: Principal): Promise<ICRCBalance> {
    try {
      const [balance, metadata] = await Promise.all([
        this.getBalance(owner),
        this.getMetadata(),
      ]);

      return {
        balance,
        decimals: metadata.decimals,
        symbol: metadata.symbol,
      };
    } catch (error) {
      console.error('Failed to fetch balance with metadata:', error);
      throw error;
    }
  }
}

/**
 * Format balance from raw units to human-readable format
 */
export function formatBalance(balance: bigint, decimals: number): string {
  const divisor = BigInt(10 ** decimals);
  const integerPart = balance / divisor;
  const fractionalPart = balance % divisor;
  
  const fractionalStr = fractionalPart.toString().padStart(decimals, '0');
  const trimmedFractional = fractionalStr.replace(/0+$/, '');
  
  if (trimmedFractional === '') {
    return integerPart.toString();
  }
  
  return `${integerPart}.${trimmedFractional}`;
}
