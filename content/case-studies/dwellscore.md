---
title: DwellScore
summary: Mobile app for evaluating residential locations.
serviceSlug: mobile-app-development
order: 8
draft: false
role: Mobile application and location-data integration
projectType: Independent product
coverImage: /case-studies/dwellscore-score.webp
coverAlt: DwellScore mobile interface showing a location assessment
coverCaption: DwellScore application screen from the project’s screenshot assets.
---

## Understanding the surroundings of an address

DwellScore helps people inspect a residential location through nearby features such as roads, railways, parks and nightlife. The starting point is a place on the map; the result is an assessment accompanied by the factors behind it.

The product challenge is to translate geographical data into an explanation that is usable on a phone. A score alone would hide the reasoning, so the experience needs to connect the selected address, surrounding features and individual signals.

## From map selection to explanation

The user selects a location and requests an assessment. The interface presents the result and lets the user examine the contributing factors. Returning to the map keeps those factors connected to a physical place.

The screenshots show the search, result and factor views as parts of one sequence. They illustrate the product interface, rather than a claim about the suitability of a particular property.

![DwellScore location search interface](/case-studies/dwellscore-search.webp)

## Explicit rules over geographic features

The application uses a React Native and Expo frontend with a NestJS API. The scoring implementation processes OpenStreetMap features with geographical rules, including distances, feature categories and positive or negative contributions.

This approach makes the assessment explainable at the feature level. Data coverage remains part of the product boundary: nearby mapped features provide useful signals, but they do not establish actual measured noise or every condition at an address.

![DwellScore interface explaining the factors behind a location score](/case-studies/dwellscore-factors.webp)

## The result

DwellScore brings location selection, geographic processing and an explained score into a single mobile experience. The case demonstrates how to present a data-derived result without losing the individual factors that produced it.
