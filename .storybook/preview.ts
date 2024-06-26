import type { Preview } from '@storybook/react'
import '../app/globals.css'
import withAppRouterContext from '../context/withAppRouterContext'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withAppRouterContext],
}

export default preview
