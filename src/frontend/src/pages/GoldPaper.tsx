import { FileText, Shield, BookOpen, Target, Zap, Coins, Layers, Globe, Users, Scale, Cpu } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@tanstack/react-router';
import StatusBadge from '@/components/StatusBadge';
import GoldPaperUniverseVisualization from '@/components/gold-paper/GoldPaperUniverseVisualization';

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
                <h3 className="text-red-300 font-bold text-lg mb-2">Educational & Institutional Document</h3>
                <p className="text-red-200 text-sm leading-relaxed">
                  This Gold Paper is a conceptual and educational resource. It does not constitute a financial product, 
                  investment offering, or operational implementation. No tokens are issued or distributed. 
                  All content is informational only and complies with MiCA (EU) and GDPR regulations.
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
              <a href="#vision" className="hover:text-amber-400 transition-colors">1. Vision & Mission</a>
              <a href="#purpose" className="hover:text-amber-400 transition-colors">2. Purpose & Problem Statement</a>
              <a href="#tokenomics" className="hover:text-amber-400 transition-colors">3. QMY Token Logic (Conceptual)</a>
              <a href="#ecosystem" className="hover:text-amber-400 transition-colors">4. Ecosystem Overview</a>
              <a href="#distribution" className="hover:text-amber-400 transition-colors">5. Strategic Distribution</a>
              <a href="#roadmap" className="hover:text-amber-400 transition-colors">6. High-Level Roadmap</a>
              <a href="#governance" className="hover:text-amber-400 transition-colors">7. Governance Principles</a>
              <a href="#technical" className="hover:text-amber-400 transition-colors">8. Technical Architecture</a>
              <a href="#legal" className="hover:text-amber-400 transition-colors">9. Legal & Compliance</a>
            </div>
          </CardContent>
        </Card>

        <div id="vision" className="mb-12 scroll-mt-20">
          <Card className="glass-card bg-black/40 border-amber-500/30">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-3xl text-amber-500 flex items-center gap-3">
                  <Target className="w-7 h-7" />
                  1. Vision & Mission
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
                  2. Purpose & Problem Statement
                </CardTitle>
                <StatusBadge status="draft" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div className="p-4 bg-amber-900/10 border border-amber-500/20 rounded-lg">
                <p className="text-sm text-amber-300 italic">
                  Content pending final Gold Paper. This section will outline the purpose and problem statement.
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
              <div className="p-4 bg-blue-900/20 border border-blue-500/40 rounded-lg mb-4">
                <p className="text-blue-200 text-sm">
                  <strong>Important:</strong> The following describes a conceptual token model for educational purposes. 
                  No QMY tokens are issued or distributed.
                </p>
              </div>
              <div className="p-4 bg-amber-900/10 border border-amber-500/20 rounded-lg">
                <p className="text-sm text-amber-300 italic">
                  Content pending final Gold Paper. This section will describe the conceptual token logic without asserting specific parameters.
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
              <p className="leading-relaxed">
                The Quantumoney ecosystem consists of two distinct and separate systems:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="p-6 bg-amber-900/10 border-2 border-amber-500/30 rounded-lg">
                  <h4 className="text-amber-400 font-bold text-lg mb-3">Quantumoney.app</h4>
                  <p className="text-sm mb-3">Institutional Documentation Platform</p>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Conceptual documentation and educational resources</li>
                    <li>No operational crypto features</li>
                    <li>No token issuance or financial transactions</li>
                    <li>MiCA and GDPR compliance information</li>
                  </ul>
                </div>

                <div className="p-6 bg-amber-900/10 border-2 border-amber-500/30 rounded-lg">
                  <h4 className="text-amber-400 font-bold text-lg mb-3">QuantumoneyAR.app</h4>
                  <p className="text-sm mb-3">AR Gaming Application (Separate System)</p>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Independent gaming application</li>
                    <li>No shared ledger with institutional site</li>
                    <li>No token synchronization</li>
                    <li>Separate backend and game logic</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-red-900/20 border border-red-500/40 rounded-lg">
                <h4 className="text-red-300 font-bold mb-2">Critical Clarification</h4>
                <p className="text-red-200 text-sm leading-relaxed">
                  These two systems are completely separate with no shared backend, no token synchronization, and no 
                  operational connection. The institutional site provides educational documentation only.
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
                  5. Strategic Distribution (600M QMY)
                </CardTitle>
                <StatusBadge status="draft" />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <GoldPaperUniverseVisualization />
            </CardContent>
          </Card>
        </div>

        <div id="roadmap" className="mb-12 scroll-mt-20">
          <Card className="glass-card bg-black/40 border-amber-500/30">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-3xl text-amber-500 flex items-center gap-3">
                  <Globe className="w-7 h-7" />
                  6. High-Level Roadmap (Conceptual)
                </CardTitle>
                <StatusBadge status="draft" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div className="p-4 bg-blue-900/20 border border-blue-500/40 rounded-lg mb-4">
                <p className="text-blue-200 text-sm">
                  <strong>Note:</strong> This roadmap is conceptual. No specific dates, commitments, 
                  or guarantees are provided.
                </p>
              </div>
              <div className="p-4 bg-amber-900/10 border border-amber-500/20 rounded-lg">
                <p className="text-sm text-amber-300 italic">
                  Content pending final Gold Paper. This section will outline conceptual development phases without commitments.
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
                  Content pending final Gold Paper. This section will describe conceptual governance principles.
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
                  9. Legal & Compliance
                </CardTitle>
                <StatusBadge status="draft" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div className="p-4 bg-blue-900/20 border border-blue-500/40 rounded-lg">
                <p className="text-blue-200 text-sm leading-relaxed">
                  This document complies with MiCA (EU Markets in Crypto-Assets Regulation) and GDPR (EU 2016/679). 
                  No tokens are issued. No financial products are offered. All content is educational only.
                </p>
              </div>
              <div className="p-4 bg-amber-900/10 border border-amber-500/20 rounded-lg">
                <p className="text-sm text-amber-300 italic">
                  Content pending final Gold Paper. This section will provide legal and compliance information.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="glass-card bg-black/40 border-amber-500/30">
          <CardContent className="p-8 text-center">
            <BookOpen className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h3 className="text-2xl font-serif font-bold text-amber-500 mb-4">
              Explore More Documentation
            </h3>
            <p className="text-gray-300 mb-6">
              Visit the Documentation Hub for additional resources and information
            </p>
            <Link to="/docs">
              <button className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors">
                Go to Documentation Hub
              </button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
