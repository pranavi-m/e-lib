import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image, ImageBackground} from 'react-native';
import * as Permissions from 'expo-permissions' 
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Rajdhani_600SemiBold } from '@expo-google-fonts/rajdhani'
import * as Font from 'expo-font'
import { TextInput } from 'react-native-gesture-handler'
import db from '../config'

const bgImage = require("../images/background2.png")
const appIcon = require("../images/appIcon.png")
const appName = require("../images/appName.png")

export default class TransactionScreen extends Component{

    constructor(props){
        super(props);
     this.state={
        domState:'normal',
        hasCameraPermissions:'null',
        scanned:false,
        scannedData:'',
        bookId:'',
        studentId:''
    }
    }

    getCameraPermissions=async(domState)=>{
     const {status} = await Permissions.askAsync(Permissions.CAMERA)
     this.setState({
        hasCameraPermissions:status==="granted",
        domState:domState,
        scanned:false
     })
    }

    handleBarCodeScanned=async({type,data})=>{
        this.setState({
            domState:'normal',
            scanned:true,
            scannedData:data
        })
    }

    handleTransaction=()=>{
        var {bookId} = this.state;
        db.collection("books").doc(bookId).get().then(doc=>{
        var book = doc.data();
        if(book.is_book_available){
            this.initiateBookIssue();
        } else {
            this.initiateBookReturn();
        }
        });
    };

    initiateBookIssue=()=>{
        console.log("Book issued to the student.");
    };

    initiateBookReturn=()=>{
        console.log("Book returned to library.");
    };

render()
{
    const {domState, hasCameraPermissions, scanned, scannedData}=this.state
    if(domState==="scanner")
    {
      return(
        <BarCodeScanner onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned} style={StyleSheet.absoluteFillObject}/>
      )
    }

    return(
    <View style={styles.container}>
        <ImageBackground source = {bgImage} style={styles.bgImage} >
            <View style={styles.upperContainer}>
                <Image source = {appIcon} style={styles.appIcon}/>
                <Image source = {appName} style={styles.appName}/>
            </View>
            <View style={styles.textinputContainer}>
                <TextInput style={styles.textinput} placeholder={"BOOK ID"} placeholderTextColor={"white"} value={bookId}/>
                <TouchableOpacity style={styles.scanbutton} onPress={this.getCameraPermissions("bookId")}>
                   <Text style = {styles.scanbuttonText}>Scan.</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.textinputContainer}>
                <TextInput style={styles.textinput} placeholder={"STUDENT ID"} placeholderTextColor={"white"} value={studentId}/>
                <TouchableOpacity style={styles.scanbutton} onPress={this.getCameraPermissions("studentId")}>
                   <Text style = {styles.scanbuttonText}>Scan.</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.button}>
            <TouchableOpacity style={styles.button} onPress={this.handleTransaction}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            </View>
        </ImageBackground>
        
    </View>    
    )
}
}



const styles = StyleSheet.create({
    container:{
        flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#5653D4" 
    },
    text:{
        color: "#ffff", fontSize: 30 
    },
    button:{
        width: "43%", height: 55, justifyContent: "center", alignItems: "center", backgroundColor: "#F48D20", borderRadius: 15
    },
    bgImage: { 
        flex: 1, resizeMode: "cover", justifyContent: "center"
    },
    upperContainer: { 
        flex: 0.5, justifyContent: "center", alignItems: "center"
    },
    appIcon: {
        width: 200, height: 200, resizeMode: "contain", marginTop: 80 
    },
    appName: { 
        width: 80, height: 80, resizeMode: "contain" 
    },
    lowerContainer: {
        flex: 0.5, alignItems: "center"
    },
    textinputContainer: { 
        borderWidth: 2, borderRadius: 10, flexDirection: "row", backgroundColor: "#9DFD24", borderColor: "#FFFFFF" 
    }, 
    textinput: { 
        width: "57%", height: 50, padding: 10, borderColor: "#FFFFFF", borderRadius: 10, borderWidth: 3, fontSize: 18, backgroundColor: "#5653D4", fontFamily: "Rajdhani_600SemiBold", color: "#FFFFFF"
    }, 
    scanbutton: { 
        width: 100, height: 50, backgroundColor: "#9DFD24", borderTopRightRadius: 10, borderBottomRightRadius: 10, justifyContent: "center", alignItems: "center" 
    }, 
    scanbuttonText: {
        fontSize: 24, color: "#0A0101", fontFamily: "Rajdhani_600SemiBold"
    },
    button: { width: "43%", height: 55, justifyContent: "center", alignItems: "center", backgroundColor: "#F48D20", borderRadius: 15 }, 
    buttonText: { fontSize: 24, color: "#FFFFFF", fontFamily: "Rajdhani_600SemiBold" }

})