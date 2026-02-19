import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import WalletPage from './pages/WalletPage';
import SwapPage from './pages/SwapPage';
import QMYTokenPage from './pages/QMYTokenPage';
import DAOPage from './pages/DAOPage';
import GoldPaperPage from './pages/GoldPaper';
import DocsPage from './pages/DocsPage';
import BancoCentralPage from './pages/BancoCentral';
import PublicChatPage from './pages/PublicChatPage';
import PreProposalsPage from './pages/PreProposalsPage';
import PreProposalDetailPage from './pages/PreProposalDetailPage';
import PresalePage from './pages/PresalePage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import MapMode from './pages/MapMode';
import DAOCreateProposalPage from './pages/DAOCreateProposalPage';
import DAOProposalDetailPage from './pages/DAOProposalDetailPage';
import Perfil from './pages/Perfil';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      refetchOnWindowFocus: false,
    },
  },
});

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/landing',
  component: LandingPage,
});

const walletRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/wallet',
  component: WalletPage,
});

const swapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/swap',
  component: SwapPage,
});

const qmyTokenRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/qmy-token',
  component: QMYTokenPage,
});

const daoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dao',
  component: DAOPage,
});

const daoCreateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dao/new',
  component: DAOCreateProposalPage,
});

const daoProposalDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dao/$proposalId',
  component: DAOProposalDetailPage,
});

const goldPaperRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/gold-paper',
  component: GoldPaperPage,
});

const docsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/docs',
  component: DocsPage,
});

const bancoCentralRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/central-bank',
  component: BancoCentralPage,
});

const publicChatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/chat',
  component: PublicChatPage,
});

const preProposalsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pre-proposals',
  component: PreProposalsPage,
});

const preProposalDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pre-proposals/$proposalId',
  component: PreProposalDetailPage,
});

const presaleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/presale',
  component: PresalePage,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms',
  component: TermsOfServicePage,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy',
  component: PrivacyPolicyPage,
});

const mapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/map',
  component: MapMode,
});

const perfilRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: Perfil,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  landingRoute,
  walletRoute,
  swapRoute,
  qmyTokenRoute,
  daoRoute,
  daoCreateRoute,
  daoProposalDetailRoute,
  goldPaperRoute,
  docsRoute,
  bancoCentralRoute,
  publicChatRoute,
  preProposalsRoute,
  preProposalDetailRoute,
  presaleRoute,
  termsRoute,
  privacyRoute,
  mapRoute,
  perfilRoute,
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
          <Toaster />
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
