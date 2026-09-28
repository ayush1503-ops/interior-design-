/*
  REVIEWS
  ─────────────────────────────────────────────────────────────
  Vantara Interiors collects genuine reviews on its Google Business
  profile — the Reviews section links visitors there directly.

  No quotes are displayed until real review text is added here.
  When the studio has permission to display client reviews, add
  them below (exactly as written on Google, with the reviewer's
  name as published) and the section will render them with
  attribution automatically. Do not paraphrase or invent reviews.
  ─────────────────────────────────────────────────────────────
*/

export interface Review {
  quote: string;
  author: string;
  projectType?: string;
}

export const reviews: Review[] = [
  /*
  Example of the intended shape (uncomment and replace with real reviews):

  {
    quote: "–– exact review text from the Google Business profile ––",
    author: "–– reviewer's name as published on Google ––",
    projectType: "Home interior",
  },
  */
];
