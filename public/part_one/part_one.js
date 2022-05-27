const event_value  = (function(){
const container = document.getElementById('container_id')
  
  function loadItem(id, img_arg, title_arg, email_arg, company_arg, skill_arg, average_arg){
    const item = document.createElement('div');
    const img = document.createElement('img');
    const details = document.createElement('div');
    const title = document.createElement('h3');
    const email = document.createElement('div');
    const company = document.createElement('div');
    const skill = document.createElement('div');
    const average = document.createElement('div');
    img.src = img_arg;
    title.style ='font-weight:700';
    title.innerHTML = title_arg
    email.innerHTML = `Email: ${email_arg}`;
    company.innerHTML = `Company: ${company_arg}`;
    skill.innerHTML = `Skill: ${skill_arg}`;
    average.innerHTML = `Average: ${average_arg}`;
    item.setAttribute('id' , id)
    details.appendChild(title);
    details.appendChild(email);
    details.appendChild(company);
    details.appendChild(skill);
    details.appendChild(average);
    item.appendChild(img);
    item.appendChild(details);
    
    return item;
  }
   
  async function loadData() {
    // Get user's ID from session storage.
    // const uid = window.sessionStorage.getItem('uid');

    await fetch(`https://api.hatchways.io/assessment/students`, {
      method:'GET',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    .then(response => {
      return response.json();
    })

    .then(data => {
      for (const item of data.students){
        let title = item.firstName + " " + item.lastName;
        const average = arr => arr.reduce((a,b) => parseInt(a) + parseInt(b), 0) / arr.length;
        let mean = average(item.grades);
        mean = mean.toString();
        mean = mean + "%";
        let temp = loadItem(item.id, item.pic, title , item.email,  item.company, item.skill, mean);
        console.log(temp)
        container.appendChild(temp);
      }
    })
  }
  
  return {
    "loadData" : loadData
         }
}
)()

event_value.loadData()