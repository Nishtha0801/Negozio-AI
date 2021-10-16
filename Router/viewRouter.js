
const express = require('express');
const viewRouter = express.Router();
const { getCart, getLandingpage, getLearnMore, getProductsPage, getSignIn, getSignUp, getRecipePage, getNewsPage } = require('../Controller/viewController');

viewRouter.route("/signIn").get(getSignIn);
viewRouter.route("/signUp").get(getSignUp);
viewRouter.route("/").get(getLandingpage);
viewRouter.route("/productsPage").get(getProductsPage);
viewRouter.route("/cart").get(getCart);
viewRouter.route("/learnMore").get(getLearnMore);
viewRouter.route("/recipes").get(getRecipePage);
viewRouter.route("/news").get(getNewsPage);

module.exports.viewRouter = viewRouter;