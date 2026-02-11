import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins, TrendingUp, Lock, Users } from 'lucide-react';

export default function QMYTokenPage() {
  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 pt-24">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-6">
            <img
              src="/assets/generated/qtm-coin-gold-3d-transparent.dim_128x128.png"
              alt="QMY Token"
              className="w-32 h-32 drop-shadow-[0_0_30px_rgba(217,165,32,0.6)]"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-amber-500 mb-4">
            QMY Token
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The native token of the Quantumoney ecosystem, powered by Internet Computer Protocol
          </p>
        </div>

        {/* Key Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="glass-card bg-black/60 border-amber-500/50">
            <CardContent className="p-6 text-center">
              <Coins className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-amber-500 mb-2">Real Token</h3>
              <p className="text-sm text-gray-300">
                Implemented as a real canister with on-chain balances and transfers
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card bg-black/60 border-amber-500/50">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-amber-500 mb-2">Swappable</h3>
              <p className="text-sm text-gray-300">
                Exchange QMY ↔ ICP through internal swap logic
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card bg-black/60 border-amber-500/50">
            <CardContent className="p-6 text-center">
              <Lock className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-amber-500 mb-2">Secure</h3>
              <p className="text-sm text-gray-300">
                All operations authenticated via Internet Identity
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card bg-black/60 border-amber-500/50">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-amber-500 mb-2">Decentralized</h3>
              <p className="text-sm text-gray-300">
                Built on Internet Computer for true Web3 functionality
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Token Information */}
        <Card className="glass-card bg-black/60 border-amber-500/50 mb-8">
          <CardHeader>
            <CardTitle className="text-amber-500 text-2xl">Token Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-amber-400 mb-2">Symbol</h3>
                <p className="text-gray-300">QMY</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-amber-400 mb-2">Network</h3>
                <p className="text-gray-300">Internet Computer Protocol (ICP)</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-amber-400 mb-2">Type</h3>
                <p className="text-gray-300">Native Canister Token</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-amber-400 mb-2">Authentication</h3>
                <p className="text-gray-300">Internet Identity</p>
              </div>
            </div>

            <div className="pt-6 border-t border-amber-500/20">
              <h3 className="text-lg font-bold text-amber-400 mb-3">Functionality</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>Real-time balance tracking for authenticated users</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>Peer-to-peer transfers between principals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>Internal swap mechanism for QMY ↔ ICP exchanges</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>Persistent storage across canister upgrades</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Use Cases */}
        <Card className="glass-card bg-black/60 border-amber-500/50">
          <CardHeader>
            <CardTitle className="text-amber-500 text-2xl">Use Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-bold text-amber-400 mb-2">Wallet Management</h3>
                <p className="text-gray-300 text-sm">
                  Store, send, and receive QMY tokens securely through your Internet Identity
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-amber-400 mb-2">Token Swaps</h3>
                <p className="text-gray-300 text-sm">
                  Exchange QMY for ICP and vice versa using the internal swap module
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-amber-400 mb-2">Future Governance</h3>
                <p className="text-gray-300 text-sm">
                  Participate in DAO governance and ecosystem decisions (coming soon)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
