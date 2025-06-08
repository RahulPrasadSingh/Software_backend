const { google } = require("googleapis");

const CLIENT_ID =
  "30860311309-06oj8343luvomfv11m8j1q7rtin6j69d.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:5000/auth/google/callback";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

{
  /* 
{
    // Generate the URL to request user authorization

  const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: ["https://mail.google.com/"],
  prompt: "consent",
});

console.log("Authorize this app by visiting this url:", authUrl);  
}
*/
}

const code =
  "4/0AeanS0ZrW468MWAOoAARDk6dXmWLPi7Rn5fvH46VU6oLLUHfiKo5npg2UYPHyHQEBnpJzg"; // Replace this with your actual authorization code

async function getNewRefreshToken() {
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    console.log("Access Token:", tokens.access_token);
    console.log("Refresh Token:", tokens.refresh_token); // This is the new refresh token
    console.log("Token Expiry:", tokens.expiry_date);
  } catch (error) {
    console.error("Error retrieving access token", error);
  }
}

getNewRefreshToken();