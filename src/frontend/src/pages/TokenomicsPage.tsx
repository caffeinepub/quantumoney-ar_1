import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TokenomicsPage() {
  const [hoveredAllocation, setHoveredAllocation] = useState<number | null>(null);
  const { language } = useLanguage();

  const content = {
    pt: {
      title: 'Tokenomics QMY',
      supplyLabel: 'Fornecimento Total',
      supply: '1.000.000.000 QMY',
      distribution: 'Distribuição de Tokens',
      allocation: [
        {
          label: 'Bônus de Registro (100k usuários)',
          value: 10,
          amount: '100.000.000 QMY',
        },
        {
          label: 'Recompensas de Jogo AR',
          value: 30,
          amount: '300.000.000 QMY',
        },
        {
          label: 'Tesouraria DAO',
          value: 20,
          amount: '200.000.000 QMY',
        },
        {
          label: 'Equipe & Desenvolvimento',
          value: 15,
          amount: '150.000.000 QMY',
        },
        {
          label: 'Pré-venda',
          value: 25,
          amount: '250.000.000 QMY',
        },
      ],
    },
    en: {
      title: 'QMY Tokenomics',
      supplyLabel: 'Total Supply',
      supply: '1,000,000,000 QMY',
      distribution: 'Token Distribution',
      allocation: [
        {
          label: 'Registration Bonus (100k users)',
          value: 10,
          amount: '100,000,000 QMY',
        },
        {
          label: 'AR Game Rewards',
          value: 30,
          amount: '300,000,000 QMY',
        },
        {
          label: 'DAO Treasury',
          value: 20,
          amount: '200,000,000 QMY',
        },
        {
          label: 'Team & Development',
          value: 15,
          amount: '150,000,000 QMY',
        },
        {
          label: 'Presale',
          value: 25,
          amount: '250,000,000 QMY',
        },
      ],
    },
  };

  const t = content[language];

  return (
    <section className="min-h-screen bg-black px-[2.5%] py-8 pb-24">
      <div className="max-w-7xl mx-auto">
        {/* QMY Luxury Pro Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="/assets/generated/qmy-luxury-pro-logo-transparent.dim_200x200.png"
            alt="QMY Luxury Pro"
            className="w-20 h-20 object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-center text-amber-500 mb-8">
          {t.title}
        </h1>

        {/* Total Supply Card */}
        <div
          className="w-full mb-6 rounded-2xl border border-amber-600/40 bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-sm"
          style={{ height: '140px' }}
        >
          <div className="h-full flex flex-col items-center justify-center px-6">
            <p className="text-amber-400 text-base md:text-lg font-semibold mb-2" style={{ lineHeight: '1.2' }}>
              {t.supplyLabel}
            </p>
            <p className="text-amber-500 text-3xl md:text-4xl font-bold" style={{ lineHeight: '1.2' }}>
              {t.supply}
            </p>
          </div>
        </div>

        {/* Distribution Title */}
        <h2 className="text-xl md:text-2xl font-bold text-center text-amber-500 mb-6">
          {t.distribution}
        </h2>

        {/* Distribution Cards */}
        <div className="space-y-4">
          {t.allocation.map((item, index) => (
            <div
              key={index}
              className="w-full rounded-2xl border border-amber-600/40 bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/60 hover:shadow-lg hover:shadow-amber-500/20"
              style={{ minHeight: '130px', maxHeight: '150px' }}
              onMouseEnter={() => setHoveredAllocation(index)}
              onMouseLeave={() => setHoveredAllocation(null)}
            >
              <div className="h-full flex flex-col justify-center px-6 py-4">
                {/* Label and Percentage */}
                <div className="flex items-center justify-between mb-3">
                  <p className="text-amber-400 text-sm md:text-base font-semibold" style={{ lineHeight: '1.2' }}>
                    {item.label}
                  </p>
                  <p className="text-amber-500 text-lg md:text-xl font-bold" style={{ lineHeight: '1.2' }}>
                    {item.value}%
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-800 rounded-full h-8 mb-3 overflow-hidden flex items-center">
                  <div
                    className="bg-gradient-to-r from-amber-600 to-amber-400 h-full flex items-center justify-center transition-all duration-1000"
                    style={{ width: `${item.value}%` }}
                  >
                    <span className="text-white text-xs md:text-sm font-bold" style={{ lineHeight: '1.2' }}>
                      {item.value}%
                    </span>
                  </div>
                </div>

                {/* Amount */}
                <p className="text-gray-300 text-sm md:text-base font-medium text-center" style={{ lineHeight: '1.2' }}>
                  {item.amount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
