import React             from 'react';
import ReactDOM          from 'react-dom';
import ReactMarkdown     from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';

import createArticle     from './component/article';
import createTopNav      from './component/top-nav';
import createMainLayout  from './component/main-layout';

import createWorkerClient from './worker/worker-client';

import createMarkdown  from './component/markdown';
import createRust      from './component/rust';
import createGradient  from './component/gradient';
import createGraph     from './component/graph';

import {editorInstance}        from './article/playground/playground-v1';
import {currentEditorContents} from './article/playground/playground-v1';
import createPlaygroundV1      from './article/playground/playground-v1';
import {initPlaygroundV1}      from './article/playground/playground-v1';


((global) => {
  const Article    = createArticle();
  const TopNav     = createTopNav();
  const MainLayout = createMainLayout(TopNav, Article);

  const markdown = createMarkdown(ReactMarkdown);
  const rust     = createRust(SyntaxHighlighter);

  const dependencies = {
    markdown,
    rust
  };

  const articles = [
    createPlaygroundV1(dependencies)
  ];

  const css = global.document.createElement('style');
  css.type = "text/css";
  css.src  = "./src/article/playground/playground.css";
  global.document.head.appendChild(css);

  const container = global.document.createElement('div');
  global.document.body.appendChild(container);


  const render = () => ReactDOM.render(<MainLayout articles={articles} />, container);

  render();
  
  initPlaygroundV1();
})(window);
