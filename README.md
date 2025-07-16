# Project Stack for GOOGLE MAPS Module

    - Next.js

    - Google Maps JavaScript API & Places API

    - @react-google-maps/api → Official wrapper for using Google Maps in React

    - Optional: TailwindCSS for styling

# Project Stack for Auth Playground

    - Next.js 15 (App Router)

    - NextAuth.js v5+ (for App Router)

    - TailwindCSS for styling

/app
  /api
    /auth
      /[...nextauth]
        route.ts       ← ✅ NextAuth backend API route
/auth
  config.ts            ← ✅ NextAuth configuration (providers, pages, etc.)
/components
  AuthPlayground.tsx   ← ✅ Frontend UI component for login/logout
/app/auth/page.tsx     ← ✅ Page to mount <AuthPlayground /> (frontend route)


### 👉 ID AND SECRET
    - Google Cloud Console → OAuth Consent Screen + Credentials
    - GitHub Developer Settings → OAuth App
    - Facebook Developers Console → App → Settings → Basic + Login

