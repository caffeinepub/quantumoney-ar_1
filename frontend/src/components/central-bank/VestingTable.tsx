import { Calendar } from 'lucide-react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';

interface VestingRow {
  month: number;
  unlockDate: string;
  amountUnlocked: number;
  amountLocked: number;
  cumulativeUnlocked: number;
  percentUnlocked: number;
}

interface VestingTableProps {
  rows: VestingRow[];
}

export default function VestingTable({ rows }: VestingTableProps) {
  return (
    <div className="border border-yellow-400/40 bg-black/30 backdrop-blur-md rounded-sm p-6">
      <h2 className="text-yellow-400 font-cinzel font-bold text-lg mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5" /> Calendário de Vesting
      </h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-yellow-400/20 hover:bg-transparent">
              <TableHead className="text-yellow-400/70 text-xs">Mês</TableHead>
              <TableHead className="text-yellow-400/70 text-xs">Data Estimada</TableHead>
              <TableHead className="text-yellow-400/70 text-xs text-right">Desbloqueado</TableHead>
              <TableHead className="text-yellow-400/70 text-xs text-right">Bloqueado</TableHead>
              <TableHead className="text-yellow-400/70 text-xs text-right">Acumulado</TableHead>
              <TableHead className="text-yellow-400/70 text-xs text-right">%</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.month} className="border-yellow-400/10 hover:bg-yellow-400/5">
                <TableCell className="text-yellow-300 text-xs font-bold">M{row.month}</TableCell>
                <TableCell className="text-yellow-400/60 text-xs">{row.unlockDate}</TableCell>
                <TableCell className="text-green-400 text-xs text-right font-bold">
                  +{row.amountUnlocked.toLocaleString()}
                </TableCell>
                <TableCell className="text-orange-400 text-xs text-right">
                  {row.amountLocked.toLocaleString()}
                </TableCell>
                <TableCell className="text-yellow-400 text-xs text-right font-bold">
                  {row.cumulativeUnlocked.toLocaleString()}
                </TableCell>
                <TableCell className="text-xs text-right">
                  <span className="text-yellow-400/80">{row.percentUnlocked.toFixed(1)}%</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
