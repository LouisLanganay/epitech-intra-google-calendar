# Epitech Intra Google Calendar Sync

Automatically sync your Epitech Intranet schedule with Google Calendar.

## ⚠️ Important Notes

> [!WARNING]
> Create a **new** Google Calendar specifically for this project, as it will **delete** events that are not from the Epitech Intranet

> [!IMPORTANT]
> This application only works when connected to **EPITECH's WiFi network**

## Prerequisites

- Node.js and npm installed
- Access to EPITECH's WiFi network
- Google account
- Epitech account

## Setup

1. Clone the repository and install dependencies:
```bash
git clone https://github.com/LouisLanganay/epitech-intra-google-calendar
cd epitech-intra-google-calendar
npm install
```

2. Create and configure environment variables:
   - Rename `.env.example` to `.env`
   - Fill in the required values:
     ```env
     # Get this from your Google Calendar settings
     # Create a NEW calendar specifically for this project!
     GOOGLE_CALENDAR_ID=your_calendar_id

     # Your Epitech intranet session cookie
     USER_COOKIE=your_cookie

     # Don't change these default values
     API_BASE_URL=https://intra.epitech.eu
     PORT=8888
     CRED_PATH=credentials.json
     TOKEN_PATH=token.json
     ```

3. Set up Google OAuth credentials:
   - Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   - Create a new project
   - Enable the Google Calendar API
   - Go to Credentials
   - Create a new OAuth 2.0 Client ID:
     - Application type: Web application
     - Name: Choose any name
     - Authorized redirect URIs: Add `http://localhost:8888`
   - Download the credentials and save them as `credentials.json` in the project root

4. Get your Google Calendar ID:
   - Create a **new** calendar in Google Calendar
   - Go to calendar settings
   - Scroll down to "Integrate calendar"
   - Copy the "Calendar ID"

5. Get your Epitech cookie:
   - Log into [Epitech Intranet](https://intra.epitech.eu)
   - Open browser developer tools (F12)
   - Go to Application > Cookies
   - Find and copy the value of the `user` cookie

## Usage

1. Make sure you're connected to EPITECH's WiFi network

2. Start the application:
```bash
npm start
```

3. On first run:
   - The application will open a Google OAuth consent screen
   - Log in with your Google account
   - Grant the requested permissions
   - The application will start syncing your schedule

## Features

- Syncs all your Epitech events (classes, projects, etc.)
- Color coding for different event types
- Automatic updates of existing events
- Removal of past or cancelled events

## Configuration

You can customize the display settings in `config.json`:
- Event colors
- Event emojis
- Time zone
- Display filters for modules and events

## Troubleshooting

> [!TIP]
> If you encounter any issues:
> 1. Make sure you're connected to EPITECH's WiFi
> 2. Verify your `.env` configuration
> 3. Check that your OAuth credentials are correct
> 4. Ensure your Epitech cookie is valid and up to date

## License

ISC License


