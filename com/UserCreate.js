import { child, get, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import db from "../firebase";

const UserCreate = (data) => {
  console.log(data);
  const { room, user } = data.route.params;
  console.log(user);
  const [userName, setUserName] = useState("");
  const [userColor, setUserColor] = useState("#D64949");
  const [False, setFalse] = useState(false);
  const handleUser = () => {
    set(ref(db, `room/${room}/${user}`), {
      name: userName,
      color: userColor,
      //ここにexpoidとcolor入る予定
    });
  };
  const handleRed = () => {
    setUserColor("#D64949");
  };
  const handleOrange = () => {
    setUserColor("#F08233");
  };
  const handleYellow = () => {
    setUserColor("#FFE800");
  };
  const handleGreen = () => {
    setUserColor("#009245");
  };
  const handleBlue = () => {
    setUserColor("#135CD1");
  };
  const handlePurple = () => {
    setUserColor("#8142C1");
  };
  return (
    <>
      <View>
        <TextInput
          placeholder="username"
          onChangeText={(text) => {
            setUserName(text);
          }}
        />
        <View>
          <TouchableOpacity onPress={handleRed}>
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: "#D64949",
                borderWidth: 3,
                borderColor: userColor == "#D64949" ? "black" : "#797979",
              }}
            ></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOrange}>
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: "#F08233",
                borderWidth: 3,
                borderColor: userColor == "#F08233" ? "black" : "#797979",
              }}
            ></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleYellow}>
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: "#FFE800",
                borderWidth: 3,
                borderColor: userColor == "#FFE800" ? "black" : "#797979",
              }}
            ></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGreen}>
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: "#009245",
                borderWidth: 3,
                borderColor: userColor == "#009245" ? "black" : "#797979",
              }}
            ></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleBlue}>
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: "#135CD1",
                borderWidth: 3,
                borderColor: userColor == "#135CD1" ? "black" : "#797979",
              }}
            ></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePurple}>
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: "#8142C1",
                borderWidth: 3,
                borderColor: userColor == "#8142C1" ? "black" : "#797979",
              }}
            ></View>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={handleUser}>
        <Text>Login</Text>
      </TouchableOpacity>
    </>
  );
};
export default UserCreate;
