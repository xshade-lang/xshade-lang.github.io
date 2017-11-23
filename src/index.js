import React             from 'react';
import ReactDOM          from 'react-dom';

import createPlayground  from './component/playground/playground';
import createTopNav      from './component/top-nav';
import createMainLayout  from './component/main-layout';

((global) => {
  const Playground = createPlayground();
  const TopNav     = createTopNav();
  const MainLayout = createMainLayout(TopNav, Playground);

  const container = global.document.createElement('div');
  global.document.body.appendChild(container);

  const render = () => ReactDOM.render(<MainLayout />, container);

  render();
})(window);
