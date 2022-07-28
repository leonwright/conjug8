import * as React from 'react';
import NxWelcome from './nx-welcome';
import { Link, Route, Routes } from 'react-router-dom';

const Conjug8 = React.lazy(() => import('conjug8/Module'));

const Vocab = React.lazy(() => import('vocab/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/conjug8">Conjug8</Link>
        </li>

        <li>
          <Link to="/vocab">Vocab</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<NxWelcome title="aprender" />} />

        <Route path="/conjug8" element={<Conjug8 />} />

        <Route path="/vocab" element={<Vocab />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
