import React from "react";
import {Pressable, Text, View} from "react-native";
import Separator from "../separator/Separator.jsx";
import {useNavigation} from "@react-navigation/native";
import sectionHeaderStyle from "./sectionHeader.style";

function SectionHeader({sectionName, pageName, onRefresh}) {
    const navigation = useNavigation();
    return (
        <View style={sectionHeaderStyle.header}>
            <View style={sectionHeaderStyle.header__container}>
                <Text style={sectionHeaderStyle.headerText}>{sectionName}</Text>
                {sectionName !== "Profile" ?
                    <Pressable
                        onPress={()=>
                            navigation.navigate(pageName,{
                                onRefresh: onRefresh
                            })
                        }
                    >
                        <Text style={sectionHeaderStyle.headerText}>+</Text>
                    </Pressable> :
                    ""
                }
            </View>
            <Separator />
        </View>
    )
}
export default SectionHeader;
