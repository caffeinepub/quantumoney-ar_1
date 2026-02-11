import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import WalletPage from './pages/WalletPage';
import SwapPage from './pages/SwapPage';
import QMYTokenPage from './pages/QMYTokenPage';
import DAOPage from './pages/DAOPage';
import GoldPaperPage from './pages/GoldPaper';
import DocsPage from './pages/DocsPage';

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

const routeTree = rootRoute.addChildren([
  indexRoute,
  landingRoute,
  walletRoute,
  swapRoute,
  qmyTokenRoute,
  daoRoute,
  goldPaperRoute,
  docsRoute,
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
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
