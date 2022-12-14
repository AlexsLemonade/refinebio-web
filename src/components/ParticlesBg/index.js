import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'

// (resource) https://particles.js.org/docs/classes/Options_Classes_Options.Options.html
// https://github.com/matteobruni/tsparticles/blob/main/components/react/README.md

export const ParticlesBg = () => {
  const color = '#afc4ff'
  const particlesInit = async (main) => {
    await loadFull(main)
  }

  const options = {
    detectRetina: true,
    fullScreen: false,
    fpsLimit: 60,
    interactivity: {
      events: {
        resize: true
      }
    },
    particles: {
      color: {
        value: color
      },
      links: {
        color,
        distance: 150,
        enable: true,
        width: 3
      },
      move: {
        direction: 'none',
        enable: true,
        speed: 0.3
      },
      number: {
        density: {
          enable: true,
          area: 800
        },
        value: 150
      },
      shape: {
        type: 'circle'
      },
      smooth: true,
      size: {
        value: { min: 5, max: 8 }
      }
    }
  }
  return <Particles id="tsparticles" init={particlesInit} options={options} />
}

export default ParticlesBg
