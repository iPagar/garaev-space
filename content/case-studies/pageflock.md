---
title: Pageflock
summary: Desktop app for exporting LinkedIn page followers.
serviceSlug: desktop-app-development
order: 9
draft: false
role: Desktop application and workflow automation
projectType: Product development
coverImage: /case-studies/pageflock.webp
coverAlt: Pageflock desktop interface with a fictional organisation and demonstration follower records
coverCaption: Pageflock interface rendered with a fictional organisation and demonstration records.
---

## Turning a page audience into a usable export

Pageflock is a desktop application for collecting and exporting followers of LinkedIn organisation pages managed by the user. It turns a sequence of account access, page selection, collection and spreadsheet export into a dedicated workspace.

The application needs to maintain the context of the selected page throughout that process. Someone managing more than one organisation should be able to understand which audience is being collected and which records will be exported.

## A workspace organised by page

The flow begins with LinkedIn sign-in in a separate window. Page discovery identifies the organisation pages available to the user, and the main workspace provides the controls for selecting a page and working with its followers.

Search and sorting make the collected records easier to inspect before export. Full and incremental collection modes support both the initial dataset and subsequent updates; cancellation gives the user control over an ongoing run.

## Engineering a desktop workflow

The application uses Electron and React, with a typed interface between the renderer and the desktop process. The data layer uses SQLite through Drizzle, and spreadsheet generation uses ExcelJS.

The interface receives collection progress and data-change events rather than treating a long-running collection as a single blocking interaction. Export is scoped to the selected organisation and produces an XLSX file.

The image uses the application interface with invented example records. It does not expose a real account, client audience or collection session.

## The result

Pageflock provides a focused path from a managed LinkedIn page to an inspectable audience dataset and spreadsheet export. The project combines desktop interaction, background processing and local data management in one workflow.
