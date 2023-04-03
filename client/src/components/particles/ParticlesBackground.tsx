import Particles from 'react-tsparticles';
import particlesOptions from './particlesOptions';
import { useCallback } from 'react';
import { Engine, ISourceOptions } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
      }}
    >
      <Particles
        id='tsparticles'
        init={particlesInit}
        options={particlesOptions as ISourceOptions}
      />
    </div>
  );
};

export default ParticlesBackground;
