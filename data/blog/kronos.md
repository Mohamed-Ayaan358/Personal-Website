---
title: Project Kronos
date: '2024-11-16'
tags: ['Consensus', 'Distributed Systems', 'Networks']
draft: false
summary: Updating software systems for the future of space travel.
---

## "Time is the ally of Chaos, for it wears down even the stoutest defenses and bends the mightiest of wills."

### `This blog post is a bit different than usual as I will not be going in-depth about the technologies but wish to start a conversation regarding the same.`

So, I was playing Space Marine 2 over the weekend, and I was truly awestruck by how faithful they were to the material. I have been a fan of the blueberries, but I do love my salamanders. However, besides the game, before every mission, the characters would often mention a particular time or use the current time system of hours, minutes, and seconds.

That got me thinking in the setting of Warhammer humanity spans a million planets, In reality, how would our systems consider the wildly different circumstances we would face?

(Note: Let's get one thing clear: If we fix the climate change issue and our geopolitical issues, humanity has a real shot at large-scale space travel. The opportunities that await us are way too insane for us not to consider them. I just hope we use Earth as our home base rather than our graveyard. So, for levity's sake, let's say we do it. )

### Now you might be asking, "Ayaan, I don't see what the issue is here." But think about how many of our systems are time-dependent or require a system of synchronous clocks.

#### 1. <u>Individual computers</u>:

- _`System Clock (RTC)`_: Every computer has a [`Real-Time Clock (RTC)`](https://www.nasa.gov/technology/goddard-tech/reinventing-the-clock-nasas-new-tech-for-space-timekeeping/) to keep track of time. This clock is critical for managing processes like logging timestamps, scheduling tasks, and ensuring correct file timestamps.

- _`Task Scheduling`_: Operating systems use time-based schedulers (like Cron in Linux) to execute tasks at specific times. These schedulers rely on system time to trigger activities like backups or system updates.

#### 2. <u>Communication</u>:

- _`Network Time Protocol` (NTP)_: NTP is widely used to synchronize clocks across different systems in a network. It ensures that all communicating computers are on the same time, which is critical for distributed systems and logs.

- _`Token Passing`_ in Networking Protocols: Some networking protocols, like Token Ring, use time-based mechanisms to manage communication between devices by assigning a token that each device can hold for a fixed amount of time to send data.

#### 3. <u>Processing of Information</u>:

- _`CPU Scheduling (Time Slices)`_: Modern CPUs use time-based mechanisms (like round-robin scheduling) to allocate time slices to processes

- _`Event-Driven Systems`_: Systems like real-time operating systems or event-driven architectures use timers to trigger events, such as refreshing a display, monitoring sensors, or triggering alarms.

---

### There are a large amount of issues one comes across when we consider interstellar travel as well as distant star systems.

#### 1.<u>Time dilation</u>:

    At speeds close to the speed of light [time dilation](https://www.space.com/time-dilation-interstellar-communication-delays) would become an issue wherein time would pass far more slowly for the crew aboard a spacecraft compared to the point of origin. This would create desynchronization potentially affecting any systems that would have an election system like Raft in order to ensure that synchronization about data obtained. Of course, this could be solved or disregarded by the fact that it is very unlikely that we would reach relativistic speeds and would probably resort to a cryogenic method to travel. ([Let's not get into the fact that cryogenics aren't what we thought it to be](https://www.freethink.com/futurology/cryogenically-frozen-humans), TLDR: They had to be scraped out of their tank).

 <Image src="/static/images/time_dilation.jpg" width={800} height={500} />

#### 2.<u>Communication Delay</u>:

    At the scale of light-years, any message sent from one system to another will experience a significant delay. For instance, a signal sent from a ship 4 light-years away will take 4 years to arrive, even at the speed of light. Let's not forget about the fact that we often struggle with sharing information through the commonly used  electromagnetic waves due to materials that might interfere with it and the distance it often has to travel could potentially mess with the information we wish to send.

#### 3.<u>Clock Drift and System Errors</u>:

    Lets say that a user on a spaceship seeks information that isnt present on the ship that is currently moving extremely fast how would one ensure that the resource being transmitted actually came on time, considering that we have certain network protocols to ensure that if a resource wasnt sent on time, that we would have to take certain measures to ensure that the information would follow through.

<figure>
  <img src="/static/images/atomic_clock.jpeg" alt="Atomic Clock" width={800} height={400} />
  <figcaption>An example of an atomic clock used for high-precision timekeeping.</figcaption>
</figure>

    Each system, whether shipboard or planet-based, would experience slight variations in how time and operations are calculated over long periods. When the ship reconnects with other systems, any discrepancies in time could affect software compatibility, data validity, and operational integrity. This challenge could potentially be countered by automated `drift correction` algorithms but would still be imperfect due to relativity and communication delays.

### All right let's stop with the doom and the gloom and come to my favorite part of the article.

Since I started this entire post with Warhammer 40k, let's delve a little into the system of circumnavigating the issue in their universe.

So the way by which The Imperium of man navigates the cosmos is by utilizing something called the Warp which is the equivalent of theories in our world that suggest we can enter a wormhole and exit on the other side of it light years away.

 <Image src="/static/images/wormhole.jpeg" width={800} height={500} />

The reason why it's not deemed safe is that time works very strangely in the warp if the navigator doesn't know what they are doing, as it is frequently bought into the attention of the fact that people have arrived weeks before or sometimes even years after they were supposed to reach their destination. Some factions have achieved faster-than-light or sublight speed travel but they are far technologically superior to us. (For example, we are currently a 0.7 on the `Kardashev scale`, the factions I just mentioned are all in the realm of 3.0 on the `Kardashev scale`.)

Ok back to it, they essentially communicate via this warp which is essentially an energy that is persistent all around us, it is as prevalent as the dark matter in our universe, (Look it up it's honestly frightening). So using magic essentially skips the need for having time delays, the closest match to this would be quantum entanglement communication which is still just a theory.

---

NOTE:

Just on a side note, AI has been banned in the imperium of man due to certain uprisings and has actually been relabelled as `Abominable intelligence` (I am not even joking). I bet that brings a lot of joy to some of the new computer science graduates.
Instead of AI, they servitorize people (Essentially striping everything that is human out of a human and max out the brain's potential, oh what fun YAY!)
<Image alt="staircase_to_heaven" src="/static/images/servitor.webp" width={800} height={900} />

---

The Imperium does have a [dating system](https://wh40k.lexicanum.com/wiki/Imperial_Dating_System) and I find it funny that characters within the universe itself state how ridiculous the way of keeping time is, because of how delayed or early everything is. Previously they had the old styled system that consisted of 4 parts, (Check, Year Fraction, Year, Millenium). For record-keeping, each year is divided into 1000 equal parts, numbered 000-999. Nowadays the system has been amended and it takes into account the local system flow of time.

Now let's get back to the topic at hand, how are we ever going to resolve this issue?

#### 1. <u>Gravity Shielding and Inertial Compensation Devices</u>:

    Since gravitational fields impact time dilation, future spacecraft could be equipped with gravitational shielding or inertial compensation systems to reduce the effects of extreme acceleration and deceleration. This idea is kind of fantastical, but such technology could help stabilize the internal passage of time relative to external systems, allowing for more consistent `synchronization` and coordination with far-off systems.

 <Image src="/static/images/travel.jpeg" width={800} height={800} />

#### 2. <u>Localized Blockchain for Time and Data Integrity</u>:

    A blockchain could be adapted for interstellar time and data integrity by creating `localized blocks` that capture and verify time-sensitive data across different systems. Each spacecraft or station could maintain its own blockchain ledger, but these ledgers could periodically "dock" with other systems when close enough to exchange blocks. This is a super cool thing to consider, it does have an issue with relaying this information in time to the relevant stations or planets, but there could be a reasonable way to do it.

#### 3. <u>Hyper-Sensitive Photonic Positioning Systems</u>:

    For accurate navigation and system synchronization, a new form of hyper-sensitive positioning technology could detect [even minute shifts in photonic signals](https://www.nature.com/articles/s41566-024-01563-3) across long distances. This could be achieved through `photonic resonance beacons` (Have to probably workshop the name) placed in stable, distant locations that transmit precise spatial data, allowing ships to triangulate their position with respect to distant star systems.

#### 4. <u>Time-Indexed Data Stamping and Holographic Archiving</u>:

    With vast distances between systems, one solution is to create a "time-indexed" approach where all data is stamped with precise temporal markers that indicate its origin, context, and system of time.

#### 5. <u>Self-Organizing Consensus Networks (SOCNs)</u>:

    A self-organizing network of devices could continuously establish consensus across interstellar systems, creating decentralized, resilient synchronization. Each device in the network would carry its own "trust score" and share periodic status updates, allowing the system to evaluate and select the most probable "current state" of distant systems. Additionally, an election system can be applied similar to Raft to determine what would be the best node to obtain data from, the trust score would minimize the amount of data needed to be sent across and reduce the time and complexity of the system needed to determine a leader for the election. This is kind of similar to the second point which I have mentioned.

#### 6. <u>Time-Distortion Compensation Layers (TDCL)</u>:

    There is a satellite called the  Sentinel-6A whose onboard synchronization software compensates for slight timing and signal distortions introduced by Doppler effects and environmental variations, similar to how a TDCL could timestamp data packets with real-time drift metrics.

### All of the systems above can be augmented by using probabilistic models that can predict time discrepancies to an extent.Some of the sources I have listed below may be quite heavy as they were for me, but quite interesting concepts are covered within.

#### Also read up on this comprehensive document about [precise onboard time synchronization](https://navi.ion.org/content/navi/69/3/navi.531.full.pdf), its pretty neat.
