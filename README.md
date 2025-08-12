MEA - Mini E-Commerce App
This is a React Native + Expo mini e-commerce application. It supports product listing, product detail view, and cart functionality.

🚀 Features
Product listing

Product details page

Add to cart

Mobile-first UI

Expo Web support for deployment

📦 Requirements
Node.js v22.18.0 (strictly)

npm or yarn

Expo CLI installed globally:

sh
npm install -g expo-cli
🛠 Installation
Clone this repository:

sh

git clone <your-repo-url>
cd MEA
Install dependencies:

sh
yarn install
(Or use npm install if you prefer, but avoid mixing package managers.)

▶️ Running the App Locally
On mobile (Expo Go):
sh

expo start
Scan the QR code using Expo Go app.

On web:
sh

expo start --web
🌐 Building for Web Deployment
Generate the web build:

sh
expo build:web
This will create a web-build folder.

Deploy web-build to any static hosting platform (Render, Netlify, Vercel, etc.).

⚙️ Render Deployment Setup
In Render dashboard:

Build Command:
.sh
yarn install && yarn build:web

Publish Directory:
web-build
Make sure package.json has:

.json 
"scripts": {
  "start": "expo start",
  "build:web": "expo build:web"
}


📄 License
MIT License








Ask ChatGPT
