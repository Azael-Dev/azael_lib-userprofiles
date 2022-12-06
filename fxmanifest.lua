fx_version 'cerulean'
game 'gta5'

author 'Azael Dev <contact@azael.dev> (https://www.azael.dev/)'
description 'Get Discord or Steam User Profiles'
version '1.0.0'
url 'https://github.com/Azael-Dev/azael_lib-userprofiles'

server_only 'yes'

server_scripts {
    'server.config.js',
    'src/index.js'
}

dependencie 'yarn'
