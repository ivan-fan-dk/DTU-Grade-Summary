const body = document.body;
const year = new Date().getFullYear();

copyright_time = `2024`
if (year != 2024){
    copyright_time += `-${year}`
}
body.innerHTML = 
`
    <h3>
      Copyright (c) ${copyright_time} <a href="https://github.com/ivan-fan-dk" target="_blank">Ivan Fan</a>, All rights reserved.
    <br>
      Great thanks to <a href="https://github.com/ErikRossRonnow" target="_blank">Erik Ross-Rønnow</a> for the inspiration.
    <br>
      <a target="_blank" href = 'https://forms.gle/rKxKQFXUfy45b7XWA'>Feedback</a>
    </h3>
`