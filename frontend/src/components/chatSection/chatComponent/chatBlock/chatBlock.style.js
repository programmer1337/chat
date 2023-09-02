import {StyleSheet} from "react-native";

module.exports = StyleSheet.create({
  chatBlock: {
    color: "white",

    marginTop: 8,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 8,
    flex: 1,
    display: "flex",
    flexDirection: "row",
  },
  chatAvatar: {
    marginRight: 8,
    borderRadius: 14,
    width: 60,
    height: 60,
  },
  userName: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  lastMessage: {
    marginTop: 2,
    fontSize: 13,
    color: "rgba(255,255,255,0.7)"
  }
});
