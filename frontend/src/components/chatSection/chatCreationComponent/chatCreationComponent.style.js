import {StyleSheet} from "react-native";

module.exports = StyleSheet.create({
  containerHeader: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 12,
    marginTop: 4,
  },
  chatCreation: {
    flex: 1,
    display: "flex",
    flexDirection: "column",

    backgroundColor: "#161616"
  },
  finderContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  startChatButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 28,
    color: "white",
  },
});
