/* eslint-disable prettier/prettier */
import Image from './Image'
import Link from './Link'

const Card = ({ title, description, imgSrc, href }) => (
  <div className="p-6">
    <h2 className="mb-3 text-2xl font-bold leading-8  tracking-tight dark:text-black">
      {href ? (
        <Link href={href} aria-label={`Link to ${title}`}>
          {title}
        </Link>
      ) : (
        title
      )}
    </h2>
    <p className="prose mb-3 max-w-none text-2xl text-gray-500 dark:text-black">{description}</p>
    {href && (
      <Link
        href={href}
        className="text-base font-medium leading-6 text-yellow-500 dark:text-primary-500 dark:hover:text-primary-400"
        aria-label={`Link to ${title}`}
      >
        Learn more &rarr;
      </Link>
    )}
  </div>
)

export default Card
