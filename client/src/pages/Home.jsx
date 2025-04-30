import { Helmet } from 'react-helmet';
import Projects from '../components/Projects'
import Skills from '../components/Skills';
import Hero from '../components/Hero';
import Particles from '../components/Particles';
export default function Home() {
  return (
    <>
      <Helmet>
        <title>Craft Folio - Portfolio CMS</title>
        <meta
          name="description"
          content="Manage and showcase projects dynamically"
        />
      </Helmet>

      <div className=" barlow-semi-condensed">
        <section 
          className="mb-25 text-center" 
          style={{ position: 'relative', height: '600px', overflow: 'hidden' }}
        >
          {/* Particles background */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1
          }}>
            <Particles
              particleColors={['#000', '#000']}
              particleCount={200}
              particleSpread={10}
              speed={0.1}
              particleBaseSize={100}
              moveParticlesOnHover={true}
              alphaParticles={false}
              disableRotation={false}
            />
          </div>

          {/* Hero Content */}
          <Hero />
        </section>

        {/* Projects Section */}
        <section id='projects' className='mt-20'>
          <Projects />
        </section>

        {/* Skills Section */}
        <section id='skills' className="mb-12">
          <Skills />
        </section>
      </div>
    </>
  );
}
