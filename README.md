# Authentication Test Project with Next.js and TypeScript

---

## Overview

This project is purely a test/sample implementation. I didn't spend much time on UI/UX, so it can definitely be much better and more polished.

---

## Features

- **Validation:**  
  Used the powerful [Zod](https://github.com/colinhacks/zod) library for input validation.

- **Styling:**  
  Tried to use both Sass/Scss and TailwindCSS for the best development experience.

- **Components:**  
  Built custom components for the OTP input and regular inputs, but used HeroUI components for buttons.

- **OTP System:**  
  For better UX, the system generates a random 4-digit OTP automatically, and the user can log in only if they enter the exact code. Otherwise, an error message is shown.

- **Phone Number Validation:**  
  The phone number must start with "09" and be exactly 11 digits long.

- **Requests & Storage:**  
  Used `axios` for API requests, and stored user data in `localStorage`.

- **Folder Structure:**  
  Project structure is organized following the standards of my previous company.

---

## Note

If this version isn't enough, I can provide an update with improved UI, better typings, variable naming, and additional features.

---

## Thanks

Thanks for checking out this project! Looking forward to your feedback.
