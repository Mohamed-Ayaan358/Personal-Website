/* eslint-disable prettier/prettier */
import Script from 'next/script'
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import { RoughNotation, RoughNotationGroup } from 'react-rough-notation'
import MetaballAnimation from './paper'

const appStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  position: 'relative',
  overflow: 'hidden',
}

const contentStyles = {
  zIndex: 1,
  background: 'rgba(255, 255, 255, 0.8)',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
}

const canvasStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none', // Allow interaction with elements behind the canvas
}
const CalendlyButton = () => {
  const calendlyURL = 'https://calendly.com/ayaanweb/anyone'

  const openCalendly = () => {
    window.location.href = calendlyURL
  }

  return (
    <button
      className="mx-auto my-12 w-44 cursor-pointer rounded bg-blue-500 py-4 px-4 font-bold text-white hover:bg-blue-600"
      onClick={openCalendly}
    >
      Schedule a Meeting
    </button>
  )
}
export default function Resume() {
  return (
    <>
      <PageSEO title={`Resume - ${siteMetadata.author}`} />
      <div style={appStyles}>
        <div style={contentStyles}>
          <center>
            {/* <h1 className="mb-10 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl  sm:leading-10 md:px-6 md:text-6xl md:leading-14">
          <RoughNotation type="highlight" color="#ffa000" show={'True'}>
            Hitlist
          </RoughNotation>
        </h1> */}
            {/* <h1 className="mb-10 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl  sm:leading-10 md:px-6 md:text-6xl md:leading-14">
          <RoughNotation type="highlight" color="#ffa000" show={'True'}>
            Hitlist
          </RoughNotation>
        </h1> */}

            <button className="rounded border-b-4  border-yellow-400 bg-yellow-400 py-2 px-4 font-bold text-black hover:border-cyan-500 dark:border-cyan-500 dark:border-gray-700 dark:bg-cyan-300 dark:bg-gray-700 dark:text-white dark:hover:border-gray-500">
              <a href="Ayaan.pdf" download>
                Download Resume
              </a>
            </button>
          </center>
          <center>
            <CalendlyButton />
          </center>
        </div>
        <MetaballAnimation />
      </div>
    </>
  )
}
