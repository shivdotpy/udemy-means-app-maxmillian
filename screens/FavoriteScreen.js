import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MealList from '../components/MealList';
import { MEALS } from '../data/dummy-data';

const FavoriteScreen = (props) => {
	const favMeals = MEALS.filter((meal) => meal.id === 'm2' || meal.id === 'm2');
	return <MealList listData={favMeals} navigation={props.navigation}/>;
};

FavoriteScreen.navigationOptions = {
	headerTitle: 'Your Favorite'
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default FavoriteScreen;
