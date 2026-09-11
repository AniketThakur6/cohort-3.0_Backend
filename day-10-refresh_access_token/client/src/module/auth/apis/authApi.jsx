export const registerApi = async (api, newUser) => {
  try {
    const res = await api.post("/api/auth/register", newUser);
    return res.data;
  } catch (error) {
    throw error;
  }
};

