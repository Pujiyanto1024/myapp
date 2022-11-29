import React, { useState } from "react";

import { StyleSheet, View, Text, Pressable } from "react-native";
import { FormDataDiri, FormUploadIdentitas, Finish } from "../components";

import InputValidation from "../helpers/InputValidation";

import DummyDats from "../dummyData/DummyDats";
import ImgToBase64 from 'react-native-image-base64';

const Pendaftaran = () => {
	const [dataDiri, setDataDiri] = useState({
		nama: "",
		email: "",
		alamat: "",
		NIK: "",
		genderId: null,
		gender: "",
		universitasId: null,
		universitas: "",
		programmingId: null,
		programming: ""
	});

	const [errorDataDiri, setErrorDataDiri] = useState({
		nama: "",
		email: "",
		alamat: "",
		NIK: "",
		genderId: "",
		universitasId: "",
		programmingId: "",
	})

	const [ktp, setKtp] = useState({
		fileName: "",
		fileType: "",
		fileContent: "",
		dataFile: null
	});

	const [dataSubmit, setDataSubmit] = useState();

	const [screen, setScreen] = useState(0);
	const [screenTitle, setScreenTitle] = useState([
		"Data Diri",
		"Unggah Identitas",
		"Selesai"
	]);

	/* ---------------------------- Handle Navigation --------------------------- */
	const onNext = () => {
		if (screen === 0) {
			setScreen(1);
		}
		if (screen === 1) {
			onSubmit()
		}
	};

	const onPrev = () => {
		if (screen > 0) {
			setScreen(screen - 1);
		}
	};
	/* -------------------------- End Handle Navigation ------------------------- */

	const onChange = (name, e) => {
		let err = "";
		if (e === "nama") {
			err = InputValidation.TextValidation(name, 50, "Nama", true);
		}
		if (e === "email") {
			err = InputValidation.EmailValidation(name, 100, "Email", true);
		}
		if (e === "NIK") {
			err = InputValidation.NIKValidation(name, 16, "NIK", true);
		}
		if (e === "alamat") {
			err = InputValidation.TextValidation(name, 300, "Alamat", true)
		}
		setDataDiri({
			...dataDiri,
			[e]: name
		});

		setErrorDataDiri({
			...errorDataDiri,
			[e]: err
		});
	};

	const onChangeOption = (key, nama) => {
		let value = "";
		console.log(key)
		if (nama === "genderId") {
			if (key === undefined) {
				setErrorDataDiri({
					...errorDataDiri,
					genderId: "Gender tidak boleh kosong"
				})
			}
			else {
				const dt = DummyDats.DummyGender.filter((e) => {
					return e.id.toString() === key.toString()
				});
	
				value = dt.length > 0 && dt[0].name;
	
				setDataDiri({
					...dataDiri,
					gender: value, genderId: key
				});
				setErrorDataDiri({
					...errorDataDiri,
					genderId: ""
				})
			}
		}
		if (nama === "universitasId") {
			if (key === undefined) {
				setErrorDataDiri({
					...errorDataDiri,
					universitasId: "Universitas tidak boleh kosong"
				})
			}
			else {
				const dt = DummyDats.DummyUniversitas.filter((e) => {
					return e.id.toString() === key.toString()
				});
	
				value = dt.length > 0 && dt[0].name;
	
				setDataDiri({
					...dataDiri,
					universitas: value, universitasId: key
				});

				setErrorDataDiri({
					...errorDataDiri,
					universitasId: ""
				})
			}
		}
		if (nama === "programmingId") {
			if (key === undefined) {
				setErrorDataDiri({
					...errorDataDiri,
					programmingId: "Programming tidak boleh kosong"
				})
			}
			else {
				const dt = DummyDats.DummyProgramming.filter((e) => {
					return e.id.toString() === key.toString()
				});
	
				value = dt.length > 0 && dt[0].name;
	
				setDataDiri({
					...dataDiri,
					programming: value, programmingId: key
				});

				setErrorDataDiri({
					...errorDataDiri,
					programmingId: ""
				})
			}
		}
	};

	const changeKTP = async(e) => {
		console.log(e);
		const base64 = await ImgToBase64.getBase64String(e.uri)
		setKtp({
			...ktp,
			fileName: e.fileName,
			fileType: e.type,
			fileContent: base64,
			dataFile: e.uri
		});
	}
	/* ---------------------------- End Handle Change --------------------------- */

	/* ------------------------- const handle validation ------------------------ */
	const onValidation = () => {
		const tempVlidationForm = {
			nama: InputValidation.TextValidation(dataDiri.nama, 50, 'Nama', true),
			alamat: InputValidation.TextValidation(dataDiri.alamat, 300, 'Alamat', true),
			email: InputValidation.EmailValidation(dataDiri.email, 50, 'Email', true),
			NIK: InputValidation.NIKValidation(dataDiri.NIK, 16, 'NIK', true),
			genderId: !dataDiri.genderId ? "Gender tidak boleh kosong" : "",
			universitasId: !dataDiri.universitasId ? "Universitas tidak boleh kosong" : "",
			programmingId: !dataDiri.programmingId ? "Pemprograman Favorit tidak boleh kosong" : ""
		};
		
		setErrorDataDiri(tempVlidationForm);
		for (var key in tempVlidationForm) {
			if (tempVlidationForm[key] !== "") {
				setScreen(0);
				return false;
			}
		}
		return true;
	};
	/* -------------------------- End Handle Validation ------------------------- */

	/* ------------------------------ Handle Submit ----------------------------- */
	const onSubmit = () => {
		const valid = onValidation();
		console.log(valid)
		if (valid) {
			setDataSubmit(formatData(dataDiri, ktp));
			setScreen(2);
		};
	};

	const formatData = (data, dataKtp) => {
		const output = {
			nama: data.nama,
			email: data.email,
			alamat: data.alamat,
			NIK: data.NIK,
			universitasId: data.universitasId,
			universitas: data.universitas,
			genderId: data.genderId,
			gender: data.gender,
			programmingId: data.programmingId,
			programming: data.programming,
			dataKtp: {
				fileName: dataKtp.filleName,
				fileType: dataKtp.fileType,
				base64File: dataKtp.fileContent
			}
		};
	
		return output;
	};
	/* ------------------------------- End Submit ------------------------------- */

	const renderDisplay = () => {
		switch (screen) {
			case 0:
				return <FormDataDiri
							data={dataDiri}
							onChange={onChange}
							listGender={DummyDats.DummyGender}
							listUniversitas={DummyDats.DummyUniversitas}
							listProgramming={DummyDats.DummyProgramming}
							changeOption={onChangeOption}
							errorData={errorDataDiri}
						/>
				break;
			case 1:
				return <FormUploadIdentitas ktp={ktp} onChange={changeKTP} />
				break;
			case 2:
				return <Finish dataSubmit={dataSubmit} />
				break;
			default:
				return <FormDataDiri
							data={dataDiri}
							onChange={onChange}
							listGender={DummyDats.DummyGender}
							listUniversitas={DummyDats.DummyUniversitas}
							listProgramming={DummyDats.DummyProgramming}
							changeOption={onChangeOption}
							errorData={errorDataDiri}
						/>
				break;
		}
	};

	return (
		<>
			<View style={styles.wraper}>
				<Text style={{  fontSize: 32 }} >{screenTitle[screen]}</Text>
				<View>{renderDisplay()}</View>
			</View>
			<View style={styles.buttonContainer}>
				{screen > 0 && (
					<Pressable onPress={onPrev} style={styles.button}>
						<Text style={{ color: "#ffffff" }}>Kembali</Text>
					</Pressable>
				)}
				{screen < 2 && (
					<Pressable onPress={onNext} style={styles.button}>
						<Text style={{ color: "#ffffff" }}>Selanjutnya</Text>
					</Pressable>
				)}
			</View>
		</>
	)
};

const styles = StyleSheet.create({
	wraper: {
		display: "flex",
		alignItems: "center",
		marginTop: 20
	},
	buttonContainer: {
		flexDirection: "row",
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	},
	button: {
		backgroundColor: "#00ff00",
		justifyContent: "center",
		color: "#fff",
		paddingVertical: 5,
		paddingHorizontal: 30,
		textAlign: "center",
		marginLeft: 20,
		borderRadius: 10
	}
	});

export default Pendaftaran;