import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: "100%",
  },

  inputContainer: {
    borderColor: "e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    margin: 20,
    width: "90%",
  },

  buttonContainer: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
  },

  buttonsContainer: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    alignItems: "center",
  },

  button: {
    width: "50%",
    alignSelf: "center",
    padding: 10,
    marginRight: 5,
    borderRadius: 100,
    alignItems: "center",
    backgroundColor: "#70E2FF",
  },
  buttonText: {
    color: "black",
    fontWeight: "500",
    fontSize: 16,
  },
  text: {
    color: "black",
    fontWeight: "500",
    fontSize: 16,
  },
});
