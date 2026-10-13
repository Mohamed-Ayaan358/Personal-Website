import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'
import { PopupWidget, InlineWidget } from 'react-calendly'

const DEFAULT_LAYOUT = 'AuthorLayout'

export async function getStaticProps() {
  const authorDetails = await getFileBySlug('authors', ['default'])
  return { props: { authorDetails } }
}
const CalendlyButton = () => {
  const calendlyURL = 'https://calendly.com/ayaanweb/anyone'

  const openCalendly = () => {
    window.location.href = calendlyURL
  }

  return (
    <div
      className="mx-auto w-48 cursor-pointer rounded bg-blue-500 py-4 px-4 font-bold text-white hover:bg-blue-600"
      onClick={openCalendly}
    >
      Schedule a Meeting
    </div>
  )
}

export default function About({ authorDetails }) {
  const { mdxSource, frontMatter } = authorDetails

  return (
    <>
      <MDXLayoutRenderer
        layout={frontMatter.layout || DEFAULT_LAYOUT}
        mdxSource={mdxSource}
        frontMatter={frontMatter}
      />
      <CalendlyButton />
    </>
  )
}
