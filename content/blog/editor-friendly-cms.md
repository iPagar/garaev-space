---
title: An editor-friendly CMS in practice
excerpt: Lessons from configuring Sanity for Arctic Moroshka and Arctida, from award-cycle content models to image previews and changes to existing documents.
publishedAt: 2026-09-05
draft: false
---
A CMS is part of the product the client uses after the website launches. The reader sees an article or a programme page. The editor sees fields, document lists, validation messages and previews. Both interfaces deserve deliberate work.

In my Sanity projects, I start with the content the organisation actually manages. An award has cycles, nominees and winners. A research organisation has publications, authors, images and editorial blocks. Those are useful building blocks for an editing interface because they belong to the team’s work.

Arctic Moroshka and Arctida provide concrete examples of how I approach that setup.

## Model the programme before the page

For Arctic Moroshka, the award cycle is a document with a year, a season and a title. It also holds the jury, nominees, shortlist, winners and timeline steps associated with that edition.

The current-cycle flag is part of the same model. The public website can use it to present the current programme while retaining the structure of earlier editions.

A shortlisted item is a separate document with its title, author, thumbnail and link. Cycle documents refer to those items. This gives the content an identity beyond the particular page on which it appears.

The distinction becomes useful when the same piece of journalism appears among nominees and later in the results. The content model expresses the relationship, and the frontend decides how to present it in each context.

## Make records recognisable in the document list

An editing interface should help someone identify a record before opening it. The Moroshka Studio previews use translated titles, author names and thumbnails. A cycle preview also shows the year, season and whether it is current.

These are small decisions, but they remove the need to inspect several documents just to find the intended one. Preview content comes from the document fields, so it stays connected to what the editor is changing.

Global settings, the FAQ and the award introduction have dedicated entries in the Studio navigation. They are configured as specific documents instead of being mixed into a generic list of page types.

## Put constraints where the editor can see them

Field labels and descriptions should explain the requested content. Validation then handles the rules that can be checked automatically.

In Moroshka, required fields identify the information a record needs. A localisation helper used by the settings schema also checks the configured languages and names the missing translations in its message. Requiring an array alone would not establish that each language contains useful text.

Arctida has a more visual example. Its “two images in a row” block explicitly requires two images:

```ts
validation: (Rule) => Rule.required().min(2).max(2)
```

That rule belongs to a particular editorial component. It makes the shape of the content agree with the layout the component is designed to render. Each image entry also carries an image, alternative text and an optional caption.

[Sanity’s validation documentation](https://www.sanity.io/docs/studio/validation) covers field rules and custom validation. The important design decision comes first: what should a valid entry mean for this content type?

## Show the editorial block while it is being edited

A pair of images is easier to understand when the editor can see the pair. In Arctida, a custom block component presents the images and their captions inside the editing flow. Selecting the block opens a dialog with its fields.

The implementation reuses Sanity’s default field rendering inside that dialog. The custom work is focused on presentation and interaction around the block, rather than recreating every field control.

This is a useful place for a custom component: it makes a specific content structure visible. [Sanity’s form-component API](https://www.sanity.io/docs/studio/form-components) provides the extension points, including access to the default rendering.

The surrounding editor also contains previews for other editorial structures, such as quotations and key thoughts. Those components help distinguish content by its purpose while it is still in the Studio.

## Limit formatting to the choices the site supports

Arctida’s basic editor offers normal text, second- and third-level headings, lists and a defined set of inline marks. Its link annotation asks for a URL.

That is a deliberate content contract. The editor’s options and the frontend’s rendering need to agree. Adding another style to a toolbar creates another case to support on the public site; removing an option also has consequences for content that already uses it.

I want the available choices to correspond to actual editorial needs. A CMS configuration becomes easier to reason about when each option has a clear place in the resulting publication.

## Existing content is part of a schema change

Changing a field definition only describes the shape of future edits. It does not automatically rewrite every document already stored in that shape.

Arctida’s repository includes a migration for changing a key-thought field from a string to rich text. It checks that the node has the expected type and that its text is still a string, then wraps that value in a Portable Text block.

The essential part looks like this, with the surrounding migration definition omitted:

```ts
if (node?._type === 'keyThought' && typeof node.text === 'string') {
  return at('text', set([{
    _key: 'keyThoughtTextBlock',
    _type: 'block',
    style: 'normal',
    children: [{
      _key: 'keyThoughtTextSpan',
      _type: 'span',
      marks: [],
      text: node.text,
    }],
    markDefs: [],
  }]))
}
```

The original text is carried into the new structure. The type check also gives the migration a clear boundary: values already represented as rich text do not enter that branch.

I treat the schema, existing documents and frontend renderer as three parts of the same change. A schema file alone cannot prove that the current dataset has been migrated or that the public page renders the result. Those need their own checks when the change is applied.

## Judge the workflow as a whole

The useful question is whether an editor can complete a real task: find the right cycle, choose a nominee, update a translation, arrange an image pair and understand what still needs attention.

Content modelling, validation and previews all contribute to that workflow. I scope them together with the public website so the editing experience is part of the implementation from the start.

You can see the public side in [Arctic Moroshka](/case-studies/arctic-moroshka) and [Arctida](/case-studies/arctida). For a new publishing site or improvements to an existing editing workflow, see [websites and web applications](/services/websites-web-applications).
