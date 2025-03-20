Juuconst fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiME1BVkRnWEhkOG41aGo2bjl0dFBOOGRZdmhxdm1IRmJqREliVW10a00zaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWEhNYktNUDN4SEtVOU9GTEJHMzlGMCtEaFhKaVBFSVVEaWh3RkNTZElqZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzQnczQkFqT1ZCR2IyY3VXcEpFSXBjNG1FWm9tUjZpZjlEN0V0TXJ0c1hZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnS0JoSzUzN0hWZmhrRytlWDlQcWxRT05KSGlFR05keDZzandKNUZzN0NBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVIeEVtQWJ5T3UyNVdBb3puOG0xQ0t0czBiMHVyKzVDNVZqTE5wSUxabW89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkpnS3RzZ0hqL2FlVnJTa2R0cmVUcUdzQmtpN0J2MWZzMUVVY3BJdWNheEk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib05UUDZxM01qcmpwTVFCcmMxc2VabWxSajZ4QVMxa1JqQTdoZFprUGEzYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibk10b1pWVHVUdlhGUGRuVlc5RkNXVnpVTEpjb3UxdmlWa2FvSE1DQnRqTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZSem4yV3h4ZnBZRjR0T3IyNUUrelJPbTNwY0pBQ0NTR1g0NjV5RUtmV2NwNDFzcVpCWGp1WjlteU5sbG5UdW5hQm83bFhDRlI3Smt6L29nN2JPS0FRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgzLCJhZHZTZWNyZXRLZXkiOiIrVmZvemxXT1FKT1N6UTV0N1B1cUlkbk51SExIL0dhR3ZSaGtDYjBIaWRrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJjVEIyUnJERVFDeXAtTTRDUmUtSnN3IiwicGhvbmVJZCI6ImUwMzdkN2JlLTFlZTktNGNlNC1iNjA0LWY1YWVmZDZlMjljMyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5OEhzaVVLREpEMGZPTTJpOHY3cXU5MnpQVGM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieVJoOCtOdzNTYTgyN2ZvaVVaQXZwd3ZrR1cwPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjZXRTRMSFYzIiwibWUiOnsiaWQiOiIyNTQ3MzgyNjA1Nzc6MkBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT3lINXJJRkVMbjE4TDRHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiZHJ5YStKMHVLOUVkZTdSTXV0MjZGV0pOTlRkaUVQZ3BWTm94b1p5bW1rdz0iLCJhY2NvdW50U2lnbmF0dXJlIjoicEJXR3AxS3ZmSVQ2UC9QN2hkanpZVUszWFpPZkNFUUVHZkRSdG9hbjhVNTlZQXVWd2JhSjM0NEc2a0Q1WUUxbkRVcTZHSklJOVB2ZHJTM0tDOXFrQlE9PSIsImRldmljZVNpZ25hdHVyZSI6IlBaaUNScHFUQUJUeWdtRENpUXY5ai9zMC9VSFQ2TGlaeVNSdHZNUXRkeXZYWFBnbTVxQWxsSmhqYUorNm01NTNwQnFUT1UwR095NWRxYm00Z2gzK0R3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzM4MjYwNTc3OjJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWGE4bXZpZExpdlJIWHUwVExyZHVoVmlUVFUzWWhENEtWVGFNYUdjcHBwTSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0MjQ4NjIxNX0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "TIMNASA-TMD",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "253738260577",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    TIMNASA_TMD : process.env.AUTO_LIKE_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
