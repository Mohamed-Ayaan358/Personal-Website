---
title: Web Review (RAZORPAY)👏👏
date: '2023-02-09'
tags: ['react-js', 'cassandra', 'graphql', 'laravel', 'dynamodb', 'scala', 'react-native', 'ruby']
draft: false
summary: Time for a razor-sharp review of Razorpay
---

# Hey guys Ayaan here, and welcome to web review.

    This week we are going to take a deeper look at what makes it tick, `and explore one of the most unique backends I've ever seen`.

## This week we are going to take a look at the Razorpay website!

We can't just jump into the tastiest part of the dish yet, let's savour this meal.

- ### Frontend

  1. ### <ins>Website</ins> ->


      Razorpay had humble beginnings as an API gateway for developers to enable payments, they then decided to make a website where they leveraged the tricks of the trade they developed and became enormously successful.

      The website is likely built using `React.js` as well as its own UI builder tools used for designing as well as acting as a scaffold for the website. It's pretty nice to see that companies invest in their UI builder tools rather than relying on `Figma`.

      `(This post was made by a person who dislikes Adobe's pricing system).`

        <Image alt="ocean" src="/static/images/razor_web.png" width={500} height={300} />

      Although most people treat React as the entryway to the web development industry, I believe that it is nonetheless a robust system that has enormous potential `IF` built the right way. It does have its issues, if you are careless you can render your application a bloated mess and every developer is aware of the fact that too many packages lead to too many `react version` requirements, which clash often.

  <details>
       <summary>Backbone.JS</summary>
       <p>
      I also came across a very interesting package called `backbone.js`, which gives structure to web applications by providing models with key-value binding and custom events and connects it all to your existing API over a RESTful JSON interface. This is mind-bogglingly more useful than having to reinvent the wheel, and I will personally be checking it out.
   </p>
       </details>
      Overall the website is well built using super basic components to get the point across and I can appreciate that in a website.

  2. ### <ins>Mobile</ins> ->

     The mobile version of the application is quite young compared to the rest of its services, it was built using `React Native` in TypeScript, this both upsets me and makes me happy as I love typescript simply because of its optimizations as well as a small learning curve if you had experience with javascript.

     I do not like React Native as a platform, now you may be questioning this fact as in both of the other blog posts I advocated for cross-platform development. React Native is simply harsh to developers when it comes to `sparse and outdated documentation, plugins` and you would think that knowledge of React would help you at least in understanding concepts of React Native and that couldn't be further from the truth.

      <Image alt="ocean" src="/static/images/razor_mobile.png" width={400} height={800} />

     The app leverages the in-house design system so that it alleviates some of the problems from the React Native design platform. `Codepush` and `Bitrise` are very helpful add-ons, that simulate the hot reload mechanism of developing a website application and also Jenkin's Automated testing framework.

Now for the moment, I've been hyping everyone for

