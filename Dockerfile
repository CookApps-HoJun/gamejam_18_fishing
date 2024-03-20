##############
# Base Stage #
##############
FROM node:18-alpine as base

# /app 디렉터리를 WORKDIR로 설정
WORKDIR /app

# package 정의 파일 복사
COPY package.json yarn.lock ./

# package 설치
RUN --mount=type=secret,id=npmrc,target=.npmrc yarn --production

#############
# Dev Stage #
#############
FROM base as dev

# 소스 복사
COPY . .
RUN ls -l

RUN --mount=type=secret,id=npmrc,target=.npmrc yarn

# Nest Build
RUN yarn build

#############
# Run Stage #
#############
FROM node:18-alpine

# /app 디렉터리를 WORKDIR로 설정
WORKDIR /app

# build phase에서 만든 배포용 js, 설치 한 modules, package 스크립트 복사
COPY --from=base /app/package.json ./
COPY --from=dev /app/dist ./dist
COPY --from=base /app/node_modules ./node_modules

# 실행할 명령어
ENTRYPOINT ["node", "dist/main.js"]