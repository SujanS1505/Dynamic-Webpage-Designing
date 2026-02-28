import { Layout } from './components/layout/Layout';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';

import { Portfolio } from './components/sections/Portfolio';
import { Impact } from './components/sections/Impact';
import { Tech } from './components/sections/Tech';
import { Team } from './components/sections/Team';
import { Industries } from './components/sections/Industries';
import { CaseStudies } from './components/sections/CaseStudies';
import { Blog } from './components/sections/Blog';

function App() {
  return (
    <Layout>
      <Hero />

      <div style={{ position: 'relative', zIndex: 10, background: 'var(--bg-dark)' }}>
        <About />
        <Services />
        <Portfolio />
        <Impact />
        <Tech />
        <Team />
        <Industries />
        <CaseStudies />
        <Blog />
      </div>
    </Layout>
  );
}

export default App;
