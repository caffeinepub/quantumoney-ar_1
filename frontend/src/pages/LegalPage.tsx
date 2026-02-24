import { Shield, FileText, AlertTriangle, Scale } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LegalPage() {
  const { language } = useLanguage();

  const content = {
    pt: {
      title: 'Legal & Conformidade',
      subtitle: 'Avisos Regulatórios e Proteção de Dados',
      notFinancial: {
        title: 'Não é um Produto Financeiro',
        text: 'QMY não é um produto financeiro, valor mobiliário, instrumento de investimento, ou ativo negociável. Nenhum token foi emitido. QMY não oferece retornos financeiros, rendimentos, dividendos, ou qualquer forma de ganho económico. Todo o conteúdo neste website é estritamente conceptual, educativo e não operacional.',
      },
      noTokens: {
        title: 'Nenhum Token Emitido',
        text: 'Nenhum token QMY foi emitido, cunhado, distribuído ou colocado em circulação. Todas as referências a "QMY", "tokens", "saldos", "distribuição" ou termos similares são puramente descritivas e destinam-se a fins educativos e de planeamento. Nenhum utilizador possui, detém em custódia, ou tem direitos financeiros sobre qualquer ativo digital através deste website ou da aplicação AR associada.',
      },
      mica: {
        title: 'Conformidade MiCA (UE)',
        text: 'Este projeto está em conformidade total com o Regulamento de Mercados de Criptoativos da União Europeia (MiCA). Nenhuma oferta de criptoativos, emissão de tokens, ou atividade de mercado regulada ocorre através deste website. Todo o conteúdo é conceptual e não constitui uma oferta, solicitação ou recomendação de investimento. Nenhuma promessa de retornos financeiros, preço, rendimento ou características de investimento é feita.',
      },
      gdpr: {
        title: 'GDPR — Proteção de Dados (UE 2016/679)',
        text: 'Este website processa dados pessoais mínimos em conformidade com o Regulamento Geral de Proteção de Dados da UE (GDPR, 2016/679). Os dados coletados limitam-se a: identificadores de autenticação (Internet Identity), dados de localização GPS (apenas durante o uso ativo da aplicação AR), e dados de perfil de utilizador (nome de utilizador, estatísticas de jogo). Nenhum dado financeiro, informação de pagamento, ou dados sensíveis são coletados. Os utilizadores têm direito de acesso, retificação, eliminação e portabilidade dos seus dados. Para exercer estes direitos, contacte: helpdesk@htgamers.com',
      },
      kyc: {
        title: 'KYC/AML — Não Aplicável',
        text: 'Nenhum processo de Conhecimento do Cliente (KYC) ou Anti-Lavagem de Dinheiro (AML) é implementado ou necessário, pois nenhuma transação financeira, emissão de tokens, ou atividade regulada ocorre através deste sistema. Este website e a aplicação AR associada não são prestadores de serviços financeiros, exchanges, ou plataformas de negociação.',
      },
      risks: {
        title: 'Avisos de Risco',
        items: [
          'Nenhum token foi emitido.',
          'Não é transferível.',
          'Não é um investimento.',
          'Não oferece retornos financeiros.',
          'Nenhuma garantia de sincronização futura entre sistemas.',
          'Nenhuma promessa de valor, preço ou liquidez.',
          'Conformidade regulatória sujeita a mudanças legais.',
        ],
      },
      contact: {
        title: 'Contacto Legal',
        text: 'Para questões legais, conformidade ou proteção de dados, contacte:',
        email: 'helpdesk@htgamers.com',
        website: 'htgamers.com',
      },
    },
    en: {
      title: 'Legal & Compliance',
      subtitle: 'Regulatory Notices and Data Protection',
      notFinancial: {
        title: 'Not a Financial Product',
        text: 'QMY is not a financial product, security, investment instrument, or tradable asset. No tokens have been issued. QMY does not offer financial returns, yields, dividends, or any form of economic gain. All content on this website is strictly conceptual, educational, and non-operational.',
      },
      noTokens: {
        title: 'No Tokens Issued',
        text: 'No QMY tokens have been issued, minted, distributed, or placed in circulation. All references to "QMY", "tokens", "balances", "distribution", or similar terms are purely descriptive and intended for educational and planning purposes. No user owns, holds in custody, or has financial rights to any digital asset through this website or the associated AR application.',
      },
      mica: {
        title: 'MiCA Compliance (EU)',
        text: 'This project is in full compliance with the European Union Markets in Crypto-Assets Regulation (MiCA). No crypto-asset offering, token issuance, or regulated market activity occurs through this website. All content is conceptual and does not constitute an offer, solicitation, or investment recommendation. No promise of financial returns, price, yield, or investment features is made.',
      },
      gdpr: {
        title: 'GDPR — Data Protection (EU 2016/679)',
        text: 'This website processes minimal personal data in compliance with the EU General Data Protection Regulation (GDPR, 2016/679). Data collected is limited to: authentication identifiers (Internet Identity), GPS location data (only during active AR app use), and user profile data (username, game statistics). No financial data, payment information, or sensitive data is collected. Users have the right to access, rectification, erasure, and portability of their data. To exercise these rights, contact: helpdesk@htgamers.com',
      },
      kyc: {
        title: 'KYC/AML — Not Applicable',
        text: 'No Know Your Customer (KYC) or Anti-Money Laundering (AML) processes are implemented or required, as no financial transactions, token issuance, or regulated activity occurs through this system. This website and the associated AR application are not financial service providers, exchanges, or trading platforms.',
      },
      risks: {
        title: 'Risk Notices',
        items: [
          'No tokens have been issued.',
          'It is not transferable.',
          'It is not an investment.',
          'It does not offer financial returns.',
          'No guarantee of future synchronization between systems.',
          'No promise of value, price, or liquidity.',
          'Regulatory compliance subject to legal changes.',
        ],
      },
      contact: {
        title: 'Legal Contact',
        text: 'For legal, compliance, or data protection inquiries, contact:',
        email: 'helpdesk@htgamers.com',
        website: 'htgamers.com',
      },
    },
  };

  const t = content[language];

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-gray-900 to-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block p-6 rounded-full bg-amber-600/20 border-2 border-amber-600 mb-6">
            <Scale className="w-16 h-16 text-amber-500" />
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-amber-500 mb-6">
            {t.title}
          </h2>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Not a Financial Product */}
        <Card className="mb-8 bg-gradient-to-r from-red-900/30 via-red-800/40 to-red-900/30 border-red-500/50 glass-card">
          <CardHeader>
            <div className="flex items-center gap-4">
              <AlertTriangle className="w-10 h-10 text-red-400" />
              <CardTitle className="text-3xl font-serif text-red-400">
                {t.notFinancial.title}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-red-300 leading-relaxed text-justify text-lg">
              {t.notFinancial.text}
            </p>
          </CardContent>
        </Card>

        {/* No Tokens Issued */}
        <Card className="mb-8 bg-gradient-to-r from-red-900/30 via-red-800/40 to-red-900/30 border-red-500/50 glass-card">
          <CardHeader>
            <div className="flex items-center gap-4">
              <AlertTriangle className="w-10 h-10 text-red-400" />
              <CardTitle className="text-3xl font-serif text-red-400">
                {t.noTokens.title}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-red-300 leading-relaxed text-justify text-lg">
              {t.noTokens.text}
            </p>
          </CardContent>
        </Card>

        {/* MiCA Compliance */}
        <Card className="mb-8 bg-black/50 border-amber-500/30 glass-card">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Shield className="w-10 h-10 text-amber-500" />
              <CardTitle className="text-3xl font-serif text-amber-400">
                {t.mica.title}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-amber-300 leading-relaxed text-justify text-lg">
              {t.mica.text}
            </p>
          </CardContent>
        </Card>

        {/* GDPR */}
        <Card className="mb-8 bg-black/50 border-amber-500/30 glass-card">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Shield className="w-10 h-10 text-amber-500" />
              <CardTitle className="text-3xl font-serif text-amber-400">
                {t.gdpr.title}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-amber-300 leading-relaxed text-justify text-lg">
              {t.gdpr.text}
            </p>
          </CardContent>
        </Card>

        {/* KYC/AML */}
        <Card className="mb-8 bg-black/50 border-amber-500/30 glass-card">
          <CardHeader>
            <div className="flex items-center gap-4">
              <FileText className="w-10 h-10 text-amber-500" />
              <CardTitle className="text-3xl font-serif text-amber-400">
                {t.kyc.title}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-amber-300 leading-relaxed text-justify text-lg">
              {t.kyc.text}
            </p>
          </CardContent>
        </Card>

        {/* Risk Notices */}
        <Card className="mb-8 bg-gradient-to-r from-amber-900/20 via-amber-800/30 to-amber-900/20 border-amber-500/50 glass-card">
          <CardHeader>
            <div className="flex items-center gap-4">
              <AlertTriangle className="w-10 h-10 text-amber-500" />
              <CardTitle className="text-3xl font-serif text-amber-400">
                {t.risks.title}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {t.risks.items.map((item, idx) => (
                <li key={idx} className="text-amber-300 flex items-start gap-3 text-lg">
                  <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                  <span className="font-semibold">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Legal Contact */}
        <Card className="bg-black/50 border-amber-500/30 glass-card">
          <CardHeader>
            <CardTitle className="text-3xl font-serif text-amber-400 text-center">
              {t.contact.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-amber-300 text-lg">{t.contact.text}</p>
            <div className="space-y-2">
              <p className="text-amber-500 text-xl font-semibold">{t.contact.email}</p>
              <p className="text-amber-500 text-xl font-semibold">{t.contact.website}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
