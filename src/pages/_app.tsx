import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { Error, ErrorBoundary } from '~/components';
import { ThemeProvider } from '~/context/theme';
import { store } from '~/store';
import '~/styles/index.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Provider store={store}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
