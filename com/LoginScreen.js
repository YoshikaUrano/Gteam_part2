import { initializeApp } from "firebase/app";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import Slider from "./slider";
function LoginScreen() {
  const navigation = useNavigation();
  return (
    <>
      <View>
        <Slider />
      </View>
      <View
        style={{
          backgroundColor: "#FFFFFF",
          position: "absolute",
          bottom: 0,
          width: "100%",
          shadowColor: "#333333",
          shadowOffset: {
            height: -3,
          },
          shadowRadius: 3,
          shadowOpacity: 0.3,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("RoomCreate");
          }}
          style={styles.btn}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              textAlign: "center",
              fontWeight: "bold",
              marginTop: "4%",
            }}
          >
            ルームを新規作成
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("RoomLogin");
          }}
        >
          <Text
            style={{
              color: "#FFAA36",
              textAlign: "center",
              fontSize: 18,
              marginTop: "7%",
              fontWeight: "bold",
              marginBottom: "7%",
            }}
          >
            既存のルームに参加
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
export default LoginScreen;
const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#FFAA36",
    width: "90%",
    height: 50,
    borderRadius: 8,
    marginLeft: "5%",
    marginTop: "7%",
    shadowColor: "#333333",
    shadowOffset: {
      height: 3,
    },
    shadowRadius: 3,
    shadowOpacity: 0.3,
  },
});
