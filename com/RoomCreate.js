import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import { ref, get, child, set } from "firebase/database";
import { useState } from "react";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import db from "../firebase";

const RoomCreate = () => {
  const navigation = useNavigation();
  const [room, setRoom] = useState("");
  const [pass, setPass] = useState("");
  const handleSignUp = () => {
    set(ref(db, `room/${room}`), {
      name: room,
      pass: pass,
      home: "",
      task: [
        {
          key: "料理を作る",
          bool: false,
          check: false,
        },
        {
          key: "洗濯物をたたむ",
          bool: false,
          check: false,
        },
        {
          key: "お風呂を洗う",
          bool: false,
          check: false,
        },
        {
          key: "買い物に行く",
          bool: false,
          check: true,
        },
      ],
      user1: {
        name: "",
        id: "",
        color: "",
      },
      user2: {
        name: "",
        id: "",
        color: "",
      },
    });
    navigation.navigate("RoomScreen", { room: room });
  };
  return (
    <KeyboardAvoidingView behavior="padding">
      <View>
        <TextInput placeholder="room" onChangeText={(text) => setRoom(text)} />
        <TextInput
          placeholder="Password"
          onChangeText={(text) => setPass(text)}
          secureTextEntry
        />
      </View>
      <View>
        <TouchableOpacity onPress={handleSignUp}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
export default RoomCreate;
