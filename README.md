<div align="center">

# Thecamp News Sender 🗞️

</div>

## 소개

> 더캠프 뉴스 전송 자동화 스크립트

## 기술 스택

![TypeScript](https://img.shields.io/badge/TypeScript-282C34.svg?&style=for-the-badge&logo=typescript)
![Yarn Berry](https://img.shields.io/badge/Yarn_Berry-282C34.svg?&style=for-the-badge&logo=yarn)
![Rollup](https://img.shields.io/badge/Rollup-282C34.svg?&style=for-the-badge)

## 설치하기

1. 최상위 디렉토리에 `soldiers.json` 파일을 생성해주세요.

   ```json
   [
     {
       "name": "김현우",           // 이름: string
       "birthDate": "0000-00-00",  // 생년월일: string
       "enterDate": "0000-00-00",  // 입대일: string
       "startDate": "0000-00-00",  // 전송 시작일: string
       "endDate": "0000-00-00"     // 전송 종료일: string
     },
     ...
   ]
   ```

2. `yarn`

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

- [Issues](https://github.com/heptacode/thecamp-news-sender/issues)
- [fork](https://github.com/heptacode/thecamp-news-sender/fork)
