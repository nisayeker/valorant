import { MantineProvider, TypographyStylesProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useAppContext } from './contex'
import RouterComponent from './routes';
import './i18n';

function App() {

  const { setting } = useAppContext();

  return (
    <MantineProvider withNormalizeCSS withGlobalStyles theme={{ colorScheme: setting.theme }}>
      <NotificationsProvider>
        <TypographyStylesProvider>
          <RouterComponent />
        </TypographyStylesProvider>
      </NotificationsProvider>
    </MantineProvider>
  )
}

export default App;
