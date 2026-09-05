---
title: LimeMenu
summary: Native macOS menu bar app for monitoring CPU, memory, and battery usage.
serviceSlug: desktop-app-development
order: 10
draft: false
role: Native macOS application development
projectType: Independent product
coverImage: /case-studies/limemenu.webp
coverAlt: LimeMenu macOS popover showing CPU, memory, battery and processes
coverCaption: LimeMenu application screenshot from the project’s promotional assets.
projectUrl: https://limemenu.org
---

## System information without a permanent extra window

LimeMenu is a native macOS menu bar application for monitoring CPU, memory and battery usage. The idea came from wanting a compact way to see resource pressure without keeping Activity Monitor open throughout the day.

The design task is constrained by the format. A menu bar item has little room, while its popover needs to make more detailed information available without turning into a full dashboard window.

## A glance, then the detail

The menu bar provides a compact entry point. Clicking it opens a popover with CPU usage, a memory breakdown and battery information. Process lists add context when the user needs to understand which applications are consuming resources.

Memory pressure is shown alongside the amount of memory in use. That distinction gives the interface more meaning than a single percentage and helps the user decide whether to investigate further.

## Working with the desktop environment

The implementation is a native Swift application. Its interface and system-metric collection operate within the macOS application model, rather than using a browser window to reproduce a desktop utility.

The product work includes the small details of an everyday tool: presentation in the menu bar, a compact detail view and a distributable application that users can install on their own machines.

## The result

LimeMenu offers a dedicated place to glance at system resources and open a more detailed view when needed. The case demonstrates a tightly scoped desktop product built around a recurring personal task.
