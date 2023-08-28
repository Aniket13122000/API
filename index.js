

const express = require('express');
const bodyParser = require('body-parser');
const axios=require('axios')
const app = express();
const PORT = 3000; // You can change the port if needed
var cors = require('cors')

app.use(cors())
// Sample data

app.use(bodyParser.json());

app.post('/change_pswd',(req,res)=>{
  console.log('runnss');

  const url = `https://org2-pro-prem-y0bh.oktapreview.com/api/v1/users/${req.body.id}/credentials/forgot_password?sendEmail=false`;
  const config = {
    headers:{
        Authorization: `SSWS 0097tfqHB1X0BwoMdmR4j-yRoGEyFhoGyO0t9UagN3`,

    }
  };
  let data={
    password: { value: req.body.pswd }, 
      recovery_question: { answer:req.body.r_q } 
  }
  console.log('runn2');

  axios.post(url,data,config)
  .then(response => {
    const data = response.data;
   console.log(data);
   res.send('Password Change succesfully')
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    res.send('Something went wrong')

  });
})
app.post('/data',(req,res)=>{
  const url = `https://org2-pro-prem-y0bh.oktapreview.com/api/v1/users?search=profile.emp_id eq "${req.body.id}"`;
//console.log(req.body);

const headers = {
  Authorization: `SSWS 0097tfqHB1X0BwoMdmR4j-yRoGEyFhoGyO0t9UagN3`,
};
const config = {
    headers:{
        Authorization: `SSWS 0097tfqHB1X0BwoMdmR4j-yRoGEyFhoGyO0t9UagN3`,

    }
  };

axios.get(url,config)
  .then(response => {
    const data = response.data;
    if (data.length > 0) {
      const user = data[0];
      const securityQuestions = user.credentials.recovery_question;
      console.log(securityQuestions,'sdfhsb');
      res.send(data);
    } else {
      console.log('User not found.');
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    res.send('Something went wrong')

  });

})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
