FROM node:alpine

# Set working directory 
WORKDIR /app 

# Copy package.json and package-lock.json
COPY package*.json .

# Install app dependencies
RUN npm i

# Copy all source files
COPY . .

# Transpile Typescript to Javascript
RUN npm run build

#  Command to run the app
CMD ["npm", "run", "dev"] 
