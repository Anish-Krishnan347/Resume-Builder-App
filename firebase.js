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
import('https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js')


// *******************FUNCTION LOG IN************************
// function login(){
//         getDocs(collection(db, 'register')).then(loginPage => {
            
//                 let email = document.getElementById('email').value;
//                 let password = document.getElementById('password').value;
//                 if (email == '' && password == '') {
//                     alert('please fill all fields')
//                     return
//                 }
//                 let userData = false
//                 loginPage.forEach((each) => {
//                     let resume = each.data()
//                     if (email == resume.Email && password == resume.Password) {
//                         userData = {
//                             Name: resume.Name,
//                             Id: each.id,
//                             Email: resume.Email
//                         }
//                         alert('login Successfull')
//                         localStorage.setItem('userloginData', JSON.stringify(userData))
//                         location = `createResume.html`
//                         userData = true
//                     }
//                 })
//                 if(!userData){
//                     alert('Incorrect password or email')
//                 }
            
             
//         })
        

// }
// window.login = login

// *******************FUNCTION REGISTER************************
// async function register(){
        
//         var names = document.getElementById('name').value.trim();
//         var emails = document.getElementById('email').value.trim();
//         var passwords = document.getElementById('password').value.trim()

//         if(names == ' ' || emails == " " || passwords==''){
//             alert('Please fill all fields')
//             return;
//         }
        
//         else{
//             const formData = new FormData();
//             formData.append("userName", names);
//             formData.append("userEmail", emails);
//             formData.append("userPassword",passwords);

//             await axios
//             .post("https://anishkrishnan.pythonanywhere.com/createResumeUser", formData)
//             .then((res) => {console.log(res.data)})

        
//         alert('Registration successfull')
//         location = 'index.html'
//         }
// }
// window.register = register

        
// *******************FUNCTION SAVE RESUME************************
// async function saveResume(){
//         let locat_value = localStorage.getItem('userloginData')
//         let parseData = JSON.parse(locat_value)
//         const docRef =await addDoc(collection(db, "userResumeData"), {...resume,userId:parseData.Id})

//         // location = 'resume_list.html'
//         location = `resume_list.html`
// }
// window.saveResume = saveResume

// *******************FUNCTION LOG OUT************************
// function logout(){
//         localStorage.removeItem('userloginData')
//         location="index.html"
// }
// window.logout = logout


// GET RESUME LIST IN THE LIST PAGE

// async function getResume(){
//     let locatData = localStorage.getItem('userloginData')
//     let parseData = JSON.parse(locatData)
//     await getDocs(query(collection(db,'userResumeData'),where('userId','==',parseData.Id))).then(docSnap =>{
//     let renderHtml = ''
//     docSnap.forEach((each)=>{
//         let eachResume = each.data()

        
//         renderHtml = renderHtml + `<tr><td><a href="template.html?resumeId=${each.id} " style='text-decoration:none; color:white;'> 
//     ${eachResume.Title}</a></td><td><button class="btn btn-outline-danger" type='button' onclick="deleteResume('${each.id}')">Delete</button></td>
//     <td><a href='edit_page.html?resumeId=${each.id}'><button class='btn btn-outline-warning'>Edit</button></a></td></tr>`
//     })
//     document.getElementById('list').innerHTML = renderHtml
// })
// }
// window.getResume = getResume


// ****************LIST DELETE FUNCTION*******************
// function deleteResume(resumeId){
//     deleteDoc(doc(db,"userResumeData",resumeId))
//     getResume()
// }
//     window.deleteResume = deleteResume
  

