import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Globe, ChevronDown } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const content = {
  pt: {
    hero: {
      title: 'Gold Paper',
      subtitle: 'Quantumoney AR / QMY Luxury Pro',
      description: 'Documentação técnica e empresarial completa',
    },
    nav: {
      executive: 'Resumo Executivo',
      tokenomics: 'Tokenomics',
      distribution: 'Distribuição AR',
      treasury: 'Tesouraria / Vesting / Queima',
      dao: 'DAO e Governança',
      roadmap: 'Roadmap',
      presale: 'Pré-venda',
      technical: 'Arquitetura Técnica',
      gameSystems: 'Sistemas de Jogo',
      legal: 'Legal & Atribuição',
    },
    sections: {
      executive: {
        title: 'Resumo Executivo',
        intro: 'Quantumoney AR é o primeiro projeto do mundo que une realidade aumentada, metaverso e blockchain em tempo real.',
        vision: 'Nossa Visão',
        visionText: 'Criar uma experiência de jogo revolucionária onde jogadores ganham tokens QMY através de gameplay AR imersivo, explorando o mundo real enquanto participam de uma economia descentralizada.',
        highlights: 'Destaques Principais',
        highlight1: 'Integração AR em Tempo Real',
        highlight1Text: 'Tecnologia de realidade aumentada de ponta para gameplay imersivo',
        highlight2: 'Economia Blockchain',
        highlight2Text: 'Token QMY totalmente integrado com mecânicas deflacionárias',
        highlight3: 'Governança Comunitária',
        highlight3Text: 'DAO descentralizada com 200M QMY de tesouraria',
      },
      tokenomics: {
        title: 'Tokenomics',
        supply: 'Fornecimento Total',
        supplyValue: '1.000.000.000 QMY',
        distribution: 'Distribuição de Tokens',
        arDistribution: 'Distribuição AR Global',
        arValue: '60% (600.000.000 QMY)',
        arDesc: 'Distribuídos através de 60.000 pontos AR em marcos turísticos globais',
        daoTreasury: 'Tesouraria DAO',
        daoValue: '20% (200.000.000 QMY)',
        daoDesc: 'Reservado para governança comunitária e desenvolvimento',
        team: 'Equipe & Desenvolvimento',
        teamValue: '10% (100.000.000 QMY)',
        teamDesc: 'Vesting de 24 meses para equipe principal',
        presale: 'Pré-venda',
        presaleValue: '10% (100.000.000 QMY)',
        presaleDesc: 'Três fases com vesting progressivo',
        utility: 'Utilidade do Token',
        utilityText: 'QMY é usado para plantar moedas, resgatar tokens, participar da governança DAO, e acessar recursos premium do jogo.',
      },
      distribution: {
        title: 'Distribuição AR Global',
        overview: 'Visão Geral',
        overviewText: 'Sistema de distribuição global com 60.000 pontos AR estrategicamente posicionados em marcos turísticos e locais de interesse ao redor do mundo.',
        total: 'Total de Pontos AR',
        totalValue: '60.000 pontos',
        totalTokens: 'Tokens Distribuídos',
        totalTokensValue: '600.000.000 QMY',
        perSpot: 'Por Ponto AR',
        perSpotValue: '10.000 QMY',
        regions: 'Alocação Regional',
        asia: 'Ásia',
        asiaValue: '40% (24.000 pontos)',
        northAmerica: 'América do Norte',
        northAmericaValue: '20% (12.000 pontos)',
        europe: 'Europa',
        europeValue: '15% (9.000 pontos)',
        latinAmerica: 'América Latina',
        latinAmericaValue: '10% (6.000 pontos)',
        africa: 'África',
        africaValue: '10% (6.000 pontos)',
        others: 'Outros',
        othersValue: '5% (3.000 pontos)',
        mechanics: 'Mecânicas de Distribuição',
        mechanicsText: 'Cada carteira pode reivindicar 4.000 QMY por ponto AR. Sistema de sincronização em tempo real garante distribuição justa e previne fraudes.',
      },
      treasury: {
        title: 'Tesouraria / Vesting / Queima',
        vestingTitle: 'Cronograma de Vesting',
        vestingIntro: 'Sistema de liberação progressiva de tokens para garantir estabilidade de longo prazo.',
        presaleVesting: 'Pré-venda',
        presaleVestingText: 'Seed: 18 meses • Private: 12 meses • Public: 6 meses',
        teamVesting: 'Equipe',
        teamVestingText: '24 meses com cliff de 6 meses',
        daoVesting: 'DAO',
        daoVestingText: 'Liberação gradual ao longo de 60 meses',
        burnTitle: 'Mecânicas Deflacionárias',
        burnIntro: 'Sistema de queima progressiva para reduzir fornecimento total em 50% ao longo do tempo.',
        burnSources: 'Fontes de Queima',
        burnSource1: 'Taxa de transação: 0,5% de todas as transferências',
        burnSource2: 'Propostas DAO: Queimas aprovadas pela comunidade',
        burnSource3: 'Moedas expiradas: Tokens não resgatados após 90 dias',
        burnGoal: 'Meta de Queima',
        burnGoalText: 'Reduzir fornecimento total para 500M QMY ao longo de 5 anos',
        conceptualTitle: 'Fluxos Conceptuais — Tesouraria / Vesting / Queima',
        conceptualIntro: 'Diagrama conceptual representando os fluxos lógicos entre os módulos principais do sistema de tesouraria, vesting e queima.',
        conceptualNote: 'Modelo conceptual — Compatível com MiCA (UE) e GDPR (UE 2016/679)',
      },
      dao: {
        title: 'DAO e Governança',
        intro: 'Organização autônoma descentralizada com arquitetura conceptual e técnica baseada no Protocolo ICP, sem execução financeira real.',
        
        // 5.1 Estrutura da DAO
        section1Title: '5.1 Estrutura da DAO',
        section1Intro: 'A DAO Quantumoney apresenta uma arquitetura conceptual e técnica com módulos lógicos representando Comité, Assembleia, e Protocolo ICP Governance, com segregação funcional clara entre camadas.',
        section1LayersTitle: 'Segregação de Camadas',
        section1Layer1: 'Jogo AR',
        section1Layer1Desc: 'Interface de utilizador para gameplay e interação com tokens QMY',
        section1Layer2: 'Portal Web Institucional',
        section1Layer2Desc: 'Interface de governança para submissão e votação de propostas',
        section1Layer3: 'Protocolo ICP',
        section1Layer3Desc: 'Camada blockchain para auditoria e registo conceptual',
        section1ModulesTitle: 'Módulos Lógicos Conceptuais',
        section1Module1: 'Comité',
        section1Module1Desc: 'Módulo conceptual para validação técnica de propostas',
        section1Module2: 'Assembleia',
        section1Module2Desc: 'Módulo conceptual para votação ponderada da comunidade',
        section1Module3: 'ICP Governance',
        section1Module3Desc: 'Módulo conceptual para registo e auditoria on-chain',
        
        // 5.2 Tipos de Propostas
        section2Title: '5.2 Tipos de Propostas',
        section2Intro: 'Enumera e explica propostas teóricas com fluxos conceptuais de aprovação e rejeição, sem execução financeira real.',
        section2TableTitle: 'Tabela Conceptual de Tipos de Propostas',
        section2Type: 'Tipo',
        section2Description: 'Descrição Conceptual',
        section2ApprovalFlow: 'Fluxo de Aprovação',
        section2RejectionFlow: 'Fluxo de Rejeição',
        section2Type1: 'Técnica',
        section2Type1Desc: 'Alterações conceptuais de protocolo ou arquitetura',
        section2Type1Approval: 'Comité → Assembleia → Registo ICP',
        section2Type1Rejection: 'Arquivamento conceptual',
        section2Type2: 'Estratégica',
        section2Type2Desc: 'Parcerias, marketing, desenvolvimento conceptual',
        section2Type2Approval: 'Assembleia → Registo ICP',
        section2Type2Rejection: 'Revisão e resubmissão conceptual',
        section2Type3: 'Conformidade',
        section2Type3Desc: 'Adequação regulatória MiCA/GDPR conceptual',
        section2Type3Approval: 'Comité → Assembleia → Registo ICP',
        section2Type3Rejection: 'Análise jurídica conceptual',
        
        // 5.3 Papéis dos Membros
        section3Title: '5.3 Papéis dos Membros',
        section3Intro: 'Define perfis institucionais e respetivas permissões teóricas de intervenção, conforme estrutura de governança ICP.',
        section3RolesTitle: 'Perfis Institucionais Conceptuais',
        section3Role: 'Perfil',
        section3Permissions: 'Permissões Teóricas',
        section3Requirements: 'Requisitos Conceptuais',
        section3Role1: 'Participante',
        section3Role1Perm: 'Submeter propostas, votar, visualizar resultados',
        section3Role1Req: 'Detentor de QMY com registo conceptual',
        section3Role2: 'Observador',
        section3Role2Perm: 'Visualizar propostas e resultados, sem voto',
        section3Role2Req: 'Acesso público conceptual',
        section3Role3: 'Administrador Conceptual',
        section3Role3Perm: 'Validação técnica, moderação, auditoria conceptual',
        section3Role3Req: 'Designação institucional conceptual',
        
        // 5.4 Fluxos de Votação
        section4Title: '5.4 Fluxos de Votação',
        section4Intro: 'Descreve o processo conceptual de submissão, validação, votação ponderada e publicação de resultados auditáveis, sem execução real.',
        section4StepsTitle: 'Etapas Conceptuais do Processo de Votação',
        section4Step1: '1. Submissão Conceptual',
        section4Step1Desc: 'Participante submete proposta através do Portal Web com descrição técnica e justificação institucional',
        section4Step2: '2. Validação Conceptual',
        section4Step2Desc: 'Comité conceptual verifica conformidade técnica e regulatória (MiCA/GDPR)',
        section4Step3: '3. Votação Ponderada Conceptual',
        section4Step3Desc: 'Assembleia vota com peso proporcional aos tokens QMY detidos (1 QMY = 1 voto conceptual)',
        section4Step4: '4. Publicação de Resultados',
        section4Step4Desc: 'Resultados registados conceptualmente no Protocolo ICP para auditoria pública',
        section4QuorumTitle: 'Quórum Conceptual',
        section4QuorumDesc: 'Mínimo de 10% dos tokens QMY em circulação devem participar para validação conceptual da proposta',
        
        // 5.5 Ligação Conceptual
        section5Title: '5.5 Ligação Conceptual com Tesouraria, Vesting e Queima',
        section5Intro: 'Apresenta ligação teórica e lógica entre módulos descritos na Secção 4 e a DAO, sem interação financeira real.',
        section5ConnectionsTitle: 'Conexões Lógicas Conceptuais',
        section5Connection1: 'DAO ↔ Tesouraria',
        section5Connection1Desc: 'Propostas conceptuais podem sugerir alocação teórica de recursos da tesouraria, sujeitas a aprovação da Assembleia e auditoria conceptual',
        section5Connection2: 'DAO ↔ Vesting',
        section5Connection2Desc: 'Cronogramas de vesting são auditados conceptualmente pela DAO, garantindo transparência institucional sem alteração de contratos',
        section5Connection3: 'DAO ↔ Queima',
        section5Connection3Desc: 'Propostas de queima conceptual podem ser submetidas pela comunidade, com aprovação da Assembleia e registo conceptual no ICP',
        section5DiagramTitle: 'Diagrama Conceptual: Ciclo DAO ↔ Tesouraria ↔ Vesting ↔ Queima',
        section5DiagramDesc: 'Representação visual dos fluxos lógicos conceptuais entre os módulos principais do ecossistema Quantumoney',
        
        // Compliance Footer
        complianceTitle: 'Nota de Conformidade e Caráter Educativo',
        complianceText: 'Toda a informação apresentada nesta secção é de natureza conceptual e educativa. Não representa execução financeira real, promessa de ganhos, ou emissão de valores mobiliários. A DAO Quantumoney opera em conformidade total com MiCA (UE) e GDPR (UE 2016/679). Nenhuma transação financeira ou distribuição de tokens ocorre através dos mecanismos descritos. Todos os fluxos, diagramas e tabelas são representações teóricas para fins de documentação institucional e auditoria conceptual.',
      },
      roadmap: {
        title: 'Roadmap 2026',
        q1: 'Q1 2026',
        q1Title: 'Lançamento & Fundação',
        q1Items: 'Lançamento da pré-venda • Distribuição inicial AR • Lançamento do aplicativo móvel • Integração com Internet Computer',
        q2: 'Q2 2026',
        q2Title: 'Expansão & Crescimento',
        q2Items: 'Expansão global de pontos AR • Lançamento da governança DAO • Listagem em exchanges • Sistema de captura de monstros',
        q3: 'Q3 2026',
        q3Title: 'Recursos Avançados',
        q3Items: 'Recursos de metaverso • Missões e rankings • Sistema de vesting automatizado • Parcerias estratégicas',
        q4: 'Q4 2026',
        q4Title: 'Maturidade & Escala',
        q4Items: 'Integração completa do ecossistema • Recursos avançados de DAO • Expansão internacional • Auditoria de segurança completa',
      },
      presale: {
        title: 'Estrutura de Pré-venda',
        overview: 'Visão Geral',
        overviewText: 'Pré-venda de três fases com 100M QMY total (10% do fornecimento)',
        phase1: 'Fase Seed',
        phase1Details: '30M QMY • 0,0001 ICP/QMY • Vesting 18 meses • Bônus 20%',
        phase2: 'Fase Private',
        phase2Details: '40M QMY • 0,00015 ICP/QMY • Vesting 12 meses • Bônus 10%',
        phase3: 'Fase Public',
        phase3Details: '30M QMY • 0,0002 ICP/QMY • Vesting 6 meses • Sem bônus',
        terms: 'Termos & Condições',
        termsText: 'Participação sujeita a KYC/AML. Tokens bloqueados durante período de vesting. Conformidade total com MiCA EU 2025.',
        duration: 'Duração',
        durationText: '60 dias totais • 20 dias por fase',
      },
      technical: {
        title: 'Arquitetura Técnica',
        blockchain: 'Blockchain',
        blockchainText: 'Construído no Internet Computer Protocol (ICP) usando Motoko para contratos inteligentes de alto desempenho.',
        ar: 'Tecnologia AR',
        arText: 'Sistema de realidade aumentada baseado em GPS com sincronização em tempo real e detecção de localização precisa.',
        realtime: 'Sincronização em Tempo Real',
        realtimeText: 'Arquitetura de dados em tempo real com React Query para atualizações instantâneas e consistência entre dispositivos.',
        security: 'Segurança',
        securityText: 'Autenticação Internet Identity, controle de acesso baseado em funções, e validação de transações on-chain.',
        scalability: 'Escalabilidade',
        scalabilityText: 'Arquitetura de canister distribuída para suportar milhões de usuários simultâneos globalmente.',
      },
      gameSystems: {
        title: 'Sistemas de Jogo',
        arGameplay: 'Gameplay AR',
        arGameplayText: 'Explore o mundo real através de realidade aumentada, descubra pontos AR, e reivindique tokens QMY.',
        monsters: 'Captura de Monstros',
        monstersText: '20 monstros cripto únicos para capturar. Cada captura restaura energia e concede XP.',
        planting: 'Plantar Moedas',
        plantingText: 'Plante tokens QMY em localizações do mundo real. Bloqueio de 30 dias com recompensas de XP.',
        rescue: 'Resgatar Tokens',
        rescueText: 'Resgate moedas plantadas dentro do seu raio de XP. Ganhe tokens e XP através de resgate estratégico.',
        progression: 'Sistema de Progressão',
        progressionText: 'Ganhe XP através de gameplay, suba de nível, aumente seu raio de resgate, e desbloqueie novos recursos.',
      },
      legal: {
        title: 'Legal & Atribuição',
        compliance: 'Conformidade Regulatória',
        gdpr: 'GDPR',
        gdprText: 'Totalmente conforme com o Regulamento Geral de Proteção de Dados da União Europeia',
        mica: 'MiCA EU 2025',
        micaText: 'Conforme com o Regulamento de Mercados de Criptoativos da União Europeia',
        kyc: 'KYC/AML',
        kycText: 'Verificação Know Your Customer e Anti-Money Laundering para participantes da pré-venda',
        disclaimer: 'Aviso Legal',
        disclaimerText: 'Quantumoney AR é um projeto experimental. Não há promessa de ganhos financeiros. Tokens não foram emitidos como valores mobiliários. Participe por sua conta e risco.',
        attribution: 'Atribuição',
        attributionText: 'Desenvolvido por HTgamers © 2025',
        contact: 'Contato',
        contactEmail: 'helpdesk@quantumoney.net',
        contactWebsite: 'www.quantumoney.net',
      },
    },
    footer: {
      builtBy: 'by HTgamers © 2025',
      email: 'helpdesk@quantumoney.net',
      website: 'www.quantumoney.net',
      compliance: 'Conformidade com GDPR e MiCA EU 2025',
      disclaimer: 'Quantumoney AR é um projeto experimental, sem promessa de ganhos, tokens não emitidos.',
    },
  },
  en: {
    hero: {
      title: 'Gold Paper',
      subtitle: 'Quantumoney AR / QMY Luxury Pro',
      description: 'Complete technical and business documentation',
    },
    nav: {
      executive: 'Executive Summary',
      tokenomics: 'Tokenomics',
      distribution: 'AR Distribution',
      treasury: 'Treasury / Vesting / Burn',
      dao: 'DAO & Governance',
      roadmap: 'Roadmap',
      presale: 'Presale',
      technical: 'Technical Architecture',
      gameSystems: 'Game Systems',
      legal: 'Legal & Attribution',
    },
    sections: {
      executive: {
        title: 'Executive Summary',
        intro: 'Quantumoney AR is the world\'s first project uniting augmented reality, metaverse, and blockchain in real-time.',
        vision: 'Our Vision',
        visionText: 'Create a revolutionary gaming experience where players earn QMY tokens through immersive AR gameplay, exploring the real world while participating in a decentralized economy.',
        highlights: 'Key Highlights',
        highlight1: 'Real-Time AR Integration',
        highlight1Text: 'Cutting-edge augmented reality technology for immersive gameplay',
        highlight2: 'Blockchain Economy',
        highlight2Text: 'Fully integrated QMY token with deflationary mechanics',
        highlight3: 'Community Governance',
        highlight3Text: 'Decentralized DAO with 200M QMY treasury',
      },
      tokenomics: {
        title: 'Tokenomics',
        supply: 'Total Supply',
        supplyValue: '1,000,000,000 QMY',
        distribution: 'Token Distribution',
        arDistribution: 'AR Global Distribution',
        arValue: '60% (600,000,000 QMY)',
        arDesc: 'Distributed through 60,000 AR spots at global tourist landmarks',
        daoTreasury: 'DAO Treasury',
        daoValue: '20% (200,000,000 QMY)',
        daoDesc: 'Reserved for community governance and development',
        team: 'Team & Development',
        teamValue: '10% (100,000,000 QMY)',
        teamDesc: '24-month vesting for core team',
        presale: 'Presale',
        presaleValue: '10% (100,000,000 QMY)',
        presaleDesc: 'Three phases with progressive vesting',
        utility: 'Token Utility',
        utilityText: 'QMY is used to plant coins, rescue tokens, participate in DAO governance, and access premium game features.',
      },
      distribution: {
        title: 'AR Global Distribution',
        overview: 'Overview',
        overviewText: 'Global distribution system with 60,000 AR spots strategically positioned at tourist landmarks and points of interest worldwide.',
        total: 'Total AR Spots',
        totalValue: '60,000 spots',
        totalTokens: 'Tokens Distributed',
        totalTokensValue: '600,000,000 QMY',
        perSpot: 'Per AR Spot',
        perSpotValue: '10,000 QMY',
        regions: 'Regional Allocation',
        asia: 'Asia',
        asiaValue: '40% (24,000 spots)',
        northAmerica: 'North America',
        northAmericaValue: '20% (12,000 spots)',
        europe: 'Europe',
        europeValue: '15% (9,000 spots)',
        latinAmerica: 'Latin America',
        latinAmericaValue: '10% (6,000 spots)',
        africa: 'Africa',
        africaValue: '10% (6,000 spots)',
        others: 'Others',
        othersValue: '5% (3,000 spots)',
        mechanics: 'Distribution Mechanics',
        mechanicsText: 'Each wallet can claim 4,000 QMY per AR spot. Real-time synchronization system ensures fair distribution and prevents fraud.',
      },
      treasury: {
        title: 'Treasury / Vesting / Burn',
        vestingTitle: 'Vesting Schedule',
        vestingIntro: 'Progressive token release system to ensure long-term stability.',
        presaleVesting: 'Presale',
        presaleVestingText: 'Seed: 18 months • Private: 12 months • Public: 6 months',
        teamVesting: 'Team',
        teamVestingText: '24 months with 6-month cliff',
        daoVesting: 'DAO',
        daoVestingText: 'Gradual release over 60 months',
        burnTitle: 'Deflationary Mechanics',
        burnIntro: 'Progressive burn system to reduce total supply by 50% over time.',
        burnSources: 'Burn Sources',
        burnSource1: 'Transaction fee: 0.5% of all transfers',
        burnSource2: 'DAO proposals: Community-approved burns',
        burnSource3: 'Expired coins: Unclaimed tokens after 90 days',
        burnGoal: 'Burn Goal',
        burnGoalText: 'Reduce total supply to 500M QMY over 5 years',
        conceptualTitle: 'Conceptual Flows — Treasury / Vesting / Burn',
        conceptualIntro: 'Conceptual diagram representing the logical flows between the main modules of the treasury, vesting, and burn system.',
        conceptualNote: 'Conceptual model — Compatible with MiCA (EU) and GDPR (EU 2016/679)',
      },
      dao: {
        title: 'DAO & Governance',
        intro: 'Decentralized autonomous organization with conceptual and technical architecture based on ICP Protocol, without real financial execution.',
        
        // 5.1 DAO Structure
        section1Title: '5.1 DAO Structure',
        section1Intro: 'Quantumoney DAO presents a conceptual and technical architecture with logical modules representing Committee, Assembly, and ICP Governance Protocol, with clear functional segregation between layers.',
        section1LayersTitle: 'Layer Segregation',
        section1Layer1: 'AR Game',
        section1Layer1Desc: 'User interface for gameplay and interaction with QMY tokens',
        section1Layer2: 'Institutional Web Portal',
        section1Layer2Desc: 'Governance interface for proposal submission and voting',
        section1Layer3: 'ICP Protocol',
        section1Layer3Desc: 'Blockchain layer for conceptual audit and registration',
        section1ModulesTitle: 'Conceptual Logical Modules',
        section1Module1: 'Committee',
        section1Module1Desc: 'Conceptual module for technical validation of proposals',
        section1Module2: 'Assembly',
        section1Module2Desc: 'Conceptual module for weighted community voting',
        section1Module3: 'ICP Governance',
        section1Module3Desc: 'Conceptual module for on-chain registration and audit',
        
        // 5.2 Proposal Types
        section2Title: '5.2 Proposal Types',
        section2Intro: 'Enumerates and explains theoretical proposals with conceptual approval and rejection flows, without real financial execution.',
        section2TableTitle: 'Conceptual Table of Proposal Types',
        section2Type: 'Type',
        section2Description: 'Conceptual Description',
        section2ApprovalFlow: 'Approval Flow',
        section2RejectionFlow: 'Rejection Flow',
        section2Type1: 'Technical',
        section2Type1Desc: 'Conceptual protocol or architecture changes',
        section2Type1Approval: 'Committee → Assembly → ICP Registration',
        section2Type1Rejection: 'Conceptual archiving',
        section2Type2: 'Strategic',
        section2Type2Desc: 'Partnerships, marketing, conceptual development',
        section2Type2Approval: 'Assembly → ICP Registration',
        section2Type2Rejection: 'Conceptual review and resubmission',
        section2Type3: 'Compliance',
        section2Type3Desc: 'Conceptual MiCA/GDPR regulatory adaptation',
        section2Type3Approval: 'Committee → Assembly → ICP Registration',
        section2Type3Rejection: 'Conceptual legal analysis',
        
        // 5.3 Member Roles
        section3Title: '5.3 Member Roles',
        section3Intro: 'Defines institutional profiles and respective theoretical intervention permissions, according to ICP governance structure.',
        section3RolesTitle: 'Conceptual Institutional Profiles',
        section3Role: 'Profile',
        section3Permissions: 'Theoretical Permissions',
        section3Requirements: 'Conceptual Requirements',
        section3Role1: 'Participant',
        section3Role1Perm: 'Submit proposals, vote, view results',
        section3Role1Req: 'QMY holder with conceptual registration',
        section3Role2: 'Observer',
        section3Role2Perm: 'View proposals and results, no voting',
        section3Role2Req: 'Conceptual public access',
        section3Role3: 'Conceptual Administrator',
        section3Role3Perm: 'Technical validation, moderation, conceptual audit',
        section3Role3Req: 'Conceptual institutional designation',
        
        // 5.4 Voting Flows
        section4Title: '5.4 Voting Flows',
        section4Intro: 'Describes the conceptual process of submission, validation, weighted voting and publication of auditable results, without real execution.',
        section4StepsTitle: 'Conceptual Voting Process Steps',
        section4Step1: '1. Conceptual Submission',
        section4Step1Desc: 'Participant submits proposal through Web Portal with technical description and institutional justification',
        section4Step2: '2. Conceptual Validation',
        section4Step2Desc: 'Conceptual Committee verifies technical and regulatory compliance (MiCA/GDPR)',
        section4Step3: '3. Conceptual Weighted Voting',
        section4Step3Desc: 'Assembly votes with weight proportional to QMY tokens held (1 QMY = 1 conceptual vote)',
        section4Step4: '4. Results Publication',
        section4Step4Desc: 'Results conceptually registered on ICP Protocol for public audit',
        section4QuorumTitle: 'Conceptual Quorum',
        section4QuorumDesc: 'Minimum of 10% of circulating QMY tokens must participate for conceptual proposal validation',
        
        // 5.5 Conceptual Connection
        section5Title: '5.5 Conceptual Connection with Treasury, Vesting and Burn',
        section5Intro: 'Presents theoretical and logical connection between modules described in Section 4 and the DAO, without real financial interaction.',
        section5ConnectionsTitle: 'Conceptual Logical Connections',
        section5Connection1: 'DAO ↔ Treasury',
        section5Connection1Desc: 'Conceptual proposals can suggest theoretical allocation of treasury resources, subject to Assembly approval and conceptual audit',
        section5Connection2: 'DAO ↔ Vesting',
        section5Connection2Desc: 'Vesting schedules are conceptually audited by the DAO, ensuring institutional transparency without contract modification',
        section5Connection3: 'DAO ↔ Burn',
        section5Connection3Desc: 'Conceptual burn proposals can be submitted by the community, with Assembly approval and conceptual ICP registration',
        section5DiagramTitle: 'Conceptual Diagram: DAO ↔ Treasury ↔ Vesting ↔ Burn Cycle',
        section5DiagramDesc: 'Visual representation of conceptual logical flows between the main modules of the Quantumoney ecosystem',
        
        // Compliance Footer
        complianceTitle: 'Compliance and Educational Character Note',
        complianceText: 'All information presented in this section is conceptual and educational in nature. It does not represent real financial execution, promise of gains, or issuance of securities. Quantumoney DAO operates in full compliance with MiCA (EU) and GDPR (EU 2016/679). No financial transactions or token distributions occur through the described mechanisms. All flows, diagrams and tables are theoretical representations for institutional documentation and conceptual audit purposes.',
      },
      roadmap: {
        title: 'Roadmap 2026',
        q1: 'Q1 2026',
        q1Title: 'Launch & Foundation',
        q1Items: 'Presale launch • Initial AR distribution • Mobile app launch • Internet Computer integration',
        q2: 'Q2 2026',
        q2Title: 'Expansion & Growth',
        q2Items: 'Global AR spot expansion • DAO governance launch • Exchange listings • Monster capture system',
        q3: 'Q3 2026',
        q3Title: 'Advanced Features',
        q3Items: 'Metaverse features • Missions and rankings • Automated vesting system • Strategic partnerships',
        q4: 'Q4 2026',
        q4Title: 'Maturity & Scale',
        q4Items: 'Full ecosystem integration • Advanced DAO features • International expansion • Complete security audit',
      },
      presale: {
        title: 'Presale Structure',
        overview: 'Overview',
        overviewText: 'Three-phase presale with 100M QMY total (10% of supply)',
        phase1: 'Seed Phase',
        phase1Details: '30M QMY • 0.0001 ICP/QMY • 18-month vesting • 20% bonus',
        phase2: 'Private Phase',
        phase2Details: '40M QMY • 0.00015 ICP/QMY • 12-month vesting • 10% bonus',
        phase3: 'Public Phase',
        phase3Details: '30M QMY • 0.0002 ICP/QMY • 6-month vesting • No bonus',
        terms: 'Terms & Conditions',
        termsText: 'Participation subject to KYC/AML. Tokens locked during vesting period. Full compliance with MiCA EU 2025.',
        duration: 'Duration',
        durationText: '60 days total • 20 days per phase',
      },
      technical: {
        title: 'Technical Architecture',
        blockchain: 'Blockchain',
        blockchainText: 'Built on Internet Computer Protocol (ICP) using Motoko for high-performance smart contracts.',
        ar: 'AR Technology',
        arText: 'GPS-based augmented reality system with real-time synchronization and precise location detection.',
        realtime: 'Real-Time Synchronization',
        realtimeText: 'Real-time data architecture with React Query for instant updates and cross-device consistency.',
        security: 'Security',
        securityText: 'Internet Identity authentication, role-based access control, and on-chain transaction validation.',
        scalability: 'Scalability',
        scalabilityText: 'Distributed canister architecture to support millions of simultaneous users globally.',
      },
      gameSystems: {
        title: 'Game Systems',
        arGameplay: 'AR Gameplay',
        arGameplayText: 'Explore the real world through augmented reality, discover AR spots, and claim QMY tokens.',
        monsters: 'Monster Capture',
        monstersText: '20 unique crypto monsters to capture. Each capture restores energy and grants XP.',
        planting: 'Coin Planting',
        plantingText: 'Plant QMY tokens at real-world locations. 30-day lock with XP rewards.',
        rescue: 'Token Rescue',
        rescueText: 'Rescue planted coins within your XP radius. Earn tokens and XP through strategic rescue.',
        progression: 'Progression System',
        progressionText: 'Earn XP through gameplay, level up, increase your rescue radius, and unlock new features.',
      },
      legal: {
        title: 'Legal & Attribution',
        compliance: 'Regulatory Compliance',
        gdpr: 'GDPR',
        gdprText: 'Fully compliant with European Union General Data Protection Regulation',
        mica: 'MiCA EU 2025',
        micaText: 'Compliant with European Union Markets in Crypto-Assets Regulation',
        kyc: 'KYC/AML',
        kycText: 'Know Your Customer and Anti-Money Laundering verification for presale participants',
        disclaimer: 'Legal Disclaimer',
        disclaimerText: 'Quantumoney AR is an experimental project. No promise of financial gains. Tokens not issued as securities. Participate at your own risk.',
        attribution: 'Attribution',
        attributionText: 'Developed by HTgamers © 2025',
        contact: 'Contact',
        contactEmail: 'helpdesk@quantumoney.net',
        contactWebsite: 'www.quantumoney.net',
      },
    },
    footer: {
      builtBy: 'by HTgamers © 2025',
      email: 'helpdesk@quantumoney.net',
      website: 'www.quantumoney.net',
      compliance: 'Compliant with GDPR and MiCA EU 2025',
      disclaimer: 'Quantumoney AR is an experimental project, no promise of gains, tokens not issued.',
    },
  },
};

