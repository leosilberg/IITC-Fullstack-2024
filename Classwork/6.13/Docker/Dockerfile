FROM oven/bun:latest
WORKDIR /src
COPY ./package.json .
RUN bun install
COPY . .

EXPOSE 3000

CMD ["bun", "run", "dev"]