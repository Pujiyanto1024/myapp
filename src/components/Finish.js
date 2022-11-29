import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const Finish = ({ dataSubmit }) => {
	

	return (
		<View>
			<Text>{JSON.stringify(dataSubmit)}</Text>
		</View>
	)
};

export default Finish;