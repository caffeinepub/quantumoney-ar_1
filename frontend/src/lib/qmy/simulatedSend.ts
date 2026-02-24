import { Principal } from '@dfinity/principal';

export interface SimulatedSendResult {
  success: boolean;
  error?: string;
  txHash?: string;
}

export async function simulateSend(
  destination: string,
  amount: number,
  availableBalance: number
): Promise<SimulatedSendResult> {
  await new Promise(resolve => setTimeout(resolve, 1500));

  if (!destination || destination.trim().length === 0) {
    return {
      success: false,
      error: 'Destination principal is required',
    };
  }

  try {
    Principal.fromText(destination);
  } catch {
    return {
      success: false,
      error: 'Invalid principal format',
    };
  }

  if (amount <= 0) {
    return {
      success: false,
      error: 'Amount must be greater than zero',
    };
  }

  if (amount > availableBalance) {
    return {
      success: false,
      error: `Insufficient balance. Available: ${availableBalance.toFixed(2)} QMY`,
    };
  }

  const randomSuccess = Math.random() > 0.1;

  if (randomSuccess) {
    return {
      success: true,
      txHash: `sim_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    };
  } else {
    return {
      success: false,
      error: 'Simulated network error (random failure for testing)',
    };
  }
}
