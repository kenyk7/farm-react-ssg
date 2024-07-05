import './index.css';

import { createRoot } from 'react-dom/client';

import { Main } from './main';

const container = document.querySelector('#root') as HTMLElement;
const root = createRoot(container);

root.render(<Main />);
