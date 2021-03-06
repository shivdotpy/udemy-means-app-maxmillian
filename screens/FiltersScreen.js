import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import { setFilters } from '../store/actions/meals';

const FilterSwitch = (props) => {
	return (
		<View style={styles.filterContainer}>
			<Text>{props.label}</Text>
			<Switch
				value={props.value}
				onValueChange={props.onChange}
				trackColor={{ true: Colors.primaryColor }}
				thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
			/>
		</View>
	);
};

const FiltersScreen = (props) => {
	const { navigation } = props;

	const [ isGlutenFree, setIsGlutenFree ] = useState(false);
	const [ isLactosFree, setIsLactosFree ] = useState(false);
	const [ isVegan, setIsVegan ] = useState(false);
	const [ isVegiterian, setIsVegiterian ] = useState(false);

	const dispatch = useDispatch();

	const saveFilters = useCallback(
		() => {
			const appliedFilters = {
				glutenFree: isGlutenFree,
				lactosFree: isLactosFree,
				vegan: isVegan,
				vegeterian: isVegiterian
			};

			dispatch(setFilters(appliedFilters));
		},
		[ isGlutenFree, isLactosFree, setIsVegan, isVegiterian, dispatch ]
	);

	useEffect(
		() => {
			navigation.setParams({ save: saveFilters });
		},
		[ saveFilters ]
	);

	return (
		<View style={styles.screen}>
			<Text style={styles.title}>Available Filters / Restrictions</Text>
			<FilterSwitch label="Gluten free" value={isGlutenFree} onChange={(newValue) => setIsGlutenFree(newValue)} />
			<FilterSwitch label="Lactos free" value={isLactosFree} onChange={(newValue) => setIsLactosFree(newValue)} />
			<FilterSwitch label="Vegan" value={isVegan} onChange={(newValue) => setIsVegan(newValue)} />
			<FilterSwitch label="Vegiterian" value={isVegiterian} onChange={(newValue) => setIsVegiterian(newValue)} />
		</View>
	);
};

FiltersScreen.navigationOptions = (navData) => {
	return {
		headerTitle: 'Filter Meals',
		headerLeft: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Menu"
					iconName="ios-menu"
					onPress={() => {
						navData.navigation.toggleDrawer();
					}}
				/>
			</HeaderButtons>
		),
		headerRight: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item title="Save" iconName="ios-save" onPress={navData.navigation.getParam('save')} />
			</HeaderButtons>
		)
	};
};

export default FiltersScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: 'center'
	},
	title: {
		fontFamily: 'open-sans-bold',
		fontSize: 22,
		textAlign: 'center',
		justifyContent: 'center'
	},
	filterContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '80%',
		marginVertical: 10
	}
});
