# Mobile-first Survivalist AI upgrade

## What will change
- Put a large, clearly labeled **Ask Survivalist GPT** typing bar in the first phone view, with an obvious send control and short example text.
- Move starter missions directly above the typing bar as compact, tappable prompts so users see them immediately.
- Simplify the phone layout: collapse secondary command controls into a small **Mission Tools** panel while preserving the premium field-terminal design.
- Keep the conversation and typing bar together, with the composer remaining easy to reach as messages grow.

## AI capabilities
- Add press-to-record voice input that transcribes a complete recording into the typing bar before sending.
- Add **Listen** controls to assistant replies using a natural spoken voice, with visible play/stop status.
- Add an **Infographic** mode for requests such as emergency plans, checklists, evacuation diagrams, and survival reference cards; generated visuals will appear inside the conversation.
- Keep image upload and analysis available from a clearly labeled camera/image control.
- Make web search an explicit, clearly labeled mode and continue passing it to Survivalist GPT for current-information requests.

## Visual direction
- Preserve the rugged Survivalist command-console identity, but reduce tiny labels and decorative competition on phones.
- Give the composer an official radio-console treatment: strong border, readable placeholder, microphone, image, web, infographic, and transmit controls.
- Use clear active states and plain labels so every capability is understandable without guessing icons.

## Technical details
- Continue using the installed AI Elements chat and prompt primitives.
- Add secure Lovable Cloud functions for transcription, speech, and infographic generation; private AI access remains server-side.
- Use the assigned Lovable AI models and documented streaming formats, with safe error messages and no hidden automatic retries.
- Keep existing external tool links, credit fallback, safety guidance, and current chat behavior intact.
- Record structural decisions in the project architecture rules and add the work to the roadmap.

## Validation
- Verify the typing bar and starter prompts are visible and usable at phone size.
- Test text chat, image upload, web-search mode, voice recording/transcription, spoken replies, and infographic generation.
- Verify microphone-denied, credit-limit, and AI error states remain understandable.
- Check desktop and phone layouts, then confirm the latest build is clean.
