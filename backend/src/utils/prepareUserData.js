import bcrypt from "bcrypt";
export const prepareUserData = async (user, userCount) => {
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(user.password, salt);

  let data;
  if (user.userAvatar === "") {
    data = {
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.login,
    }
  } else {
    data = {
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.login,
      userAvatar: user.userAvatar,
    }
  }

  return {
    login: user.login,
    passwordHash: passwordHash,
    registrationDate: new Date(),
    friendTag: 1000000 + userCount,
    userProfile: {
      create: data,
    }
  }
}
