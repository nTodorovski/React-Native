import React from "react";
import { Platform, Text } from "react-native";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FiltersScreen from "../screens/FiltersScreen";

//colors
import Colors from "../constants/Colors";

//Deafault Stack Options
const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primaryColor
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold"
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans"
  },
  headerTintColor: "white"
};

//STACK NAVIGATORS

//Meal Navigator
const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen
    },
    CategoryMeals: {
      screen: CategoryMealsScreen
    },
    MealDetail: MealDetailScreen
  },
  { defaultNavigationOptions: defaultStackNavOptions }
);

//Favorites Navigator
const FavNavigator = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
  },
  { defaultNavigationOptions: defaultStackNavOptions }
);

//Filters Navigator
const FiltersNavigator = createStackNavigator(
  {
    Filters: FiltersScreen
  },
  {
    // navigationOptions: {
    //   drawerLabel: "FILTERS !!!"
    // },
    defaultNavigationOptions: defaultStackNavOptions
  }
);

//tab Screen config
const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => {
        return <Ionicons name="ios-restaurant" size={25} color={tintColor} />;
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel: <Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>
    }
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => {
        return <Ionicons name="ios-star" size={25} color={tintColor} />;
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel: <Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>
    }
  }
};

//Tab Navigator
const MealsFavTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: "white",
        shifting: true,
        barStyle: {
          backgroundColor: Colors.primaryColor
        }
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          labelStyle: { fontFamily: "open-sans-bold" },
          activeTintColor: Colors.accentColor
        }
      });

//Drawer Navigator
const MainNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: MealsFavTabNavigator,
      navigationOptions: {
        drawerLabel: "Meals"
      }
    },
    Filters: FiltersNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: "open-sans-bold",
        fontSize: 18
      }
    }
  }
);

export default createAppContainer(MainNavigator);
