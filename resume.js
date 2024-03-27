let resume = {
    Skills:[],
    Language:[],
    Hobbies:[],
    personal_details:{},
    Education:[
        {   
            course:'',
            ins_name:'',
            percentage:'',
            year_of_pass:''
        },
        {
            course:'',
            ins_name:'',
            percentage:'',
            year_of_pass:''
        },
        {
            course:'',
            ins_name:'',
            percentage:'',
            year_of_pass:''
        }



    ],
    Experience:[
        {
            company_name:'',
            role:'',
            year:''
        },
        {
            company_name:'',
            role:'',
            year:''
        }
    ],
    Project:[
        {
            title:'',
            role:'',
            year:''
        },
        {
            title:'',
            role:'',
            year:''
        }

    ]

    


}
function gene(ele,key,p_key,index,c_key){
    if(p_key){
        resume[p_key][key]=ele.value
    }
    else if(c_key){
        resume[key][index][c_key]=ele.value
    }
    else{
    resume[key] = ele.value;

    }
    perview()
}

function addArry(key,id){
    let value = document.getElementById(id).value
    resume[key].push(value)
    document.getElementById(id).value = ""
    perview()

}
// var btn = document.getElementById('btn');
// btn.onclick=function(){
//     alert('test');
// }

// function sub(){
//     let val = document.getElementsByClassName('inner_content').value
//     if(val === ''){
//         alert('please fill all input')
//     }
//     else{
//         alert('submitted successfully')
//     }
// }

function perview(){
    document.getElementById('coded').innerHTML = JSON.stringify(resume,null,4)
}

function saveResumes(){
    if(!localStorage.getItem('resume_list')){
        localStorage.setItem('resume_list',JSON.stringify([]))
    }

    let existing_data =localStorage.getItem('resume_list')
    let parse_data = JSON.parse(existing_data)
    let updated_data = [...parse_data,resume]

    localStorage.setItem('resume_list',JSON.stringify(updated_data))
    window.location = 'resume_list.html'
} 

/*function renderList(){
    let exist_data = localStorage.getItem('resume_list')
    let parse_exist_data = JSON.parse(exist_data)
    let render = ''
    for(let each in parse_exist_data){
        render = render+`<li><a href="template.html?index=${each}"> 
        ${parse_exist_data[each].Title}</a><button type='button' onclick="remove(${each})">Delete</button>
        <a href='edit_page.html?index=${each}'><button>Edit</button></a></li>`
    }
    document.getElementById('list').innerHTML=render 
       
}*/



/*function remove(a){

    **********************ONE OF THE METHOD******************************   
    // let newArray =[]

    if(a===a){
       let string_data = localStorage.getItem('resume_list')
       let parsed_data = JSON.parse(string_data)
       parsed_data.splice(a,1)
       string_Array = localStorage.setItem('resume_list',JSON.stringify(parsed_data))


    }
    window.location='resume_list.html'
}*/

// ***************************ALTER METHODDS👇 *******************************

