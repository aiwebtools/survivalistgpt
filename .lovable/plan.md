# Plan

Build an in-site Survivalist GPT chat experience with no login required.

## What will change
- Add a branded chat page inside the existing Survivalist GPT site.
- Add prominent navigation buttons from the landing page/header/footer to open the chat.
- Enable Lovable Cloud so the app can call Lovable AI securely without exposing private keys.
- Add a server-side AI endpoint powered by Lovable AI.
- Add support for:
  - Survivalist GPT-style answers
  - Targeted follow-up questions
  - Image uploads for analysis
  - Web-search-assisted answers when useful
  - Mobile-friendly chat layout
  - Clear educational/research disclaimer

## Safety boundary
The assistant will focus on lawful survival, emergency preparedness, battlefield safety, situational awareness, evacuation, shelter, first aid, rationing, and defensive risk reduction.

It will not provide offensive combat instructions, illegal harm guidance, or instructions to kill people. For weapons, drones, or robots, it will redirect to avoidance, cover, escape, de-escalation, reporting, and defensive safety measures.

## Technical details
- Add a new `/chat` page.
- Add a reusable chat interface component with message history, image upload, loading states, and responsive styling.
- Create a Lovable Cloud function for AI requests.
- Use the default Lovable AI chat model through the secure server-side gateway.
- Stream or safely return model responses while preserving useful error messages for the user.
- Add a web search tool path for current threat/resource lookups when the user asks or location/current conditions matter.
- Update metadata where appropriate so the chat page is still branded as Survivalist GPT.

## Validation
- Verify the page opens on desktop and mobile.
- Verify text chat works.
- Verify image upload is accepted.
- Verify gateway configuration is present.
- Check the latest build status before marking complete.
