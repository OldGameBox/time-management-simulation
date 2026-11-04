# The Crypto Wallet Heist

Made for Solya.

The Crypto Wallet Heist is a live classroom page. Participants join on their phones, answer three questions, and wait while an admin sorts up to 24 of them into Clock and Flow companies. Everyone else watches as an Observer. When a round starts, each person sees only the brief for their own company, department, and round. It is made for Solya.

## Run it locally

Open `index.html` in a browser, or serve this folder with any static file server. There is no npm install and no build step.

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Firebase setup

Live presence, the quiz records, team sorting, and the round phase use Firebase Realtime Database. The copy of this repo ships with an empty config. Do not point it at Firestore.

1. Open [console.firebase.google.com](https://console.firebase.google.com) and create a project.
2. Add a Web app and copy its `firebaseConfig` object.
3. Go to Build → Realtime Database → Create database. Create a Realtime Database, not Cloud Firestore. Test mode is fine for a classroom session. Replace those rules with the ones below before people join.
4. Paste the config into `FIREBASE_CONFIG` at the top of `app.js`. `databaseURL` must be the Realtime Database URL (it ends in `firebaseio.com`, or sometimes `firebasedatabase.app`). It is not a Firestore URL. The web config is public once the page is deployed. The rules below are what open and close the data. Leave the config empty in git until you are ready to run the class, and do not commit a private key — a web app config does not include one.
5. Paste these rules and publish them. They leave `session` and `participants` open for the classroom session only:

```json
{
  "rules": {
    "session": {
      ".read": true,
      ".write": true
    },
    "participants": {
      ".read": true,
      ".write": true
    }
  }
}
```

6. After the class, lock the database. Publish rules with `".read": false` and `".write": false`:

```json
{
  "rules": {
    ".read": false,
    ".write": false
  }
}
```

## GitHub Pages

This repository already exists. Merge the pull request, then open the GitHub repo and go to Settings → Pages → Deploy from a branch → `main` → `/` (root). Wait until the site URL is ready. Make a QR code from that URL. Join from a second device and confirm the admin counter moves.

The deployed `app.js` needs your `FIREBASE_CONFIG` filled in, or the public page will stay in local quiz mode.

## Passcode

The admin passcode is `merger2026`. It is checked only in the browser. It hides the dashboard and is visible in the page source. It is not an account and it does not protect the database.

## Round instructions

Edit the `INSTRUCTIONS` object in `app.js`. It is keyed by company (`clock`, `flow`, or `observer`), then by department (`hacker1`, `hacker2`, `hacker3`, `integration`), then by round (`round1`, `round2`). Observer notes have no department, so `round1` and `round2` sit directly on `observer`.
