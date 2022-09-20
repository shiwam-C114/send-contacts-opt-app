// getting data from glitch server and sending it in json fromat
export default function handler(req, res) {
  fetch("https://whimsical-brazen-carnation.glitch.me/data")
    .then(res => res.json())
    .then(data => {
      res.status(200).json(data)
    })
}
