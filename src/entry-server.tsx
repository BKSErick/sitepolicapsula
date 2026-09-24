import { renderToString } from 'react-dom/server';

import App from './App';
import { findRoute, staticRoutes } from './data/site-content';

export { staticRoutes };

export function render(pathname: string) {
  return {
    html: renderToString(<App initialPath={pathname} />),
    route: findRoute(pathname),
  };
}
