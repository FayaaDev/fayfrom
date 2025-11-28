# Google Sheets Integration Setup

Follow these steps to store form submissions in Google Sheets:

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. In the first row, add column headers that match your form field names:
   - `name`
   - `email`
   - `experience`
   - `feedback`
   - `timestamp` (optional - for tracking submission time)

## Step 2: Create a Google Apps Script

1. In your Google Sheet, go to **Extensions → Apps Script**
2. Delete any existing code and paste the contents of `google-apps-script/Code.js` from this repo
3. Click **Save** (Ctrl+S or Cmd+S)

## Step 3: Run Initial Setup

1. In the Apps Script editor, select `intialSetup` from the function dropdown
2. Click **Run**
3. You'll be asked to authorize the script - click through the permissions:
   - Click "Review permissions"
   - Select your Google account
   - Click "Advanced" → "Go to (unsafe)" (it's your own script)
   - Click "Allow"

## Step 4: Deploy as Web App

1. Click **Deploy → New deployment**
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
3. Configure:
   - **Description**: Form submissions
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**
5. **Copy the Web App URL** - you'll need this for your form

## Step 5: Update Your Form

Replace `YOUR_GOOGLE_APPS_SCRIPT_URL` in `index.html` with your Web App URL.

## Testing

1. Submit a form
2. Check your Google Sheet - a new row should appear with the submission data

## Troubleshooting

- **CORS errors**: Make sure "Who has access" is set to "Anyone"
- **No data appearing**: Check that your column headers exactly match the form field names
- **Authorization errors**: Re-run `intialSetup` and re-deploy

## Optional: File Uploads

If you want to support file uploads:

1. Create a folder in Google Drive for uploads
2. Get the folder ID from the URL (the long string after `/folders/`)
3. In Apps Script, update line 2: `scriptProp.setProperty("uploadFolderId", "YOUR_FOLDER_ID");`
4. Re-deploy the web app
