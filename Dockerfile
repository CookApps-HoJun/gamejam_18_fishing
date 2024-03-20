FROM node:18-alpine

# /app 디렉터리를 WORKDIR로 설정
WORKDIR /app

# 실행할 명령어
CMD ["yarn", "start:dev"]