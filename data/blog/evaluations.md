---
title: Evaluating the evaluator 📑
date: '2024-06-10'
tags: ['RAG', 'Langfuse', 'TruLens', 'Phoenix', 'Python', 'Ollama']
draft: false
summary: My experience with RAG evaluators
---

### What's up guys Ayaan here, it's been a while but I hope this time I'll stick around and be more frequent.

I have had to recently cycle through various evaluation frameworks for a particular task I have been working on, and I thought I would share my experiences with everyone.

## RAGs are all the rage nowadays

But they were first looked into as a concept in [2020 by Facebook researchers](https://arxiv.org/abs/2005.11401v4), RAG is a new method that blends two types of memory: one representing the model's inherent knowledge and another functioning like a search engine. This combination enhances the model's ability to access and utilize information effectively.

Imagine the language model as a chef with a vast internal cookbook (its training data). When asked to prepare a specific dish (respond to a query), the chef consults not only their own cookbook but also steps out to gather fresh ingredients (external data) from the market (the internet or databases). This allows the chef to create a dish (response) that is not only delicious(coherent) but also tailored to the diner’s current craving (contextually relevant), resulting in a more satisfying culinary experience (informative answer).

A simple technical breakdown of the entire process would entail:-

1. Input Processing: It begins with the user’s input, which the model uses to understand the context and intent of the query.

2. Data Retrieval: The model then fetches relevant information from various external sources, such as databases or the internet.

3. Response Generation: Finally, it integrates this retrieved information into the language model’s response, enriching it with contextually appropriate content.

Of course, companies obviously should optimize the way by which they obtain the correct RAG implementation to minimize any false results obtained from it. That is where these evaluation frameworks come in handy.

<Image alt="eval_goblin_mode" src="/static/images/4but3.jpg" width={500} height={300} />

- ## Trulens

The first one I experimented with was Trulens. It was a pretty reliable evaluation framework, that I could recommend to anyone.

It has a labyrinthine amount of feedback functions, from distances and sentiment analysis to comparison values between the question and answer. When working with this evaluation framework it was relatively easy to set up the default scoring mechanisms, that being said the custom functions required me to be a bit more hands-on before I could get them to work.

What I remember fondly about using this framework was how simple the setup was, once the scoring and recorder objects were set up it was as simple as pie to start logging all the traces.

```python
      with recorder as _:
         for question in questions_list:
            RAG.query(question)
```

It was just that simple.

One recurring issue I saw in most of these evaluators was the inability to insert my data into the UI so that I would have all the relevant data in one view.

There also exists the ability to create a `record` manually so that you can have more control over what gets sent into the trulens ecosystem.

#### PROS

1. The ability to export the records with feedback programmatically was handy.
2. Wide variety of evaluation metrics.
3. The utilization of LiteLLM to allow for essentially any LLM model to be used (OpenAI, Ollama, etc) was a lifesaver for me, as I had to use local LLMs.
4. The mainstay of answer_relevance, context_relevance, and groundedness help to ensure that your RAG reduces its chances of suffering from hallucination is a core concept in trulens

#### CONS

1. The documentation was a bit hard to get around my head.
2. No custom columns 😔
3. Custom evaluation can be troublesome at times.
4. The absolute nature of using OpenAI-API keys for everything besides LiteLLM, not everyone is liable to use OpenAI.(Thankfully circumvented byLiteLLM)

#### Notes:

I do hope that they make the API for developers to make use of their data in weird and interesting ways. I love a well-made API system, sue me.

The tutorials were great and super informative, stitching them together helped me to understand the documentation.

The documentation is very detailed and informative but I just feel like it's not structured as well as it could be. This might be a personal issue though.

- ## Phoenix

Just like a phoenix, my phoenix setup at first didn't work as intended with my setup and after finally challenging myself to remedy the situation, it rose from its ashes. Albeit I would still eventually have to leave it behind.😔

One thing I have to say is that Phoenix has an absolutely beautiful way of representing its data, especially the flow of the input and output for a particular trace. When I would track the process of the llm making the query. It was inclusive of the embedding, generation, synthesizing, and retrieving.

 <Image alt="staircase_to_heaven" src="/static/images/phoenix_generation.png" width={800} height={500} />

Again the curse of custom columns follows us here, as well. However, phoenix shares a method by which this can be done alternately with Langfuse.

When it comes to evaluation, Phoenix utilizes a relatively simple system to set up a scoring mechanism.

```python
     hallucination_evaluator = HallucinationEvaluator(eval_model)
     qa_evaluator = QAEvaluator(eval_model)

     hallucination_eval_df, qa_eval_df = run_evals(
         dataframe=queries_df,
         evaluators=[hallucination_evaluator, qa_evaluator],
         provide_explanation=True
     )
```

Evaluation occurs via various means namely `Phoenix Evaluators`,` Online Evaluators`, and`Local Evaluators`. These evaluation processes occur via LLMs which are tasked with not only giving a score for the score tag, but it also allows for the ability to explain the score.

Now when it comes to the evaluation models, I have to thank my MVP LiteLLM. With it, I was able to test a wide variety of open-source models from huggingFace, again truly my go-to place for getting a variety of models.

 <Image alt="G.O.A.T.S" src="/static/images/mvp.jpg" width={500} height={300} />

#### PROS

1. There is a way to ingest custom data inside the evaluation metric.
2. A very streamlined and easy way to showcase the data.
3. The breakdown of steps is very detailed and can lead to the identification of how one can improve their RAG.
4. Extremely simple setup, besides the scores.

#### CONS

1. Setting up custom scores can be a little tedious.
2. The absolute nature of using OpenAI-API keys for everything besides LiteLLM, not everyone is liable to use OpenAI.(Thankfully circumvented byLiteLLM) again.
3. Issue regarding the parsing of the explanation to determine a score value.

- ## Langfuse

Langfuse has consistently allowed me to address certain issues that I faced with another evaluation platform. Firstly not only does it allow for some custom-made content on the data, but it also addresses many issues I faced with the scoring mechanism which is resolved by careful maneuvering.

I have to say, having the ability to chat with the founders of the product ` live` greatly improved my experience, considering I was tasked with including additional data in the dashboard as well as finding ways to utilize this data to augment the RAG cyclically and hence set up the equivalent to a flywheel. The prompt suggestions by the team were really handy, and I want to appreciate that.

Similar to the other evaluation frameworks, the ability to use the LLM models for scoring exists here as well, additionally, the ability to add a ` manual-score` exists as well in the UI itself.
Recently they added a process by which one could make a scoring mechanism within the LangfuseUI. I wish that they would look into the ability to also provide the `score name` for the relevant manual score that we wish to input to make the mechanism more useful and flexible.

When I wanted to begin the scoring of the traces, I encountered an issue as the task required me to score multiple different questions at the same time after they had been traced by Langfuse. A point to note for anyone who also wishes to trace and score in Langfuse, the suggested way of doing this is by scoring the generations, but if you have multiple generations then there is the possibility of the mechanism scoring the same trace multiple times.

```python
  def fetch_all_pages(name=None, user_id = None, limit=50):
    page = 1
    all_data = []
 
    while True:
     response = langfuse.get_generations(name=name, limit=limit, user_id=user_id, page=page)
        if not response.data:
            break
 
     all_data.extend(response.data)
     page += 1
 
    return all_data
```

AND

```python
  def execute_eval_and_score():
 
  for generation in generations:
    criteria = [key for key, value in EVAL_TYPES.items() if value and key != "hallucination"]
 
    for criterion in criteria:
     eval_result = get_evaluator_for_key(criterion).evaluate_strings(
          prediction=generation.output,
          input=generation.input,
     )
      print(eval_result)
 
     langfuse.score(name=criterion, trace_id=generation.trace_id, observation_id=generation.id, value=eval_result["score"], comment=eval_result['reasoning'])
 
  execute_eval_and_score()
```

I was able to figure out a way by which we can utilize the Langfuse API (Thank god), to find the particular trace and then manually score it using `langfuse.score`. It was majorly possible due to the method having a field for mentioning the trace, albeit I would be able to use more of the methods if they had the `trace` field. Obviously, there would have been a limiting factor for why this is not an option.

The ability to create a custom scoring mechanism is extremely handy, as the way by which you accomplish this is by mentioning a line that the evaluation model utilizes to score the traces appropriately.

```python
  criteria = {
    "hallucination": (
      "Does this submission contain information"
      " not present in the input or reference?"
    ),
  }
```

#### PROS

1. The documentation is so well maintained and I would recommend the other evaluation frameworks to look into setting up `cookbooks` like they have for a quick implementation.
2. The ability to utilize the API has saved this evaluation framework more times than I can count, and I want to thank the developers for this.
3. A very simple way by which one can make custom metrics.
4. The local setup is handy along with the ability to create profiles and allow for the same instance to be worked upon by several people.

#### CONS

1. The custom metric system while being simple can also potentially make the scoring mechanism for that score not as nuanced as you would want it to be.
2. The very close relationship between generations and traces can lead to unexpected issues arising when utilizing certain functions, like scoring.
3. No custom columns per se, but they did recommend an alternative by utilizing one of the other columns.
4. There should perhaps be more detailed documentation regarding the setup for local LLMs.

## Final Summary

Do note that I completely understand that these tools are only meant for evaluation, so my grip considering the inability to have custom columns shouldn't be considered. However personally for my task, it would have been beneficial.

#### I have personally settled on utilizing Langfuse, for my usage to obtain evaluation results for my RAG, but as I said, I might explore RAGAS in the future and give it a try.
