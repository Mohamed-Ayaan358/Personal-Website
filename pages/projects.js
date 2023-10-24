import siteMetadata from '@/data/siteMetadata'
import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { PageSEO } from '@/components/SEO'

export default function Projects() {
  return (
    <>
      <PageSEO title={`Projects - ${siteMetadata.author}`} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {/* Try splitting stuff */}
          </p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {/* {projectsData.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
              />
              // Must modify the Card so it can be put css
            ))} */}
            <div>
              <input className="carousel-input" id="one" name="multiples" type="radio" value="1" />
              <label className="carousel-label" htmlFor="one">
                1
              </label>

              <input className="carousel-input" id="two" name="multiples" type="radio" value="2" />
              <label className="carousel-label" htmlFor="two">
                2
              </label>

              <input
                className="carousel-input"
                id="three"
                name="multiples"
                type="radio"
                value="3"
              />
              <label className="carousel-label" htmlFor="three">
                3
              </label>

              <input className="carousel-input" id="four" name="multiples" type="radio" value="4" />
              <label className="carousel-label" htmlFor="four">
                4
              </label>

              <input className="carousel-input" id="five" name="multiples" type="radio" value="5" />
              <label className="carousel-label" htmlFor="five">
                5
              </label>

              <input className="carousel-input" id="six" name="multiples" type="radio" value="6" />
              <label className="carousel-label" htmlFor="six">
                6
              </label>

              <input
                className="carousel-input"
                id="seven"
                name="multiples"
                type="radio"
                value="7"
              />
              <label className="carousel-label" htmlFor="seven">
                7
              </label>

              <input
                className="carousel-input"
                id="eight"
                name="multiples"
                type="radio"
                value="8"
              />
              <label className="carousel-label" htmlFor="eight">
                8
              </label>

              <div className="container">
                <div className="carousel">
                  {projectsData.map((d) => (
                    <Card
                      key={d.title}
                      title={d.title}
                      description={d.description}
                      imgSrc={d.imgSrc}
                      href={d.href}
                    />
                    // Must modify the Card so it can be put css
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
