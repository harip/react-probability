import { Provider } from 'react-redux';
import { Container,Paper } from "@mui/material";
import type { AppProps } from 'next/app'
import store from '../store/store';
import { MenuComponent } from '@/components/menu';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}  >
          {/* <MenuComponent /> */}
          <Component {...pageProps} />
        </Paper>
      </Container>
    </Provider>
  )
}