- ### Backend

  1. ### <ins>Laravel</ins> ->

     I may anger some of the javascript purists, but I'll say it. Maintenance-wise; the backend in javascript is absolute hell, there are so many better alternatives like using `Golang` and `Laravel Octave` that are faster and addresses several components differently.

     I was originally a Node.JS fanatic and I still think it's a solid foundation, but Laravel (i.e: PHP) is a better alternative. Some examples of where Laravel excels are a well-built ORM, web-socket programming and built-in authentication. Since it is so well established, there are very good implementations of several notable APIs.I would suggest new developers not sleep on `PHP`, just on the false assumption that it is old or inefficient.
     <Image alt="ocean" src="/static/images/laravel.png" width={800} height={200} />

  #### `Remember, anything can become good with time and the correct setup`

  2. ### <ins>Ruby</ins> ->

     > Hey `Ruby on Rails`, 2015 called and it wants its code back!

     Jokes aside I am still surprised that Ruby on Rails is as prevalent as it is in this year, so much so that I went on a journey to learn why it is still popular. Turns out the only reason why people believe that Ruby on Rails is dying is that it does have `scalability` and `performance` issues **(Which can be fixed, please don't crucify me Ruby devs).**

     That being the case it is still used by massive companies like Github, Shopify and Coinbase; I can see that some of these companies' components can utilise `Ruby`.Especially Github which uses Ruby for the design of GitHub’s online apps.

     As to what components Ruby on Rails uses would be subjective and it would take up a different part of the controller architecture, perhaps due to its `ease of coding` it would be better suited to work more closely with the **view portion of the MVC** compared to Laravel, which has `eloquent ORM` to make the communication between the **model portion of the MVC** more human readable.

  3. ### <ins>Scala</ins> ->

     According to my own conception, Scala would be classified as a 4th generation language with these languages gaining traction like `Rust` or `GO`; Sadly unlike its peers Scala does not have the same popularity in fact it shares some distaste because of its parentage.
     <Image alt="ocean" src="/static/images/scala.png" width={400} height={600} />

     I do not particularly enjoy coding in Java but I can recognise its importance, there has been a worrying trend of young engineers abandoning Java for the next big thing. `Which in my mind is the most foolish thing you can ever do.`

     Scala will be the first well-developed alternative we will have to Java, but sadly due to my inexperience, I am unaware as to where they would use it in an MVC architecture. My theory is that they may be utilising `Scala-native` to aim for a high-performance system.

  4. ### <ins>GraphQL</ins> ->

     One of the first ever personal web projects I made used GraphQL and for good reason, making API calls was getting tedious as hell and `GraphQL` was extremely helpful.

     One of the advantages of GraphQL is it allows you to build out an API without making as many assumptions about a client's use case or when you have multiple clients with conflicting use cases. And yet it still gets hate and I don't really get it, which is the complete opposite case of `Laravel` for me.

     No more custom rest endpoints with whatever query params the team and engineer felt like implementing at the time, but a consistent more uniform interface based on the schema.

- ### Databases

  1. ### <ins>Cassandra</ins> ->

     I remember first coming across `Cassandra` while researching NoSQL databases for a project in my DBMS seminar; it was a surprise to be sure that Reddit of all things used Cassandra, but it was a welcome one ;)

     The consensus is that Cassandra is not the best at what it does, but the methods it utilises are tight and simple. Since it is a distributed NoSQL database it is highly scalable and prevents `SPOF`. I dare anyone to find one service that doesnt cater to Cassandra due to it being extensively used.

     This partitioning paradigm is the key to Cassandra’s fast write speed and a key tradeoff to consider compared to a relational database. Cassandra can be classified into the AP category of the CAP theorem as it satisfies availability and partition tolerance.

  2. ### <ins> DynamoDB</ins> ->

     Contrary to what I believed, DynamoDB and Cassandra are both `wide-column-store`.From the [Dynamo paper](https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf), you would assume that it is a key store, but the DynamoDB service provided by AWS is not a key store.

     <Image alt="ocean" src="/static/images/dyn.png" width={400} height={500} />

     AWS itself describes DynamoDB as a "document store", but that's bad too. They're referencing that it doesn't enforce a schema (which **_is_** a key difference from Cassandra). However, I think it misses the capability of arbitrary indexes within the document.

     Let's play a variation of two truths and one lie, let's call it two goodies and one disappointment; It is serverless, data replication but it has a weak querying model. Since both of these services fulfil a similar purpose, I suppose Razorpay may be using them to `compensate each other's failures.`

## Final Score

### <ins>Backend Score</ins> -> `8.5/10`

The backend is interesting and it would be `so awesome to work on it`, on the other hand having to manage the different parts of it would require an extremely talented backend developer team as well as handle the communication between them.

### <ins>Frontend Score</ins> -> `7.5/10`

The frontend is very reliable and simple, it gets the point across but the fact that it uses React and `React Native` means that they may have to face some issues while developing it. Got to give it plus points for having its UI component builder.

This might be a divisive score, but I have given it to the best of my ability.

### <ins>Database Score</ins> -> `8/10`

A solid database combination `(which also "might" be using PostgreSQL to handle RDBMS functions)`, where you can't go wrong. I would love to hear how Razorpay can handle the massive amount of transactions happening every day.

---

#### Soon enough I will have exhausted web review topics that would be unique to a certain point I am looking into starting a blog post called `BREAK IT DOWN`, to analyse the gritty aspects of the systems we take for granted.
