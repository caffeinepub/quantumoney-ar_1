import { Download, FileText, Table2, BarChart3 } from 'lucide-react';

interface DownloadData {
  totalSupply: number;
  circulatingSupply: number;
  lockedSupply: number;
  vestingSupply: number;
  burnedTokens: number;
  vestingRows: Array<{
    month: number;
    unlockDate: string;
    amountUnlocked: number;
    amountLocked: number;
    cumulativeUnlocked: number;
    percentUnlocked: number;
  }>;
  burnEntries: Array<{
    date: string;
    amount: number;
    reason: string;
    percentageRemoved: number;
  }>;
}

interface DownloadButtonsProps {
  data: DownloadData;
}

function downloadCSV(filename: string, headers: string[], rows: string[][]) {
  const csvContent = [
    headers.join(','),
    ...rows.map(r => r.map(cell => `"${cell}"`).join(',')),
  ].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function DownloadButtons({ data }: DownloadButtonsProps) {
  const handleTokenomicsCSV = () => {
    downloadCSV(
      'quantumoney-tokenomics.csv',
      ['Métrica', 'Valor', 'Percentagem'],
      [
        ['Supply Total', data.totalSupply.toString(), '100%'],
        ['Em Circulação', data.circulatingSupply.toString(), `${((data.circulatingSupply / data.totalSupply) * 100).toFixed(2)}%`],
        ['Bloqueado', data.lockedSupply.toString(), `${((data.lockedSupply / data.totalSupply) * 100).toFixed(2)}%`],
        ['Em Vesting', data.vestingSupply.toString(), `${((data.vestingSupply / data.totalSupply) * 100).toFixed(2)}%`],
        ['Queimados', data.burnedTokens.toString(), `${((data.burnedTokens / data.totalSupply) * 100).toFixed(4)}%`],
      ]
    );
  };

  const handleVestingCSV = () => {
    downloadCSV(
      'quantumoney-vesting.csv',
      ['Mês', 'Data Estimada', 'Desbloqueado', 'Bloqueado', 'Acumulado', '% Desbloqueado'],
      data.vestingRows.map(r => [
        `M${r.month}`,
        r.unlockDate,
        r.amountUnlocked.toString(),
        r.amountLocked.toString(),
        r.cumulativeUnlocked.toString(),
        `${r.percentUnlocked.toFixed(1)}%`,
      ])
    );
  };

  const handleBurnCSV = () => {
    downloadCSV(
      'quantumoney-burn-history.csv',
      ['Data', 'Quantidade Queimada', 'Motivo', '% Removida'],
      data.burnEntries.map(e => [
        e.date,
        e.amount.toString(),
        e.reason,
        `${e.percentageRemoved.toFixed(4)}%`,
      ])
    );
  };

  const handleQMYDoc = () => {
    const content = `QUANTUMONEY (QMY) – DOCUMENTO EXPLICATIVO
==========================================
Data: ${new Date().toLocaleDateString('pt-PT')}
Emitido por: HTgamers

O QUE É O QMY?
--------------
QMY é um token conceptual e educativo desenvolvido pela HTgamers no âmbito do projeto Quantumoney.
Não representa qualquer ativo financeiro real.

MODELO ECONÓMICO
----------------
Supply Total: ${data.totalSupply.toLocaleString()} QMY (conceptual)
Em Circulação: ${data.circulatingSupply.toLocaleString()} QMY
Bloqueado: ${data.lockedSupply.toLocaleString()} QMY
Em Vesting: ${data.vestingSupply.toLocaleString()} QMY
Queimados: ${data.burnedTokens.toLocaleString()} QMY

BÓNUS DE BOAS-VINDAS
--------------------
1.000 QMY por utilizador:
- 100 QMY desbloqueados imediatamente
- 900 QMY em vesting mensal (100 QMY/mês × 9 meses)
- +100 XP no primeiro login

AVISO LEGAL
-----------
O QMY NÃO é um produto financeiro.
NÃO representa investimento.
NÃO garante qualquer retorno financeiro.
Conformidade: GDPR/LGPD, MiCA (token de jogo)

Contacto: helpdesk@htgamers.pt
Website: quantumoney.app
`;
    downloadTextFile('quantumoney-explicativo.txt', content);
  };

  const buttons = [
    { label: 'Tokenomics CSV', icon: Table2, onClick: handleTokenomicsCSV, color: 'border-yellow-400/40 text-yellow-400 hover:bg-yellow-400/10' },
    { label: 'Vesting CSV', icon: BarChart3, onClick: handleVestingCSV, color: 'border-blue-400/40 text-blue-400 hover:bg-blue-400/10' },
    { label: 'Burn History CSV', icon: Table2, onClick: handleBurnCSV, color: 'border-red-400/40 text-red-400 hover:bg-red-400/10' },
    { label: 'Documento QMY', icon: FileText, onClick: handleQMYDoc, color: 'border-green-400/40 text-green-400 hover:bg-green-400/10' },
  ];

  return (
    <div className="border border-yellow-400/40 bg-black/30 backdrop-blur-md rounded-sm p-6">
      <h2 className="text-yellow-400 font-cinzel font-bold text-lg mb-4 flex items-center gap-2">
        <Download className="w-5 h-5" /> Downloads Disponíveis
      </h2>
      <p className="text-yellow-400/50 text-xs mb-4">
        Descarrega os dados públicos do Quantumoney para análise independente.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {buttons.map(btn => {
          const Icon = btn.icon;
          return (
            <button
              key={btn.label}
              onClick={btn.onClick}
              className={`flex flex-col items-center gap-2 p-3 border rounded-sm text-xs font-bold transition-colors ${btn.color}`}
            >
              <Icon className="w-5 h-5" />
              {btn.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
