---
title: Evaluating the evaluator
date: '2024-05-22'
tags: ['RAG', 'Langfuse', 'TruLens', 'Phoenix', 'Python', 'Ollama']
draft: false
summary: Checking out the pros and cons I faced when utilising these evaluators
---

# What's up guys Ayaan here, its been a while but I hope this time I'll stick around and be more frequent.

I have had to recently cycle through various different evaluation frameworks for a particular task I have been working on, and I thought I would share my experiences with everyone.

## RAGs are all the rage nowadays

But they were first looked into as a concept in [2020 by Facebook researchers](https://arxiv.org/abs/2005.11401v4), RAG is a new method that blends two types of memory: one representing the model's inherent knowledge and another functioning like a search engine. This combination enhances the model's ability to access and utilize information effectively.

Of course companies obviously should optimise the way by which they should obtain the correct RAG implementation to minimise any false results obtained from it. That is where these evaluation frameworks come in hand.

<Image alt="eval_goblin_mode" src="/static/images/4but3.jpg" width={500} height={300} />

- ## Trulens

  The first one I experimented with was Trulens. It was a pretty reliable evaluation framework, that I could recommend to anyone.

  It has an absolutely labyrinthine amount of feedback functions, from distances and sentiment analysis to comparison values between the question and answer. When working with this evaluation framework it was relatively easy to setup the default scoring mechanisms, that being said the custom functions required me to be a bit more hands on before I could get them to work.

  What I remember fondly about using this framework about how simple the setup was, once the scoring and recorder objects were setup it was as simple as pie to start logging all the traces.

      ```python
      with recorder as _:
         for question in questions_list:
            RAG.query(question)
      ```
      It was just that simple.

  One recurring issue I see in most of these evaluation was the inability to insert my own data into the UI so that I would have all the relevant data in one view.

  There also exists the ability to create a `record` manually so that you can have more control about what gets sent into the trulens ecosystem.

  #### PROS

  1.  The ability to export the records with feedback programatically washandy.
  2.  Wide variety of evaluation metrics.
  3.  The utilisation of LiteLLM to allow for essentially any llm model to beused (OpenAI, Ollama, etc) was a life saver for me, as I had to use localLLMs.
  4.  The mainstay of answer_relevance, context_relevance and groundednesshelp to ensure that your RAG reduces its chances of suffering from hallucination is a core concept in trulens

  #### CONS

  1.  The documentation was a bit hard to get around my head.
  2.  No custom columns 😔
  3.  Custom evaluation can be troublesome at times.
  4.  The absolute nature of using OpenAI-API keys for everything besides thelitellm, not everyone is liable to use OpenAI.(Thankfully circumvented byLiteLLM)

  #### Notes:

  I do hope that they make the API for developers to make use of the their data in wierd and interesting ways. I love a well made API system, sue me.

  The tutorials were great and super informative, stitching them together helped me to understand the documentation.

  The documentation is very detailed and informative but I just feel like its not structured as well as it could be? This simply might be a personal issue though.

- ## Phoenix

  Just like a phoenix, my phoenix setup at first didnt work as intended with my setup and after finally challenging myself to remedy the situation, it rose from its ashes. Albeit I would still eventually have to leave it behind.😔

  One thing I have to say that phoenix has an absolutely beautiful way of representing their data, especially the flow of the input and output for a particular trace. When I would track the process of the llm making the query. It was inclusive of the embedding, generation, synthesizing, retrieving.

   <Image alt="staircase_to_heaven" src="/static/images/phoenix_generation.png" width={800} height={500} />

  Again the curse of custom columns follow us here, as well. However phoenix shares a method by which this can be done by an alternate manner with Langfuse.

  When it comes to evaluation, Phoenix utilises a relatively simple system in order to set up a scoring mechanism.

  ```python
     hallucination_evaluator = HallucinationEvaluator(eval_model)
     qa_evaluator = QAEvaluator(eval_model)

     hallucination_eval_df, qa_eval_df = run_evals(
         dataframe=queries_df,
         evaluators=[hallucination_evaluator, qa_evaluator],
         provide_explanation=True
     )
  ```

  Evaluation occurs via various different means namely `Phoenix Evaluators`,`Online Evaluators`,`Local Evaluators`. These evaluation processes occur via LLMs which are tasked with not only giving a score for the score tag, but it also allows for the ability to provide an explanation behind the score.

  Now when it comes to the evaluation models, I have to thank my MVP LiteLLM. With it I was able to test a wide variety of open source models from huggingFace, again truly my go to place for getting a variety of models.

   <Image alt="G.O.A.T.S" src="/static/images/mvp.jpg" width={500} height={300} />

  #### PROS

  1.  There is a way to ingest custom data inside the evaluation metric.
  2.  A very streamlined and easy way to showcase the data.
  3.  The breakdown of steps is very detailed and can lead to the identification of how one can improve their RAG.
  4.  Extremely simple setup, besides the scores.

  #### CONS

  1.  Setting up custom scores can be a little tedious.
  2.  The absolute nature of using OpenAI-API keys for everything besides thelitellm, not everyone is liable to use OpenAI.(Thankfully circumvented byLiteLLM) again.
  3.  Issue regarding the parsing of the explanation to determine a score value.

- ## Langfuse

  Langfuse has consistently allowed me to address certain issues that I faced with other evaluation platform. Firstly not only does it have allow for some custom made content on the data, it also addresses many issues I faced with the scoring mechanism which is resolved by careful maneauvering.

  I have to say, having the ability to chat with the founders of the product `live` greatly improved my experience, considering I was tasked with including additional data in the dashboard as well as find ways to utilise this data to augment the RAG in a cyclical manner and hence setup the equivalent to a flywheel.

## Final Summary

Do note that I completely understand that these tools are only meant for evaluation, so my gripes considering the inability to have custom columns shoudlnt be considered. However personally for my task it would have been beneficial.

## I have personally settled on utilsing Langfuse, for my personal usage in order to obtain evaluation results for my RAG, but like I said above I might explore RAGAS in the future and give it a try.

Special thanks to [P K Navin Shrinivas](https://www.linkedin.com/in/p-k-navin-shrinivas-1020a01b7/) and [Anirudh Rowjee](http://rowjee.com/) for proofreading the blogpost, thanks guys!
