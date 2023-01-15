---
title: Web Review 👏👏
date: '2023-01-14'
tags: ['next-js', 'django', 'Celery', 'PostgreSQL', 'Redis', 'Engage']
draft: false
summary: Example of a markdown file with code blocks and syntax highlighting
---

# Hey guys Ayaan here, and welcome to web review.

    I have decided that to increase my involvement on my blog, I am going to make a biweekly review of the tech stack and overall feel of various websites that you may have seen and some you may have never heard of.

## This week we are going to check out FamPay's website!

Lets start off with the underappreciated layer of the site, the `BACKEND`

- ### Backend

  1. ### <ins>Django and DRF</ins> ->

     Most people dont know that Django was named after the jazz guitarist, `Django Reinhardt`, and just like it's namesake it is quite the jazzy framework. ;)

     The entire point of using Django is to not reinvent the wheel, and considering that Fampay would be more preoccupied with the UPI layer as well as make an intuitive frontend.
     There are several reasons as to why you want to use Django:

     A) Simple Syntax <br/>
     B) HTTP REST Libraries <br/>
     C) MVC Architecture <br/>
     D) ORM <br/>

     Before we move on can we appreciate how simple ORM's make the handling of data, essentially if you are good at SQL you can easily handle it which is beautiful.

  2. ### <ins>Celery</ins> ->

     It is a task queue with focus on `real time processing` for a `distributed system`.

     Celery communicates via messages, usually using a broker to mediate between clients and workers. To initiate a task the client adds a message to the queue, the broker then delivers that message to a worker.Since it is a `distributed system` it can process data quickly.

       <Image alt="ocean" src="/static/images/celery.png" width={500} height={300} />

     If one is familiar with these message brokers, then you would have also come across `MEMPHIS`, it is a real time data processing platform that is known for its well built integrations.

     I believe that Celery was an appropriate choice for FamPay's usecase, consider this they have to handle several thousands of transactions occuring every hour, so tracking all this data would require an efficient system and Celery is built specifically for that purpose.

Now to the flashier (not to mention vain) brother of `BACKEND`, here comes `FRONTEND`

---

## NOTE <br/>

Now you must be wondering "Why are you discussing about a mobile application in `web review`?", and I have two very good reasons.

One this is a company that focuses heavily on their app and hence we must look into it to get an accurate view of it, and Secondly it's because I have no idea what I am doing. Truth be told this is experimental in nature so I am going to change the format frequently.

## Now lets get back to it

- ### Frontend

  Fampay provides its services over multiple streams from the <ins>website</ins> to android and iOS <ins>apps</ins>.

  1.  ### <ins>Website</ins> ->

          According to their blogpost, they have Next.JS deployed on EC2 as their frontend, If you want to see as to why NextJS would be utilised here, you can refer to my ``confused about frameworks?`` blog post.

          Something which I have not often come across is the production process manager, `PM2`. It is a daemon process manager that will help you manage and keep you application online as well as to help maintain it constantly.

          <Image alt="ocean" src="/static/images/website_fam.png" width={500} height={300} />

          Nothing too crazy but they never aimed to make this a website application, as they primarily focus on their mobile applications.

  2.  ### <ins>Android</ins> ->

          It's built using Java/Kotlin using "modern android frameworks", now I cannot conclusively say which one it could be, but I can put my money down on it being android studio as Fampay strikes me as a no nonsense company that wants to deliver the product with the least amount of effort.

          Onto how they manage their network framework, which is by using `Retrofit` and `RxJava`.

          Retrofit is a type safe HTTP client for android and Java, it is a very good one at that compares to many of the other libraries out there like `Fuel` and `Feign`.`Fuel` focused on making the HTTP client network as simple as possible for <ins>Kotlin</ins> applications specifically and `Feign` had utilised the same principles as that of Retrofit, showcasing that when it comes to the field, you just cant beat retrofit.

          Personally I havent used RxJava before so I am in no position to explain why it is better than its alternatives if that exist, any emails would be much appreciated.

  3.  ### <ins>iOS</ins> ->

          Nothing new to see here, they have used a combination of `Swift`, `SwiftUI` and `Combine`.

          Combine provides a declarative Swift API for processing values over time, utilising a publisher and subscriber model. It is extremely useful when it comes to centralizing your event processing code.

          According to their blog post, they have implemented solutions like changing servers on the fly within the app itself, which is really hard if you think about it. As you would want to have really good load balancing as well as consensus setup for the distributed system.

We finally arrive at the final and most important component of any application, `Databases`.

- ### Databases

  1.  ### <ins>PostgreSQL</ins> ->

          Considering the fact that transactional data along with profile data is highly relational by nature, you would rightly assume that they would utilise a RDBMS database.

          PostgreSQL is well maintained and is the next step from using basic MySQL. It also has very `good connection support` to services which would utilise it.

          <Image alt="ocean" src="/static/images/postgres.png" width={500} height={300} />

          One major issue that I have seen repeated across several organizations and message boards is that postgreSQL does face issues at times with parallelization of queries which can always arise in certain situations.

          Also `memory wise` postgreSQL is less performant compared to MySQL and fewer `third party tools` compared to MySQL, but it is quickly catching up on both accounts.

  2.  ### <ins>Redis</ins> ->

          Whenever I find that a website utilises Redis it truly does make me happy, Redis is being used more widely and for good reason.

          They are most likely using it as the cache server, due to its handy features ranging from `automatix expirations`, `built-in replication` to `LRU eviction`. The redis server is likely going to be used along with ``Redis cluster`` and ``Redis sentinel``.
          It has an absolutely gargantuan amount of supported datatypes and being `in memory` means that it has extremely quick retrieval of data from  the RAM itself and not utilsing the SSD whatsoever.

          <Image alt="ocean" src="/static/images/redis.png" width={500} height={300} />

## Final Score

### <ins>Backend Score</ins> -> `8/10`

Very tight fitting backend with a lot of functionality, personally enjoy using Django but I know a few people who would disagree.

### <ins>Frontend Score</ins> -> `7.5/10`

A very basic setup on frontend point of view and is very straight to the point. Personally I believe that `Flutter's` cross platform functionality and wide support would be really beneficial over here, but I do understand that swapping from the preset version is a very intensive operation.

### <ins>Database Score</ins> -> `9.5/10`

A really good setup for what needs to be stored in the database as well as utilsing `redis` is an extremely good choice when dealing with transactional operations.

With that we have come to the end of the review, its been a pleasure and I hope to see you soon!

---

BLOG POST LINK -> https://fampay.in/blog/the-story-behind-fampays-tech-stack/
