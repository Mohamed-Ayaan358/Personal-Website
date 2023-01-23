import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tag = ({ text }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className="mr-3 text-sm font-medium uppercase text-purple-800	hover:text-purple-800 dark:text-amber-500 dark:hover:text-amber-300	 dark:hover:text-amber-300	">
        {text.split(' ').join('-')}
      </a>
    </Link>
  )
}

export default Tag
