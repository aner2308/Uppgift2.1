"use strict";


let url = "http://127.0.0.1:3000/api/workexperience";
getData();
deleteWorkexperience(10);
createWorkexperience("RTMD", "Brandman", "Västerås", "2017-06-01", "2023-10-01", "Brandman och räddningsdykare")

async function getData() {
    const response = await fetch(url);

    const data = await response.json();

    console.log(data);
}

async function createWorkexperience(companyname, jobtitle, location, startdate, enddate, description) {
    let workexperience = {
        companyname: companyname, 
        jobtitle: jobtitle, 
        location: location, 
        startdate: startdate, 
        enddate: enddate, 
        description: description
        }
    
    const response = await fetch(url, {

        method: "POST",
        headers: {
            "content-type": "Application/json"
        },
        body: JSON.stringify(workexperience)
    })

    const data = await response.json();
    console.log(data);
}

async function deleteWorkexperience(id) {
    const deleteUrl = `${url}/${id}`

    fetch(deleteUrl, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Fel vid radering av jobberfarenhet med id ${id}.`);
        }
        console.log(`Jobberfarenhet med id ${id} har raderats`);
    })
    .catch(error => {
        console.error("Fel vid radering:" + error)
    })
}