function remove(key){
    let string_data = localStorage.getItem('resume_list')
    let parsed_data = JSON.parse(string_data)
    let newArray=[]
    for(const eachs in parsed_data){
        if(eachs!=key){
            newArray.push(parsed_data[eachs])
        }
    }
    localStorage.setItem('resume_list',JSON.stringify(newArray))
    window.location= 'resume_list.html'
}
var updateSkille = ''
var updateLanguage = ' '
var updateProject = ''
var updateEducation = ''
/*function editview(){
    let params = new URLSearchParams(document.location.search);
    let index = params.get("index");

    let edit_data = localStorage.getItem('resume_list')
    let parse_edit_data = JSON.parse(edit_data)

    document.getElementById('editName').value=parse_edit_data[index].Title
    document.getElementById('editNames').value=parse_edit_data[index].Name
    document.getElementById('editAge').value=parse_edit_data[index].Age
    document.getElementById('editEmail').value=parse_edit_data[index].Email
    document.getElementById('editContact').value=parse_edit_data[index].Contact
    document.getElementById('editDeclaration').value=parse_edit_data[index].Declaration
    document.getElementById('editFname').value=parse_edit_data[index].personal_details.father_name
    document.getElementById('editMname').value=parse_edit_data[index].personal_details.mother_name

    
    //  *******************TO GET SKILL👇************************
    
    for(const each of parse_edit_data[index].Skills){
        updateSkille = updateSkille + `<input class="inputSkills" value=${each} />`
    }
    document.getElementById('skill').innerHTML = updateSkille
    //  *******************TO GET LANGUAGE************************

    
    for(const eachLang of parse_edit_data[index].Language){
        updateLanguage = updateLanguage + `<input class="inputLanguage" value=${eachLang} />`
    }
    document.getElementById('language').innerHTML = updateLanguage

    //  *******************TO GET HOBBIES************************
    let updateHobby = ' '
    for(const eachHobby of parse_edit_data[index].Hobbies){
        updateHobby = updateHobby + `<input class="inputHobby" value=${eachHobby} />`

    }
    document.getElementById('hobby').innerHTML = updateHobby

    //  *******************TO GET Education************************
    let educationOperation = parse_edit_data[index].Education
    
    for(const eachEducation in educationOperation){
        updateEducation = updateEducation + `<tr>
                                 <td><input value="${educationOperation[eachEducation].course}" onkeyup=updateOperation(this,${eachEducation},'course','Education') /> </td>
                                 <td><input value="${educationOperation[eachEducation].ins_name}" onkeyup=updateOperation(this,${eachEducation},'ins_name','Education') /></td>
                                 <td><input value="${educationOperation[eachEducation].percentage}" onkeyup=updateOperation(this,${eachEducation},'percentage','Education') /></td>
                                 <td><input value="${educationOperation[eachEducation].year_of_pass}" onkeyup=updateOperation(this,${eachEducation},'year_of_pass','Education') /></td>
                                            </tr>`
                                            
    }
    document.getElementById('editEducationTable').innerHTML=updateEducation
    //  *******************TO GET EXPERIENCE************************

    let experienceOperation = parse_edit_data[index].Experience
    let updateExperience = ''
    for(const eachExperience in experienceOperation){
        updateExperience = updateExperience + `<tr>
                                <td><input value="${experienceOperation[eachExperience].company_name}" onkeyup=updateOperation(this,${eachExperience},'company_name','Experience') /> </td>
                                 <td><input value="${experienceOperation[eachExperience].role}" onkeyup=updateOperation(this,${eachExperience},'role','Experience') /></td>
                                 <td><input value="${experienceOperation[eachExperience].year}" onkeyup=updateOperation(this,${eachExperience},'year','Experience') /></td>
                                            </tr>`
    }
    document.getElementById('editExperienceTable').innerHTML=updateExperience

    //  *******************TO GET PROJECT************************

    let projectOperation = parse_edit_data[index].Project
    
    for(const eachProject in projectOperation){
        updateProject = updateProject + `<tr>
                                <td><input value="${projectOperation[eachProject].title}" onkeyup=updateOperation(this,${eachProject},'title','Project') /> </td>
                                 <td><input value="${projectOperation[eachProject].role}" onkeyup=updateOperation(this,${eachProject},'role','Project') /></td>
                                 <td><input value="${projectOperation[eachProject].year}" onkeyup=updateOperation(this,${eachProject},'year','Project') /></td>
                                            </tr>`
    }
    document.getElementById('editProjectTable').innerHTML=updateProject
}*/
function updateOperation(element,index_no,key_word,parent_key){
    let params = new URLSearchParams(document.location.search);
    let index = params.get("index");

    let edit_data = localStorage.getItem('resume_list')
    let parse_edit_data = JSON.parse(edit_data)
    // let educationOperation = parse_edit_data[index]
    parse_edit_data[index][parent_key][index_no][key_word]=element.value


    localStorage.setItem('resume_list',JSON.stringify(parse_edit_data))
}

// *********************\ONE METHOD👇TO UPDATE VALUE/*************************

function editAndUpdate(){
    let params = new URLSearchParams(document.location.search);
    let index = params.get("index");

    let get_data_from_local =localStorage.getItem('resume_list')
    let newTitle = JSON.parse(get_data_from_local) 

    let updateTitle = document.getElementById('editName').value
    let updateName = document.getElementById('editNames').value
    let updateAge = document.getElementById('editAge').value
    let updateEmail = document.getElementById('editEmail').value
    let updateContact = document.getElementById('editContact').value
    let updateDeclaration = document.getElementById('editDeclaration').value
    let updateFName = document.getElementById('editFname').value
    let updateMName = document.getElementById('editMname').value
    

    newTitle[index].Title = updateTitle
    newTitle[index].Name = updateName
    newTitle[index].Age = updateAge
    newTitle[index].Email = updateEmail
    newTitle[index].Contact = updateContact
    newTitle[index].Declaration = updateDeclaration
    newTitle[index].personal_details.father_name = updateFName
    newTitle[index].personal_details.mother_name = updateMName
    // ****************UPDATE SKILL BECAUSE THIS IS ARRAY ONE KEY BUT MANY VALUE SO WE USE THIS KIND OF METHOS

    let updateSkills = document.getElementsByClassName('inputSkills')
    let finalUpdateArray = []
    for(let each of updateSkills){
        finalUpdateArray.push(each.value)
    }

    newTitle[index].Skills = finalUpdateArray
    // ****************UPDATE lANGUAGE BECAUSE THIS IS ARRAY ONE KEY BUT MANY VALUE SO WE USE THIS KIND OF METHOS
    let updateLang = document.getElementsByClassName('inputLanguage')
    let finalUpdateLanguageArray = []
    for(let eachLang of updateLang){
        finalUpdateLanguageArray.push(eachLang.value)
    }
    newTitle[index].Language=finalUpdateLanguageArray

    // ****************UPDATE HOBBIESS BECAUSE THIS IS ARRAY ONE KEY BUT MANY VALUE SO WE USE THIS KIND OF METHOS

    let updateHobbiesArray=[]
    let updatehobby = document.getElementsByClassName('inputHobby')
    for(let eachHob of updatehobby){
        updateHobbiesArray.push(eachHob.value)
    }
    newTitle[index].Hobbies=updateHobbiesArray


    localStorage.setItem('resume_list',JSON.stringify(newTitle))
    window.location= 'resume_list.html'
}


