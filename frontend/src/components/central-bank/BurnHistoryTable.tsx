import { Flame } from 'lucide-react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';

interface BurnEntry {
  date: string;
  amount: number;
  reason: string;
  percentageRemoved: number;
}

interface BurnHistoryTableProps {
  entries: BurnEntry[];
  totalSupply: number;
}

export default function BurnHistoryTable({ entries, totalSupply }: BurnHistoryTableProps) {
  const totalBurned = entries.reduce((s, e) => s + e.amount, 0);

  return (
    <div className="border border-yellow-400/40 bg-black/30 backdrop-blur-md rounded-sm p-6">
      <h2 className="text-yellow-400 font-cinzel font-bold text-lg mb-2 flex items-center gap-2">
        <Flame className="w-5 h-5 text-red-400" /> Histórico de Queima (Burn)
      </h2>
      <p className="text-yellow-400/50 text-xs mb-4">
        Total queimado: <span className="text-red-400 font-bold">{totalBurned.toLocaleString()} QMY</span>
        {totalSupply > 0 && (
          <span className="ml-2">({((totalBurned / totalSupply) * 100).toFixed(4)}% do supply total)</span>
        )}
      </p>

      {entries.length === 0 ? (
        <p className="text-yellow-400/40 text-sm text-center py-6">Nenhuma queima registada ainda.</p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-yellow-400/20 hover:bg-transparent">
                <TableHead className="text-yellow-400/70 text-xs">Data</TableHead>
                <TableHead className="text-yellow-400/70 text-xs text-right">Quantidade</TableHead>
                <TableHead className="text-yellow-400/70 text-xs">Motivo</TableHead>
                <TableHead className="text-yellow-400/70 text-xs text-right">% Removida</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry, i) => (
                <TableRow key={i} className="border-yellow-400/10 hover:bg-yellow-400/5">
                  <TableCell className="text-yellow-400/60 text-xs">{entry.date}</TableCell>
                  <TableCell className="text-red-400 text-xs text-right font-bold">
                    -{entry.amount.toLocaleString()} QMY
                  </TableCell>
                  <TableCell className="text-yellow-300/70 text-xs">{entry.reason}</TableCell>
                  <TableCell className="text-red-400/80 text-xs text-right">
                    {entry.percentageRemoved.toFixed(4)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
