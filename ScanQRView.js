'use strict';

import React, { Component } from 'react';
import {
  Text,
  View ,
  Dimensions ,
  Vibration ,
  Animated ,
  Easing ,
  Alert ,
} from 'react-native';
import Camera from 'react-native-camera';
export default class ScanQRView extends Component {

  constructor(props){
    super(props);
    this.state={
      scanTranslte:new Animated.Value(0)
    };
  }
  componentDidMount(){
    this.scanLineAnimation();
  }
  scanLineAnimation(){
    Animated.sequence([
      Animated.timing(this.state.scanTranslte,{toValue:200 , duration:3000 , easing:Easing.linear}),
      Animated.timing(this.state.scanTranslte,{toValue:0 , duration:3000 , easing:Easing.linear})
                       ]).start(()=>this.scanLineAnimation());
  }
  onBarCodeRead(result){
    //Vibration.vibrate();
    if(this.props.onBarCodeRead)
    {
        this.props.onBarCodeRead(result , ()=>this.camera.shouldQR());
    }
    else
      Alert.alert( "扫描结果" , result.data , [{text:"ok" , onPress:()=>this.camera.shouldQR()}] , {cancelable:false});
  }
  render() {
    let width = Dimensions.get('window').width;
    let height = Dimensions.get('window').height;
    let scanCoverColor = '#44444488';
    let scanRectWidth = 200;
    // console.log("render size = " + width +" height = " + height );
    return (
      <View style={{flex:1}}>
        <Camera
          style={{width:width , height:height}}
          type={Camera.constants.Type.back}
          ref={(cam) => {
            this.camera = cam;
          }}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
          />
        <View
          style={{position:'absolute' , left:0 , right:0, top:0 , bottom:0}}
          >
          <View style={{width:width , height:scanRectWidth , backgroundColor:scanCoverColor}}/>
          <View style={{width:width , height:scanRectWidth ,flexDirection:'row'}}>
            <View style={{flex:1,backgroundColor:scanCoverColor}}/>
            <View style={{width:scanRectWidth}}>
              <Animated.View
                style={{width:scanRectWidth , height:2 , backgroundColor:"#fe2233" , transform:[
                    {translateY:this.state.scanTranslte}
                  ]
                }}
               />
               <View style={{flex:1, marginTop: scanRectWidth-30, backgroundColor:'transparent', alignItems: 'center'}}>
                 <Text style={{color:'#fff', fontSize:10}}>{this.props.instructionText}</Text>
               </View>
            </View>
            <View style={{flex:1 , backgroundColor:scanCoverColor}}/>
          </View>
          <View style={{flex:1 , width:width , backgroundColor:scanCoverColor}}/>
        </View>
      </View>
    );
  }
}
