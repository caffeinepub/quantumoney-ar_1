import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, AlertCircle } from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';

export default function RoadmapPage() {
  return (
    <section className="py-32 px-6 bg-gradient-to-b from-gray-900 to-black min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block p-6 rounded-full bg-amber-600/20 border-2 border-amber-600 mb-6">
            <Globe className="w-16 h-16 text-amber-500" />
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-amber-500 mb-4">
            Roadmap (Conceptual)
          </h1>
          <StatusBadge status="draft" className="mb-4" />
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
            Theoretical development phases
          </p>
        </div>

        {/* Important Disclaimer */}
        <Card className="mb-12 bg-red-900/20 border-red-500/40 glass-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-red-400" />
              <CardTitle className="text-2xl font-serif text-red-400">
                No Commitments or Guarantees
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-red-200 leading-relaxed">
              This roadmap is conceptual and educational. No specific dates, commitments, or guarantees are provided. 
              All phases are subject to regulatory approval and technical feasibility. 
              No operational promises or launch dates are stated.
            </p>
          </CardContent>
        </Card>

        {/* Conceptual Phases */}
        <Card className="mb-12 bg-black/50 border-amber-500/30 glass-card">
          <CardHeader>
            <CardTitle className="text-3xl font-serif text-amber-400">
              Conceptual Development Phases
            </CardTitle>
            <StatusBadge status="draft" className="mt-2" />
          </CardHeader>
          <CardContent className="space-y-4 text-gray-300">
            <div className="p-4 bg-amber-900/10 border border-amber-500/20 rounded-lg">
              <p className="text-sm text-amber-300 italic">
                Content pending final Gold Paper. This section will outline conceptual development phases 
                without specific dates, commitments, or operational promises.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Notice */}
        <Card className="bg-black/50 border-amber-500/30 glass-card">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-amber-400 font-bold text-lg mb-2">Regulatory Compliance</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  This roadmap complies with MiCA (EU) and GDPR (EU 2016/679). 
                  No operational commitments are made. All content is educational and conceptual only.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
