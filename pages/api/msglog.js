// getting data from Mslogs.json and seding it in json fromat
import { msglog } from "../../public/Msglogs.json";
export default function handler(req, res) {
    res.status(200).json(msglog)
}
