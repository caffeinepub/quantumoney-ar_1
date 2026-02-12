import { Actor, HttpAgent } from '@dfinity/agent';
import { Principal } from '@icp-sdk/core/principal';
import { principalToAccountIdentifier } from './account';

// ICP Ledger canister ID on mainnet
export const ICP_LEDGER_CANISTER_ID = 'ryjl3-tyaaa-aaaaa-aaaba-cai';

interface AccountBalanceArgs {
  account: Uint8Array;
}

/**
 * ICP Ledger Client for read-only balance queries
 */
export class ICPLedgerClient {
  private actor: any;

  constructor(agent: HttpAgent) {
    this.actor = Actor.createActor(this.createIdl(), {
      agent,
      canisterId: ICP_LEDGER_CANISTER_ID,
    });
  }

  /**
   * Get ICP balance for a principal
   */
  async getBalance(principal: Principal): Promise<bigint> {
    try {
      const accountId = principalToAccountIdentifier(principal);
      const accountBytes = this.hexToBytes(accountId);
      
      const args: AccountBalanceArgs = {
        account: accountBytes,
      };
      
      const result = await this.actor.account_balance(args);
      return result.e8s;
    } catch (error) {
      console.error('Failed to fetch ICP balance:', error);
      throw new Error('Unable to fetch ICP balance');
    }
  }

  /**
   * Convert hex string to Uint8Array
   */
  private hexToBytes(hex: string): Uint8Array {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
    }
    return bytes;
  }

  /**
   * Create IDL interface for ICP ledger
   */
  private createIdl() {
    return ({ IDL }: any) => {
      const AccountBalanceArgs = IDL.Record({
        account: IDL.Vec(IDL.Nat8),
      });
      
      const Tokens = IDL.Record({
        e8s: IDL.Nat64,
      });

      return IDL.Service({
        account_balance: IDL.Func([AccountBalanceArgs], [Tokens], ['query']),
      });
    };
  }
}

/**
 * Format ICP balance from e8s to ICP
 */
export function formatICPBalance(e8s: bigint): string {
  const divisor = BigInt(100_000_000); // 1 ICP = 10^8 e8s
  const integerPart = e8s / divisor;
  const fractionalPart = e8s % divisor;
  
  const fractionalStr = fractionalPart.toString().padStart(8, '0');
  const trimmedFractional = fractionalStr.replace(/0+$/, '');
  
  if (trimmedFractional === '') {
    return integerPart.toString();
  }
  
  return `${integerPart}.${trimmedFractional}`;
}
