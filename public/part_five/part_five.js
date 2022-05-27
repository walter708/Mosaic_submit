const event_value  = (function(){
  const container = document.getElementById('container_id')
  const serach_name = document.forms['serach_name']
  const serach_tag = document.getElementById('serach_tag')
  let  term1
  let  term2
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
      const tag_container = document.createElement('div')
      const addTagForm = document.createElement('form')
      const addTagText = document.createElement('input')
      
      
      addTagText.setAttribute('type' , 'text')
      addTagText.setAttribute('placeholder' , 'Add a tag')
      addTagText.classList.add('input_style')
      // item.setAttribute('id' , "")
      addTagForm.classList.add('sub_detailes')
      addTagForm.classList.add('form_style')
      addTagForm.appendChild(addTagText)
      tag_container.classList.add('tag_container')
      addTagText.addEventListener('keypress' , (e) => {
        
        let  key = e.key
        if (key === "Enter"){
          e.preventDefault()
          let term = addTagText.value
          const tag = document.createElement('span')
          tag.classList.add('tag')
          tag.innerHTML = term.toLowerCase()
          tag_container.appendChild(tag)
          addTagText.value ="";
        }
      })
      
      
      
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
      details.appendChild(tag_container)
      details.appendChild(addTagForm)
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
    
    function filterByName(){
      serach_name.addEventListener('keyup', (e) =>{
       
        term1 = serach_name.querySelector('input').value.toLowerCase()
        const items = container.getElementsByClassName('item')
        
        Array.from(items).forEach((item) => {
          const name = item.getElementsByClassName('details')[0].children[0].textContent.toLowerCase()
          const tag = item.getElementsByClassName('tag_container')[0].textContent.toLowerCase()
          if(name.indexOf(term1) !== -1){
            item.style.display = "flex";
          }else{
            item.style.display = "none";
          }
          if(tag.length !==0 && term2 && term2.length !== 0  && tag.indexOf(term2) !== -1){
            item.style.display = "flex";
          }
          else if(term2 && term2.length !== 0  && term1.length === 0){
            item.style.display = "none";
          }else{
            //item.style.display = "flex";
          }

          
        })
      })
      
      
    }
    
    function filterByTag(){
      serach_tag.addEventListener('keyup', (e) =>{
       
         term2 = serach_tag.querySelector('input').value.toLowerCase()
        const items = container.getElementsByClassName('item')
        Array.from(items).forEach((item) => {
          const name = item.getElementsByClassName('details')[0].children[0].textContent.toLowerCase()
          const tag = item.getElementsByClassName('tag_container')[0].textContent.toLowerCase()
          if(tag.indexOf(term2) !== -1 ){
            item.style.display = "flex";
          }else{
            item.style.display = "none";
          }
          if(term1 && term1.length !== 0 && name.indexOf(term1) !== -1){
            item.style.display = "flex";
          }
          else if(term1 && term1.length !== 0 && term2.length === 0){
            item.style.display = "none";
          }else{
            //item.style.display = "flex";
          }


        })
      })
      
      
    }
    return {
      "loadData" : loadData,
      "filterByName" : filterByName,
      "filterByTag":filterByTag
           }
  }
  )()
  
  event_value.loadData()
  event_value.filterByName()
  event_value.filterByTag()