export default function GoldPaper() {
  const { language, setLanguage } = useLanguage();
  const [activeSection, setActiveSection] = useState('executive');
  const t = content[language];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['executive', 'tokenomics', 'distribution', 'treasury', 'dao', 'roadmap', 'presale', 'technical', 'gameSystems', 'legal'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-gold-500">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-gold-900/20 via-black to-black" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-8 flex justify-center">
            <img 
              src="/assets/generated/animated-gold-paper-icon.dim_128x128.png" 
              alt="Gold Paper" 
              className="w-32 h-32 animate-pulse"
            />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-serif font-bold mb-4 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 bg-clip-text text-transparent">
            {t.hero.title}
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-serif mb-6 text-gold-400">
            {t.hero.subtitle}
          </h2>
          
          <p className="text-xl text-gold-300 mb-12">
            {t.hero.description}
          </p>

          <div className="flex items-center justify-center gap-4 mb-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
              className="border-gold-500 text-gold-500 hover:bg-gold-500/10"
            >
              <Globe className="mr-2 h-5 w-5" />
              {language === 'pt' ? 'EN' : 'PT'}
            </Button>
          </div>

          <div className="animate-bounce">
            <ChevronDown className="w-8 h-8 mx-auto text-gold-500" />
          </div>
        </div>
      </section>

      {/* Fixed Navigation */}
      <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-lg border-b border-gold-500/20">
        <ScrollArea className="w-full">
          <div className="flex items-center justify-start gap-2 px-4 py-3 min-w-max">
            {Object.entries(t.nav).map(([key, label]) => (
              <Button
                key={key}
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection(key)}
                className={`text-xs whitespace-nowrap ${
                  activeSection === key
                    ? 'bg-gold-500/20 text-gold-400 border border-gold-500/50'
                    : 'text-gold-500/70 hover:text-gold-400 hover:bg-gold-500/10'
                }`}
              >
                {label}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-16 space-y-32">
        {/* Executive Summary */}
        <section id="executive" className="scroll-mt-20">
          <Card className="bg-black/50 border-gold-500/30 glass-card">
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="/assets/generated/executive-summary-icon-transparent.dim_64x64.png" 
                  alt="Executive Summary" 
                  className="w-16 h-16"
                />
                <CardTitle className="text-4xl font-serif text-gold-400">
                  {t.sections.executive.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <p className="text-lg text-gold-300 leading-relaxed">
                {t.sections.executive.intro}
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <img 
                    src="/assets/generated/executive-summary-infographic.dim_600x400.png" 
                    alt="Executive Summary" 
                    className="w-full rounded-lg shadow-gold"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-serif text-gold-400">{t.sections.executive.vision}</h3>
                  <p className="text-gold-300">{t.sections.executive.visionText}</p>
                </div>
              </div>

              <Separator className="bg-gold-500/20" />

              <div>
                <h3 className="text-2xl font-serif text-gold-400 mb-6">{t.sections.executive.highlights}</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="bg-black/30 border-gold-500/20">
                    <CardContent className="pt-6">
                      <h4 className="text-xl font-semibold text-gold-400 mb-2">{t.sections.executive.highlight1}</h4>
                      <p className="text-gold-300 text-sm">{t.sections.executive.highlight1Text}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-black/30 border-gold-500/20">
                    <CardContent className="pt-6">
                      <h4 className="text-xl font-semibold text-gold-400 mb-2">{t.sections.executive.highlight2}</h4>
                      <p className="text-gold-300 text-sm">{t.sections.executive.highlight2Text}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-black/30 border-gold-500/20">
                    <CardContent className="pt-6">
                      <h4 className="text-xl font-semibold text-gold-400 mb-2">{t.sections.executive.highlight3}</h4>
                      <p className="text-gold-300 text-sm">{t.sections.executive.highlight3Text}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Tokenomics */}
        <section id="tokenomics" className="scroll-mt-20">
          <Card className="bg-black/50 border-gold-500/30 glass-card">
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="/assets/generated/tokenomics-icon-transparent.dim_64x64.png" 
                  alt="Tokenomics" 
                  className="w-16 h-16"
                />
                <CardTitle className="text-4xl font-serif text-gold-400">
                  {t.sections.tokenomics.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="text-center py-8 bg-gradient-to-r from-gold-900/20 via-gold-800/30 to-gold-900/20 rounded-lg">
                <p className="text-lg text-gold-400 mb-2">{t.sections.tokenomics.supply}</p>
                <p className="text-5xl font-bold text-gold-300">{t.sections.tokenomics.supplyValue}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <img 
                    src="/assets/generated/complete-tokenomics-breakdown.dim_800x600.png" 
                    alt="Tokenomics Distribution" 
                    className="w-full rounded-lg shadow-gold"
                  />
                </div>
                <div className="space-y-6">
                  <h3 className="text-2xl font-serif text-gold-400">{t.sections.tokenomics.distribution}</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-black/30 rounded-lg border border-gold-500/20">
                      <h4 className="text-lg font-semibold text-gold-400 mb-1">{t.sections.tokenomics.arDistribution}</h4>
                      <p className="text-gold-300 font-bold mb-1">{t.sections.tokenomics.arValue}</p>
                      <p className="text-sm text-gold-300/80">{t.sections.tokenomics.arDesc}</p>
                    </div>

                    <div className="p-4 bg-black/30 rounded-lg border border-gold-500/20">
                      <h4 className="text-lg font-semibold text-gold-400 mb-1">{t.sections.tokenomics.daoTreasury}</h4>
                      <p className="text-gold-300 font-bold mb-1">{t.sections.tokenomics.daoValue}</p>
                      <p className="text-sm text-gold-300/80">{t.sections.tokenomics.daoDesc}</p>
                    </div>

                    <div className="p-4 bg-black/30 rounded-lg border border-gold-500/20">
                      <h4 className="text-lg font-semibold text-gold-400 mb-1">{t.sections.tokenomics.team}</h4>
                      <p className="text-gold-300 font-bold mb-1">{t.sections.tokenomics.teamValue}</p>
                      <p className="text-sm text-gold-300/80">{t.sections.tokenomics.teamDesc}</p>
                    </div>

                    <div className="p-4 bg-black/30 rounded-lg border border-gold-500/20">
                      <h4 className="text-lg font-semibold text-gold-400 mb-1">{t.sections.tokenomics.presale}</h4>
                      <p className="text-gold-300 font-bold mb-1">{t.sections.tokenomics.presaleValue}</p>
                      <p className="text-sm text-gold-300/80">{t.sections.tokenomics.presaleDesc}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="bg-gold-500/20" />

              <div>
                <h3 className="text-2xl font-serif text-gold-400 mb-4">{t.sections.tokenomics.utility}</h3>
                <p className="text-gold-300 leading-relaxed">{t.sections.tokenomics.utilityText}</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* AR Distribution */}
        <section id="distribution" className="scroll-mt-20">
          <Card className="bg-black/50 border-gold-500/30 glass-card">
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="/assets/generated/global-ar-distribution-icon-transparent.dim_64x64.png" 
                  alt="AR Distribution" 
                  className="w-16 h-16"
                />
                <CardTitle className="text-4xl font-serif text-gold-400">
                  {t.sections.distribution.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-2xl font-serif text-gold-400 mb-4">{t.sections.distribution.overview}</h3>
                <p className="text-gold-300 leading-relaxed mb-6">{t.sections.distribution.overviewText}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-black/30 border-gold-500/20 text-center">
                  <CardContent className="pt-6">
                    <p className="text-sm text-gold-400 mb-2">{t.sections.distribution.total}</p>
                    <p className="text-3xl font-bold text-gold-300">{t.sections.distribution.totalValue}</p>
                  </CardContent>
                </Card>
                <Card className="bg-black/30 border-gold-500/20 text-center">
                  <CardContent className="pt-6">
                    <p className="text-sm text-gold-400 mb-2">{t.sections.distribution.totalTokens}</p>
                    <p className="text-3xl font-bold text-gold-300">{t.sections.distribution.totalTokensValue}</p>
                  </CardContent>
                </Card>
                <Card className="bg-black/30 border-gold-500/20 text-center">
                  <CardContent className="pt-6">
                    <p className="text-sm text-gold-400 mb-2">{t.sections.distribution.perSpot}</p>
                    <p className="text-3xl font-bold text-gold-300">{t.sections.distribution.perSpotValue}</p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <img 
                  src="/assets/generated/global-ar-distribution-detailed.dim_1200x800.png" 
                  alt="Global AR Distribution Map" 
                  className="w-full rounded-lg shadow-gold mb-6"
                />
              </div>

              <div>
                <h3 className="text-2xl font-serif text-gold-400 mb-6">{t.sections.distribution.regions}</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-black/30 rounded-lg border border-gold-500/20">
                    <h4 className="text-lg font-semibold text-gold-400 mb-1">{t.sections.distribution.asia}</h4>
                    <p className="text-gold-300">{t.sections.distribution.asiaValue}</p>
                  </div>
                  <div className="p-4 bg-black/30 rounded-lg border border-gold-500/20">
                    <h4 className="text-lg font-semibold text-gold-400 mb-1">{t.sections.distribution.northAmerica}</h4>
                    <p className="text-gold-300">{t.sections.distribution.northAmericaValue}</p>
                  </div>
                  <div className="p-4 bg-black/30 rounded-lg border border-gold-500/20">
                    <h4 className="text-lg font-semibold text-gold-400 mb-1">{t.sections.distribution.europe}</h4>
                    <p className="text-gold-300">{t.sections.distribution.europeValue}</p>
                  </div>
                  <div className="p-4 bg-black/30 rounded-lg border border-gold-500/20">
                    <h4 className="text-lg font-semibold text-gold-400 mb-1">{t.sections.distribution.latinAmerica}</h4>
                    <p className="text-gold-300">{t.sections.distribution.latinAmericaValue}</p>
                  </div>
                  <div className="p-4 bg-black/30 rounded-lg border border-gold-500/20">
                    <h4 className="text-lg font-semibold text-gold-400 mb-1">{t.sections.distribution.africa}</h4>
                    <p className="text-gold-300">{t.sections.distribution.africaValue}</p>
                  </div>
                  <div className="p-4 bg-black/30 rounded-lg border border-gold-500/20">
                    <h4 className="text-lg font-semibold text-gold-400 mb-1">{t.sections.distribution.others}</h4>
                    <p className="text-gold-300">{t.sections.distribution.othersValue}</p>
                  </div>
                </div>
              </div>

              <Separator className="bg-gold-500/20" />

              <div>
                <h3 className="text-2xl font-serif text-gold-400 mb-4">{t.sections.distribution.mechanics}</h3>
                <p className="text-gold-300 leading-relaxed">{t.sections.distribution.mechanicsText}</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Treasury / Vesting / Burn */}
        <section id="treasury" className="scroll-mt-20">
          <Card className="bg-black/50 border-gold-500/30 glass-card">
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="/assets/generated/vesting-icon-transparent.dim_64x64.png" 
                  alt="Treasury Vesting Burn" 
                  className="w-16 h-16"
                />
                <CardTitle className="text-4xl font-serif text-gold-400">
                  {t.sections.treasury.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-2xl font-serif text-gold-400 mb-4">{t.sections.treasury.vestingTitle}</h3>
                <p className="text-gold-300 leading-relaxed mb-6">{t.sections.treasury.vestingIntro}</p>
                
                <img 
                  src="/assets/generated/comprehensive-vesting-schedule.dim_800x500.png" 
                  alt="Vesting Schedule" 
                  className="w-full rounded-lg shadow-gold mb-6"
                />

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-black/30 rounded-lg border border-gold-500/20">
                    <h4 className="text-lg font-semibold text-gold-400 mb-2">{t.sections.treasury.presaleVesting}</h4>
                    <p className="text-sm text-gold-300">{t.sections.treasury.presaleVestingText}</p>
                  </div>
                  <div className="p-4 bg-black/30 rounded-lg border border-gold-500/20">
                    <h4 className="text-lg font-semibold text-gold-400 mb-2">{t.sections.treasury.teamVesting}</h4>
                    <p className="text-sm text-gold-300">{t.sections.treasury.teamVestingText}</p>
                  </div>
                  <div className="p-4 bg-black/30 rounded-lg border border-gold-500/20">
                    <h4 className="text-lg font-semibold text-gold-400 mb-2">{t.sections.treasury.daoVesting}</h4>
                    <p className="text-sm text-gold-300">{t.sections.treasury.daoVestingText}</p>
                  </div>
                </div>
              </div>

              <Separator className="bg-gold-500/20" />

              <div>
                <h3 className="text-2xl font-serif text-gold-400 mb-4">{t.sections.treasury.burnTitle}</h3>
                <p className="text-gold-300 leading-relaxed mb-6">{t.sections.treasury.burnIntro}</p>

                <img 
                  src="/assets/generated/burn-mechanism-flowchart.dim_600x400.png" 
                  alt="Burn Mechanism" 
                  className="w-full rounded-lg shadow-gold mb-6"
                />

                <div>
                  <h4 className="text-xl font-semibold text-gold-400 mb-4">{t.sections.treasury.burnSources}</h4>
                  <ul className="space-y-2 text-gold-300">
                    <li className="flex items-start">
                      <span className="text-gold-500 mr-2">•</span>
                      {t.sections.treasury.burnSource1}
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold-500 mr-2">•</span>
                      {t.sections.treasury.burnSource2}
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold-500 mr-2">•</span>
                      {t.sections.treasury.burnSource3}
                    </li>
                  </ul>
                </div>

                <div className="mt-6 p-6 bg-gradient-to-r from-gold-900/20 via-gold-800/30 to-gold-900/20 rounded-lg">
                  <h4 className="text-xl font-semibold text-gold-400 mb-2">{t.sections.treasury.burnGoal}</h4>
                  <p className="text-gold-300">{t.sections.treasury.burnGoalText}</p>
                </div>
              </div>

              <Separator className="bg-gold-500/20" />

              {/* Conceptual Flow Diagram */}
              <div>
                <h3 className="text-2xl font-serif text-gold-400 mb-4">{t.sections.treasury.conceptualTitle}</h3>
                <p className="text-gold-300 leading-relaxed mb-6">{t.sections.treasury.conceptualIntro}</p>

                <div className="relative">
                  <img 
                    src="/assets/generated/fluxos-conceptuais-tesouraria-vesting-queima.dim_800x600.png" 
                    alt="Conceptual Flows - Treasury Vesting Burn" 
                    className="w-full rounded-lg shadow-gold border border-gold-500/30"
                  />
                  <div className="mt-4 p-4 bg-black/40 rounded-lg border border-gold-500/20">
                    <p className="text-xs text-gold-300 italic text-center">
                      {t.sections.treasury.conceptualNote}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* DAO & Governance - COMPLETE SECTION 5 */}
        <section id="dao" className="scroll-mt-20">
          <Card className="bg-black/50 border-gold-500/30 glass-card">
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="/assets/generated/dao-governance-transparent.dim_64x64.png" 
                  alt="DAO Governance" 
                  className="w-16 h-16"
                />
                <CardTitle className="text-4xl font-serif text-gold-400">
                  {t.sections.dao.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-12">
              <p className="text-lg text-gold-300 leading-relaxed">
                {t.sections.dao.intro}
              </p>

              {/* 5.1 Estrutura da DAO */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <img 
                    src="/assets/generated/dao-governance-transparent.dim_64x64.png" 
                    alt="DAO Structure" 
                    className="w-12 h-12"
                  />
                  <h3 className="text-3xl font-serif text-gold-400">{t.sections.dao.section1Title}</h3>
                </div>
                
                <p className="text-gold-300 leading-relaxed">{t.sections.dao.section1Intro}</p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <img 
                      src="/assets/generated/dao-governance-structure.dim_700x500.png" 
                      alt="DAO Structure" 
                      className="w-full rounded-lg shadow-gold border border-gold-500/30"
                    />
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-semibold text-gold-400 mb-4">{t.sections.dao.section1LayersTitle}</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-black/30 rounded-lg border border-gold-500/20">
                          <h5 className="text-md font-semibold text-gold-400 mb-1">{t.sections.dao.section1Layer1}</h5>
                          <p className="text-sm text-gold-300">{t.sections.dao.section1Layer1Desc}</p>
                        </div>
                        <div className="p-3 bg-black/30 rounded-lg border border-gold-500/20">
                          <h5 className="text-md font-semibold text-gold-400 mb-1">{t.sections.dao.section1Layer2}</h5>
                          <p className="text-sm text-gold-300">{t.sections.dao.section1Layer2Desc}</p>
                        </div>
                        <div className="p-3 bg-black/30 rounded-lg border border-gold-500/20">
                          <h5 className="text-md font-semibold text-gold-400 mb-1">{t.sections.dao.section1Layer3}</h5>
                          <p className="text-sm text-gold-300">{t.sections.dao.section1Layer3Desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gold-400 mb-4">{t.sections.dao.section1ModulesTitle}</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="bg-black/30 border-gold-500/20">
                      <CardContent className="pt-6">
                        <h5 className="text-lg font-semibold text-gold-400 mb-2">{t.sections.dao.section1Module1}</h5>
                        <p className="text-sm text-gold-300">{t.sections.dao.section1Module1Desc}</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-black/30 border-gold-500/20">
                      <CardContent className="pt-6">
                        <h5 className="text-lg font-semibold text-gold-400 mb-2">{t.sections.dao.section1Module2}</h5>
                        <p className="text-sm text-gold-300">{t.sections.dao.section1Module2Desc}</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-black/30 border-gold-500/20">
                      <CardContent className="pt-6">
                        <h5 className="text-lg font-semibold text-gold-400 mb-2">{t.sections.dao.section1Module3}</h5>
                        <p className="text-sm text-gold-300">{t.sections.dao.section1Module3Desc}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              <Separator className="bg-gold-500/20" />

              {/* 5.2 Tipos de Propostas */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <img 
                    src="/assets/generated/dao-voting-icon-transparent.dim_64x64.png" 
                    alt="Proposal Types" 
                    className="w-12 h-12"
                  />
                  <h3 className="text-3xl font-serif text-gold-400">{t.sections.dao.section2Title}</h3>
                </div>
                
                <p className="text-gold-300 leading-relaxed">{t.sections.dao.section2Intro}</p>

                <div>
                  <h4 className="text-xl font-semibold text-gold-400 mb-4">{t.sections.dao.section2TableTitle}</h4>
                  <div className="overflow-x-auto">
                    <Table className="border border-gold-500/20">
                      <TableHeader>
                        <TableRow className="border-gold-500/20 hover:bg-gold-500/5">
                          <TableHead className="text-gold-400 font-semibold">{t.sections.dao.section2Type}</TableHead>
                          <TableHead className="text-gold-400 font-semibold">{t.sections.dao.section2Description}</TableHead>
                          <TableHead className="text-gold-400 font-semibold">{t.sections.dao.section2ApprovalFlow}</TableHead>
                          <TableHead className="text-gold-400 font-semibold">{t.sections.dao.section2RejectionFlow}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="border-gold-500/20 hover:bg-gold-500/5">
                          <TableCell className="text-gold-300 font-semibold">{t.sections.dao.section2Type1}</TableCell>
                          <TableCell className="text-gold-300 text-sm">{t.sections.dao.section2Type1Desc}</TableCell>
                          <TableCell className="text-gold-300 text-sm">{t.sections.dao.section2Type1Approval}</TableCell>
                          <TableCell className="text-gold-300 text-sm">{t.sections.dao.section2Type1Rejection}</TableCell>
                        </TableRow>
                        <TableRow className="border-gold-500/20 hover:bg-gold-500/5">
                          <TableCell className="text-gold-300 font-semibold">{t.sections.dao.section2Type2}</TableCell>
                          <TableCell className="text-gold-300 text-sm">{t.sections.dao.section2Type2Desc}</TableCell>
                          <TableCell className="text-gold-300 text-sm">{t.sections.dao.section2Type2Approval}</TableCell>
                          <TableCell className="text-gold-300 text-sm">{t.sections.dao.section2Type2Rejection}</TableCell>
                        </TableRow>
                        <TableRow className="border-gold-500/20 hover:bg-gold-500/5">
                          <TableCell className="text-gold-300 font-semibold">{t.sections.dao.section2Type3}</TableCell>
                          <TableCell className="text-gold-300 text-sm">{t.sections.dao.section2Type3Desc}</TableCell>
                          <TableCell className="text-gold-300 text-sm">{t.sections.dao.section2Type3Approval}</TableCell>
                          <TableCell className="text-gold-300 text-sm">{t.sections.dao.section2Type3Rejection}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div>
                  <img 
                    src="/assets/generated/dao-proposal-types-table.dim_700x400.png" 
                    alt="Proposal Types Table" 
                    className="w-full rounded-lg shadow-gold border border-gold-500/30"
                  />
                </div>
              </div>

              <Separator className="bg-gold-500/20" />

              {/* 5.3 Papéis dos Membros */}
              <div className="space-y-6">
                <h3 className="text-3xl font-serif text-gold-400">{t.sections.dao.section3Title}</h3>
                
                <p className="text-gold-300 leading-relaxed">{t.sections.dao.section3Intro}</p>

                <div>
                  <h4 className="text-xl font-semibold text-gold-400 mb-4">{t.sections.dao.section3RolesTitle}</h4>
                  <div className="overflow-x-auto">
                    <Table className="border border-gold-500/20">
                      <TableHeader>
                        <TableRow className="border-gold-500/20 hover:bg-gold-500/5">
                          <TableHead className="text-gold-400 font-semibold">{t.sections.dao.section3Role}</TableHead>
                          <TableHead className="text-gold-400 font-semibold">{t.sections.dao.section3Permissions}</TableHead>
                          <TableHead className="text-gold-400 font-semibold">{t.sections.dao.section3Requirements}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="border-gold-500/20 hover:bg-gold-500/5">
                          <TableCell className="text-gold-300 font-semibold">{t.sections.dao.section3Role1}</TableCell>
                          <TableCell className="text-gold-300 text-sm">{t.sections.dao.section3Role1Perm}</TableCell>
                          <TableCell className="text-gold-300 text-sm">{t.sections.dao.section3Role1Req}</TableCell>
                        </TableRow>
                        <TableRow className="border-gold-500/20 hover:bg-gold-500/5">
                          <TableCell className="text-gold-300 font-semibold">{t.sections.dao.section3Role2}</TableCell>
                          <TableCell className="text-gold-300 text-sm">{t.sections.dao.section3Role2Perm}</TableCell>
                          <TableCell className="text-gold-300 text-sm">{t.sections.dao.section3Role2Req}</TableCell>
                        </TableRow>
                        <TableRow className="border-gold-500/20 hover:bg-gold-500/5">
                          <TableCell className="text-gold-300 font-semibold">{t.sections.dao.section3Role3}</TableCell>
                          <TableCell className="text-gold-300 text-sm">{t.sections.dao.section3Role3Perm}</TableCell>
                          <TableCell className="text-gold-300 text-sm">{t.sections.dao.section3Role3Req}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div>
                  <img 
                    src="/assets/generated/dao-member-roles-hierarchy.dim_600x400.png" 
                    alt="Member Roles Hierarchy" 
                    className="w-full rounded-lg shadow-gold border border-gold-500/30"
                  />
                </div>
              </div>

              <Separator className="bg-gold-500/20" />

              {/* 5.4 Fluxos de Votação */}
              <div className="space-y-6">
                <h3 className="text-3xl font-serif text-gold-400">{t.sections.dao.section4Title}</h3>
                
                <p className="text-gold-300 leading-relaxed">{t.sections.dao.section4Intro}</p>

                <div>
                  <h4 className="text-xl font-semibold text-gold-400 mb-4">{t.sections.dao.section4StepsTitle}</h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-black/30 rounded-lg border border-gold-500/20">
                      <h5 className="text-lg font-semibold text-gold-400 mb-2">{t.sections.dao.section4Step1}</h5>
                      <p className="text-sm text-gold-300">{t.sections.dao.section4Step1Desc}</p>
                    </div>
                    <div className="p-4 bg-black/30 rounded-lg border border-gold-500/20">
                      <h5 className="text-lg font-semibold text-gold-400 mb-2">{t.sections.dao.section4Step2}</h5>
                      <p className="text-sm text-gold-300">{t.sections.dao.section4Step2Desc}</p>
                    </div>
                    <div className="p-4 bg-black/30 rounded-lg border border-gold-500/20">
                      <h5 className="text-lg font-semibold text-gold-400 mb-2">{t.sections.dao.section4Step3}</h5>
                      <p className="text-sm text-gold-300">{t.sections.dao.section4Step3Desc}</p>
                    </div>
                    <div className="p-4 bg-black/30 rounded-lg border border-gold-500/20">
                      <h5 className="text-lg font-semibold text-gold-400 mb-2">{t.sections.dao.section4Step4}</h5>
                      <p className="text-sm text-gold-300">{t.sections.dao.section4Step4Desc}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <img 
                    src="/assets/generated/dao-voting-flow-conceptual.dim_800x500.png" 
                    alt="Voting Flow Conceptual" 
                    className="w-full rounded-lg shadow-gold border border-gold-500/30"
                  />
                </div>

                <div className="p-6 bg-gradient-to-r from-gold-900/20 via-gold-800/30 to-gold-900/20 rounded-lg">
                  <h4 className="text-xl font-semibold text-gold-400 mb-2">{t.sections.dao.section4QuorumTitle}</h4>
                  <p className="text-gold-300">{t.sections.dao.section4QuorumDesc}</p>
                </div>
              </div>

              <Separator className="bg-gold-500/20" />

              {/* 5.5 Ligação Conceptual */}
              <div className="space-y-6">
                <h3 className="text-3xl font-serif text-gold-400">{t.sections.dao.section5Title}</h3>
                
                <p className="text-gold-300 leading-relaxed">{t.sections.dao.section5Intro}</p>

                <div>
                  <h4 className="text-xl font-semibold text-gold-400 mb-4">{t.sections.dao.section5ConnectionsTitle}</h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-black/30 rounded-lg border border-gold-500/20">
                      <h5 className="text-lg font-semibold text-gold-400 mb-2">{t.sections.dao.section5Connection1}</h5>
                      <p className="text-sm text-gold-300">{t.sections.dao.section5Connection1Desc}</p>
                    </div>
                    <div className="p-4 bg-black/30 rounded-lg border border-gold-500/20">
                      <h5 className="text-lg font-semibold text-gold-400 mb-2">{t.sections.dao.section5Connection2}</h5>
                      <p className="text-sm text-gold-300">{t.sections.dao.section5Connection2Desc}</p>
                    </div>
                    <div className="p-4 bg-black/30 rounded-lg border border-gold-500/20">
                      <h5 className="text-lg font-semibold text-gold-400 mb-2">{t.sections.dao.section5Connection3}</h5>
                      <p className="text-sm text-gold-300">{t.sections.dao.section5Connection3Desc}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gold-400 mb-4">{t.sections.dao.section5DiagramTitle}</h4>
                  <p className="text-sm text-gold-300 mb-4">{t.sections.dao.section5DiagramDesc}</p>
                  <img 
                    src="/assets/generated/dao-governance-cycle-conceptual.dim_800x600.png" 
                    alt="DAO Governance Cycle Conceptual" 
                    className="w-full rounded-lg shadow-gold border border-gold-500/30"
                  />
                </div>

                <div>
                  <img 
                    src="/assets/generated/dao-layer-separation-architecture.dim_700x500.png" 
                    alt="DAO Layer Separation Architecture" 
                    className="w-full rounded-lg shadow-gold border border-gold-500/30"
                  />
                </div>
              </div>

              <Separator className="bg-gold-500/20" />

              {/* Compliance Footer */}
              <div className="p-6 bg-gradient-to-r from-gold-900/20 via-gold-800/30 to-gold-900/20 rounded-lg border border-gold-500/30">
                <h4 className="text-xl font-semibold text-gold-400 mb-4 text-center">{t.sections.dao.complianceTitle}</h4>
                <p className="text-sm text-gold-300 leading-relaxed text-justify">
                  {t.sections.dao.complianceText}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Roadmap */}
        <section id="roadmap" className="scroll-mt-20">
          <Card className="bg-black/50 border-gold-500/30 glass-card">
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="/assets/generated/roadmap-icon-transparent.dim_64x64.png" 
                  alt="Roadmap" 
                  className="w-16 h-16"
                />
                <CardTitle className="text-4xl font-serif text-gold-400">
                  {t.sections.roadmap.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <img 
                  src="/assets/generated/complete-roadmap-timeline.dim_1000x600.png" 
                  alt="Roadmap Timeline" 
                  className="w-full rounded-lg shadow-gold mb-8"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-black/30 border-gold-500/20">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gold-400">{t.sections.roadmap.q1}</CardTitle>
                    <p className="text-lg text-gold-300">{t.sections.roadmap.q1Title}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gold-300">{t.sections.roadmap.q1Items}</p>
                  </CardContent>
                </Card>

                <Card className="bg-black/30 border-gold-500/20">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gold-400">{t.sections.roadmap.q2}</CardTitle>
                    <p className="text-lg text-gold-300">{t.sections.roadmap.q2Title}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gold-300">{t.sections.roadmap.q2Items}</p>
                  </CardContent>
                </Card>

                <Card className="bg-black/30 border-gold-500/20">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gold-400">{t.sections.roadmap.q3}</CardTitle>
                    <p className="text-lg text-gold-300">{t.sections.roadmap.q3Title}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gold-300">{t.sections.roadmap.q3Items}</p>
                  </CardContent>
                </Card>

                <Card className="bg-black/30 border-gold-500/20">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gold-400">{t.sections.roadmap.q4}</CardTitle>
                    <p className="text-lg text-gold-300">{t.sections.roadmap.q4Title}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gold-300">{t.sections.roadmap.q4Items}</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Presale */}
        <section id="presale" className="scroll-mt-20">
          <Card className="bg-black/50 border-gold-500/30 glass-card">
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="/assets/generated/presale-icon-transparent.dim_64x64.png" 
                  alt="Presale" 
                  className="w-16 h-16"
                />
                <CardTitle className="text-4xl font-serif text-gold-400">
                  {t.sections.presale.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-2xl font-serif text-gold-400 mb-4">{t.sections.presale.overview}</h3>
                <p className="text-gold-300 leading-relaxed mb-6">{t.sections.presale.overviewText}</p>
              </div>

              <div>
                <img 
                  src="/assets/generated/presale-phases-detailed.dim_700x400.png" 
                  alt="Presale Phases" 
                  className="w-full rounded-lg shadow-gold mb-6"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-gold-900/30 to-black border-gold-500/30">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gold-400">{t.sections.presale.phase1}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gold-300 whitespace-pre-line">{t.sections.presale.phase1Details}</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-gold-800/30 to-black border-gold-500/30">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gold-400">{t.sections.presale.phase2}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gold-300 whitespace-pre-line">{t.sections.presale.phase2Details}</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-gold-700/30 to-black border-gold-500/30">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gold-400">{t.sections.presale.phase3}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gold-300 whitespace-pre-line">{t.sections.presale.phase3Details}</p>
                  </CardContent>
                </Card>
              </div>

              <Separator className="bg-gold-500/20" />

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-black/30 rounded-lg border border-gold-500/20">
                  <h4 className="text-xl font-semibold text-gold-400 mb-3">{t.sections.presale.terms}</h4>
                  <p className="text-sm text-gold-300">{t.sections.presale.termsText}</p>
                </div>
                <div className="p-6 bg-black/30 rounded-lg border border-gold-500/20">
                  <h4 className="text-xl font-semibold text-gold-400 mb-3">{t.sections.presale.duration}</h4>
                  <p className="text-sm text-gold-300">{t.sections.presale.durationText}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Technical Architecture */}
        <section id="technical" className="scroll-mt-20">
          <Card className="bg-black/50 border-gold-500/30 glass-card">
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="/assets/generated/technical-architecture-icon-transparent.dim_64x64.png" 
                  alt="Technical Architecture" 
                  className="w-16 h-16"
                />
                <CardTitle className="text-4xl font-serif text-gold-400">
                  {t.sections.technical.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <img 
                  src="/assets/generated/technical-architecture-diagram.dim_800x600.png" 
                  alt="Technical Architecture" 
                  className="w-full rounded-lg shadow-gold mb-8"
                />
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-black/30 rounded-lg border border-gold-500/20">
                  <h4 className="text-xl font-semibold text-gold-400 mb-3">{t.sections.technical.blockchain}</h4>
                  <p className="text-gold-300">{t.sections.technical.blockchainText}</p>
                </div>

                <div className="p-6 bg-black/30 rounded-lg border border-gold-500/20">
                  <h4 className="text-xl font-semibold text-gold-400 mb-3">{t.sections.technical.ar}</h4>
                  <p className="text-gold-300">{t.sections.technical.arText}</p>
                </div>

                <div className="p-6 bg-black/30 rounded-lg border border-gold-500/20">
                  <h4 className="text-xl font-semibold text-gold-400 mb-3">{t.sections.technical.realtime}</h4>
                  <p className="text-gold-300">{t.sections.technical.realtimeText}</p>
                </div>

                <div className="p-6 bg-black/30 rounded-lg border border-gold-500/20">
                  <h4 className="text-xl font-semibold text-gold-400 mb-3">{t.sections.technical.security}</h4>
                  <p className="text-gold-300">{t.sections.technical.securityText}</p>
                </div>

                <div className="p-6 bg-black/30 rounded-lg border border-gold-500/20">
                  <h4 className="text-xl font-semibold text-gold-400 mb-3">{t.sections.technical.scalability}</h4>
                  <p className="text-gold-300">{t.sections.technical.scalabilityText}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Game Systems */}
        <section id="gameSystems" className="scroll-mt-20">
          <Card className="bg-black/50 border-gold-500/30 glass-card">
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="/assets/generated/game-systems-icon-transparent.dim_64x64.png" 
                  alt="Game Systems" 
                  className="w-16 h-16"
                />
                <CardTitle className="text-4xl font-serif text-gold-400">
                  {t.sections.gameSystems.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <img 
                  src="/assets/generated/game-systems-flowchart.dim_700x500.png" 
                  alt="Game Systems" 
                  className="w-full rounded-lg shadow-gold mb-8"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-black/30 border-gold-500/20">
                  <CardHeader>
                    <CardTitle className="text-xl text-gold-400">{t.sections.gameSystems.arGameplay}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gold-300">{t.sections.gameSystems.arGameplayText}</p>
                  </CardContent>
                </Card>

                <Card className="bg-black/30 border-gold-500/20">
                  <CardHeader>
                    <CardTitle className="text-xl text-gold-400">{t.sections.gameSystems.monsters}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gold-300">{t.sections.gameSystems.monstersText}</p>
                  </CardContent>
                </Card>

                <Card className="bg-black/30 border-gold-500/20">
                  <CardHeader>
                    <CardTitle className="text-xl text-gold-400">{t.sections.gameSystems.planting}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gold-300">{t.sections.gameSystems.plantingText}</p>
                  </CardContent>
                </Card>

                <Card className="bg-black/30 border-gold-500/20">
                  <CardHeader>
                    <CardTitle className="text-xl text-gold-400">{t.sections.gameSystems.rescue}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gold-300">{t.sections.gameSystems.rescueText}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="p-6 bg-gradient-to-r from-gold-900/20 via-gold-800/30 to-gold-900/20 rounded-lg">
                <h4 className="text-xl font-semibold text-gold-400 mb-3">{t.sections.gameSystems.progression}</h4>
                <p className="text-gold-300">{t.sections.gameSystems.progressionText}</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Legal & Attribution */}
        <section id="legal" className="scroll-mt-20">
          <Card className="bg-black/50 border-gold-500/30 glass-card">
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="/assets/generated/legal-compliance-icon-transparent.dim_64x64.png" 
                  alt="Legal" 
                  className="w-16 h-16"
                />
                <CardTitle className="text-4xl font-serif text-gold-400">
                  {t.sections.legal.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-2xl font-serif text-gold-400 mb-6">{t.sections.legal.compliance}</h3>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <Card className="bg-black/30 border-gold-500/20">
                    <CardHeader>
                      <img 
                        src="/assets/generated/gdpr-compliance-badge.dim_128x128.png" 
                        alt="GDPR" 
                        className="w-16 h-16 mx-auto mb-2"
                      />
                      <CardTitle className="text-xl text-gold-400 text-center">{t.sections.legal.gdpr}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gold-300 text-center">{t.sections.legal.gdprText}</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-black/30 border-gold-500/20">
                    <CardHeader>
                      <img 
                        src="/assets/generated/legal-compliance-badge-transparent.dim_48x48.png" 
                        alt="MiCA" 
                        className="w-16 h-16 mx-auto mb-2"
                      />
                      <CardTitle className="text-xl text-gold-400 text-center">{t.sections.legal.mica}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gold-300 text-center">{t.sections.legal.micaText}</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-black/30 border-gold-500/20">
                    <CardHeader>
                      <img 
                        src="/assets/generated/legal-compliance-icon-transparent.dim_64x64.png" 
                        alt="KYC/AML" 
                        className="w-16 h-16 mx-auto mb-2"
                      />
                      <CardTitle className="text-xl text-gold-400 text-center">{t.sections.legal.kyc}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gold-300 text-center">{t.sections.legal.kycText}</p>
                    </CardContent>
                  </Card>
                </div>

                <img 
                  src="/assets/generated/legal-compliance-framework.dim_600x400.png" 
                  alt="Legal Compliance Framework" 
                  className="w-full rounded-lg shadow-gold"
                />
              </div>

              <Separator className="bg-gold-500/20" />

              <div className="p-6 bg-gradient-to-r from-red-900/20 via-red-800/30 to-red-900/20 rounded-lg border border-red-500/30">
                <h4 className="text-xl font-semibold text-red-400 mb-3">{t.sections.legal.disclaimer}</h4>
                <p className="text-red-300">{t.sections.legal.disclaimerText}</p>
              </div>

              <Separator className="bg-gold-500/20" />

              <div className="text-center space-y-4">
                <div>
                  <h4 className="text-xl font-semibold text-gold-400 mb-2">{t.sections.legal.attribution}</h4>
                  <p className="text-gold-300">{t.sections.legal.attributionText}</p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gold-400 mb-2">{t.sections.legal.contact}</h4>
                  <p className="text-gold-300">
                    <a href={`mailto:${t.sections.legal.contactEmail}`} className="hover:text-gold-400 transition-colors">
                      {t.sections.legal.contactEmail}
                    </a>
                  </p>
                  <p className="text-gold-300">
                    <a href={`https://${t.sections.legal.contactWebsite}`} target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">
                      {t.sections.legal.contactWebsite}
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black/95 border-t border-gold-500/20 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
          <div className="flex items-center justify-center gap-2">
            <img 
              src="/assets/generated/htgamers-logo.dim_200x100.png" 
              alt="HTgamers" 
              className="h-8"
            />
            <p className="text-gold-400 font-semibold">{t.footer.builtBy}</p>
          </div>

          <div className="space-y-2 text-gold-300">
            <p>
              <a href={`mailto:${t.footer.email}`} className="hover:text-gold-400 transition-colors">
                {t.footer.email}
              </a>
            </p>
            <p>
              <a href={`https://${t.footer.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">
                {t.footer.website}
              </a>
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <img 
              src="/assets/generated/gdpr-compliance-badge.dim_128x128.png" 
              alt="GDPR" 
              className="h-12"
            />
            <img 
              src="/assets/generated/legal-compliance-badge-transparent.dim_48x48.png" 
              alt="MiCA" 
              className="h-12"
            />
          </div>

          <p className="text-sm text-gold-300">{t.footer.compliance}</p>

          <Separator className="bg-gold-500/20 max-w-md mx-auto" />

          <div className="animate-pulse">
            <p className="text-sm text-gold-400 italic">{t.footer.disclaimer}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
