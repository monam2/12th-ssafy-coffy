import { atom } from "recoil";

interface userDto {
    name : string;
    mmId : string;
    classNum : number;
}

export const userState = atom<userDto>({
  key: "userState",
  default: {
    name : "",
    mmId : "",
    classNum : 1
  },
});
