let params = new URLSearchParams(document.location.search);
let index = params.get("index");

let edit_data = localStorage.getItem('resume_list')
let parse_edit_data = JSON.parse(edit_data)

let parseIndexData = parse_edit_data[index]


function nav(){
    let edit_data = localStorage.getItem('resume_list')
    let parse_edit_data = JSON.parse(edit_data)

    let empty_nav= ''

    for(const each in parse_edit_data){
        empty_nav = empty_nav + `<a href="#" class="nav-link active">HOME</a>
        <a href="#" class="nav-link">RESUME</a>
        <a href="#" class="nav-link">PORTFOLIO</a>
        <a href="#" class="nav-link">BLOG</a>
        <a href="#" class="nav-link">CONTACT</a>` 
    }
    document.getElementById('collapsible-nav').innerHTML=empty_nav
    
            
}

function nav1(){
    let edit_data = localStorage.getItem('resume_list')
    let parse_edit_data = JSON.parse(edit_data)

    let empty_nav= ''

    for(const each in parse_edit_data){
        empty_nav = empty_nav + `<a href="#" class="nav-link active">HOME</a>
        <a href="#" class="nav-link">RESUME</a>
        <a href="#" class="nav-link">PORTFOLIO</a>
        <a href="#" class="nav-link">BLOG</a>
        <a href="#" class="nav-link">CONTACT</a>` 
    }
    document.getElementById('collapsible-navs').innerHTML=empty_nav
    
            
}



function indexpage(){
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

}
function resumePage(){

        let params = new URLSearchParams(document.location.search);
    let index = params.get("index");

    let edit_data = localStorage.getItem('resume_list')
    let parse_edit_data = JSON.parse(edit_data)

    // let parseIndexData = parse_edit_data[index]


        document.getElementById('resume-name').innerHTML = parseIndexData.Name
        document.getElementById('resume-title').innerHTML=parseIndexData.Title
        document.getElementById('resume-contact').innerHTML = `Contact : ${parseIndexData.Contact}`
        document.getElementById('resume-mail').innerHTML = `Email : ${parseIndexData.Email}`


        let language = ''
    for(const each of parseIndexData.Language){
        language = language+`<p>${each}</p>`
    }
    document.getElementById('resume-language').innerHTML=language

    let hobby= ''
    for(const each of parseIndexData.Hobbies){
        hobby = hobby + `<p>${each}</p>`
    }
    document.getElementById('resume-hobbies').innerHTML = hobby

    let skill = ''
    for(const each of parseIndexData.Skills){
        skill = skill + `<p>${each}</p>`
    }
    document.getElementById('resume-skills').innerHTML = skill

    let empty_education = ''
    for(const each of parseIndexData.Education){
        empty_education = empty_education + `<li class="time-line-item">
                                                <span class="badge badge-primary">${each.year_of_pass}</span>
                                                <h6 class="time-line-item-title">${each.course}</h6>
                                                <p class="time-line-item-subtitle">${each.ins_name}</p>
                                                <p class="time-line-item-content">${each.percentage}</p>
                                            </li>`

    }
    document.getElementById('resume-education').innerHTML = empty_education

    let empty_experience = ''
    for(const each of parseIndexData.Experience){
        empty_experience = empty_experience + `<li class="time-line-item">
                                                    <span class="badge badge-primary">${each.year}</span>
                                                    <h6 class="time-line-item-title">${each.role}</h6>
                                                    <p class="time-line-item-subtitle">${each.company_name}</p>
                                                </li>`
    }

    document.getElementById('resume-experience').innerHTML = empty_experience


    let empty_project = ''
    for(const each of parseIndexData.Project){
        empty_project = empty_project + `<li class="time-line-item">
                                                    <span class="badge badge-primary">${each.year}</span>
                                                    <h6 class="time-line-item-title">${each.role}</h6>
                                                    <p class="time-line-item-subtitle">${each.title}</p>
                                                </li>`
    }
    document.getElementById('resume-project').innerHTML = empty_project

}

/*function portfolioPage(){
 
        
    let params = new URLSearchParams(document.location.search);
    let index = params.get("index");

    let edit_data = localStorage.getItem('resume_list')
    let parse_edit_data = JSON.parse(edit_data)

    let parseIndexData = parse_edit_data[index]


        document.getElementById('portfolio-name').innerHTML = parseIndexData.Name
        document.getElementById('portfolio-title').innerHTML=parseIndexData.Title
        document.getElementById('portfolio-contact').innerHTML = `Contact : ${parseIndexData.Contact}`
        document.getElementById('portfolio-mail').innerHTML = `Email : ${parseIndexData.Email}`


        let language = ''
    for(const each of parseIndexData.Language){
        language = language+`<p>${each}</p>`
    }
    document.getElementById('portfolio-language').innerHTML=language

    let hobby= ''
    for(const each of parseIndexData.Hobbies){
        hobby = hobby + `<p>${each}</p>`
    }
    document.getElementById('portfolio-hobbies').innerHTML = hobby

    let skill = ''
    for(const each of parseIndexData.Skills){
        skill = skill + `<p>${each}</p>`
    }
    document.getElementById('portfolio-skills').innerHTML = skill

}


function blogPage(){
    let params = new URLSearchParams(document.location.search);
    let index = params.get("index");

    let edit_data = localStorage.getItem('resume_list')
    let parse_edit_data = JSON.parse(edit_data)

    let parseIndexData = parse_edit_data[index]


    document.getElementById('blog-name').innerHTML = parseIndexData.Name
    document.getElementById('blog-title').innerHTML=parseIndexData.Title
    document.getElementById('blog-contact').innerHTML = `Contact : ${parseIndexData.Contact}`
    document.getElementById('blog-mail').innerHTML = `Email : ${parseIndexData.Email}`


    let language = ''
    for(const each of parseIndexData.Language){
        language = language+`<p>${each}</p>`
    }
    document.getElementById('blog-language').innerHTML=language

    let hobby= ''
    for(const each of parseIndexData.Hobbies){
        hobby = hobby + `<p>${each}</p>`
    }
    document.getElementById('blog-hobbies').innerHTML = hobby

    let skill = ''
    for(const each of parseIndexData.Skills){
        skill = skill + `<p>${each}</p>`
    }
    document.getElementById('blog-skills').innerHTML = skill 
}
function contactPage(){
    let params = new URLSearchParams(document.location.search);
    let index = params.get("index");

    let edit_data = localStorage.getItem('resume_list')
    let parse_edit_data = JSON.parse(edit_data)

    let parseIndexData = parse_edit_data[index]


    document.getElementById('contact-name').innerHTML = parseIndexData.Name
    document.getElementById('contact-title').innerHTML=parseIndexData.Title
    document.getElementById('contact-contact').innerHTML = `Contact : ${parseIndexData.Contact}`
    document.getElementById('contact-mail').innerHTML = `Email : ${parseIndexData.Email}`


    let language = ''
    for(const each of parseIndexData.Language){
        language = language+`<p>${each}</p>`
    }
    document.getElementById('contact-language').innerHTML=language

    let hobby= ''
    for(const each of parseIndexData.Hobbies){
        hobby = hobby + `<p>${each}</p>`
    }
    document.getElementById('contact-hobbies').innerHTML = hobby

    let skill = ''
    for(const each of parseIndexData.Skills){
        skill = skill + `<p>${each}</p>`
    }
    document.getElementById('contact-skills').innerHTML = skill

}*/

