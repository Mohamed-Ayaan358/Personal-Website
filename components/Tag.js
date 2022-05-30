import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tag = ({ text }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className="mr-3 text-sm font-medium uppercase text-cyan-500	hover:text-cyan-300 dark:text-amber-500 dark:hover:text-amber-300	 dark:hover:text-amber-300	">
        {text.split(' ').join('-')}
      </a>
    </Link>
  )
}

export default Tag
