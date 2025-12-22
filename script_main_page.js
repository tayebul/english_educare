document.getElementById("logout_btn").addEventListener("click" , (e) => {
    e.preventDefault();
    window.location.href = "index.html";
})
document.getElementById("logout_btn_responsive").addEventListener("click" , (e) => {
    e.preventDefault();
    window.location.href = "index.html";
})



const load_lessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(level_res => level_res.json()).then(level_data => display_lessons(level_data.data) )
}

const display_lessons = (lesson) => {
    const levelContainer = document.getElementById("level_container");
    levelContainer.innerHTML = " "
   
    for(let les of lesson) {
        console.log(les)
        const level_box = document.createElement("div");
        level_box.innerHTML = ` <button class="btn btn-outline btn-primary"><i class="fa-solid fa-person-chalkboard"></i> Lesson - ${les.level_no} </button> ` ;

        levelContainer.append(level_box);
    }
}
load_lessons()