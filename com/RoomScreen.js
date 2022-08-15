import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { child, get, ref } from "firebase/database";
import db from "../firebase";

const RoomScreen = (data) => {
  const navigation = useNavigation();
  const { room } = data.route.params;
  const RoomData = ref(db);
  const [name, setName] = useState("");
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  //   新規作成の流れを変える
  useEffect(() => {
    get(child(RoomData, `room/${room}/`)).then((snapshot) => {
      if (snapshot.exists()) {
        const Data = snapshot.val();
        setName(Data.name);
        setUser1(Data.user1);
        setUser2(Data.user2);
      }
    });
  }, []);
  const userHandleChange = (user, index) => {
    console.log(user);
    if (user.name == "") {
      console.log("ユーザーを新規登録します");
      navigation.navigate("UserCreate", {
        room: room,
        user: index,
      });
      // navigateでindex番号を渡す
      //user1なのかuser2どちらが押されたかの情報をnavigateで渡す必要がある
      // →これは引数でわたせばいけそう
    } else {
      navigation.navigate("Home", {
        room: room,
        user: user,
      });
    }
  };
  return (
    <>
      <View>
        <View>
          <Text>{name}さんのお家です</Text>
        </View>
        <TouchableOpacity onPress={() => userHandleChange(user1, "user1")}>
          <Text>
            {user1.name == "" ? "ユーザの新規登録" : `${user1.name}でログイン`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => userHandleChange(user2, "user2")}>
          <Text>
            {user2.name == "" ? "ユーザの新規登録" : `${user2.name}でログイン`}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default RoomScreen;
