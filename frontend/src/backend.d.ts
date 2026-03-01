import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
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
export interface PlayerProfile {
    xp: bigint;
    nickname: string;
    photoUrl?: ExternalBlob;
    level: bigint;
    capturedMonsters: Array<CapturedMonster>;
    availableTokens: bigint;
    plantedTokens: bigint;
    bonusTokens: bigint;
    registered: boolean;
    energy: bigint;
}
export interface PlantedCoin {
    plantTime: bigint;
    owner: Principal;
    location: CoordinatedPoint;
}
export interface MapMarker {
    id: string;
    latitude: number;
    description: string;
    longitude: number;
    markerType: Variant_coin_monster;
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
export interface CapturedMonster {
    monster: Monster;
    captureTime: bigint;
}
export interface ARSpotClaim {
    claimTime: bigint;
    claimedBy: Principal;
    spotId: string;
    qtmAmount: bigint;
}
export interface QMYPurchaseRequest {
    tokensRequested: bigint;
    timestamp: bigint;
    buyer: Principal;
}
export interface DailyLimits {
    rescuesToday: bigint;
    plantsToday: bigint;
    lastResetTime: bigint;
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
export interface ChatMessage {
    content: string;
    authorName: string;
    sender: Principal;
    timestamp: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_coin_monster {
    coin = "coin",
    monster = "monster"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getARSpotClaims(): Promise<Array<ARSpotClaim>>;
    getARSpotDistributions(): Promise<Array<ARSpotDistribution>>;
    getCallerUserProfile(): Promise<PlayerProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getChatMessages(): Promise<Array<ChatMessage>>;
    getMapMarkers(): Promise<Array<MapMarker>>;
    getPlantedCoins(): Promise<Array<PlantedCoin>>;
    getPlayerByAddress(addr: Principal): Promise<PlayerProfile | null>;
    getPlayerDailyLimits(): Promise<DailyLimits>;
    getQMYPurchaseRequest(): Promise<QMYPurchaseRequest | null>;
    getUserProfile(user: Principal): Promise<PlayerProfile | null>;
    initializeAccessControl(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    paymentCancel(sessionId: string): Promise<PaymentCancelResponse>;
    paymentSuccess(sessionId: string, accountId: string, caffeineCustomerId: string): Promise<PaymentSuccessResponse>;
    saveCallerUserProfile(profile: PlayerProfile): Promise<void>;
    sendChatMessage(content: string): Promise<void>;
    submitQMYPurchaseRequest(request: QMYPurchaseRequest): Promise<void>;
    updatePlayerDailyLimits(plantsToday: bigint, rescuesToday: bigint): Promise<void>;
    updateProfile(nickname: string, photoUrl: ExternalBlob | null): Promise<void>;
}
