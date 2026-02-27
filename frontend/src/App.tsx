import React, { Suspense, lazy } from 'react';
import {
  createRouter,
  createRoute,
  createRootRoute,
  RouterProvider,
  Outlet,
  redirect,
} from '@tanstack/react-router';
import Layout from './components/Layout';

// Lazy-loaded pages
const HomePage = lazy(() => import('./pages/HomePage'));
const Perfil = lazy(() => import('./pages/Perfil'));
const BancoCentral = lazy(() => import('./pages/BancoCentral'));
const DAOPage = lazy(() => import('./pages/DAOPage'));
const DAOCreateProposalPage = lazy(() => import('./pages/DAOCreateProposalPage'));
const DAOProposalDetailPage = lazy(() => import('./pages/DAOProposalDetailPage'));
const PublicChatPage = lazy(() => import('./pages/PublicChatPage'));
const MapPage = lazy(() => import('./pages/MapPage'));
const SwapPage = lazy(() => import('./pages/SwapPage'));
const DocsPage = lazy(() => import('./pages/DocsPage'));
const GoldPaper = lazy(() => import('./pages/GoldPaper'));
const TokenomicsPage = lazy(() => import('./pages/TokenomicsPage'));
const RoadmapPage = lazy(() => import('./pages/RoadmapPage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const TechnicalPage = lazy(() => import('./pages/TechnicalPage'));
const PresalePage = lazy(() => import('./pages/PresalePage'));
const PreProposalsPage = lazy(() => import('./pages/PreProposalsPage'));
const PreProposalDetailPage = lazy(() => import('./pages/PreProposalDetailPage'));
const QMYTokenPage = lazy(() => import('./pages/QMYTokenPage'));
const VestingDeflationPage = lazy(() => import('./pages/VestingDeflationPage'));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const GameSystemsPage = lazy(() => import('./pages/GameSystemsPage'));
const ARDistributionPage = lazy(() => import('./pages/ARDistributionPage'));
const TreasuryMonetaryPolicyPage = lazy(() => import('./pages/TreasuryMonetaryPolicyPage'));

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-yellow-400/50 font-rajdhani text-sm animate-pulse">A carregar...</div>
  </div>
);

const withSuspense = (Component: React.ComponentType) => () => (
  <Suspense fallback={<PageFallback />}>
    <Component />
  </Suspense>
);

// Root route with Layout
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

// Routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: withSuspense(HomePage),
});

const perfilRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/perfil',
  component: withSuspense(Perfil),
});

// Legacy /profile redirect
const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: withSuspense(Perfil),
});

const bancoCentralRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/banco-central',
  component: withSuspense(BancoCentral),
});

// Legacy /central-bank redirect
const centralBankRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/central-bank',
  component: withSuspense(BancoCentral),
});

const daoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dao',
  component: withSuspense(DAOPage),
});

const daoCreateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dao/create',
  component: withSuspense(DAOCreateProposalPage),
});

// Legacy /dao/new
const daoNewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dao/new',
  component: withSuspense(DAOCreateProposalPage),
});

const daoProposalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dao/$proposalId',
  component: withSuspense(DAOProposalDetailPage),
});

const chatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/chat',
  component: withSuspense(PublicChatPage),
});

const mapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/map',
  component: withSuspense(MapPage),
});

const swapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/swap',
  component: withSuspense(SwapPage),
});

const docsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/docs',
  component: withSuspense(DocsPage),
});

const goldPaperRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/gold-paper',
  component: withSuspense(GoldPaper),
});

const tokenomicsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tokenomics',
  component: withSuspense(TokenomicsPage),
});

const roadmapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/roadmap',
  component: withSuspense(RoadmapPage),
});

const legalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/legal',
  component: withSuspense(LegalPage),
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: withSuspense(AboutPage),
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: withSuspense(ContactPage),
});

const technicalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/technical',
  component: withSuspense(TechnicalPage),
});

const presaleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/presale',
  component: withSuspense(PresalePage),
});

const preProposalsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pre-proposals',
  component: withSuspense(PreProposalsPage),
});

const preProposalDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pre-proposals/$proposalId',
  component: withSuspense(PreProposalDetailPage),
});

const qmyTokenRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/qmy',
  component: withSuspense(QMYTokenPage),
});

const vestingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/vesting',
  component: withSuspense(VestingDeflationPage),
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms',
  component: withSuspense(TermsOfServicePage),
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy',
  component: withSuspense(PrivacyPolicyPage),
});

const gameSystemsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/game-systems',
  component: withSuspense(GameSystemsPage),
});

const arDistributionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ar-distribution',
  component: withSuspense(ARDistributionPage),
});

const treasuryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/treasury',
  component: withSuspense(TreasuryMonetaryPolicyPage),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  perfilRoute,
  profileRoute,
  bancoCentralRoute,
  centralBankRoute,
  daoRoute,
  daoCreateRoute,
  daoNewRoute,
  daoProposalRoute,
  chatRoute,
  mapRoute,
  swapRoute,
  docsRoute,
  goldPaperRoute,
  tokenomicsRoute,
  roadmapRoute,
  legalRoute,
  aboutRoute,
  contactRoute,
  technicalRoute,
  presaleRoute,
  preProposalsRoute,
  preProposalDetailRoute,
  qmyTokenRoute,
  vestingRoute,
  termsRoute,
  privacyRoute,
  gameSystemsRoute,
  arDistributionRoute,
  treasuryRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
