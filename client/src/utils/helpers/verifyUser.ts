import { BASE_API_URL } from "../../constants";

const verifyUser = async () => {
  let isVerified = false;

  const res = await fetch(`${BASE_API_URL}/user/verify`);
  isVerified = res.status !== 401 ? true : false;

  return isVerified;
};

export default verifyUser;
 