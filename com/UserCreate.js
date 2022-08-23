import { child, get, ref, set } from "firebase/database";
import { useEffect, useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import db from "../firebase";

// フォアグラウンド（アプリが立ち上がっている）のときの通知の受け取り方
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, // 通知
    shouldPlaySound: false, // 音
    shouldSetBadge: false, // アプリの通知数が携帯のホーム上に反映されるかどうか
  }),
});

const UserCreate = (data) => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      // registerForPushNotificationsAsync発火
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const { room, user } = data.route.params;
  const [userName, setUserName] = useState("");
  const [userColor, setUserColor] = useState("#D64949");
  const navigation = useNavigation();
  const handleUser = () => {
    set(ref(db, `room/${room}/${user}`), {
      name: userName,
      color: userColor,
      id: expoPushToken,
      //ここにexpoidとcolor入る予定
    });
    navigation.navigate("Home", { room: room, user: user });
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
        <View
          style={{
            // flex: 1,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
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
async function registerForPushNotificationsAsync() {
  let token;
  try {
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      //通知ができるかどうかの今現在の権限設定を調べる。
      //デフォルトではアラート、バッジカウントの設定、サウンドの再生が含まれている
      // console.log(existingStatus);
      // 許可されていたためgranted(true)が返ってきた。ようは許可はしているということだ
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        // もし権限の状態が許可が降りていなかったら処理が走る
        //ユーザーに許可をもらういに行く
        const { status } = await Notifications.requestPermissionsAsync();
        //ユーザーの答えによって値が変わる
        finalStatus = status;
      }
      // 上の処理の後の権限の状態の確認
      if (finalStatus !== "granted") {
        // ユーザー権限を拒否したときに処理が動く
        alert("通知機能が使えないよ");
        return;
        //許可は否定されたら、ユーザに知らせる
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      //プッシュ通知用のトークンの取得
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      //端末がandroidのとき処理が動く
      Notifications.setNotificationChannelAsync(
        "default", //第一引数(default)がチャンネル識別子)、第2引数（下のオブジェクトの中身）はチャンネルのタイプ
        {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
  console.log(token);
  return token;
}
