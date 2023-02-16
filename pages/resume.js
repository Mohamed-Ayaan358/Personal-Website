/* eslint-disable prettier/prettier */
import Script from 'next/script'
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import { RoughNotation, RoughNotationGroup } from 'react-rough-notation'

export default function Resume() {
  return (
    <>
      <PageSEO title={`Resume - ${siteMetadata.author}`} />
      <center>
        <h1 className="mb-10 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl  sm:leading-10 md:px-6 md:text-6xl md:leading-14">
          <RoughNotation type="highlight" color="#ffa000" show={'True'}>
            Hitlist
          </RoughNotation>
        </h1>
        <h1 className="mb-10 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl  sm:leading-10 md:px-6 md:text-6xl md:leading-14">
          Coming soon
        </h1>

        <button className="rounded border-b-4 border-cyan-500 bg-cyan-300 py-2 px-4 font-bold text-black hover:border-cyan-500 dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:hover:border-gray-500">
          <a href="Ayaan.pdf" download>
            Download Resume
          </a>
        </button>
      </center>
    </>
  )
}
