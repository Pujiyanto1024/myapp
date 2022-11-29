import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

const dataList = [
	{id:'1', value:'Mobiles', disabled:true},
	{id:'2', value:'Appliances'},
	{id:'3', value:'Cameras'},
	{id:'4', value:'Computers', disabled:true},
	{id:'5', value:'Vegetables'},
	{id:'6', value:'Diary Products'},
	{id:'7', value:'Drinks'},
]

const FormDataDiri = ({ data, onChange, errorData, changeOption, listGender= [], listUniversitas = [], listProgramming = [] }) => {
	
	const formattingData = (list = []) => {
		
		const newList = list.map((i) => {
			return {
				key: i.id,
				value: i.name
			}
		});

		return newList;
	};

	return (
		<View>
			<View style={{ marginBottom: 12 }}>
				<Text style={styles.label}>Nama *</Text>
				<TextInput
					style={[styles.inputView, { borderColor: errorData?.nama ? '#ff0000' : "#00ff00" }]}
					placeholder="Nama"
					value={data?.nama}
					onChangeText={(name) => {onChange(name, "nama")}}
				/>
				{
					errorData?.nama ? <Text style={styles.textError}>{errorData?.nama}</Text> : null
				}
			</View>
			<View style={{ marginBottom: 12 }}>
				<Text style={styles.label}>Email *</Text>
				<TextInput
					style={[styles.inputView, { borderColor: errorData?.email ? '#ff0000' : "#00ff00" }]}
					placeholder="Email"
					value={data?.email}
					onChangeText={(name) => {onChange(name, "email")}}
				/>
				{
					errorData?.email ? <Text style={styles.textError}>{errorData?.email}</Text> : null
				}
			</View>
			<View style={{ marginBottom: 12 }}>
				<Text style={styles.label}>NIK *</Text>
				<TextInput
					style={[styles.inputView, { borderColor: errorData?.NIK ? '#ff0000' : "#00ff00" }]}
					placeholder="NIK"
					value={data?.NIK}
					onChangeText={(name) => {onChange(name, "NIK")}}
				/>
				{
					errorData?.NIK ? <Text style={styles.textError}>{errorData?.NIK}</Text> : null
				}
			</View>
			<View style={{ marginBottom: 12 }}>
				<Text style={styles.label}>Alamat *</Text>
				<TextInput
					style={[styles.inputView, { borderColor: errorData?.alamat ? '#ff0000' : "#00ff00" }]}
					placeholder="Alamat"
					value={data?.alamat}
					onChangeText={(name) => {onChange(name, "alamat")}}
				/>
				{
					errorData?.alamat ? <Text style={styles.textError}>{errorData?.alamat}</Text> : null
				}
			</View>
			<View style={{ marginBottom: 12 }}>
				<Text style={styles.label}>Gender *</Text>
				<SelectList
					data={formattingData(listGender)}
					save="key"
					setSelected={(e) => changeOption(e, "genderId")}
					boxStyles={{ borderColor: errorData?.genderId ? '#ff0000' : "#00ff00" }}
					defaultOption={{ key: data?.genderId, value: data?.gender }}
				/>
				{
					errorData?.genderId ? <Text style={styles.textError}>{errorData?.genderId}</Text> : null
				}
			</View>
			<View style={{ marginBottom: 12 }}>
				<Text style={styles.label}>Universitas *</Text>
				<SelectList
					data={formattingData(listUniversitas)}
					save="key"
					setSelected={(e) => changeOption(e, "universitasId")}
					boxStyles={{ borderColor: errorData?.universitasId ? '#ff0000' : "#00ff00" }}
					defaultOption={{ key: data?.universitasId, value: data?.universitas }}
				/>
				{
					errorData?.universitasId ? <Text style={styles.textError}>{errorData?.universitasId}</Text> : null
				}
			</View>
			<View style={{ marginBottom: 12 }}>
				<Text style={styles.label}>Pemprograman Favorit *</Text>
				<SelectList
					data={formattingData(listProgramming)}
					save="key"
					setSelected={(e) => changeOption(e, "programmingId")}
					boxStyles={{ borderColor: errorData?.programmingId ? '#ff0000' : "#00ff00" }}
					defaultOption={{ key: data?.programmingId, value: data?.programming }}
				/>
				{
					errorData?.programmingId ? <Text style={styles.textError}>{errorData?.programmingId}</Text> : null
				}
			</View>
		</View>
	)
};

const styles = StyleSheet.create({
	inputView: {
		borderRadius: 15,
		width: 240,
		height: 45,
		marginBottom: 8,
		marginTop: 4,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		paddingHorizontal: 8
	},
	label: {
		fontSize: 12,
		fontWeight: "500"
	},
	textError: {
		color: "#ff0000",
		fontSize: 12
	}
})

export default FormDataDiri;