// getting data from glich server and sending it in json fromat
export default function handler(req, res) {
    fetch('https://whimsical-brazen-carnation.glitch.me/msglog')
        .then(res => res.json())
        .then(msglog => {
            res.status(200).json(msglog)
            
        })
}
