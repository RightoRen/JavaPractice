console.log("Java Enabled"); 

const search = document.querySelector(".search-box input"),
    images = document.querySelectorAll(".image-box");
const studentList = document.getElementById("studentList")
    const students = [
        {name: "Student 1", portfolioLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", linkName: "View Portfolio"},
        {name: "Student 2", portfolioLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", linkName: "View Portfolio"},
    ];    

    students.forEach(student => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = student.portfolioLink;
        link.textContent = student.linkName;
        student.textContent = student.name;
        listItem.textContent = student.name
        listItem.appendChild(link);
        studentList.appendChild(listItem);
    }); 

search.addEventListener("keyup", e => {
    if(e.key == "Enter"){
        let searchValue = search.value,
        value = searchValue.toLowerCase();
        images.forEach(image => {
            if(value === image.dataset.name){
                return image.style.display = "block";
            }
            image.style.display = "none";
        });
        console.log(value)
    }
});

search.addEventListener("keyup", () => {
    if(search.value != "") return;

    images.forEach(image => {
        image.style.display = "block"; 
    });
});