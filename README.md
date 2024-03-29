# Shopping Cart with React and TypeScript

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General Info
This is a Shopping Cart Application made to learn how TypeScript works 
with React. Project is set with fake API from fakestoreapi.com by fetching data from it.

App.tsx is main component of the application that contains funcions and all components from Cart, CartItem and Item components. That components includes type props that are exported to main App.tsx component.

You can add the product you want to the cart, in the cart tab are selected products. 
In the cart tab you can increase products number or delete them.

![This is how site looks like](./public/readme-image.jpg)

## Setup
### how to start Shopping Cart App
To start application just run it on localserver with npm
```
$ npm run start
```

### application setup

1. Firstly creating app with TS
```
npx create-react-app ./ --template typescript
```
2. Then I installed material ui components
```
npm i @material-ui/core @material-ui/icons
```
3. Installed React Querry library for data-fetching
```
npm i react-query
```
4. styled components just to styled material-ui components
```
npm i styled-components @types/styled-components - for TS
```


### This application is made with an online course
- freeCodeCamp.org
- yt viedo: https://youtu.be/sfmL6bGbiN8
