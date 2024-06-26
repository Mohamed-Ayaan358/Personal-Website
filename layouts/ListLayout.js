/* eslint-disable prettier/prettier */
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import TagDatab from '@/components/TagDatabase'
import TagBack from '@/components/TagBackend'
import TagFront from '@/components/TagFrontend'
import TagML from '@/components/TagML'
import siteMetadata from '@/data/siteMetadata'
import { useState } from 'react'
import Pagination from '@/components/Pagination'
import formatDate from '@/lib/utils/formatDate'

export default function ListLayout({ posts, title, initialDisplayPosts = [], pagination }) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div className="divide-y">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className=" text-3xl font-extrabold leading-9 tracking-tight text-black text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <div className="relative max-w-lg">
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles"
              className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-amber-700 focus:ring-amber-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <ul>
          {!filteredBlogPosts.length && 'No posts found.'}
          {displayPosts.map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            //
            // const lang_frame = [
            //   'next-js',
            //   'markdown',
            //   'react-js',
            //   'node-js',
            //   'ai/ml',
            //   'css3',
            //   'angular-js',
            //   'vue-js',
            //   'Redis',
            // ]
            const lang_frontend = [
              'next-js',
              'react-js',
              'vue-js',
              'angular-js',
              'styled-components',
              'swift',
              'react-native',
            ]
            const lang_backend = [
              'node-js',
              'express-js',
              'celery',
              'laravel',
              'ruby',
              'scala',
              'python',
              'graphql',
            ]
            const lang_database = [
              'redis',
              'postgresql',
              'mysql',
              's3',
              'firebase',
              'dynamodb',
              'cassandra',
            ]
            const lang_ml = ['RAG', 'Langfuse', 'TruLens', 'Phoenix', 'Ollama']

            return (
              <li key={slug} className="py-4">
                <article className="space-y-2 rounded-3xl border-4 border-4 border-amber-400 bg-gray-300 py-3 dark:border-primary-500 dark:bg-gray-800 xl:grid xl:grid-cols-3 xl:items-baseline xl:space-y-0 ">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-black-700 px-5 text-base font-medium leading-6 dark:text-gray-400">
                      <time dateTime={date}> {formatDate(date)} </time>
                    </dd>
                  </dl>
                  <div className="space-y-3 xl:col-span-3">
                    <div>
                      <h3 className="px-2 text-2xl font-bold leading-8 ">
                        <Link href={`/blog/${slug}`} className="px-5 text-black dark:text-gray-100">
                          {title}
                        </Link>
                      </h3>
                      <div className="flex flex-wrap px-5">
                        {tags.map(
                          (tag) =>
                            lang_frontend.includes(tag) ? (
                              <TagFront key={tag} text={tag} />
                            ) : lang_backend.includes(tag) ? (
                              <TagBack key={tag} text={tag} />
                            ) : lang_database.includes(tag) ? (
                              <TagDatab key={tag} text={tag} />
                            ) : lang_ml.includes(tag) ? (
                              <TagML key={tag} text={tag} />
                            ) : (
                              <Tag key={tag} text={tag} />
                            )
                          // :lang_ml.includes(tag)?
                          // < Tag key = { tag } text = { tag } />
                        )}
                      </div>
                    </div>
                    <div className="text-black-700 prose max-w-none px-5 dark:text-gray-400">
                      {summary}
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
