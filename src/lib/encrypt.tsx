import bcrypt from "bcryptjs";

// Encrypts password with hash (salt = 10)
export const encryptPassword = (password: string):string => {
    const saltRounds: string = bcrypt.genSaltSync(10);
    const encPsw = bcrypt.hashSync(password, saltRounds);
    return encPsw;
}
