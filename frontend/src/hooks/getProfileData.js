import {useEffect, useState} from "react";
import {getProfile} from "../workWithApp/getProfile";

export const getProfileData = () => {
  const [profileData, setProfileData] = useState({});
  const [isProfileLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    getProfile().then(profileData => {
      console.log(profileData)
      setProfileData(profileData);
      setIsDataLoading(false);
    })
  }, []);
  const handleProfileData = (data) => {
    setProfileData(data);
  };

  return {
    profileData,
    isProfileLoading,
    handleProfileData
  };
};
