import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const TagBack = ({ text }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className="mr-3 text-sm font-medium uppercase text-red-500 hover:text-red-300 dark:text-red-500  dark:hover:text-red-300	">
        {text.split(' ').join('-')}
      </a>
    </Link>
  )
}

export default TagBack
