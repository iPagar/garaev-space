---
title: Arctida Stakeholders
summary: Interactive platform for exploring Arctic influence networks.
serviceSlug: websites-web-applications
order: 5
draft: false
role: Web application and data integration
projectType: Client project
coverImage: /case-studies/stakeholders-graph.webp
coverAlt: Arctida Stakeholders influence graph with the people catalogue, filters and connection legend
coverCaption: The live graph interface with its participant catalogue and connection legend.
projectUrl: https://stakeholders.arctida.io/en
---

## Exploring relationships rather than reading a list

Arctida Stakeholders presents research into the people and organisations influencing policy in the Russian Arctic. A directory can describe individual participants, but understanding influence also requires examining the relationships between them.

The project pairs an introduction to the research with a graph application. The introductory pages explain its purpose and methodology; the application provides a way to explore the underlying network.

## Exploring the network

The graph sits alongside a catalogue of individuals and organisations. Search, filters and layers provide ways to narrow the view, while the legend distinguishes formal and informal connections and the categories of participants.

## Keeping the research context close

The landing page gives visitors a starting point before they enter the graph. It introduces the research question and links to the methodology, report and API documentation.

That context matters because a visual connection still needs interpretation. The research team supplies the underlying classification and methodology; the engineering work makes the data available through an interactive interface.

![Arctida Stakeholders methodology page explaining the research and its data](/case-studies/stakeholders-methodology.webp)

![The project introduction connects the graph with its research context and methodology](/case-studies/stakeholders-intro.webp)

## Engineering a graph interface

The frontend uses Next.js, Sigma and Graphology to work with network data. WebGL rendering supports the graph view, while application state and interface components support selection and navigation around it.

The wider system includes a NestJS backend and graph-oriented data storage. Separating the data service from the browser interface allows the network to be delivered through an API as well as explored visually.

## From research to a reusable tool

The implementation turns a relationship dataset into a web application with its own introduction, methodology and documented data interface. This is a different engineering problem from publishing a collection of articles: the interface needs to help readers move through connected entities while retaining the meaning of the source research.
