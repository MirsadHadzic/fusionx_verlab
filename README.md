# FusionX EDIH website

Responsive bilingual website for the FusionX European Digital Innovation Hub in Bosnia and Herzegovina. Built with React, TypeScript and Vite.

## Implemented

- Responsive homepage with service, industry, process, about, news and partner sections.
- Industry overview, company success-story article, contact page, privacy policy and terms of use.
- Bosnian/English language switcher. The selected language updates the site content and document metadata, and is remembered in the browser.
- Contact links for `fusionx@verlabinstitute.com`, `info@fusionxhub.com` and `fusionx@cdt.ba`.
- “Report a problem” buttons link to the Microsoft Forms questionnaire and open in a new tab.
- Partner logos displayed in a horizontally scrollable row, in this order: CNT Sarajevo, Verlab Institute, BH Telecom, Džemal Bijedić University, University of Bihać, Employers’ Association, Chamber of Economy of FBiH, CIDEA, Bit Alliance, Verlab d.o.o. and medIT.
- FusionX EDIH light and dark logo variants, favicon, EU funding disclaimer and locally hosted Manrope fonts.
- Responsive layouts, keyboard-accessible partner scrolling, and reduced-motion support for the hero animation.

## Run locally

Requirements: Node.js and npm.

```sh
npm install
npm run dev
```

## Validation commands

```sh
npm run build
npm run lint
npm run typecheck
```

## Remaining before public launch

- Confirm and publish the legal name and contact details of the entity responsible for the website and personal-data processing.
- Have the privacy policy and terms reviewed by the responsible legal entity or legal adviser.
- Confirm Microsoft Forms ownership, who can access submissions, the form’s privacy notice, and applicable retention periods and processing basis.
- Verify hosting-provider cookies, server logs and other technical data processing in the production environment.
- Confirm that contact addresses, partner names and logos, grant details, and all published article facts are approved and current.
- Configure the production domain and hosting, then complete a final browser and mobile-device review of the deployed site.

## Notes

The privacy and terms pages include information that depends on the responsible entity and production configuration. The visible draft warning was removed at the project owner’s request; the outstanding legal and operational checks above still need to be completed before publication.
