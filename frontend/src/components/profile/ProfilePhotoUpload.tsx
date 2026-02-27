import { useRef, useState } from 'react';
import { Camera, Upload, User } from 'lucide-react';

interface ProfilePhotoUploadProps {
  currentPhotoUrl?: string | null;
  onPhotoChange: (file: File) => void;
  isUploading?: boolean;
}

export default function ProfilePhotoUpload({
  currentPhotoUrl,
  onPhotoChange,
  isUploading = false,
}: ProfilePhotoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentPhotoUrl ?? null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onPhotoChange(file);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative w-24 h-24 rounded-full border-2 border-yellow-400 overflow-hidden cursor-pointer group bg-black/40"
        onClick={() => fileInputRef.current?.click()}
      >
        {previewUrl ? (
          <img src={previewUrl} alt="Foto de perfil" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <User className="w-10 h-10 text-yellow-400/50" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Camera className="w-6 h-6 text-yellow-400" />
        </div>
        {isUploading && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className="flex items-center gap-1.5 text-xs text-yellow-400/70 hover:text-yellow-400 transition-colors disabled:opacity-50"
      >
        <Upload className="w-3 h-3" />
        {isUploading ? 'A carregar...' : 'Alterar foto'}
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
