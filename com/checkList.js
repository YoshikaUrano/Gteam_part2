import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
const CheckList = (props) => {
  return (
    <View>
      <CheckBox
        checked={props.option}
        onPress={props.handle}
        title={props.name}
        checkedColor={props.color}
      />
      {/* <Text style={styles.container}>{props.name}</Text> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    fontSize: 16,
    color: `black`,
  },
});

export default CheckList;
