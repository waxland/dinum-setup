import type { Preview } from '@storybook/react';
import '@codegouvfr/react-dsfr/dsfr/dsfr.min.css';
import '@codegouvfr/react-dsfr/dsfr/utility/icons/icons.min.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      element: '#storybook-root',
      config: {},
      options: {},
      manual: false,
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1b1b1b' },
        { name: 'dsfr-grey-975', value: '#f6f6f6' },
      ],
    },
  },
};

export default preview;
