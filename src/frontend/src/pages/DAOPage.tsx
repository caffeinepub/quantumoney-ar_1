import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, AlertCircle } from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';

export default function DAOPage() {
  return (
    <section className="py-32 px-6 bg-gradient-to-b from-gray-900 to-black min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block p-6 rounded-full bg-amber-600/20 border-2 border-amber-600 mb-6">
            <Users className="w-16 h-16 text-amber-500" />
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-amber-500 mb-4">
            DAO Governance
          </h1>
          <StatusBadge status="planned" className="mb-4" />
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
            Planned / Not Active
          </p>
        </div>

        {/* Critical Notice */}
        <Card className="mb-12 bg-red-900/20 border-red-500/40 glass-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-red-400" />
              <CardTitle className="text-2xl font-serif text-red-400">
                DAO Not Active
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-red-200 leading-relaxed">
              The DAO governance system is planned but not active. No voting is enabled. No proposals can be created. 
              No governance execution exists. This page provides conceptual information only for educational purposes.
            </p>
          </CardContent>
        </Card>

        {/* Conceptual Framework */}
        <Card className="mb-12 bg-black/50 border-amber-500/30 glass-card">
          <CardHeader>
            <CardTitle className="text-3xl font-serif text-amber-400">
              Conceptual Governance Framework
            </CardTitle>
            <StatusBadge status="planned" className="mt-2" />
          </CardHeader>
          <CardContent className="space-y-4 text-gray-300">
            <p className="leading-relaxed">
              The conceptual DAO governance model explores theoretical mechanisms for decentralized decision-making. 
              This framework is educational and does not represent operational governance.
            </p>
            <div className="p-4 bg-amber-900/10 border border-amber-500/20 rounded-lg">
              <p className="text-sm text-amber-300 italic">
                Content pending final Gold Paper. This section will describe conceptual governance principles 
                without asserting voting thresholds, treasury amounts, or operational parameters.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* No Interaction Elements */}
        <Card className="bg-black/50 border-amber-500/30 glass-card">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-amber-400 font-bold text-lg mb-2">No Governance Execution</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  No voting buttons, proposal forms, or governance execution UI are present. 
                  All DAO content is conceptual and informational only. 
                  Complies with MiCA (EU) and GDPR (EU 2016/679).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
