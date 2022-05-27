const event_value  = (function(){
  const container = document.getElementById('container_id')
  const serach_name = document.forms['serach_name']
  
    function loadItem(id, img_arg, title_arg, email_arg, company_arg, skill_arg, average_arg,grades){
      const item = document.createElement('div');
      const img = document.createElement('img');
      const details = document.createElement('div');
      const img_container = document.createElement('div');
      const title = document.createElement('h3');
      const email = document.createElement('div');
      const company = document.createElement('div');
      const skill = document.createElement('div');
      const average = document.createElement('div');
      const tests = document.createElement('div')
      const open_btn = document.createElement('i')
      const close_btn = document.createElement('i')

      img.src = img_arg;
      img.classList.add('img')
      img_container.appendChild(img)
      img_container.classList.add('image_container')
      item.classList.add('item')
      title.classList.add('title')
      title.innerHTML = title_arg
      email.classList.add('sub_detailes')
      email.innerHTML = `Email: ${email_arg}`;
      company.classList.add('sub_detailes')
      company.innerHTML = `Company: ${company_arg}`;
      skill.classList.add('sub_detailes')
      skill.innerHTML = `Skill: ${skill_arg}`;
      average.innerHTML = `Average: ${average_arg}`;
      average.classList.add('sub_detailes')
      for(let [i ,test] of grades.entries()){
        i+=1;
        const grade = document.createElement('span');
        grade.innerHTML = "Test" + i.toString() + ":  &#160;&#160;&#160;" +test;
        tests.appendChild(grade)
      }
      tests.classList.add('test')
      tests.classList.add('sub_detailes')
      open_btn.classList.add('fa')
      open_btn.classList.add('fa-plus')
      open_btn.classList.add('btn_1')
      close_btn.classList.add('fa')
      close_btn.classList.add('fa-minus') 
      close_btn.classList.add('btn_2')   
      close_btn.style.display = 'none';
      open_btn.addEventListener('click' , (e)=>{
        tests.style.display = "flex"
        open_btn.style.display = "none"
        close_btn.style.display = "var(--fa-display,inline-block)"
      })
      close_btn.addEventListener('click' , (e)=>{
        tests.style.display = "none"
        close_btn.style.display = "none"
        open_btn.style.display = "var(--fa-display,inline-block)"
      })
      details.className ="details"
      details.appendChild(title);
      details.appendChild(email);
      details.appendChild(company);
      details.appendChild(skill);
      details.appendChild(average);
      details.appendChild(tests);
      item.appendChild(img_container);
      item.setAttribute('id' , id)
      item.appendChild(details);
      item.appendChild(open_btn);
      item.appendChild(close_btn);
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
        
        for (const [i , item] of data.students.entries()){
          
          let title = item.firstName + " " + item.lastName;
          const average = arr => arr.reduce((a,b) => parseInt(a) + parseInt(b), 0) / arr.length;
          const transform = arr => arr.map((a) => a + "%")
          let grades = transform(item.grades)
          let mean = average(item.grades);
          mean = mean.toString();
          mean = mean + "%";
          let temp = loadItem(item.id, item.pic, title , item.email,  item.company, item.skill, mean, grades);
          
          container.appendChild(temp);
          
        }
      })
    }
    
    function filter(){
      serach_name.addEventListener('keyup', (e) =>{
        let  term = serach_name.querySelector('input').value.toLowerCase()
        const items = container.getElementsByClassName('item')
        
        Array.from(items).forEach((item) => {
          const title = item.getElementsByClassName('details')[0].children[0].textContent.toLowerCase()
          if(title.indexOf(term) !== -1){
            item.style.display = "flex";
          }
          else{
            item.style.display = "none";
          }
          
          
        })
      })
      
      
    }
    
    return {
      "loadData" : loadData,
      "filter" : filter
           }
  }
  )()
  
  event_value.loadData()
  event_value.filter()