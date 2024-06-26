import Image from './Image'
import Link from './Link'

const Card1 = ({ title, description, imgSrc, href }) => (
  <div className="md p-4 ">
    <div
      className={`${
        imgSrc && 'h-full'
      }  overflow-hidden rounded-md border-4 border-4 border-yellow-500 bg-gray-300  dark:border-primary-500 dark:border-opacity-60 dark:bg-gray-700`}
    >
      {/* {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center text-black md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        ))} */}
      <div className="p-6">
        <h2 className="mb-3 text-2xl font-bold leading-8  tracking-tight dark:text-white">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
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
    </div>
  </div>
)

export default Card1
