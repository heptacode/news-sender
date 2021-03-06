<div align="center">

# News Sender ๐๏ธ

</div>

## ์๊ฐ

> ์ธํธ ๋ด์ค ์ ์ก ์๋ํ ์คํฌ๋ฆฝํธ

ํ๋ จ์์์ ๋งค์ผ ์ธํธ์ผ๋ก ๋ด์ค๋ฅผ ๋ฐ์๋ณผ ์ ์๋๋ก ๋์์ค๋๋ค.

ํ์ฌ ์ก๊ตฐ, ๊ณต๊ตฐ๋ง ๊ฐ๋ฅํฉ๋๋ค.

## ๊ธฐ์  ์คํ

![TypeScript](https://img.shields.io/badge/TypeScript-282C34.svg?&style=for-the-badge&logo=typescript)
![NodeJS](https://img.shields.io/badge/Node.js-282C34?style=for-the-badge&logo=node.js)
![Yarn Berry](https://img.shields.io/badge/Yarn_Berry-282C34.svg?&style=for-the-badge&logo=yarn)
![Rollup](https://img.shields.io/badge/Rollup-282C34.svg?&style=for-the-badge)

## ์ค์นํ๊ธฐ

1. ์ต์์ ๋๋ ํ ๋ฆฌ์ `.env` ํ์ผ์ ์์ฑํด์ฃผ์ธ์.

   ```
   USER_ID= // ๋์บ ํ ๊ณ์  ID: string
   USER_PW= // ๋์บ ํ ๊ณ์  PW: string
   ```

2. ์ต์์ ๋๋ ํ ๋ฆฌ์ `soldiers.json` ํ์ผ์ ์์ฑํด์ฃผ์ธ์.

   ```js
   [
     {
       "name": "๊นํ์ฐ",             // ์ด๋ฆ: string
       "type": "๊ณต๊ตฐ",               // (Optional) ๊ตฐ์ข: SoldierType (src/types/enums.ts) - default: '์ก๊ตฐ'
       "unit": "์ก๊ตฐํ๋ จ์",          // (Optional) ๋ถ๋๋ช?: SolderUnit (src/types/enums.ts) - default: '์ก๊ตฐํ๋ จ์'
       "birthDate": "0000-00-00",  // ์๋์์ผ: string
       "enterDate": "0000-00-00",  // ์๋์ผ: string
       "startDate": "0000-00-00",  // ์ ์ก ์์์ผ: string
       "endDate": "0000-00-00",    // ์ ์ก ์ข๋ฃ์ผ: string
       "exclude": false,           // (Optional) ์ ์ธ?: boolean
     },
     ...
   ]
   ```

3. `yarn`

## ๊ฐ๋ฐํ๊ธฐ

1. ๊ถ์ฅ VSCode Extention ์ค์น (.vscode/extensions.json)
2. `yarn set version berry`
3. `yarn`
4. `yarn dlx @yarnpkg/sdks vscode`
5. TypeScript ํ์ผ์์ย ย `Ctrl(Cmd)` + `Shift` + `P`
6. "Select TypeScript Version" ์ ํ
7. "Use Workspace Version" ์ ํ
8. `yarn dev`

## ๋น๋ํ๊ธฐ

- `yarn build`

## ๊ธฐ์ฌํ๊ธฐ

- [Issues](https://github.com/heptacode/news-sender/issues)
- [Fork](https://github.com/heptacode/news-sender/fork)