/*function editAndUpdate(){
    let params = new URLSearchParams(document.location.search);
    let index = params.get("index");

    let get_data_from_local =localStorage.getItem('resume_list')
    let newTitle = JSON.parse(get_data_from_local)
    let updateInput = document.getElementById('editName').value
    let updateName = document.getElementById('editNames').value
    let updateAge = document.getElementById('editAge').value
    let updateEmail = document.getElementById('editEmail').value
    let updateContact = document.getElementById('editContact').value
    let updateDeclaration = document.getElementById('editDeclaration').value
    let updateFName = document.getElementById('editFname').value
    let updateMName = document.getElementById('editMname').value
    let updateSkills = document.getElementsByClassName('inputSkills')

    let updatedArray = []

    for(const updateEach in newTitle){
        if(updateEach == index){
            newTitle[updateEach].Title = updateInput
            newTitle[updateEach].Name = updateName
            newTitle[updateEach].Age = updateAge
            newTitle[updateEach].Email = updateEmail
            newTitle[updateEach].Contact = updateContact
            newTitle[updateEach].Declaration = updateDeclaration
            newTitle[updateEach].personal_details.father_name = updateFName
            newTitle[updateEach].personal_details.mother_name = updateMName
            newTitle[updateEach].Skills=updateSkills


        }
        updatedArray.push(newTitle[updateEach])
    }
    localStorage.setItem('resume_list',JSON.stringify(updatedArray))
    window.location= 'resume_list.html'
    

}
*/
function view(){
    
    let params = new URLSearchParams(document.location.search);
    let index = params.get("index");

    let exist_data = localStorage.getItem('resume_list')
    let parse_exist_data = JSON.parse(exist_data)
                                // NAME
    document.getElementById('lists').innerHTML=`Name:${parse_exist_data[index].Name}`
                                // AGE
    document.getElementById('age').innerHTML=`Age:${parse_exist_data[index].Age}`
                                // EMAIL
    document.getElementById('email').innerHTML=`Email:${parse_exist_data[index].Email}`
                                // CONTACT
    document.getElementById('contact').innerHTML=`Contact:${parse_exist_data[index].Contact}`
                                // DECLARATION
    document.getElementById('declaration').innerHTML=`Declaration:${parse_exist_data[index].Declaration}`
                                //SKILLS 
    document.getElementById('skills').innerHTML=`Skills:${parse_exist_data[index].Skills}`
                                // LANGUAGE
    document.getElementById('language').innerHTML=`Language:${parse_exist_data[index].Language}`
                                // HOBBIES
    document.getElementById('hobbies').innerHTML=`Hobbies:${parse_exist_data[index].Hobbies}`

                                //EDUCATION
    let table_value = '';
    for(let eachAll of parse_exist_data[index].Education){
        table_value = table_value + `<tr>
                                        <td>${eachAll.course}</td>
                                        <td>${eachAll.ins_name}</td>
                                        <td>${eachAll.percentage}</td>
                                        <td>${eachAll.year_of_pass}</td>
                                    </tr>`
    }
    document.getElementById('table').innerHTML = table_value
                                // EXPERIENCE
    let experienc_table = ''
    for(let eachAll of parse_exist_data[index].Experience){
        experienc_table = experienc_table + `<tr>
                                                <td>${eachAll.company_name}</td>
                                                <td>${eachAll.role}</td>
                                                <td>${eachAll.year}</td>
                                            </tr>`
    }
    document.getElementById('experience').innerHTML = experienc_table


                                // PROJECT
    let project_table = ''
    for(let eachAll of parse_exist_data[index].Project){
        project_table = project_table + `<tr>
                                        <td>${eachAll.title}</td>
                                        <td>${eachAll.role}</td>
                                        <td>${eachAll.year}</td>
                                        </tr>   `
    }
    document.getElementById('project').innerHTML = project_table 
    
                                // PERSONAL DETAILS----->FATHER NAME

    document.getElementById('f_name').innerHTML=`Father Name:${parse_exist_data[index].personal_details.father_name}`

                                // PERSONAL DETAILS----->MOTHER NAME
    document.getElementById('m_name').innerHTML=`Mother Name:${parse_exist_data[index].personal_details.mother_name}`
}



