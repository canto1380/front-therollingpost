export const consultarAPIUser = async(id) => {
  try {
    const res = await fetch(process.env.REACT_APP_API_URL + `/user/user/${id}`);
    const inforUsers = await res.json();
    if (res.status === 200) {
      return inforUsers;
    } else {
        return null
    }
  } catch (error) {
    return false
  }
};
