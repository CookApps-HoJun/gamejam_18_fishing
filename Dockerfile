
##############
# Base Stage #
##############
FROM node:18-alpine  as base

# /app 디렉터리를 WORKDIR로 설정
WORKDIR /app

# package 정의 파일 복사
COPY package.json yarn.lock ./

# package 설치
RUN yarn

##############
# dev Stage #
##############
FROM base
COPY . .
RUN ls -l

ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS=--max-old-space-size=4096

RUN yarn

CMD ["yarn", "start:dev"]
