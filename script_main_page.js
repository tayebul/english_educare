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

const remActive = () => {
    const remover = document.querySelectorAll(".lesson_main_btn")
    remover.forEach((x) => x.classList.remove("active"))
}
const load_word = (id) => { 
    const fetched_url = `https://openapi.programming-hero.com/api/level/${id}` 
    fetch(fetched_url).then(response => response.json()).then(data => {
        remActive();
      const level_box_btn = document.getElementById(`lesson_btn_${id}`)
        level_box_btn.classList.add("active");   
        display_level_word(data.data)})
}

const display_level_word = (words) => {
    const wordContainer = document.getElementById("word_container")
    wordContainer.innerHTML = " "
    if (words.length == 0){
        wordContainer.innerHTML = `
        
        <div class="text-center col-span-full space-y-4 my-8  ">
    <img class="mx-auto" src="./images/alert-error.png" >
    <p class="text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
    <h2 class="text-[30px] text-gray-600 font-semibold">নেক্সট Lesson এ যান</h2>
</div> `
    }



    for(let w of words) {
        const word_card = document.createElement("div")
        word_card.innerHTML = `
       <div class="border-2 border-gray-100 shadow-md rounded-4xl text-center p-10 flex flex-col gap-2 bg-white">    
    <h1 class="font-bold text-[25px]">${w.word ? w.word:"[দুঃখিত! শব্দটি পাওয়া যায়নি।]"}</h1>
    <p class="text-gray-400 bangla_font">Pronounciation : ${w.pronunciation} </p>
    <h1 class="font-semibold text-[30px] text-gray-700 bangla_font"> ${w.meaning ? w.meaning:"[ দুঃখিত! অর্থটি পাওয়া যায়নি। ]"} </h1>
    <div class="flex justify-between items-center my-3">
        <button class="btn_card border-0  bg-blue-100 p-2 rounded-lg hover:cursor-pointer"> <i class="fa-solid fa-circle-play "></i></button>
        <button onclick="my_modal_5.showModal()" class="btn_card border-0  bg-blue-100 p-2 rounded-lg hover:cursor-pointer"> <i class="fa-solid fa-circle-info "></i></button>
    </div>
    
        `;
        wordContainer.append(word_card)
    }

}

const display_lessons = (lesson) => {
    const levelContainer = document.getElementById("level_container");
    levelContainer.innerHTML = " "
   
    for(let les of lesson) {
        const level_box = document.createElement("div");
        level_box.innerHTML = ` <button id="lesson_btn_${les.level_no}" onclick="load_word(${les.level_no})" class="btn btn-outline btn-primary lesson_main_btn"><i class="fa-solid fa-person-chalkboard"></i> Lesson - ${les.level_no} </button> ` ;

        levelContainer.append(level_box);
    }
}
load_lessons()