import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import LandingPage from '@/pages/LandingPage';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import TokenomicsPage from '@/pages/TokenomicsPage';
import ARDistributionPage from '@/pages/ARDistributionPage';
import DAOPage from '@/pages/DAOPage';
import RoadmapPage from '@/pages/RoadmapPage';
import VestingDeflationPage from '@/pages/VestingDeflationPage';
import PresalePage from '@/pages/PresalePage';
import TechnicalPage from '@/pages/TechnicalPage';
import GameSystemsPage from '@/pages/GameSystemsPage';
import LegalPage from '@/pages/LegalPage';
import ContactPage from '@/pages/ContactPage';
import GoldPaper from '@/pages/GoldPaper';
import TreasuryMonetaryPolicyPage from '@/pages/TreasuryMonetaryPolicyPage';
import Layout from '@/components/Layout';

const rootRoute = createRootRoute({
  component: Layout,
});

const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/home',
  component: HomePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const tokenomicsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tokenomics',
  component: TokenomicsPage,
});

const arDistributionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ar-distribution',
  component: ARDistributionPage,
});

const daoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dao',
  component: DAOPage,
});

const treasuryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/treasury-monetary-policy',
  component: TreasuryMonetaryPolicyPage,
});

const roadmapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/roadmap',
  component: RoadmapPage,
});

const vestingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/vesting-deflation',
  component: VestingDeflationPage,
});

const presaleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/presale',
  component: PresalePage,
});

const technicalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/technical',
  component: TechnicalPage,
});

const gameSystemsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/game-systems',
  component: GameSystemsPage,
});

const legalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/legal',
  component: LegalPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const goldPaperRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/gold-paper',
  component: GoldPaper,
});

const routeTree = rootRoute.addChildren([
  landingRoute,
  homeRoute,
  aboutRoute,
  tokenomicsRoute,
  arDistributionRoute,
  daoRoute,
  treasuryRoute,
  roadmapRoute,
  vestingRoute,
  presaleRoute,
  technicalRoute,
  gameSystemsRoute,
  legalRoute,
  contactRoute,
  goldPaperRoute,
]);

const router = createRouter({ routeTree });

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
