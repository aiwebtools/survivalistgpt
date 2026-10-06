# Project Architecture Rules

- Keep the Survivalist chat built from installed AI Elements primitives; app-specific command-console styling wraps them rather than replacing them, preserving accessible chat behavior.
- Route transcription, spoken replies, and infographic generation through separate server-side streaming functions so the chat interface remains responsive and AI credentials stay private.