# azael_lib-userprofiles
FiveM - Get Discord or Steam User Profiles

## ความต้องการ
- [yarn](https://github.com/citizenfx/cfx-server-data/tree/master/resources/%5Bsystem%5D/%5Bbuilders%5D/yarn)

## ดาวน์โหลด

### ใช้ Git
```
cd resources
git clone https://github.com/Azael-Dev/azael_lib-userprofiles [local]/[azael]/[library]/azael_lib-userprofiles
```

### ด้วยตนเอง
- ดาวน์โหลด https://github.com/Azael-Dev/azael_lib-userprofiles/archive/refs/heads/main.zip
- แก้ไข `azael_lib-userprofiles-main` เป็น `azael_lib-userprofiles`
- วางไว้ใน `[local]/[azael]/[library]`

## ติดตั้ง
- เพิ่มสิ่งนี้ไปยัง server.cfg

```
ensure azael_lib-userprofiles
```

- สามารถตรวจสอบการกำหนดค่าเพิ่มเติมได้ที่ [server.config.js](https://github.com/Azael-Dev/azael_lib-userprofiles/blob/main/server.config.js)

## วิธีใช้งาน

### รับโปรไฟล์ Discord

#### Lua

```lua
exports['azael_lib-userprofiles']:Discord(identifier, options)
```

#### Parameter

| Name                         | Type               | Required         | Description                                                
|------------------------------|--------------------|------------------|----------------------------------------------------------------------
| `identifier`                 | `string`           | ✔️               | ตัวระบุ Discord ผู้เล่น (`discord:000000000000000000`)
| `options`                    | `table`            | ❌               | { `botToken`, `imageData` }
| `options.botToken`           | `string`           | ❌               | Discord Bot Token (หากไม่ระบุมีความจำเป็นที่จะต้องเพิ่ม `set discord_botToken "your_token"` ที่ไฟล์ server.cfg)
| `options.imageData`          | `boolean`          | ❌               | แปลง Image URL เป็น Base64 Image (`avatar_data`)

#### Return

| Type               |  Description                                                
|--------------------|----------------------------------------------------------------------
| `table` or `nil`   | User Object: https://discord.com/developers/docs/resources/user#user-object

#### Example
```lua
local profile = exports['azael_lib-userprofiles']:Discord(identifier, { botToken = 'bot_token', imageData = true })

if type(profile) == 'table' then
    print(('%s#%s'):format(profile.username, profile.discriminator)) -- Azael Dev#0078
end
```

### รับโปรไฟล์ Steam

#### Lua

```lua
exports['azael_lib-userprofiles']:Steam(identifier, options)
```

#### Parameter

| Name                         | Type               | Required         | Description                                                
|------------------------------|--------------------|------------------|----------------------------------------------------------------------
| `identifier`                 | `string`           | ✔️               | ตัวระบุ Steam (Hex) ผู้เล่น (`steam:0000X0000X0000X`)
| `options`                    | `table`            | ❌               | { `steamKey`, `imageData` }
| `options.steamKey`           | `string`           | ❌               | Steam Web API Key (หากไม่ระบุมีความจำเป็นที่จะต้องเพิ่ม `set steam_webApiKey "your_key"` ที่ไฟล์ server.cfg)
| `options.imageData`          | `boolean`          | ❌               | แปลง Image URL เป็น Base64 Image (`avatar_data`)

#### Return

| Type               |  Description                                                
|--------------------|----------------------------------------------------------------------
| `table` or `nil`   | Public Data: https://developer.valvesoftware.com/wiki/Steam_Web_API#Public_Data

#### Example
```lua
local profile = exports['azael_lib-userprofiles']:Steam(identifier, { steamKey = 'api_key', imageData = true })

if type(profile) == 'table' then
    print(profile.personaname) -- Azael Dev
end
```

## เครดิต
- [AZAEL](https://discord.gg/Ca5W62f)

## กฎหมาย
### ใบอนุญาต

ลิขสิทธิ์ (C) Azael Dev - สงวนลิขสิทธิ์

- ห้ามใช้ชิ้นส่วนใดๆ ของซอฟต์แวร์นี้ในผลิตภัณฑ์ / บริการเชิงพาณิชย์
- ห้ามนำซอฟต์แวร์นี้ไปขายต่อ
- คุณจะต้องไม่จัดหาสิ่งอำนวยความสะดวกใด ๆ ในการติดตั้งซอฟต์แวร์นี้ในผลิตภัณฑ์ / บริการเชิงพาณิชย์
- หากคุณแจกจ่ายซอฟต์แวร์นี้ใหม่ คุณต้องเชื่อมโยงไปยังที่เก็บดั้งเดิมที่ [azael_lib-userprofiles](https://github.com/Azael-Dev/azael_lib-userprofiles)
- ลิขสิทธิ์นี้ควรปรากฏในทุกส่วนของรหัสโครงการ

License (ENG): https://github.com/Azael-Dev/azael_lib-userprofiles/blob/main/LICENSE
