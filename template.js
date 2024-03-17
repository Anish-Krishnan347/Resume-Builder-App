let params = new URLSearchParams(document.location.search);
let index = params.get("index");

let edit_data = localStorage.getItem('resume_list')
let parse_edit_data = JSON.parse(edit_data)

let parseIndexData = parse_edit_data[index]


function template(num){
    if(num == 1){
        location=`template_1/index.html?index=${index}`
    }
}
document.getElementById('profile-name').innerHTML = parseIndexData.Name
document.getElementById('profiles-name').innerHTML = parseIndexData.Name
document.getElementById('re-contact').innerHTML = `Contact : ${parseIndexData.Contact}`
document.getElementById('re-mail').innerHTML = `Email : ${parseIndexData.Email}`
document.getElementById('re-title').innerHTML=parseIndexData.Title
document.getElementById('dec').innerHTML = parseIndexData.Declaration


let language = ''
for(const each of parseIndexData.Language){
    language = language+`<p>${each}</p>`
}
document.getElementById('language').innerHTML=language

let hobby= ''
for(const each of parseIndexData.Hobbies){
    hobby = hobby + `<p>${each}</p>`
}
document.getElementById('hobbies').innerHTML = hobby

let skill = ''
for(const each of parseIndexData.Skills){
    skill = skill + `<p>${each}</p>`
}
document.getElementById('skills').innerHTML = skill

let empty_education = ''
for(const each of parseIndexData.Education){
    empty_education = empty_education + `<li class="time-line-item">
                                            <span class="badge badge-primary">${each.year_of_pass}</span>
                                            <h6 class="time-line-item-title">${each.course}</h6>
                                            <p class="time-line-item-subtitle">${each.ins_name}</p>
                                            <p class="time-line-item-content">${each.percentage}</p>
                                        </li>`

}
document.getElementById('re_education').innerHTML = empty_education

let empty_experience = ''
for(const each of parseIndexData.Experience){
    empty_experience = empty_experience + `<li class="time-line-item">
                                                <span class="badge badge-primary">${each.year}</span>
                                                <h6 class="time-line-item-title">${each.role}</h6>
                                                <p class="time-line-item-subtitle">${each.company_name}</p>
                                            </li>`
}

document.getElementById('re_experience').innerHTML = empty_experience

let empty_project = ''
for(const each of parseIndexData.Project){
    empty_project = empty_project + `<li class="time-line-item">
                                                <span class="badge badge-primary">${each.year}</span>
                                                <h6 class="time-line-item-title">${each.role}</h6>
                                                <p class="time-line-item-subtitle">${each.title}</p>
                                            </li>`
}

document.getElementById('re_project').innerHTML = empty_project