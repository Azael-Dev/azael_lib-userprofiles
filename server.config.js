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

CONFIG = {};                                                // Config Data

CONFIG.DEBUG = false                                        // Enable Debug Mode

CONFIG.BOT_TOKEN = GetConvar('discord_botToken', '')        // Discord Bot Token (set discord_botToken "your_token" at server.cfg)

CONFIG.STEAM_KEY = GetConvar('steam_webApiKey', '')         // Steam Web API Key (set steam_webApiKey "your_key" at server.cfg))
