//===== FiveM Script =========================================
//= Get Discord or Steam User Profiles
//===== Developed By: ========================================
//= Azael Dev <contact@azael.dev>
//===== Website: =============================================
//= https://www.azael.dev
//===== License: =============================================
//= Copyright (C) Azael Dev - All Rights Reserved
//= You are not allowed to sell this script
//============================================================

/* Modules */
const steam = require('steamhex');
const axios = require('axios').default;
axios.defaults.headers = {};

/**
 * Get Discord User Profile
 * 
 * @param {string} identifier Discord Identifier
 * @param {object} options { botToken, imageData  }
 * @param {string} options.botToken Discord Bot Token
 * @param {boolean} options.imageData Convert Image URL to Base64 Image (avatar_data)
 * @returns {object|null} User Profiles (User Object: https://discord.com/developers/docs/resources/user#user-object)
 */
const getDiscordUserProfile = async(identifier, options = {}) => {
    if (typeof identifier !== 'string') return console.log(`[^1ERROR^7] ^5Discord API:^7 identifier is not a string (^3${typeof identifier}^7)`);
    else if (typeof options !== 'object') return console.log(`[^1ERROR^7] ^5Discord API:^7 options is not a object (^3${typeof options}^7)`);

    const token = options.botToken || CONFIG.BOT_TOKEN;
    const id = identifier.replace('discord:', '');
    const profile = await axios({
        method: 'GET',
        url: `https://discord.com/api/v10/users/${id}`,     // Per-route rate limit: 30 requests per 1 second.
        responseType: 'json',
        headers: { 'Accept-Encoding': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bot ${token}` }
    }).then(async(user) => {
        user.data.avatar = `https://cdn.discordapp.com/avatars/${user.data.id}/${user.data.avatar}.webp?size=4096`;
        
        if (typeof options.imageData == 'boolean' && options.imageData == true) {
            await axios({
                method: 'GET',
                url: user.data.avatar,
                responseType: 'text',
                responseEncoding: 'base64'
            }).then((image) => {
                user.data.avatar_data = `data:image/webp;base64,${image.data}`;
            }).catch((err) => {
                if (CONFIG.DEBUG) console.log(`[^1ERROR^7] ^5Discord CDN:^7 ${err.message}`);
            });
        }

        return user.data;
    }).catch((err) => {
        if (CONFIG.DEBUG) console.log(`[^1ERROR^7] ^5Discord API:^7 ${err.message}`);
    });
    
    return profile;
}

/**
 * Get Steam User Profile
 * 
 * @param {string} identifier Steam Identifier (Hex)
 * @param {object} options { steamKey, imageData  }
 * @param {string} options.steamKey Steam Web API Key
 * @param {boolean} options.imageData Convert Image URL to Base64 Image (avatar_data)
 * @returns {object|null} User Profiles (Public Data: https://developer.valvesoftware.com/wiki/Steam_Web_API#Public_Data)
 */
const getSteamUserProfile = async(identifier, options = {}) => {
    if (typeof identifier !== 'string') return console.log(`[^1ERROR^7] ^5Steam API:^7 identifier is not a string (^3${typeof identifier}^7)`);
    else if (typeof options !== 'object') return console.log(`[^1ERROR^7] ^5Steam API:^7 options is not a object (^3${typeof options}^7)`);

    const key = options.steamKey || CONFIG.STEAM_KEY;
    const id = steam.hexToDec(identifier);
    const profile = await axios({
        method: 'GET',
        url: `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${key}&steamids=/${id}`,
        responseType: 'json',
        headers: { 'Accept-Encoding': 'application/json', 'Content-Type': 'application/json' }
    }).then(async(user) => {
        user.data = user.data.response.players[0];

        if (typeof options.imageData == 'boolean' && options.imageData == true) {
            await axios({
                method: 'GET',
                url: user.data.avatarfull,
                responseType: 'text',
                responseEncoding: 'base64'
            }).then((image) => {
                user.data.avatar_data = `data:image/webp;base64,${image.data}`;
            }).catch((err) => {
                if (CONFIG.DEBUG) console.log(`[^1ERROR^7] ^5Discord CDN:^7 ${err.message}`);
            });
        }

        return user.data;
    }).catch((err) => {
        if (CONFIG.DEBUG) console.log(`[^1ERROR^7] ^5Steam API:^7 ${err.message}`);
    });
    
    return profile;
}

exports('Discord', getDiscordUserProfile);
exports('Steam', getSteamUserProfile);
