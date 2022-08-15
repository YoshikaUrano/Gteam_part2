import { useState } from "react";
import { View, Text, CheckBox, StyleSheet } from "react-native";

const CheckList = (props) => {
  return (
    <View>
      <CheckBox
        value={props.option}
        onValueChange={props.handle}
        color="red"
        labelColor="#000000"
      />
      <Text style={styles.container}>{props.name}</Text>
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
