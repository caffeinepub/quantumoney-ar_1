import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import BancoCentral from './pages/BancoCentral';
import Perfil from './pages/Perfil';
import MapPage from './pages/MapPage';
import ARMode from './pages/ARMode';
import DocsPage from './pages/DocsPage';
import GoldPaper from './pages/GoldPaper';
import TokenomicsPage from './pages/TokenomicsPage';
import RoadmapPage from './pages/RoadmapPage';
import LegalPage from './pages/LegalPage';
import ContactPage from './pages/ContactPage';
import TechnicalPage from './pages/TechnicalPage';
import GameSystemsPage from './pages/GameSystemsPage';
import ARDistributionPage from './pages/ARDistributionPage';
import VestingDeflationPage from './pages/VestingDeflationPage';
import TreasuryMonetaryPolicyPage from './pages/TreasuryMonetaryPolicyPage';
import DAOPage from './pages/DAOPage';
import SwapPage from './pages/SwapPage';
import PublicChatPage from './pages/PublicChatPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import QMYTokenPage from './pages/QMYTokenPage';
import ProfilePage from './pages/ProfilePage';
import DAOCreateProposalPage from './pages/DAOCreateProposalPage';
import DAOProposalDetailPage from './pages/DAOProposalDetailPage';
import PreProposalsPage from './pages/PreProposalsPage';
import PreProposalDetailPage from './pages/PreProposalDetailPage';
import PresalePage from './pages/PresalePage';
import { LanguageProvider } from './contexts/LanguageContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 30_000,
    },
  },
});

// Layout uses <Outlet /> internally — use it directly as root component
const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: HomePage });
const bancoCentralRoute = createRoute({ getParentRoute: () => rootRoute, path: '/central-bank', component: BancoCentral });
const perfilRoute = createRoute({ getParentRoute: () => rootRoute, path: '/profile', component: Perfil });
const mapRoute = createRoute({ getParentRoute: () => rootRoute, path: '/map', component: MapPage });
const arModeRoute = createRoute({ getParentRoute: () => rootRoute, path: '/ar', component: ARMode });
const docsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/docs', component: DocsPage });
const goldPaperRoute = createRoute({ getParentRoute: () => rootRoute, path: '/gold-paper', component: GoldPaper });
const tokenomicsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/tokenomics', component: TokenomicsPage });
const roadmapRoute = createRoute({ getParentRoute: () => rootRoute, path: '/roadmap', component: RoadmapPage });
const legalRoute = createRoute({ getParentRoute: () => rootRoute, path: '/legal', component: LegalPage });
const contactRoute = createRoute({ getParentRoute: () => rootRoute, path: '/contact', component: ContactPage });
const technicalRoute = createRoute({ getParentRoute: () => rootRoute, path: '/technical', component: TechnicalPage });
const gameSystemsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/game-systems', component: GameSystemsPage });
const arDistributionRoute = createRoute({ getParentRoute: () => rootRoute, path: '/ar-distribution', component: ARDistributionPage });
const vestingDeflationRoute = createRoute({ getParentRoute: () => rootRoute, path: '/vesting-deflation', component: VestingDeflationPage });
const treasuryRoute = createRoute({ getParentRoute: () => rootRoute, path: '/treasury', component: TreasuryMonetaryPolicyPage });
const daoPageRoute = createRoute({ getParentRoute: () => rootRoute, path: '/dao', component: DAOPage });
const daoNewRoute = createRoute({ getParentRoute: () => rootRoute, path: '/dao/new', component: DAOCreateProposalPage });
const daoDetailRoute = createRoute({ getParentRoute: () => rootRoute, path: '/dao/$proposalId', component: DAOProposalDetailPage });
const preProposalsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/pre-proposals', component: PreProposalsPage });
const preProposalDetailRoute = createRoute({ getParentRoute: () => rootRoute, path: '/pre-proposals/$proposalId', component: PreProposalDetailPage });
const swapRoute = createRoute({ getParentRoute: () => rootRoute, path: '/swap', component: SwapPage });
const chatRoute = createRoute({ getParentRoute: () => rootRoute, path: '/chat', component: PublicChatPage });
const termsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/terms', component: TermsOfServicePage });
const privacyRoute = createRoute({ getParentRoute: () => rootRoute, path: '/privacy', component: PrivacyPolicyPage });
const qmyTokenRoute = createRoute({ getParentRoute: () => rootRoute, path: '/qmy-token', component: QMYTokenPage });
const profilePageRoute = createRoute({ getParentRoute: () => rootRoute, path: '/profile-ar', component: ProfilePage });
const presaleRoute = createRoute({ getParentRoute: () => rootRoute, path: '/presale', component: PresalePage });

const routeTree = rootRoute.addChildren([
  indexRoute,
  bancoCentralRoute,
  perfilRoute,
  mapRoute,
  arModeRoute,
  docsRoute,
  goldPaperRoute,
  tokenomicsRoute,
  roadmapRoute,
  legalRoute,
  contactRoute,
  technicalRoute,
  gameSystemsRoute,
  arDistributionRoute,
  vestingDeflationRoute,
  treasuryRoute,
  daoPageRoute,
  daoNewRoute,
  daoDetailRoute,
  preProposalsRoute,
  preProposalDetailRoute,
  swapRoute,
  chatRoute,
  termsRoute,
  privacyRoute,
  qmyTokenRoute,
  profilePageRoute,
  presaleRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <LanguageProvider>
          <RouterProvider router={router} />
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
