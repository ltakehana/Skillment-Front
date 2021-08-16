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
import LoginYA21 from "../pages/LoginYA21";
import LoginEmbraer from "../pages/LoginEmbraer";
import Register from "../pages/Register";
import ResetPassword from "../pages/ResetPassword";
import NewPassword from "../pages/NewPassword";


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
		<Route component={LoginYA21} path="/login/YA21" exact />
		<Route component={LoginEmbraer} path="/login/embraer" exact />
		<Route component={Register} path="/register/:registerToken" />
		<Route component={ResetPassword} path="/reset_password" exact/>
		<Route component={NewPassword} path="/reset_password/:userToken" />
	</Switch>
);
export default AppRoutes;
