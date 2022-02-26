import React from 'react';
import ReactDOM from 'react-dom';
import { MantineProvider, NormalizeCSS, GlobalStyles } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import Inventory from '@/components/Inventory';

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider
      theme={{
        /** Put your mantine theme override here */
        colorScheme: 'dark',
      }}
    >
      <NormalizeCSS />
      <GlobalStyles />
      <NotificationsProvider>
        <Inventory />
      </NotificationsProvider>
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
