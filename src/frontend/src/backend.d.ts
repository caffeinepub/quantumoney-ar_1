import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ARSpotDistribution {
    totalDistributed: bigint;
    claimCount: bigint;
    spotId: string;
}
export interface CoordinatedPoint {
    latitude: number;
    longitude: number;
    address: string;
}
export interface LineItem {
    priceId: string;
    comment?: string;
    quantity: bigint;
}
export interface PlayerProfile {
    xp: bigint;
    nickname: string;
    level: bigint;
    capturedMonsters: Array<CapturedMonster>;
    availableTokens: bigint;
    plantedTokens: bigint;
    bonusTokens: bigint;
    registered: boolean;
    energy: bigint;
}
export interface PaymentCancelResponse {
    message: string;
    sessionId: string;
}
export interface Monster {
    name: string;
    energyBoost: bigint;
    spawnFrequency: bigint;
}
export interface CapturedMonster {
    monster: Monster;
    captureTime: bigint;
}
export interface PaymentSuccessResponse {
    message: string;
    payment: {
        status: string;
        paymentMethod: {
            last4: string;
            brand: string;
        };
        currency: string;
        amount: bigint;
    };
}
export interface CreatePaymentResponse {
    checkoutUrl: string;
    sessionId: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    adminGetPlayerCount(): Promise<bigint>;
    adminResetPlayer(user: Principal): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    captureMonster(monster: Monster): Promise<void>;
    checkout(items: Array<LineItem>): Promise<CreatePaymentResponse>;
    claimARSpot(spotId: string, qtmAmount: bigint): Promise<void>;
    getARSpotDistribution(spotId: string): Promise<ARSpotDistribution | null>;
    getAllPlayerProfiles(): Promise<Array<[Principal, PlayerProfile]>>;
    getCallerUserProfile(): Promise<PlayerProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCapturedMonsters(user: Principal): Promise<Array<CapturedMonster>>;
    getPlayerState(): Promise<PlayerProfile | null>;
    getUserProfile(user: Principal): Promise<PlayerProfile | null>;
    hasClaimedARSpot(spotId: string, user: Principal): Promise<boolean>;
    initializeAccessControl(): Promise<void>;
    initializeMerkleStorePrices(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    paymentCancel(sessionId: string): Promise<PaymentCancelResponse>;
    paymentSuccess(sessionId: string, accountId: string, caffeineCustomerId: string): Promise<PaymentSuccessResponse>;
    plantCoin(location: CoordinatedPoint): Promise<void>;
    registerPlayer(nickname: string): Promise<void>;
    rescueSingleCoin(coinId: string, playerLocation: CoordinatedPoint): Promise<void>;
    restoreEnergy(): Promise<void>;
    saveCallerUserProfile(profile: PlayerProfile): Promise<void>;
    updateXP(xpChange: bigint): Promise<void>;
}
