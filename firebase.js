// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore,addDoc, collection,getDocs,doc,getDoc,query,where,deleteDoc,updateDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCT_xsd2Cm1lZZD9ZohIzcxfiSVXAmeZUM",
  authDomain: "resume-app-03.firebaseapp.com",
  projectId: "resume-app-03",
  storageBucket: "resume-app-03.appspot.com",
  messagingSenderId: "59375422061",
  appId: "1:59375422061:web:52a894dcd57780f1fc8d64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// *******************FUNCTION LOG IN************************
function login(){
        getDocs(collection(db, 'register')).then(loginPage => {
            
                let email = document.getElementById('email').value;
                let password = document.getElementById('password').value;
                if (email == '' && password == '') {
                    alert('please fill all fields')
                    return
                }
                let userData = false
                loginPage.forEach((each) => {
                    let resume = each.data()
                    if (email == resume.Email && password == resume.Password) {
                        userData = {
                            Name: resume.Name,
                            Id: each.id,
                            Email: resume.Email
                        }
                        alert('login Successfull')
                        localStorage.setItem('userloginData', JSON.stringify(userData))
                        location = `createResume.html`
                        userData = true
                    }
                })
                if(!userData){
                    alert('Incorrect password or email')
                }
            
             
        })
        

}
window.login = login

// *******************FUNCTION REGISTER************************
async function register(){
        
        var names = document.getElementById('name').value;
        var emails = document.getElementById('email').value;
        var passwords = document.getElementById('password').value

        if(names == ' ' || emails == " " || passwords==''){
            alert('Please fill all fields')
        }
        
        else{
            let fireId = await addDoc(collection(db, "register"),{
            Name : names,
            Email : emails,
            Password : passwords

        })
        alert('Registration successfull')
        const id = fireId.id
        location = 'index.html'
        }
}
window.register = register

        
// *******************FUNCTION SAVE RESUME************************
async function saveResume(){
        let locat_value = localStorage.getItem('userloginData')
        let parseData = JSON.parse(locat_value)
        const docRef =await addDoc(collection(db, "userResumeData"), {...resume,userId:parseData.Id})

        // location = 'resume_list.html'
        location = `resume_list.html`
}
window.saveResume = saveResume

// *******************FUNCTION LOG OUT************************
function logout(){
        localStorage.removeItem('userloginData')
        location="index.html"
}
window.logout = logout


// GET RESUME LIST IN THE LIST PAGE

async function getResume(){
    let locatData = localStorage.getItem('userloginData')
    let parseData = JSON.parse(locatData)
    await getDocs(query(collection(db,'userResumeData'),where('userId','==',parseData.Id))).then(docSnap =>{
    let renderHtml = ''
    docSnap.forEach((each)=>{
        let eachResume = each.data()

        
        renderHtml = renderHtml + `<li><a href="template.html?resumeId=${each.id}"> 
    ${eachResume.Title}</a><button type='button' onclick="deleteResume('${each.id}')">Delete</button>
    <a href='edit_page.html?resumeId=${each.id}'><button>Edit</button></a></li>`
    })
    document.getElementById('list').innerHTML = renderHtml
})
}
window.getResume = getResume


// ****************LIST DELETE FUNCTION*******************
function deleteResume(resumeId){
    deleteDoc(doc(db,"userResumeData",resumeId))
    getResume()
}
    window.deleteResume = deleteResume

function editView(){
    let params = new URLSearchParams(document.location.search);
    let index = params.get("resumeId");
    getDocs(collection(db,'userResumeData')).then(edit =>{
        edit.forEach((doc)=>{
            if(index == doc.id){
            let datas = doc.data()
            resume = datas;
            document.getElementById('editName').value=resume.Title
            document.getElementById('editNames').value=resume.Name
            document.getElementById('editAge').value=resume.Age
            document.getElementById('editEmail').value=resume.Email
            document.getElementById('editContact').value=resume.Contact
            document.getElementById('editDeclaration').value=resume.Declaration
            document.getElementById('editFname').value=resume.personal_details.father_name
            document.getElementById('editMname').value=resume.personal_details.mother_name
            // to get skill
            let updateSkille = ''

            for(const each of resume.Skills){
                 updateSkille = updateSkille + `<input class="inputSkills" value=${each} />`
            }
            document.getElementById('skill').innerHTML = updateSkille

            // to get language
            let updateLanguage = ''
            for(const eachLang of resume.Language){
                updateLanguage = updateLanguage + `<input class="inputLanguage" value=${eachLang} />`
            }
            document.getElementById('language').innerHTML = updateLanguage

          //  *******************TO GET HOBBIES************************
            let updateHobby = ' '
            for(const eachHobby of resume.Hobbies){
                updateHobby = updateHobby + `<input class="inputHobby" value=${eachHobby} />`

            }
            document.getElementById('hobby').innerHTML = updateHobby

            // to get education

            let educationOperation = resume.Education
            let updateEducation = ''
    
            for(const eachEducation in educationOperation){
                updateEducation = updateEducation + `<tr>
                                 <td><input value="${educationOperation[eachEducation].course}" onkeyup=updateOperation(this,${eachEducation},'course','Education') /> </td>
                                 <td><input value="${educationOperation[eachEducation].ins_name}" onkeyup=updateOperation(this,${eachEducation},'ins_name','Education') /></td>
                                 <td><input type='number' value="${educationOperation[eachEducation].percentage}" onkeyup=updateOperation(this,${eachEducation},'percentage','Education') /></td>
                                 <td><input type='number' value="${educationOperation[eachEducation].year_of_pass}" onkeyup=updateOperation(this,${eachEducation},'year_of_pass','Education') /></td>
                                            </tr>`
                                            
            }
            document.getElementById('editEducationTable').innerHTML=updateEducation

            //  *******************TO GET EXPERIENCE************************

            let experienceOperation = resume.Experience
            let updateExperience = ''
            for(const eachExperience in experienceOperation){
                updateExperience = updateExperience + `<tr>
                                <td><input value="${experienceOperation[eachExperience].company_name}" onkeyup=updateOperation(this,${eachExperience},'company_name','Experience') /> </td>
                                 <td><input value="${experienceOperation[eachExperience].role}" onkeyup=updateOperation(this,${eachExperience},'role','Experience') /></td>
                                 <td><input type='number' value="${experienceOperation[eachExperience].year}" onkeyup=updateOperation(this,${eachExperience},'year','Experience') /></td>
                                                    </tr>`
            }
            document.getElementById('editExperienceTable').innerHTML=updateExperience

            let projectOperation = resume.Project
    
            for(const eachProject in projectOperation){
                updateProject = updateProject + `<tr>
                                <td><input value="${projectOperation[eachProject].title}" onkeyup=updateOperation(this,${eachProject},'title','Project') /> </td>
                                 <td><input value="${projectOperation[eachProject].role}" onkeyup=updateOperation(this,${eachProject},'role','Project') /></td>
                                 <td><input type='number' value="${projectOperation[eachProject].year}" onkeyup=updateOperation(this,${eachProject},'year','Project') /></td>
                                            </tr>`
            }
            document.getElementById('editProjectTable').innerHTML=updateProject
        }
    })
    
})
}
window.editView = editView

