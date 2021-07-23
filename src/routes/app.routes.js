import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Badges from "../pages/Badges";
import Coins from "../pages/Coins";
import Coin from "../pages/Coin";
import Market from "../pages/Market";
import Players from "../pages/Players";
import Quests from "../pages/Quests";
import Ranking from "../pages/Ranking";
import Login from "../pages/Login";
import Register from "../pages/Register";


const AppRoutes = () => (
	<Switch>
		<Route component={Home} path="/" exact />
		<Route component={Badges} path="/badges" exact />
		<Route component={Coins} path="/coins" exact />
		<Route component={Coin} path="/coins/:coinId"/>
		<Route component={Market} path="/market" exact />
		<Route component={Players} path="/players" exact />
		<Route component={Quests} path="/quests" exact />
		<Route component={Ranking} path="/ranking" exact />
		<Route component={Login} path="/login" exact />
		<Route component={Register} path="/register/:registerToken" />
	</Switch>
);
export default AppRoutes;
