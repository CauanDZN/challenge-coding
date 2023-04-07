import { globalStyles } from '../styles/global'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/AuthContext';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
