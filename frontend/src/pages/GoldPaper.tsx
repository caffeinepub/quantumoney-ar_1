import { FileText, Shield, BookOpen, Target, Zap, Coins, Layers, Globe, Users, Scale, Cpu } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatusBadge from '@/components/StatusBadge';

export default function GoldPaper() {
  return (
    <section className="py-20 px-6 bg-black min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block p-6 rounded-full bg-amber-600/20 border-2 border-amber-600 mb-8">
            <FileText className="w-16 h-16 text-amber-500" />
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-amber-500 mb-6">
            Gold Paper
          </h1>
          <StatusBadge status="draft" className="mb-6" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Institutional documentation outlining the conceptual framework of the Quantumoney (QMY) ecosystem.
          </p>
        </div>

        <Card className="glass-card bg-red-900/20 border-red-500/40 mb-12">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-red-300 font-bold text-lg mb-2">Educational &amp; Institutional Document</h3>
                <p className="text-red-200 text-sm leading-relaxed">
                  This Gold Paper is a conceptual and educational resource. It does not constitute a financial product,
                  investment offering, or operational implementation. No tokens are issued or distributed. No real purchase
                  or transaction flows are active. All content is informational only and complies with MiCA (EU) and GDPR regulations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card bg-black/40 border-amber-500/30 mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-amber-500 flex items-center gap-3">
              <BookOpen className="w-6 h-6" />
              Table of Contents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-300">
            <div className="grid md:grid-cols-2 gap-2">
              <a href="#vision" className="hover:text-amber-400 transition-colors">1. Vision &amp; Mission</a>
              <a href="#purpose" className="hover:text-amber-400 transition-colors">2. Purpose &amp; Problem Statement</a>
              <a href="#tokenomics" className="hover:text-amber-400 transition-colors">3. QMY Token Logic (Conceptual)</a>
              <a href="#ecosystem" className="hover:text-amber-400 transition-colors">4. Ecosystem Overview</a>
              <a href="#distribution" className="hover:text-amber-400 transition-colors">5. Strategic Distribution</a>
              <a href="#roadmap" className="hover:text-amber-400 transition-colors">6. High-Level Roadmap</a>
              <a href="#governance" className="hover:text-amber-400 transition-colors">7. Governance Principles</a>
              <a href="#technical" className="hover:text-amber-400 transition-colors">8. Technical Architecture</a>
              <a href="#legal" className="hover:text-amber-400 transition-colors">9. Legal &amp; Compliance</a>
            </div>
          </CardContent>
        </Card>

        <div id="vision" className="mb-12 scroll-mt-20">
          <Card className="glass-card bg-black/40 border-amber-500/30">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-3xl text-amber-500 flex items-center gap-3">
                  <Target className="w-7 h-7" />
                  1. Vision &amp; Mission
                </CardTitle>
                <StatusBadge status="draft" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div className="p-4 bg-amber-900/10 border border-amber-500/20 rounded-lg">
                <p className="text-sm text-amber-300 italic">
                  Content pending final Gold Paper. This section will describe the project's vision and mission.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div id="purpose" className="mb-12 scroll-mt-20">
          <Card className="glass-card bg-black/40 border-amber-500/30">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-3xl text-amber-500 flex items-center gap-3">
                  <Zap className="w-7 h-7" />
                  2. Purpose &amp; Problem Statement
                </CardTitle>
                <StatusBadge status="draft" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div className="p-4 bg-amber-900/10 border border-amber-500/20 rounded-lg">
                <p className="text-sm text-amber-300 italic">
                  Content pending final Gold Paper. This section will describe the purpose and problem statement.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div id="tokenomics" className="mb-12 scroll-mt-20">
          <Card className="glass-card bg-black/40 border-amber-500/30">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-3xl text-amber-500 flex items-center gap-3">
                  <Coins className="w-7 h-7" />
                  3. QMY Token Logic (Conceptual)
                </CardTitle>
                <StatusBadge status="draft" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div className="p-4 bg-amber-900/10 border border-amber-500/20 rounded-lg">
                <p className="text-sm text-amber-300 italic">
                  Content pending final Gold Paper. This section will describe the QMY token conceptual framework.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div id="ecosystem" className="mb-12 scroll-mt-20">
          <Card className="glass-card bg-black/40 border-amber-500/30">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-3xl text-amber-500 flex items-center gap-3">
                  <Layers className="w-7 h-7" />
                  4. Ecosystem Overview
                </CardTitle>
                <StatusBadge status="draft" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div className="p-4 bg-amber-900/10 border border-amber-500/20 rounded-lg">
                <p className="text-sm text-amber-300 italic">
                  Content pending final Gold Paper. This section will describe the ecosystem overview.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div id="distribution" className="mb-12 scroll-mt-20">
          <Card className="glass-card bg-black/40 border-amber-500/30">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-3xl text-amber-500 flex items-center gap-3">
                  <Globe className="w-7 h-7" />
                  5. Strategic Distribution
                </CardTitle>
                <StatusBadge status="draft" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div className="p-4 bg-amber-900/10 border border-amber-500/20 rounded-lg">
                <p className="text-sm text-amber-300 italic">
                  Content pending final Gold Paper. This section will describe the strategic distribution.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div id="roadmap" className="mb-12 scroll-mt-20">
          <Card className="glass-card bg-black/40 border-amber-500/30">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-3xl text-amber-500 flex items-center gap-3">
                  <Target className="w-7 h-7" />
                  6. High-Level Roadmap
                </CardTitle>
                <StatusBadge status="draft" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div className="p-4 bg-amber-900/10 border border-amber-500/20 rounded-lg">
                <p className="text-sm text-amber-300 italic">
                  Content pending final Gold Paper. This section will describe the high-level roadmap.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div id="governance" className="mb-12 scroll-mt-20">
          <Card className="glass-card bg-black/40 border-amber-500/30">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-3xl text-amber-500 flex items-center gap-3">
                  <Users className="w-7 h-7" />
                  7. Governance Principles
                </CardTitle>
                <StatusBadge status="draft" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div className="p-4 bg-amber-900/10 border border-amber-500/20 rounded-lg">
                <p className="text-sm text-amber-300 italic">
                  Content pending final Gold Paper. This section will describe governance principles.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div id="technical" className="mb-12 scroll-mt-20">
          <Card className="glass-card bg-black/40 border-amber-500/30">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-3xl text-amber-500 flex items-center gap-3">
                  <Cpu className="w-7 h-7" />
                  8. Technical Architecture
                </CardTitle>
                <StatusBadge status="draft" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div className="p-4 bg-amber-900/10 border border-amber-500/20 rounded-lg">
                <p className="text-sm text-amber-300 italic">
                  Content pending final Gold Paper. This section will describe the technical architecture.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div id="legal" className="mb-12 scroll-mt-20">
          <Card className="glass-card bg-black/40 border-amber-500/30">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-3xl text-amber-500 flex items-center gap-3">
                  <Scale className="w-7 h-7" />
                  9. Legal &amp; Compliance
                </CardTitle>
                <StatusBadge status="draft" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div className="p-4 bg-amber-900/10 border border-amber-500/20 rounded-lg">
                <p className="text-sm text-amber-300 italic">
                  Content pending final Gold Paper. This section will describe legal and compliance framework.
                </p>
              </div>
              <p className="text-sm text-gray-400">
                For documentation, visit{' '}
                <a href="/docs" className="text-amber-500 hover:underline font-medium">
                  the Docs section
                </a>.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
