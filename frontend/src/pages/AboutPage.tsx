import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Layers, AlertCircle } from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';

export default function AboutPage() {
  return (
    <section className="py-32 px-6 bg-gradient-to-b from-gray-900 to-black min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block p-6 rounded-full bg-amber-600/20 border-2 border-amber-600 mb-6">
            <Info className="w-16 h-16 text-amber-500" />
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-amber-500 mb-4">
            About Quantumoney
          </h1>
          <StatusBadge status="draft" className="mb-4" />
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
            Institutional documentation and educational resources
          </p>
        </div>

        {/* Executive Summary */}
        <Card className="mb-12 bg-black/50 border-amber-500/30 glass-card">
          <CardHeader>
            <CardTitle className="text-3xl font-serif text-amber-400">
              Executive Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-300">
            <div className="p-4 bg-amber-900/10 border border-amber-500/20 rounded-lg">
              <p className="text-sm text-amber-300 italic">
                Content pending final Gold Paper. This section will provide an executive summary of the project.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Ecosystem Overview */}
        <Card className="mb-12 bg-black/50 border-amber-500/30 glass-card">
          <CardHeader>
            <div className="flex items-center gap-4 mb-4">
              <Layers className="w-12 h-12 text-amber-500" />
              <div>
                <CardTitle className="text-3xl font-serif text-amber-400">
                  Ecosystem Overview
                </CardTitle>
                <StatusBadge status="draft" className="mt-2" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-300">
            <p className="leading-relaxed">
              The Quantumoney ecosystem consists of two separate systems:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-amber-900/10 border-2 border-amber-500/30 rounded-lg">
                <h4 className="text-amber-400 font-bold text-lg mb-3">Quantumoney.app</h4>
                <p className="text-sm mb-3">Institutional Documentation Platform</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Educational and conceptual documentation</li>
                  <li>No operational crypto features</li>
                  <li>No token issuance</li>
                  <li>No financial transactions</li>
                </ul>
              </div>

              <div className="p-6 bg-amber-900/10 border-2 border-amber-500/30 rounded-lg">
                <h4 className="text-amber-400 font-bold text-lg mb-3">QuantumoneyAR.app</h4>
                <p className="text-sm mb-3">AR Gaming Application (Separate)</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Independent gaming application</li>
                  <li>Separate backend and logic</li>
                  <li>No shared ledger</li>
                  <li>No token synchronization</li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-red-900/20 border border-red-500/40 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-red-300 font-bold mb-2">Important Clarification</h4>
                  <p className="text-red-200 text-sm leading-relaxed">
                    These systems are completely separate. No shared backend. No token synchronization. 
                    No operational connection. Quantumoney.app is for institutional documentation only.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Future Synchronization */}
        <Card className="mb-12 bg-black/50 border-amber-500/30 glass-card">
          <CardHeader>
            <CardTitle className="text-3xl font-serif text-amber-400">
              Future Synchronization (Conditional)
            </CardTitle>
            <StatusBadge status="planned" className="mt-2" />
          </CardHeader>
          <CardContent className="space-y-4 text-gray-300">
            <p className="leading-relaxed">
              While the systems are currently separate, future development may explore conditional synchronization. 
              However, any such integration would require comprehensive regulatory approval, technical implementation, 
              and clear legal frameworks.
            </p>
            <div className="p-4 bg-blue-900/20 border border-blue-500/40 rounded-lg">
              <p className="text-blue-200 text-sm">
                <strong>No commitments:</strong> No sync exists today. No tokens are issued. Players do not own transferable tokens. 
                No timelines or guarantees are provided.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
