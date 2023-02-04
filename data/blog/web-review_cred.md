---
title: Web Review (CRED)👏👏
date: '2023-01-24'
tags: ['node-js', 's3', 'firebase', 'styled-components', 'next-js', 'golang', 'swift']
draft: false
summary: Back at it again with a review on CRED
---

# What's up guys Ayaan here, and welcome to web review.

Sadly, I was unable to find the `exact` tech stack that CRED utilizes, so after a lot of interpolation and research I think I have come pretty close.

## This week we are going to take a look at CRED's website!

Let's mix up things this time and analyze the website the way god intended, that is straight from the top

- ### Frontend

  1. ### <ins>Website</ins> ->

     From what I have gathered from job positions, interviews and other sources the website is built using NextJS along with CoreJS that is primarily styled utilizing styled components.

     The website itself is a bit disappointing, there are several components which I feel are not optimized such as the animations of the phones arising once a user scrolls past it, another instance of the desktop version of the website is a bit tricky to handle is the animations of the text that appear along with the phone.
     I am unaware if it was a design choice to emphasize the `CRED` keyword, but keeping every letter even the beginning of sentences as non-capitalized was a bit jarring, to say the least.

       <Image alt="ocean" src="/static/images/website_cred.png" width={500} height={300} />

     As I have said in my previous article, NextJS is an all-round generally good choice in frontend development, (`My website itself is built on NextJS and the only issue I faced was when I tried to review a local PDF file and couldn't because of server-side rendering`).

     I have personally not used `Core-JS` to a large extent but I can see its uses, especially for introducing object-oriented and event-driven JavaScript code. I delved deep enough into it, that I am seriously considering using it for my site.

     <details>
     <summary>Styling Summary</summary>
     <p>
     `Styled-components` has been a personal favourite of mine whenever I was tasked with utilizing the least amount of resources while getting the maximum potential styling. One issue I did face with it is that as we scale the application further, I found that the alternative styling libraries simply offered far more design capabilities.
     </p>
     </details>

  2. ### <ins>Mobile</ins> ->

     I've decided to combine the iOS and Android components as we can rightly assume that most of these companies would use the same languages and frameworks that are preset, unfortunately, the `mobile programming market is dominated by certain players` in their respective fields.

     Rather I would like to concentrate on the ways certain companies differ from one another ranging from different analytical tools and inbuilt methods to solve difficult solutions to the process of migration to a different tech stack.

     For example, during my research I can safely say that `CRED` may be moving to `flutter`, I have been enamoured by flutter recently and I can't get it out of my head. It is extremely easy to use and has extensive documentation as well as a vibrant community.
     The best part? Its platform is independent so there is no reason to double the workforce to cater to both sides.

     <details>
     <summary>Justifications</summary>
     <p>
     In the United States of America, most payment features, as well as payment methods, are more likely to be developed on the iOS platform simply because the individuals who would purchase such devices have a lot of disposable income, One would think the fact that a country like India with a weak banking system financial tech companies would never flourish.
     But with the introduction of the `unified payment interface` (UPI), there has been a surge in the number of people who have begun making bank accounts to avail of this service, and now with time, people will decide to get credit cards as we progress onwards which only validates `CRED's` business model.
     </p>
     </details>

- ### Backend

  1. ### <ins>Node.js</ins> ->

     Ah, `Node.js` if you want to get into backend development in general you usually start with this as your main tool. Sadly it isn't extensively used in many enterprise companies, unlike `SpringBoot` which I am not particularly well versed in due to my distaste for Java.

     `Node.js` is incredibly easy to pick up as you have to use python as well as having an excellent admin tool, scalability and concurrency wise it isn't the best. However, slowly as more people are fixing this issue it may become good enough to replace SpringBoot.

     <Image alt="ocean" src="/static/images/node.png" width={500} height={300} />
     The most hardcore web developers would say that both of these applications are far too bloated and one must directly talk to the REST framework which has some merit. But it boils down to whether you `would rather cut your fingernails with garden shears or with a pair of tweezers?`.

  2. ### <ins>Golang</ins> ->

     Now, you may be questioning why I have just placed a language here rather than a framework or a library and that is because in all the recruitment positions Golang was stipulated as one of the languages that was necessary.

     This is not the craziest thing to consider, because Golang is a highly concurrent language and if you remember from the previous paragraph Django is not built to be concurrent without some modifications.
     `My theory is they are using Django as their routing protocol and Golang as part of the script which handles concurrent events to the database.`

- ### Databases

  1. ### <ins>Firebase</ins> ->

     Firebase used to be my go-to storage service for a while until an alteration in how applications would interact with it would nearly push me away from it, after finally setting it up I began to research more about it and I could see that my grievances were shared everywhere by amateurs.

     But I finally realized that Firebase isn't meant to be a long-term solution, there are far too many issues with the application concerning scalability and reliability. Thankfully `Firestore` solves a majority of these issues, but that instance of my suffering did sour my experience with Firebase.

     Opinions aside `Firebase` is still very handy when you are designing an application in the early stages, It has its uses in replication and batch operations and is utilized as `Google’s BaaS platform`.

  2. ### <ins>S3</ins> ->

     They are probably using `S3` with firebase to cover its misgivings as S3 is an established standard method of storage even though it's 5 yours younger than Firebase.

     On a personal note even if the amazon web services user experience is a bit lackluster, the sheer amount of resources available to us in the form of different services (e.g: S3, Lambda, EFS).` S3` is primarily used for object storage as well as connecting to other software that is already built. Therefore it is used in conjecture with Firebase is not out of the question.

     <Image alt="ocean" src="/static/images/s3.png" width={500} height={300} />

     Researching into this combination yielded me many results as I can see that this combination was widely used and is fairly popular amongst mid-sized companies, so it would make sense as to why CRED would utilize it.S3 in of itself is very handy one would ask as to why we wouldn't use MySQL and the answer is simple, we don't need to query the database as much and we mainly wish to store information.

## Final Score

### <ins>Backend Score</ins> -> `9/10`

The backend is well established, utilizing `languages that cover each other's bases` and I am personally biased toward Golang being utilized in this scenario.

### <ins>Frontend Score</ins> -> `8/10`

I do thoroughly like the mobile application as well as the well-organized tech stack, the website also appears to be well made other `than some design points which I found particularly jarring`.

### <ins>Database Score</ins> -> `8/10`

A `great combination of different cloud storage services`, but wouldn't recommend using both if you were starting on your own application. If need be use one and then when required, move/add to it.

And with that, it's been another instalment of Web review, sorry for the delay exams have been hectic as usual. It's been a pleasure and I hope to see you soon!

---

Special thanks to [P K Navin Shrinivas](https://www.linkedin.com/in/p-k-navin-shrinivas-1020a01b7/) and [Anirudh Rowjee](http://rowjee.com/) for proofreading the blogpost, thanks guys!
