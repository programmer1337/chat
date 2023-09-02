import {StyleSheet, Text, View} from "react-native";
import SectionHeader from "../utility/sectionHeader/SectionHeader";

function ChatComponent() {
    return (
        <View style={styles.pageSection}>
            <SectionHeader sectionName={"Friends"} />
        </View>
    )
}

const styles = StyleSheet.create({
    pageSection: {
        flex: 1,
        display: "flex",
        flexDirection: "column",

        backgroundColor: "#141414"
    }
});

export default ChatComponent;