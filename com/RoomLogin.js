import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import { ref, get, child } from "firebase/database";
import { useState } from "react";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import db from "../firebase";
const RoomLogin = () => {
  const navigation = useNavigation();
  // console.log(navigation);
  const [room, setRoom] = useState("");
  const [pass, setPass] = useState("");
  const handleLogin = () => {
    const RoomData = ref(db);
    get(child(RoomData, `room/${room}/`)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        data.pass == pass
          ? navigation.navigate("RoomScreen", { rooms: data, room: room })
          : alert("パスワードが間違えています");
      } else {
        alert("そんなルーム名は存在しません");
      }
    });
  };
  return (
    <KeyboardAvoidingView behavior="padding">
      <View
        style={{
          minHeight: "70vh",
          backgroundColor: "#E4E4E4",
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
          fontSize: 42,
          paddingTop: "50%",
        }}
      >
        <Text>Yattoku!</Text>
      </View>
      <View>
        <TextInput
          style={{
            alignSelf: "flex-start",
            borderWidth: 1,
            borderColor: "#ACACAC",
            height: 38,
            width: "90%",
            marginLeft: "5%",
            marginTop: "3%",
            borderRadius: 5,
          }}
          placeholder="ルーム名"
          onChangeText={(text) => setRoom(text)}
        />
        <TextInput
          placeholder="ふたりの合言葉"
          onChangeText={(text) => setPass(text)}
          secureTextEntry
          style={{
            alignSelf: "flex-start",
            borderWidth: 1,
            borderColor: "#ACACAC",
            height: 38,
            width: "90%",
            marginLeft: "5%",
            marginTop: "5%",
            borderRadius: 5,
          }}
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={handleLogin}
          style={{
            backgroundColor: "#FFAA36",
            width: "90%",
            height: 47,
            borderRadius: 5,
            borderWidth: 0,
            overflow: "hidden",
            marginLeft: "5%",
            marginTop: "10%",
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
              marginTop: "4%",
            }}
          >
            次へ
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
export default RoomLogin;
