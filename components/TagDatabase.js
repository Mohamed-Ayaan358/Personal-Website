import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const TagDatab = ({ text }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className="mr-3 text-sm font-medium uppercase text-pink-500 hover:text-pink-300 dark:text-pink-500  dark:hover:text-pink-300	">
        {text.split(' ').join('-')}
      </a>
    </Link>
  )
}

export default TagDatab
