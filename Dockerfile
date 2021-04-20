FROM node:12.19.0

COPY ./ ./

CMD [ "babel-node", "index.js", "react-scripts start --prefix client" ]