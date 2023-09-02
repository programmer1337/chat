import {ActivityIndicator, Pressable, Text, View} from "react-native";
import SectionHeader from "../utility/sectionHeader/SectionHeader";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {getProfileData} from "../../hooks/getProfileData";
import globalStyle from "../../styles/globalStyle";
import profileComponentStyle from "./profileComponent.style";

export default function ProfileComponent() {
  const {profileData, isProfileLoading} = getProfileData();
  const {logout} = useContext(AuthContext)

  return (
    <View style={profileComponentStyle.pageSection}>
      <SectionHeader sectionName={"Profile"}/>
      <View style={profileComponentStyle.main}>
        {isProfileLoading ? <ActivityIndicator style={globalStyle.indicator} size={"large"} color={"#d5d5d5"} /> :
          <View>
            <Text style={profileComponentStyle.text}>Id: {profileData.userId}</Text>
            <Text style={profileComponentStyle.text}>Имя: {profileData.firstName}</Text>
            <Text style={profileComponentStyle.text}>Фамилия: {profileData.lastName}</Text>
            <Text style={profileComponentStyle.text}>Friend Tag: {profileData.userFriendTag}</Text>
          </View>
        }
        <Pressable
          style={profileComponentStyle.logoutButton}
          onPress={() => {
            logout()
          }}
        >
          <Text style={profileComponentStyle.logoutText}>LOGOUT</Text>
        </Pressable>
      </View>
    </View>
  )
}
