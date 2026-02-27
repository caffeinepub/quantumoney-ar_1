import { useState } from 'react';
import { Copy, Send, QrCode, CheckCircle, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SendReceivePanelsProps {
  principalId: string;
  icpBalance: number;
  qmyBalance: number;
  onSendICP?: (to: string, amount: number) => Promise<void>;
  onSendQMY?: (to: string, amount: number) => Promise<void>;
}

function isValidPrincipal(id: string): boolean {
  return /^[a-z0-9-]{5,64}(-[a-z0-9]{5})*$/.test(id.trim());
}

export default function SendReceivePanels({
  principalId,
  icpBalance,
  qmyBalance,
  onSendICP,
  onSendQMY,
}: SendReceivePanelsProps) {
  const [copied, setCopied] = useState(false);
  const [sendToken, setSendToken] = useState<'ICP' | 'QMY'>('ICP');
  const [destination, setDestination] = useState('');
  const [amount, setAmount] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const [sendSuccess, setSendSuccess] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(principalId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const maxBalance = sendToken === 'ICP' ? icpBalance : qmyBalance;

  const validateSend = (): string => {
    if (!destination.trim()) return 'Insira o Principal ID de destino.';
    if (!isValidPrincipal(destination)) return 'Principal ID inválido.';
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return 'Insira um valor válido.';
    if (amt > maxBalance) return `Saldo insuficiente. Máximo: ${maxBalance} ${sendToken}`;
    return '';
  };

  const handleSendClick = () => {
    setSendError('');
    const err = validateSend();
    if (err) { setSendError(err); return; }
    setConfirmOpen(true);
  };

  const handleConfirmSend = async () => {
    setIsSending(true);
    setSendError('');
    try {
      const amt = parseFloat(amount);
      if (sendToken === 'ICP' && onSendICP) await onSendICP(destination, amt);
      if (sendToken === 'QMY' && onSendQMY) await onSendQMY(destination, amt);
      setSendSuccess(true);
      setDestination('');
      setAmount('');
      setConfirmOpen(false);
      setTimeout(() => setSendSuccess(false), 3000);
    } catch (e: any) {
      setSendError(e?.message ?? 'Erro ao enviar. Tente novamente.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Send Panel */}
      <div className="border border-yellow-400/40 bg-black/30 backdrop-blur-md rounded-sm p-4">
        <h3 className="text-yellow-400 font-cinzel font-bold text-sm mb-4 flex items-center gap-2">
          <Send className="w-4 h-4" /> Enviar Tokens
        </h3>

        {/* Token selector */}
        <div className="flex gap-2 mb-4">
          {(['ICP', 'QMY'] as const).map(t => (
            <button
              key={t}
              onClick={() => setSendToken(t)}
              className={`flex-1 py-1.5 text-xs font-bold border transition-colors ${
                sendToken === t
                  ? 'border-yellow-400 bg-yellow-400/20 text-yellow-400'
                  : 'border-yellow-400/30 text-yellow-400/50 hover:border-yellow-400/60'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <div>
            <Label className="text-yellow-400/70 text-xs mb-1 block">Principal ID Destino</Label>
            <Input
              value={destination}
              onChange={e => setDestination(e.target.value)}
              placeholder="xxxxx-xxxxx-..."
              className="bg-black/40 border-yellow-400/30 text-yellow-300 text-xs placeholder:text-yellow-400/30 focus:border-yellow-400"
            />
          </div>
          <div>
            <Label className="text-yellow-400/70 text-xs mb-1 block">
              Valor (máx: {maxBalance} {sendToken})
            </Label>
            <Input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="bg-black/40 border-yellow-400/30 text-yellow-300 text-xs placeholder:text-yellow-400/30 focus:border-yellow-400"
            />
          </div>

          {sendError && (
            <p className="text-red-400 text-xs flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {sendError}
            </p>
          )}
          {sendSuccess && (
            <p className="text-green-400 text-xs flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> Enviado com sucesso!
            </p>
          )}

          <Button
            onClick={handleSendClick}
            className="w-full bg-yellow-400 text-black hover:bg-yellow-300 font-bold text-xs py-2"
          >
            Enviar {sendToken}
          </Button>
        </div>
      </div>

      {/* Receive Panel */}
      <div className="border border-yellow-400/40 bg-black/30 backdrop-blur-md rounded-sm p-4">
        <h3 className="text-yellow-400 font-cinzel font-bold text-sm mb-4 flex items-center gap-2">
          <QrCode className="w-4 h-4" /> Receber Tokens
        </h3>
        <p className="text-yellow-400/60 text-xs mb-3">
          Partilha o teu Principal ID para receber ICP ou QMY.
        </p>
        <div className="bg-black/50 border border-yellow-400/20 rounded-sm p-3 mb-3">
          <p className="text-yellow-300 text-xs font-mono break-all leading-relaxed">
            {principalId}
          </p>
        </div>
        <button
          onClick={handleCopy}
          className="w-full flex items-center justify-center gap-2 py-2 border border-yellow-400/40 text-yellow-400 text-xs font-bold hover:bg-yellow-400/10 transition-colors"
        >
          {copied ? (
            <><CheckCircle className="w-3 h-3 text-green-400" /> Copiado!</>
          ) : (
            <><Copy className="w-3 h-3" /> Copiar Principal ID</>
          )}
        </button>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="bg-black border border-yellow-400/50 text-yellow-300">
          <DialogHeader>
            <DialogTitle className="text-yellow-400 font-cinzel">Confirmar Envio</DialogTitle>
            <DialogDescription className="text-yellow-400/60 text-xs">
              Verifica os detalhes antes de confirmar.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 text-sm py-2">
            <div className="flex justify-between">
              <span className="text-yellow-400/60">Token:</span>
              <span className="text-yellow-400 font-bold">{sendToken}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-yellow-400/60">Valor:</span>
              <span className="text-yellow-400 font-bold">{amount} {sendToken}</span>
            </div>
            <div>
              <span className="text-yellow-400/60 block mb-1">Destino:</span>
              <span className="text-yellow-300 text-xs font-mono break-all">{destination}</span>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setConfirmOpen(false)}
              className="border-yellow-400/40 text-yellow-400 hover:bg-yellow-400/10"
              disabled={isSending}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirmSend}
              disabled={isSending}
              className="bg-yellow-400 text-black hover:bg-yellow-300 font-bold"
            >
              {isSending ? (
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  A enviar...
                </span>
              ) : 'Confirmar Envio'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
