import { Layout } from './components/layout/Layout';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { WhoWeAre } from './components/sections/WhoWeAre';
import { Services } from './components/sections/Services';

import { Portfolio } from './components/sections/Portfolio';
import { Impact } from './components/sections/Impact';
import { Tech } from './components/sections/Tech';
import { Team } from './components/sections/Team';
import { Industries } from './components/sections/Industries';
import { CaseStudies } from './components/sections/CaseStudies';
import { Blog } from './components/sections/Blog';
import { LifeAtCentillion } from './components/sections/LifeAtCentillion';

function App() {
  return (
    <Layout>
      <Hero />
      <div style={{ position: 'relative', zIndex: 10, background: 'transparent' }}>
        <About />
        <WhoWeAre />
        <Services />
        <Portfolio />
        <Impact />
        <Tech />
        <LifeAtCentillion />
        <Team />
        <Industries />
        <CaseStudies />
        <Blog />
      </div>
    </Layout>
  );
}

export default App;
