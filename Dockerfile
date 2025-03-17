FROM cypress/included:14.2.0

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

ENV CI=1
