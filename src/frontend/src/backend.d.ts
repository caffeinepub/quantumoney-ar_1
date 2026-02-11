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
export interface QMYPurchaseRequest {
    tokensRequested: bigint;
    timestamp: bigint;
    buyer: Principal;
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
export interface CreatePaymentResponse {
    checkoutUrl: string;
    sessionId: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_pending {
    pending = "pending"
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
    qmy_accounts(): Promise<Array<{
        usd_balance: number;
        balance_as_of_time: bigint;
        pending_balance: bigint;
        account: Principal;
        confirmed_balance: bigint;
    }>>;
    qmy_cancel_owner_pending_native_trades_buyer(_buyer: Principal): Promise<{
        trade_id: string;
        remaining_tokens: bigint;
    }>;
    qmy_cancel_owner_pending_native_trades_buyerbywallet(_buyer: Principal): Promise<{
        trade_id: string;
        remaining_tokens: bigint;
    }>;
    qmy_cancel_owner_pending_native_trades_seller(_seller: Principal): Promise<{
        trade_id: string;
        remaining_tokens: bigint;
    }>;
    qmy_cancel_pending_split(_trade_id: string): Promise<{
        remaining_tokens: bigint;
    }>;
    qmy_cancel_purchase_request(): Promise<{
        tokens_requested: bigint;
        timestamp: bigint;
    }>;
    qmy_createOwnedSplitNativeTrade(_tokens: bigint, _price: number): Promise<{
        id: string;
        status: Variant_pending;
        seller: Principal;
        tokens: bigint;
        timestamp: bigint;
        buyer: Principal;
        price: number;
    }>;
    qmy_getActiveNativeTrades(_account: Principal): Promise<Array<Principal>>;
    qmy_getAvailableNativeTrades(_account: Principal): Promise<Array<Principal>>;
    qmy_getCreatedNativeTradeHistory(_account: Principal): Promise<Array<Principal>>;
    qmy_getNativeTradeHistory(_account: Principal): Promise<Array<Principal>>;
    qmy_get_pending_requests_by_buyer(buyer: Principal): Promise<Array<QMYPurchaseRequest>>;
    qmy_get_pending_requests_by_caller(): Promise<Array<QMYPurchaseRequest>>;
    qmy_get_purchase_request(buyer: Principal): Promise<QMYPurchaseRequest | null>;
    qmy_purchaseOwnedNFTOwnedSplitNativeTrade(_token: bigint, _wallet: Principal): Promise<{
        remaining_tokens: bigint;
        tokens_purchased: bigint;
    }>;
    qmy_purchase_identify(_tokens: bigint, _wallet: Principal): Promise<{
        tokens_purchased: bigint;
    }>;
    qmy_purchase_split(_trade_id: string, _tokens: bigint): Promise<{
        _remaining_tokens: bigint;
        tokens_purchased: bigint;
    }>;
    qmy_tokens(): Promise<Array<{
        usd_price: number;
        name: string;
        available_supply: bigint;
        symbol: string;
    }>>;
    qmy_update_purchase_request(tokens_requested: bigint): Promise<{
        tokens_requested: bigint;
        timestamp: bigint;
    }>;
    qmy_view_purchase_request(): Promise<QMYPurchaseRequest | null>;
    qmymylo_distribute_mylo(_total_tokens: bigint, _token_price_cents: number, _distributor_fee_cents: number): Promise<{
        distributor_fee: number;
        tokens_distributed: bigint;
        total_cost_cents: number;
        tokens_remaining: bigint;
    }>;
    qmymylo_distribute_qmy(_total_tokens: bigint, _token_price_cents: number, _distributor_fee_cents: number): Promise<{
        distributor_fee: number;
        tokens_distributed: bigint;
        total_cost_cents: number;
        tokens_remaining: bigint;
    }>;
    registerPlayer(nickname: string): Promise<void>;
    rescueSingleCoin(coinId: string, playerLocation: CoordinatedPoint): Promise<void>;
    restoreEnergy(): Promise<void>;
    saveCallerUserProfile(profile: PlayerProfile): Promise<void>;
    updateXP(xpChange: bigint): Promise<void>;
}
