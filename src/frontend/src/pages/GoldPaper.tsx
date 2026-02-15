import { FileText, Shield, BookOpen, Target, Zap, Coins, Layers, Globe, Users, Scale, Cpu, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PageShell from '@/components/PageShell';
import Container from '@/components/Container';
import { PageTitle } from '@/components/Typography';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function GoldPaper() {
  const tokenomicsData = [
    { category: 'Total Supply', value: '1,000,000,000 QMY', percentage: '100%' },
    { category: 'Presale', value: '150,000,000 QMY', percentage: '15%' },
    { category: 'Liquidity', value: '200,000,000 QMY', percentage: '20%' },
    { category: 'Team & Advisors', value: '150,000,000 QMY', percentage: '15%' },
    { category: 'Treasury', value: '300,000,000 QMY', percentage: '30%' },
    { category: 'Community', value: '200,000,000 QMY', percentage: '20%' },
  ];

  return (
    <PageShell>
      <Container>
        <div className="py-12 space-y-8">
          <div className="space-y-3">
            <PageTitle icon={<FileText className="w-12 h-12" />}>
              Gold Paper
            </PageTitle>
            <Badge variant="outline" className="border-amber-500/40 text-amber-500">
              Draft / Educational
            </Badge>
            <p className="text-primary text-lg">
              Institutional documentation outlining the conceptual framework of the Quantumoney (QMY) ecosystem.
            </p>
          </div>

          <Card className="glass-card border-red-900/30 bg-red-900/10">
            <CardContent className="p-6 flex items-start gap-4">
              <Shield className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-red-300 font-bold text-lg mb-2">Educational & Institutional Document</h3>
                <p className="text-red-200 text-sm leading-relaxed">
                  This Gold Paper is a conceptual and educational resource. It does not constitute a financial product, 
                  investment offering, or operational implementation. No tokens are issued or distributed. No real purchase 
                  or transaction flows are active. All content is informational only and complies with MiCA (EU) and GDPR regulations.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/30">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-3">
                <BookOpen className="w-6 h-6" />
                Table of Contents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-primary">
              <div className="grid md:grid-cols-2 gap-2">
                <a href="#vision" className="hover:text-primary/80 transition-colors">1. Vision & Mission</a>
                <a href="#purpose" className="hover:text-primary/80 transition-colors">2. Purpose & Problem Statement</a>
                <a href="#tokenomics" className="hover:text-primary/80 transition-colors">3. QMY Token Logic (Conceptual)</a>
                <a href="#ecosystem" className="hover:text-primary/80 transition-colors">4. Ecosystem Overview</a>
                <a href="#distribution" className="hover:text-primary/80 transition-colors">5. Strategic Distribution</a>
                <a href="#roadmap" className="hover:text-primary/80 transition-colors">6. High-Level Roadmap</a>
                <a href="#governance" className="hover:text-primary/80 transition-colors">7. Governance Principles</a>
                <a href="#technical" className="hover:text-primary/80 transition-colors">8. Technical Architecture</a>
                <a href="#legal" className="hover:text-primary/80 transition-colors">9. Legal & Compliance</a>
              </div>
            </CardContent>
          </Card>

          <div id="tokenomics" className="scroll-mt-20">
            <Card className="glass-card border-primary/30">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-3xl text-primary flex items-center gap-3">
                    <Coins className="w-7 h-7" />
                    3. QMY Token Logic (Conceptual)
                  </CardTitle>
                  <Badge variant="outline" className="border-amber-500/40 text-amber-500">Draft</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="glass-card p-4 border-amber-900/30 bg-amber-900/10">
                  <p className="text-amber-300 text-sm">
                    <strong>Important:</strong> The following describes a conceptual token model for educational purposes. 
                    No QMY tokens are issued or distributed. No real purchase or transaction flows are active.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="glass-card border-primary/30">
                    <CardHeader>
                      <CardTitle className="text-primary flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Supply Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <p className="text-muted-foreground text-sm">Total Supply</p>
                          <p className="text-3xl font-bold text-primary">1B QMY</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-sm">Circulating (Simulated)</p>
                          <p className="text-2xl font-bold text-primary">350M QMY</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card border-primary/30">
                    <CardHeader>
                      <CardTitle className="text-primary">Distribution Chart</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                      <img
                        src="/assets/generated/distribution-pie-chart.dim_500x500.png"
                        alt="Distribution Chart"
                        className="w-full max-w-xs"
                      />
                    </CardContent>
                  </Card>
                </div>

                <Card className="glass-card border-primary/30">
                  <CardHeader>
                    <CardTitle className="text-primary">Tokenomics Breakdown (Simulated)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow className="border-primary/20">
                          <TableHead className="text-primary">Category</TableHead>
                          <TableHead className="text-primary">Allocation</TableHead>
                          <TableHead className="text-primary text-right">Percentage</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tokenomicsData.map((row, index) => (
                          <TableRow key={index} className="border-primary/10">
                            <TableCell className="text-primary font-medium">{row.category}</TableCell>
                            <TableCell className="text-primary">{row.value}</TableCell>
                            <TableCell className="text-primary text-right">{row.percentage}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>

          <div id="ecosystem" className="scroll-mt-20">
            <Card className="glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="text-3xl text-primary flex items-center gap-3">
                  <Layers className="w-7 h-7" />
                  4. Ecosystem Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-primary leading-relaxed">
                  The Quantumoney ecosystem consists of two distinct and separate systems:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="glass-card border-primary/30">
                    <CardHeader>
                      <CardTitle className="text-primary">Quantumoney.app</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-primary mb-3">Institutional Documentation Platform</p>
                      <ul className="list-disc list-inside space-y-2 text-sm text-primary">
                        <li>Conceptual documentation and educational resources</li>
                        <li>No operational crypto features</li>
                        <li>No token issuance or financial transactions</li>
                        <li>MiCA and GDPR compliance information</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="glass-card border-primary/30">
                    <CardHeader>
                      <CardTitle className="text-primary">QuantumoneyAR.app</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-primary mb-3">AR Gaming Application (Separate System)</p>
                      <ul className="list-disc list-inside space-y-2 text-sm text-primary">
                        <li>Independent gaming application</li>
                        <li>No shared ledger with institutional site</li>
                        <li>No token synchronization</li>
                        <li>Separate backend and game logic</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card className="glass-card border-red-900/30 bg-red-900/10">
                  <CardContent className="p-4">
                    <h4 className="text-red-300 font-bold mb-2">Critical Clarification</h4>
                    <p className="text-red-200 text-sm leading-relaxed">
                      These two systems are completely separate with no shared backend, no token synchronization, and no 
                      operational connection. The institutional site provides educational documentation only. Visual alignment 
                      is aesthetic only (layout, colors, HUD, windows, footer).
                    </p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </PageShell>
  );
}
