import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, AlertCircle, ArrowUpRight, ArrowDownLeft, Lock, Unlock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Transaction } from '../../lib/icrc/transactions';

interface QMYTransactionHistoryProps {
  transactions: Transaction[] | null;
  isLoading?: boolean;
  error?: Error | null;
}

export default function QMYTransactionHistory({
  transactions,
  isLoading,
  error,
}: QMYTransactionHistoryProps) {
  if (isLoading) {
    return (
      <Card className="glass-card border-primary/30">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-3">
            <Clock className="w-6 h-6" />
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading transactions...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="glass-card border-primary/30">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-3">
            <Clock className="w-6 h-6" />
            Transaction History
            <Badge variant="outline" className="ml-auto border-destructive/40 text-destructive">
              Error
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 space-y-4">
            <AlertCircle className="w-16 h-16 text-destructive/50 mx-auto" />
            <div>
              <p className="text-muted-foreground text-lg mb-2">Failed to Load Transactions</p>
              <p className="text-muted-foreground/70 text-sm max-w-md mx-auto">
                {error.message || 'An error occurred while fetching transaction history.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (transactions === null) {
    return (
      <Card className="glass-card border-primary/30">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-3">
            <Clock className="w-6 h-6" />
            Transaction History
            <Badge variant="outline" className="ml-auto border-primary/40 text-primary">
              Not Supported
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 space-y-4">
            <AlertCircle className="w-16 h-16 text-muted-foreground/50 mx-auto" />
            <div>
              <p className="text-muted-foreground text-lg mb-2">History Not Available</p>
              <p className="text-muted-foreground/70 text-sm max-w-md mx-auto">
                Transaction history is not supported by this ledger at this time.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (transactions.length === 0) {
    return (
      <Card className="glass-card border-primary/30">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-3">
            <Clock className="w-6 h-6" />
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Clock className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">No transactions yet</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getTransactionIcon = (kind: string) => {
    switch (kind) {
      case 'transfer':
        return <ArrowUpRight className="w-5 h-5 text-primary" />;
      case 'mint':
        return <ArrowDownLeft className="w-5 h-5 text-success" />;
      case 'burn':
        return <Lock className="w-5 h-5 text-destructive" />;
      default:
        return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getTransactionLabel = (kind: string) => {
    switch (kind) {
      case 'transfer':
        return 'Sent';
      case 'mint':
        return 'Received';
      case 'burn':
        return 'Burned';
      default:
        return 'Unknown';
    }
  };

  return (
    <Card className="glass-card border-primary/30">
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-3">
          <Clock className="w-6 h-6" />
          Transaction History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((tx, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border border-primary/20 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
            >
              <div className="flex items-center gap-4">
                {getTransactionIcon(tx.kind)}
                <div>
                  <p className="font-semibold text-foreground">{getTransactionLabel(tx.kind)}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(Number(tx.timestamp) / 1_000_000).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">{tx.amount.toString()} QMY</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