/*function addMore(id){    

    let params = new URLSearchParams(document.location.search);
    let index = params.get("index");

    let exist_data = localStorage.getItem('resume_list')
    let parse_exist_data = JSON.parse(exist_data)

    if(id=='skill'){
    let addSkill = document.getElementById('skill')
    let addNew = document.createElement('input')
    addNew.setAttribute('type','text')
    addNew.setAttribute('placeholder','Add New Skill')
    addNew.setAttribute('class','inputSkills')
    addSkill.appendChild(addNew)

    parse_exist_data[index].Skills.push(addNew.value)
    }
    else if(id=='language'){
    let addLanguage = document.getElementById('language')
    let addNewLanguage = document.createElement('input')
    addNewLanguage.setAttribute('type','text')
    addNewLanguage.setAttribute('placeholder','Add New Language')
    addNewLanguage.setAttribute('class','inputLanguage')
    addLanguage.appendChild(addNewLanguage)

    parse_exist_data[index].Language.push(addNewLanguage.value)
        
    }
    else if (id=='hobby'){
    let addHobby = document.getElementById('hobby')
    let addNewHobbies = document.createElement('input')
    addNewHobbies.setAttribute('type','text')
    addNewHobbies.setAttribute('placeholder','Add New Hobby')
    addNewHobbies.setAttribute('class','inputHobby')
    addHobby.appendChild(addNewHobbies)

    parse_exist_data[index].Language.push(addNewHobbies.value)

    }
    else if(id=='editEducationTable'){
        let educationLength = parse_exist_data[index].Education.length;
        let addEducation = document.getElementById('editEducationTable').innerHTML
        parse_exist_data[index].Education[educationLength]={
            course:'',
            ins_name:'',
            percentage:'',
            year_of_pass:''
        }
        let addNewEducation = `<tr>
        <td><input placeholder='Enter course name' onkeyup=updateOperation(this,${educationLength},'course','Education') /> </td>
        <td><input placeholder='Enter Institute name' onkeyup=updateOperation(this,${educationLength},'ins_name','Education') /></td>
        <td><input type='number' placeholder='Enter percentage' onkeyup=updateOperation(this,${educationLength},'percentage','Education') /></td>
        <td><input type='number' placeholder='Enter Year of passed out' onkeyup=updateOperation(this,${educationLength},'year_of_pass','Education') /></td>
                   </tr>`
        document.getElementById('editEducationTable').innerHTML=addEducation+addNewEducation

        
    }
    else if(id=='editExperienceTable'){
        let experienceLength = parse_exist_data[index].Experience.length
        let addExperience = document.getElementById('editExperienceTable').innerHTML
        let addNewExperience = `<tr>
        <td><input placeholder='Enter company name' onkeyup=updateOperation(this,${experienceLength},'company_name','Experience') /> </td>
        <td><input placeholder='Enter role' onkeyup=updateOperation(this,${experienceLength},'role','Experience') /></td>
        <td><input type='number' placeholder='No.of Experience year' onkeyup=updateOperation(this,${experienceLength},'year','Experience') /></td>
                   </tr>`
        document.getElementById('editExperienceTable').innerHTML=addExperience+addNewExperience

        parse_exist_data[index].Experience[experienceLength]={
            company_name:'',
            role:'',
            year:''
        }
    }
    else if('editProjectTable'){
        let projectLenght = parse_exist_data[index].Project.length
        let addProject = document.getElementById('editProjectTable').innerHTML
        let addNewProject = `<tr>
        <td><input placeholder='Enter project Title' onkeyup=updateOperation(this,${projectLenght},'title','Project') /> </td>
        <td><input placeholder='Enter role' onkeyup=updateOperation(this,${projectLenght},'role','Project') /></td>
        <td><input type='number' placeholder='No.of project year' onkeyup=updateOperation(this,${projectLenght},'year','Project') /></td>
                   </tr><button>hello</button>`
        document.getElementById('editProjectTable').innerHTML=addProject+addNewProject

        parse_exist_data[index].Project[projectLenght]={
            title:'',
            role:'',
            year:''
        }
    }

    localStorage.setItem('resume_list',JSON.stringify(parse_exist_data))
}*/
/*function addMoreTable(){
    let params = new URLSearchParams(document.location.search);
    let index = params.get("index");

    let exist_data = localStorage.getItem('resume_list')
    let parse_exist_data = JSON.parse(exist_data)
}*/