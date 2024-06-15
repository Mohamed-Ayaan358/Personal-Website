import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const TagML = ({ text }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className="mr-3 text-sm font-medium uppercase text-violet-700 hover:text-pink-300 dark:text-pink-500  dark:hover:text-pink-300	">
        {text.split(' ').join('-')}
      </a>
    </Link>
  )
}

export default TagML
