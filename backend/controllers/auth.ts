import { Auth } from "../models/auth";

async function findOrCreateAuth(body) {
  const { email } = body;

  const auth = await Auth.findByEmail(email);

  if (auth) {
    return auth.data;
  } else {
    const newAuth = await Auth.createAuth(body);

    return newAuth;
  }
}

export { findOrCreateAuth };
