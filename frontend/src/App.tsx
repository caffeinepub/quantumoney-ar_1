import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';

// Lazy-loaded pages
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const TokenomicsPage = lazy(() => import('./pages/TokenomicsPage'));
const GameSystemsPage = lazy(() => import('./pages/GameSystemsPage'));
const RoadmapPage = lazy(() => import('./pages/RoadmapPage'));
const TechnicalPage = lazy(() => import('./pages/TechnicalPage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const GoldPaper = lazy(() => import('./pages/GoldPaper'));
const DocsPage = lazy(() => import('./pages/DocsPage'));
const DAOPage = lazy(() => import('./pages/DAOPage'));
const DAOCreateProposalPage = lazy(() => import('./pages/DAOCreateProposalPage'));
const DAOProposalDetailPage = lazy(() => import('./pages/DAOProposalDetailPage'));
const Perfil = lazy(() => import('./pages/Perfil'));
const WalletPage = lazy(() => import('./pages/WalletPage'));
const MapPage = lazy(() => import('./pages/MapPage'));
const ARGamePage = lazy(() => import('./pages/ARGamePage'));
const PublicChatPage = lazy(() => import('./pages/PublicChatPage'));
const BancoCentral = lazy(() => import('./pages/BancoCentral'));
const VestingDeflationPage = lazy(() => import('./pages/VestingDeflationPage'));
const PresalePage = lazy(() => import('./pages/PresalePage'));
const ARDistributionPage = lazy(() => import('./pages/ARDistributionPage'));
const TreasuryMonetaryPolicyPage = lazy(() => import('./pages/TreasuryMonetaryPolicyPage'));
const QMYTokenPage = lazy(() => import('./pages/QMYTokenPage'));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const PreProposalsPage = lazy(() => import('./pages/PreProposalsPage'));
const PreProposalDetailPage = lazy(() => import('./pages/PreProposalDetailPage'));
const SwapPage = lazy(() => import('./pages/SwapPage'));
const VestingQTM = lazy(() => import('./pages/VestingQTM'));
const QueimaDeflacao = lazy(() => import('./pages/QueimaDeflacao'));
const Distribuicao = lazy(() => import('./pages/Distribuicao'));
const Presale = lazy(() => import('./pages/Presale'));
const PreVendaQTM = lazy(() => import('./pages/PreVendaQTM'));
const SwapQTMICP = lazy(() => import('./pages/SwapQTMICP'));
const Tutorial = lazy(() => import('./pages/Tutorial'));
const Colecao = lazy(() => import('./pages/Colecao'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const LandingPage = lazy(() => import('./pages/LandingPage'));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-primary animate-pulse text-xl font-cinzel">A carregar...</div>
  </div>
);

// Root route with Layout
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: HomePage });
const aboutRoute = createRoute({ getParentRoute: () => rootRoute, path: '/about', component: AboutPage });
const tokenomicsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/tokenomics', component: TokenomicsPage });
const gameSystemsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/game-systems', component: GameSystemsPage });
const roadmapRoute = createRoute({ getParentRoute: () => rootRoute, path: '/roadmap', component: RoadmapPage });
const technicalRoute = createRoute({ getParentRoute: () => rootRoute, path: '/technical', component: TechnicalPage });
const legalRoute = createRoute({ getParentRoute: () => rootRoute, path: '/legal', component: LegalPage });
const contactRoute = createRoute({ getParentRoute: () => rootRoute, path: '/contact', component: ContactPage });
const goldPaperRoute = createRoute({ getParentRoute: () => rootRoute, path: '/gold-paper', component: GoldPaper });
const docsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/docs', component: DocsPage });
const daoRoute = createRoute({ getParentRoute: () => rootRoute, path: '/dao', component: DAOPage });
const daoCreateRoute = createRoute({ getParentRoute: () => rootRoute, path: '/dao/create', component: DAOCreateProposalPage });
const daoDetailRoute = createRoute({ getParentRoute: () => rootRoute, path: '/dao/$proposalId', component: DAOProposalDetailPage });
const perfilRoute = createRoute({ getParentRoute: () => rootRoute, path: '/perfil', component: Perfil });
const profileRoute = createRoute({ getParentRoute: () => rootRoute, path: '/profile', component: ProfilePage });
const walletRoute = createRoute({ getParentRoute: () => rootRoute, path: '/wallet', component: WalletPage });
const mapRoute = createRoute({ getParentRoute: () => rootRoute, path: '/map', component: MapPage });
const arRoute = createRoute({ getParentRoute: () => rootRoute, path: '/ar', component: ARGamePage });
const chatRoute = createRoute({ getParentRoute: () => rootRoute, path: '/chat', component: PublicChatPage });
const bancoCentralRoute = createRoute({ getParentRoute: () => rootRoute, path: '/central-bank', component: BancoCentral });
const vestingDeflationRoute = createRoute({ getParentRoute: () => rootRoute, path: '/vesting-deflation', component: VestingDeflationPage });
const presalePageRoute = createRoute({ getParentRoute: () => rootRoute, path: '/presale-info', component: PresalePage });
const arDistributionRoute = createRoute({ getParentRoute: () => rootRoute, path: '/ar-distribution', component: ARDistributionPage });
const treasuryRoute = createRoute({ getParentRoute: () => rootRoute, path: '/treasury', component: TreasuryMonetaryPolicyPage });
const qmyTokenRoute = createRoute({ getParentRoute: () => rootRoute, path: '/qmy-token', component: QMYTokenPage });
const termsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/terms', component: TermsOfServicePage });
const privacyRoute = createRoute({ getParentRoute: () => rootRoute, path: '/privacy', component: PrivacyPolicyPage });
const preProposalsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/pre-proposals', component: PreProposalsPage });
const preProposalDetailRoute = createRoute({ getParentRoute: () => rootRoute, path: '/pre-proposals/$proposalId', component: PreProposalDetailPage });
const swapRoute = createRoute({ getParentRoute: () => rootRoute, path: '/swap', component: SwapPage });
const vestingQTMRoute = createRoute({ getParentRoute: () => rootRoute, path: '/vesting', component: VestingQTM });
const queimaRoute = createRoute({ getParentRoute: () => rootRoute, path: '/queima', component: QueimaDeflacao });
const distribuicaoRoute = createRoute({ getParentRoute: () => rootRoute, path: '/distribuicao', component: Distribuicao });
const presaleRoute = createRoute({ getParentRoute: () => rootRoute, path: '/presale', component: Presale });
const preVendaRoute = createRoute({ getParentRoute: () => rootRoute, path: '/pre-venda', component: PreVendaQTM });
const swapQTMICPRoute = createRoute({ getParentRoute: () => rootRoute, path: '/swap-qtm-icp', component: SwapQTMICP });
const tutorialRoute = createRoute({ getParentRoute: () => rootRoute, path: '/tutorial', component: Tutorial });
const colecaoRoute = createRoute({ getParentRoute: () => rootRoute, path: '/colecao', component: Colecao });
const landingRoute = createRoute({ getParentRoute: () => rootRoute, path: '/landing', component: LandingPage });

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  tokenomicsRoute,
  gameSystemsRoute,
  roadmapRoute,
  technicalRoute,
  legalRoute,
  contactRoute,
  goldPaperRoute,
  docsRoute,
  daoRoute,
  daoCreateRoute,
  daoDetailRoute,
  perfilRoute,
  profileRoute,
  walletRoute,
  mapRoute,
  arRoute,
  chatRoute,
  bancoCentralRoute,
  vestingDeflationRoute,
  presalePageRoute,
  arDistributionRoute,
  treasuryRoute,
  qmyTokenRoute,
  termsRoute,
  privacyRoute,
  preProposalsRoute,
  preProposalDetailRoute,
  swapRoute,
  vestingQTMRoute,
  queimaRoute,
  distribuicaoRoute,
  presaleRoute,
  preVendaRoute,
  swapQTMICPRoute,
  tutorialRoute,
  colecaoRoute,
  landingRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <RouterProvider router={router} />
      </LanguageProvider>
    </AuthProvider>
  );
}
