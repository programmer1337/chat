import {StyleSheet} from "react-native";

module.exports = StyleSheet.create({
  chatPage: {
    flex: 1,
    display: "flex",
    flexDirection: "column",

    backgroundColor: "#141414"
  },
  list: {
    display: "flex",
    paddingTop: "5%",
  },
  messageContainer: {
    display: "flex",
  },
  message: {
    display: "flex",

    marginHorizontal: 8,
    marginVertical: 3,
    paddingVertical: 4,
    paddingHorizontal: 6,

    borderWidth: 1,
    borderColor: '#fff',
    color: "#fff",
    borderStyle: 'solid',
  },
  myMessages: {
    display: "flex",
    alignItems: "flex-end",
  },
  companionMessage: {
    display: "flex",
    alignItems: "flex-start",
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    borderStyle: 'solid',
    borderRadius: 0,
    padding: 6,
    margin: 3,
    width: "90%",
  },
})
