import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Server, Database, Link2, Coins, Building2, GitBranch, Package } from 'lucide-react';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';

interface CanisterInfo {
  id: string;
  name: string;
  function: string;
  icon: React.ReactNode;
}

const UNIFIED_CANISTERS: CanisterInfo[] = [
  {
    id: 'crjop-jyaaa-aaaah-atfaq-cai',
    name: 'Frontend / UI',
    function: 'Controle de páginas e interface',
    icon: <Package className="w-5 h-5" />
  },
  {
    id: 'ckmsk-taaaa-aaaah-atfca-cai',
    name: 'Game Logic / Perfil / Progressão',
    function: 'XP, moedas QMY/ICP, monstros capturados',
    icon: <Coins className="w-5 h-5" />
  },
  {
    id: 'nemlr-6aaaa-aaaan-q32la-cai',
    name: 'Governance / Treasury',
    function: 'Distribuição de bónus e recompensas',
    icon: <Building2 className="w-5 h-5" />
  },
  {
    id: 'ippxc-5iaaa-aaaae-qgwqq-cai',
    name: 'Perfil Principal / UserID Unificado',
    function: 'Sincronização real site ↔ app',
    icon: <Server className="w-5 h-5" />
  },
  {
    id: 'x5shd-hqaaa-aaaap-qrdgq-cai',
    name: 'DAO / Armazém de Dados',
    function: 'Histórico de transações, ações de jogadores',
    icon: <Database className="w-5 h-5" />
  },
  {
    id: 'i7nyb-2yaaa-aaaaj-qowiq-cai',
    name: 'Bridge / Integração',
    function: 'Comunicação entre canisters adicionais',
    icon: <Link2 className="w-5 h-5" />
  },
  {
    id: 'lkawl-3qaaa-aaaac-qdsoq-cai',
    name: 'Canister Extra / Dados Complementares',
    function: 'Dados complementares do jogo',
    icon: <GitBranch className="w-5 h-5" />
  }
];

export default function CanisterArchitecturePanel() {
  const { identity } = useInternetIdentity();

  const principalId = identity?.getPrincipal().toString() || 'Not authenticated';
  const isAuthenticated = identity && !identity.getPrincipal().isAnonymous();

  // UserID is derived from Principal - in the backend, each Principal is mapped to a unique UserID
  // For display purposes, we show a simplified representation
  const userIdDisplay = isAuthenticated 
    ? `UID-${principalId.slice(0, 8)}...${principalId.slice(-8)}`
    : 'Not available';

  return (
    <div className="space-y-6">
      {/* Identity Information */}
      <Card className="glass-card border-primary/30">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-3">
            <Server className="w-6 h-6" />
            Informação de Identidade
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Principal ID:</span>
              <Badge variant="outline" className="border-primary/40 text-primary font-mono text-xs">
                {isAuthenticated ? 'Authenticated' : 'Guest'}
              </Badge>
            </div>
            <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-xs font-mono text-primary break-all">
                {principalId}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">UserID Interno:</span>
              <Badge variant="outline" className="border-primary/40 text-primary text-xs">
                Unified ID
              </Badge>
            </div>
            <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-xs font-mono text-primary">
                {userIdDisplay}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-primary/20">
            <p className="text-xs text-muted-foreground leading-relaxed">
              O UserID interno é gerado automaticamente a partir do Principal e garante sincronização 
              entre Quantumoney.app e QuantumoneyAR.app. Todos os dados (perfil, progressão, moedas, bónus) 
              são armazenados usando o UserID como chave primária.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Unified Canister Architecture */}
      <Card className="glass-card border-primary/30">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-3">
            <Database className="w-6 h-6" />
            Arquitetura Unificada de Canisters
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Todos os canisters ativos utilizados pelo site e aplicação QuantumoneyAR.app
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            {UNIFIED_CANISTERS.map((canister, index) => (
              <div
                key={canister.id}
                className="p-4 bg-primary/5 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-primary">
                    {canister.icon}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-semibold text-primary text-sm">
                        {canister.name}
                      </h4>
                      <Badge variant="outline" className="border-primary/40 text-primary text-xs shrink-0">
                        #{index + 1}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {canister.function}
                    </p>
                    <div className="pt-2">
                      <p className="text-xs font-mono text-primary/80 break-all bg-background/50 p-2 rounded border border-primary/10">
                        {canister.id}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-amber-900/10 rounded-lg border border-amber-900/30">
            <p className="text-xs text-amber-300 leading-relaxed">
              <strong>Nota:</strong> Todos os dados de perfil, progressão, moedas QMY/ICP e bónus 
              são acessíveis através desta arquitetura unificada de canisters. O sistema utiliza o 
              UserID interno como identificador primário, garantindo sincronização entre domínios 
              diferentes (Quantumoney.app ↔ QuantumoneyAR.app).
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Data Accessibility Confirmation */}
      <Card className="glass-card border-primary/30">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-3">
            <Coins className="w-6 h-6" />
            Confirmação de Acessibilidade de Dados
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs font-semibold text-primary">Perfil de Jogador</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Acessível via UserID interno
              </p>
            </div>

            <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs font-semibold text-primary">Progressão (XP/Level)</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Armazenado com UserID como chave
              </p>
            </div>

            <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs font-semibold text-primary">Moedas (QMY/ICP)</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Disponíveis, plantadas e bónus
              </p>
            </div>

            <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs font-semibold text-primary">Bónus e Recompensas</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Distribuição via canister governance
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-primary/20">
            <p className="text-xs text-muted-foreground">
              Todas as operações de dados utilizam o UserID interno como identificador primário. 
              O Principal não é utilizado diretamente como chave de armazenamento, garantindo 
              sincronização cross-domain.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
