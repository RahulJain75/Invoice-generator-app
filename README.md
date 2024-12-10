# Invoice Generator - React App
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)

An Invoice creator project built with React and nodemailer. Add itemized items, configure quantity, prices, tax rates and discounts. Download Invoice as PDFs to your device. Uses [jspdf-react](https://www.npmjs.com/package/jspdf-react) to capture the data from the modal and covert it from canvas -> pdf, send invoice pdf on email. 

<!-- ### Live Demo -->
<!-- https://invoice-generator-react.netlify.app/ -->

### Screenshots
<img src="https://i.imgur.com/EvzNqM6.png" style="max-width: 100px; width: 100%; height: auto;">
<img src="https://i.imgur.com/WaQIGoR.png" style="max-width: 100px; width: 100%; height: auto;">
<img src="https://i.imgur.com/bYib3CH.png" style="max-width: 100px; width: 100%; height: auto;">
<img src="https://i.imgur.com/gz2816r.png" style="max-width: 100px; width: 100%; height: auto;">

### Installation

```
git clone https://github.com/RahulJain75/Invoice-generator-app

npm install

nvm use 18

npm run build

npm run server-start
```

### To-Do
- [x] Finish parsing data into Preview Modal

- [x] Currency Picker

- [x] Calculate Tax and Discounts



### Meta
Rahul Jain – [Github](https://github.com/RahulJain75)

Taken idea from John Uberbacher – [johnuberbacher.com](https://johnuberbacher.com) and added sending invoice on email feature using node mailer.
