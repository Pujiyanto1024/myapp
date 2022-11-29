import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable,Button,Image } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import ImgToBase64 from "react-native-image-base64";

const option = {
	title: 'Select Image',
    type: 'library',
	options: {
		maxHeight: 200,
		maxWidth: 200,
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    }
}

const FormUploadIdentitas = ({ ktp, onChange }) => {
	
	const openGallery = async () => {
		const images = await launchImageLibrary(option);

		onChange(images.assets[0]);
	}
	return (
		<View style={{ marginBottom: 20 }}>
			<Image source={{ uri: ktp?.dataFile }} style={{ width: 200, height: 200, marginBottom: 20 }} />
			<Button onPress={openGallery} title="Upload"></Button>
		</View>
	)
};

export default FormUploadIdentitas;