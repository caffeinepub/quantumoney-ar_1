import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Send, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { simulateSend } from '@/lib/qmy/simulatedSend';

interface SendQMYSimulatedCardProps {
  availableBalance: number;
}

export default function SendQMYSimulatedCard({ availableBalance }: SendQMYSimulatedCardProps) {
  const [destination, setDestination] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const result = await simulateSend(destination, parseFloat(amount), availableBalance);
      
      if (result.success) {
        toast.success('Simulated Transfer Successful', {
          description: `${amount} QMY sent to ${destination.slice(0, 10)}...`,
        });
        setDestination('');
        setAmount('');
      } else {
        setError(result.error || 'Simulation failed');
        toast.error('Simulated Transfer Failed', {
          description: result.error,
        });
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMsg);
      toast.error('Simulation Error', { description: errorMsg });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="glass-card border-primary/30">
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-3">
          <Send className="w-6 h-6" />
          Send QMY
          <Badge variant="outline" className="ml-auto border-amber-500/40 text-amber-500">
            Simulated
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="destination" className="text-muted-foreground">
              Destination Principal
            </Label>
            <Input
              id="destination"
              type="text"
              placeholder="Enter principal ID"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-background/50 border-primary/30"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-muted-foreground">
              Amount (QMY)
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-background/50 border-primary/30"
              disabled={isSubmitting}
            />
            <p className="text-xs text-muted-foreground">
              Available: {availableBalance.toFixed(2)} QMY
            </p>
          </div>

          {error && (
            <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting || !destination || !amount}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                Simulating...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Simulate Send
              </>
            )}
          </Button>

          <div className="p-4 bg-amber-900/10 border border-amber-500/30 rounded-lg">
            <p className="text-xs text-amber-300 leading-relaxed">
              <strong>Simulation Mode:</strong> This is a simulated transfer. No real tokens will be moved. 
              This feature is ready to be connected to the real ledger once canister details are provided.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