export function editView(){
    // alert(1)
    let params = new URLSearchParams(document.location.search);
    let index = params.get("resumeId");
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js';
    script.onload = () => {
      // Now you can use Axios after it's loaded
      axios.get(`https://anishkrishnan.pythonanywhere.com/getEditedResume/${index}`)
        .then(response => {
        let datas = JSON.parse(response.data.resumeData)
        document.getElementById('editName').value=datas.Title
        document.getElementById('editNames').value=datas.Name
        document.getElementById('editAge').value=datas.Age
        document.getElementById('editEmail').value=datas.Email
        document.getElementById('editContact').value=datas.Contact
        document.getElementById('editDeclaration').value=datas.Declaration
        document.getElementById('editFname').value=datas.personal_details.father_name
        document.getElementById('editMname').value=datas.personal_details.mother_name
        // to get skill
        let updateSkille = ''
            for(const each of datas.Skills){
                 updateSkille = updateSkille + `<input class="inputSkills col-sm-6 mb-3 col-lg-4" value=${each} />`
            }
            document.getElementById('skill').innerHTML = updateSkille
                                // to get language
        let updateLanguage = ''
        for(const eachLang of datas.Language){
            updateLanguage = updateLanguage + `<input class="inputLanguage col-sm-6 mb-3 col-lg-4" value=${eachLang} />`
        }
        document.getElementById('language').innerHTML = updateLanguage
        //           //  *******************TO GET HOBBIES************************
        let updateHobby = ' '
        for(const eachHobby of datas.Hobbies){
            updateHobby = updateHobby + `<input class="inputHobby col-sm-6 mb-3 col-lg-4" value=${eachHobby} />`

        }
        document.getElementById('hobby').innerHTML = updateHobby
        
            // to get education

            let educationOperation = datas.Education
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

            let experienceOperation = datas.Experience
            let updateExperience = ''
            for(const eachExperience in experienceOperation){
                updateExperience = updateExperience + `<tr>
                                <td><input value="${experienceOperation[eachExperience].company_name}" onkeyup=updateOperation(this,${eachExperience},'company_name','Experience') /> </td>
                                 <td><input value="${experienceOperation[eachExperience].role}" onkeyup=updateOperation(this,${eachExperience},'role','Experience') /></td>
                                 <td><input type='number' value="${experienceOperation[eachExperience].year}" onkeyup=updateOperation(this,${eachExperience},'year','Experience') /></td>
                                                    </tr>`
            }
            document.getElementById('editExperienceTable').innerHTML=updateExperience
            // *********TO get Project

            let projectOperation = datas.Project
            let updateProject = ''
            for(const eachProject in projectOperation){
                updateProject = updateProject + `<tr>
                                <td><input value="${projectOperation[eachProject].title}" onkeyup=updateOperation(this,${eachProject},'title','Project') /> </td>
                                 <td><input value="${projectOperation[eachProject].role}" onkeyup=updateOperation(this,${eachProject},'role','Project') /></td>
                                 <td><input type='number' value="${projectOperation[eachProject].year}" onkeyup=updateOperation(this,${eachProject},'year','Project') /></td>
                                            </tr>`
            }
            document.getElementById('editProjectTable').innerHTML=updateProject
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    };
    script.onerror = () => {
      console.error('Error loading Axios script');
    };
    document.head.appendChild(script);
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
        // let updatedEducation=[]
       
        

        for(const each of skill){
            updatedSkill.push(each.value)
        }
        for(const each of language){
            updatedLanguage.push(each.value)
        }
        for(const each of hobby){
            updatedHobby.push(each.value)
        }

        const formData = new FormData()
        let resumeData = {
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
            
        }
        formData.append('resumeData',JSON.stringify(resumeData))
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js';
        script.onload = () => {
          // Now you can use Axios after it's loaded
          axios.put(`https://anishkrishnan.pythonanywhere.com/updateResume/${index}`,formData)
            .then(response => {
                alert(response.data.message)
                location = `resume_list.html`
            })
            .catch(error => {
              console.error('There was an error!', error);
            });
        };
        script.onerror = () => {
          console.error('Error loading Axios script');
        };
        document.head.appendChild(script);
        
    
}
window.updateFunction = updateFunction


function outPutResume() {
    let params = new URLSearchParams(document.location.search);
    let index = params.get("resumeId");
    let localStorageUserId = localStorage.getItem('loginData')
    let parseData = JSON.parse(localStorageUserId)
    console.log('loc',parseData.userId)
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js';
    script.onload = () => {
        axios.get(`https://anishkrishnan.pythonanywhere.com/outputResume/${index}`)
            .then(response => {
                if(parseData.userId != response.data.userId){
                    window.location = '../index.html'
                }
                console.log(response.data.userId)
                const resumePage = JSON.parse(response.data.resumeData);
                console.log(resumePage.Name)
                // console.log('da',resumePage)
                // resumePage.forEach((doc) => {
                //     console.log('dd',doc);
                    if (parseData.userId == response.data.userId) {
                        document.getElementById('profile-name').innerHTML = resumePage.Name;
                        document.getElementById('profiles-name').innerHTML = resumePage.Name;
                        document.getElementById('re-contact').innerHTML = `Contact : ${resumePage.Contact}`;
                        document.getElementById('re-mail').innerHTML = `Email : ${resumePage.Email}`;
                        document.getElementById('re-title').innerHTML = resumePage.Title;
                        document.getElementById('dec').innerHTML = resumePage.Declaration;

                        let language = '';
                        for (const each of resumePage.Language) {
                            language += `<p>${each}</p>`;
                        }
                        document.getElementById('language').innerHTML = language;

                        let hobby = '';
                        for (const each of resumePage.Hobbies) {
                            hobby += `<p>${each}</p>`;
                        }
                        document.getElementById('hobbies').innerHTML = hobby;

                        let skill = '';
                        for (const each of resumePage.Skills) {
                            skill += `<p>${each}</p>`;
                        }
                        document.getElementById('skills').innerHTML = skill;

                        let empty_education = '';
                        for (const each of resumePage.Education) {
                            empty_education += `<li class="time-line-item">
                                                    <span class="badge badge-primary">${each.year_of_pass}</span>
                                                    <h6 class="time-line-item-title">${each.course}</h6>
                                                    <p class="time-line-item-subtitle">${each.ins_name}</p>
                                                    <p class="time-line-item-content">${each.percentage}</p>
                                                </li>`;
                        }
                        document.getElementById('re_education').innerHTML = empty_education;

                        let empty_experience = '';
                        for (const each of resumePage.Experience) {
                            empty_experience += `<li class="time-line-item">
                                                        <span class="badge badge-primary">${each.year}</span>
                                                        <h6 class="time-line-item-title">${each.role}</h6>
                                                        <p class="time-line-item-subtitle">${each.company_name}</p>
                                                    </li>`;
                        }
                        document.getElementById('re_experience').innerHTML = empty_experience;

                        let empty_project = '';
                        for (const each of resumePage.Project) {
                            empty_project += `<li class="time-line-item">
                                                        <span class="badge badge-primary">${each.year}</span>
                                                        <h6 class="time-line-item-title">${each.role}</h6>
                                                        <p class="time-line-item-subtitle">${each.title}</p>
                                                    </li>`;
                        }
                        document.getElementById('re_project').innerHTML = empty_project;
                    }
                // });
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    script.onerror = () => {
        console.error('Error loading Axios script');
    };

    document.head.appendChild(script);
}

window.outPutResume = outPutResume;