async function updateFunction(){
    let params = new URLSearchParams(document.location.search);
    let index = params.get("resumeId");
        // single method
        let name = document.getElementById('editNames').value
        let title = document.getElementById('editName').value
        let age = document.getElementById('editAge').value
        let email = document.getElementById('editEmail').value
        let contact = document.getElementById('editContact').value
        let declaration = document.getElementById('editDeclaration').value
        let fname = document.getElementById('editFname').value
        let mname = document.getElementById('editMname').value
        // array method
        let skill = document.getElementsByClassName('inputSkills')
        let language = document.getElementsByClassName('inputLanguage')
        let hobby = document.getElementsByClassName('inputHobby')

        let updatedSkill = []
        let updatedLanguage = []
        let updatedHobby = []
        let updatedEducation=[]
        

        for(const each of skill){
            updatedSkill.push(each.value)
        }
        for(const each of language){
            updatedLanguage.push(each.value)
        }
        for(const each of hobby){
            updatedHobby.push(each.value)
        }

        
        await updateDoc(doc(db,"userResumeData",index),{
            Name : name,
            Title: title,
            Age : age,
            Email : email,
            Contact : contact,
            Declaration : declaration,
            personal_details:{
                father_name : fname,
                mother_name : mname

            },
            Skills : updatedSkill,
            Hobbies : updatedHobby,
            Language : updatedLanguage,
            Education :resume.Education,
            Project : resume.Project,
            Experience : resume.Experience
            
        })
        alert('update Successfull')
        location = 'resume_list.html'
        
    
}
window.updateFunction = updateFunction


function outPutResume(){
    let params = new URLSearchParams(document.location.search);
        let index = params.get("resumeId");
        
       getDocs(collection(db,'userResumeData')).then(resumePage=>{
        resumePage.forEach((doc)=>{
            if(index == doc.id){
                let resume = doc.data()
                document.getElementById('profile-name').innerHTML = resume.Name
                document.getElementById('profiles-name').innerHTML = resume.Name
                document.getElementById('re-contact').innerHTML = `Contact : ${resume.Contact}`
                document.getElementById('re-mail').innerHTML = `Email : ${resume.Email}`
                document.getElementById('re-title').innerHTML=resume.Title
                document.getElementById('dec').innerHTML = resume.Declaration


    let language = ''
    for(const each of resume.Language){
        language = language+`<p>${each}</p>`
    }
    document.getElementById('language').innerHTML=language

    let hobby= ''
    for(const each of resume.Hobbies){
        hobby = hobby + `<p>${each}</p>`
    }
    document.getElementById('hobbies').innerHTML = hobby

    let skill = ''
    for(const each of resume.Skills){
        skill = skill + `<p>${each}</p>`
    }
    document.getElementById('skills').innerHTML = skill

    let empty_education = ''
    for(const each of resume.Education){
        empty_education = empty_education + `<li class="time-line-item">
                                                <span class="badge badge-primary">${each.year_of_pass}</span>
                                                <h6 class="time-line-item-title">${each.course}</h6>
                                                <p class="time-line-item-subtitle">${each.ins_name}</p>
                                                <p class="time-line-item-content">${each.percentage}</p>
                                            </li>`

    }
    document.getElementById('re_education').innerHTML = empty_education

    let empty_experience = ''
    for(const each of resume.Experience){
        empty_experience = empty_experience + `<li class="time-line-item">
                                                    <span class="badge badge-primary">${each.year}</span>
                                                    <h6 class="time-line-item-title">${each.role}</h6>
                                                    <p class="time-line-item-subtitle">${each.company_name}</p>
                                                </li>`
    }

    document.getElementById('re_experience').innerHTML = empty_experience

    let empty_project = ''
    for(const each of resume.Project){
        empty_project = empty_project + `<li class="time-line-item">
                                                    <span class="badge badge-primary">${each.year}</span>
                                                    <h6 class="time-line-item-title">${each.role}</h6>
                                                    <p class="time-line-item-subtitle">${each.title}</p>
                                                </li>`
    }
    document.getElementById('re_project').innerHTML = empty_project
            }
        })
       })

}
window.outPutResume = outPutResume
