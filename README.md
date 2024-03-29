> ## This project is no longer maintained. Please use [@heptacode/military-letter](https://github.com/heptacode/miliary-letter)

---

<br><br>

<div align="center">

# News Sender 🗞️

</div>

## 소개

> 인편 뉴스 전송 자동화 스크립트

훈련소에서 매일 인편으로 뉴스를 받아볼 수 있도록 도와줍니다.

현재 육군, 공군만 가능합니다.

## 기술 스택

![TypeScript](https://img.shields.io/badge/TypeScript-282C34.svg?&style=for-the-badge&logo=typescript)
![NodeJS](https://img.shields.io/badge/Node.js-282C34?style=for-the-badge&logo=node.js)
![Yarn Berry](https://img.shields.io/badge/Yarn_Berry-282C34.svg?&style=for-the-badge&logo=yarn)
![Rollup](https://img.shields.io/badge/Rollup-282C34.svg?&style=for-the-badge)

## 설치하기

1. 최상위 디렉토리에 `.env` 파일을 생성해주세요.

   ```
   USER_ID= // 더캠프 계정 ID: string
   USER_PW= // 더캠프 계정 PW: string
   ```

2. 최상위 디렉토리에 `soldiers.json` 파일을 생성해주세요.

   ```js
   [
     {
       "name": "김현우",             // 이름: string
       "type": "공군",               // (Optional) 군종: SoldierType (src/types/enums.ts) - default: '육군'
       "unit": "육군훈련소",          // (Optional) 부대명?: SolderUnit (src/types/enums.ts) - default: '육군훈련소'
       "birthDate": "0000-00-00",  // 생년월일: string
       "enterDate": "0000-00-00",  // 입대일: string
       "startDate": "0000-00-00",  // 전송 시작일: string
       "endDate": "0000-00-00",    // 전송 종료일: string
       "exclude": false,           // (Optional) 제외?: boolean
     },
     ...
   ]
   ```

3. `yarn`

## 개발하기

1. 권장 VSCode Extention 설치 (.vscode/extensions.json)
2. `yarn set version berry`
3. `yarn`
4. `yarn dlx @yarnpkg/sdks vscode`
5. TypeScript 파일에서  `Ctrl(Cmd)` + `Shift` + `P`
6. "Select TypeScript Version" 선택
7. "Use Workspace Version" 선택
8. `yarn dev`

## 빌드하기

- `yarn build`

## 기여하기

- [Issues](https://github.com/heptacode/news-sender/issues)
- [Fork](https://github.com/heptacode/news-sender/fork)
