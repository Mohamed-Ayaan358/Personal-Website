/* eslint-disable prettier/prettier */
import Script from 'next/script'

export default function Projects() {
  return (
    <>
      <center>
        <button className="rounded border-b-4 border-cyan-500 bg-cyan-300 py-2 px-4 font-bold text-black hover:border-cyan-500 dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:hover:border-gray-500">
          <a href="Ayaan.pdf" download>
            Download Resume
          </a>
        </button>
      </center>
    </>
  )
}
