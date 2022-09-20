// getting data from Users.json and seding it in json fromat
import { data } from "../../public/Users.json";
export default function handler(req, res) {
  res.status(200).json( data )
}
