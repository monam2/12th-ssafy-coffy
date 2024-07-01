import CryptoJS from "crypto-js";

const checkUser = ():{decryptedName:string, decryptedMmid:string, decryptedClassNum:string} | null => {
  const key = `${process.env.NEXT_PUBLIC_SECRET_KEY}`;
  const tempName = window.sessionStorage.getItem("name");
  const tempMmId = window.sessionStorage.getItem("id");
  const tempClassNum = window.sessionStorage.getItem("class");

  if (tempName && tempMmId && tempClassNum) {
    const decryptedName = CryptoJS.AES.decrypt(tempName, key).toString(
      CryptoJS.enc.Utf8
    );
    const decryptedMmid = CryptoJS.AES.decrypt(tempMmId, key).toString(
      CryptoJS.enc.Utf8
    );
    const decryptedClassNum = CryptoJS.AES.decrypt(tempClassNum, key).toString(
      CryptoJS.enc.Utf8
    );
    return { decryptedName, decryptedMmid, decryptedClassNum };
  } else {
    return null;
  }
};

const setUserData =(name:string, mmId:string, classNum:number)=> {
  const key = `${process.env.NEXT_PUBLIC_SECRET_KEY}`;
    const encryptedName = CryptoJS.AES.encrypt(name, key).toString();
    const encryptedMmId = CryptoJS.AES.encrypt(mmId, key).toString();
    const encryptedClassNum = CryptoJS.AES.encrypt(`${classNum}`, key).toString();
    window.sessionStorage.setItem('name', encryptedName);
    window.sessionStorage.setItem('id', encryptedMmId);
    window.sessionStorage.setItem('class', encryptedClassNum);
}


export {checkUser, setUserData}