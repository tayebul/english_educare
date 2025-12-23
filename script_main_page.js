
document.getElementById("logout_btn").addEventListener("click" , (e) => {
    e.preventDefault();
    window.location.href = "index.html";
})
document.getElementById("logout_btn_responsive").addEventListener("click" , (e) => {
    e.preventDefault();
    window.location.href = "index.html";
})

const element_create = (arr) => {
    const synonyms_box = arr.map( x => `<button class="btn btn-soft">${x}</button>`)
    return(synonyms_box.join(" "));
}

const spinner = (status) => {
    if(status == true){
        document.getElementById("spin").classList.remove("hidden")
        document.getElementById("word_container").classList.add("hidden")
    }

    else {
        document.getElementById("spin").classList.add("hidden")
        document.getElementById("word_container").classList.remove("hidden")
    }
}


// voice

function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-EN"; // English
    window.speechSynthesis.speak(utterance);
  }













const load_lessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(level_res => level_res.json()).then(level_data => display_lessons(level_data.data) )
}

const remActive = () => {
    const remover = document.querySelectorAll(".lesson_main_btn")
    remover.forEach((x) => x.classList.remove("active"))
}
const load_word = (id) => { 
    spinner(true)
    setTimeout(() => {
        const fetched_url = `https://openapi.programming-hero.com/api/level/${id}` 
    fetch(fetched_url).then(response => response.json()).then(data => {
        remActive();
      const level_box_btn = document.getElementById(`lesson_btn_${id}`)
        level_box_btn.classList.add("active");   
        display_level_word(data.data)})
    }, 1000); 
}

const load_word_details = async(id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    fetch(url).then(res => res.json()).then(details => display_details_word(details.data))

}

const display_details_word = (word) => {
    console.log(word)
    const details_box  = document.getElementById("details_container")
    details_box.innerHTML = `
    <div>
        <div class="space-y-2">
        <h2 class="font-extrabold text-[20px]"> ${word.word} ( <i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation}  ) </h2>
        <p class="font-bold">Meaning</p>
        <p>${word.meaning}</p>
        <p class="font-bold">Example</p>
        <p>${word.sentence}</p>
        </div>
         <div class="mt-4">
          <h3 class="text-[20px] font-semibold mb-2">Synonyms</h3>
          <div class=""> ${element_create(word.synonyms)} </div>
        </div>
      </div> `;
    document.getElementById("my_modal_5").showModal();
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
        <button onclick="pronounceWord('${w.word}')" class="btn_card border-0  bg-blue-100 p-2 rounded-lg hover:cursor-pointer"> <i class="fa-solid fa-circle-play "></i></button>
        <button onclick="load_word_details(${w.id})" class="btn_card border-0  bg-blue-100 p-2 rounded-lg hover:cursor-pointer"> <i class="fa-solid fa-circle-info "></i></button>
    </div>
    
        `;
        wordContainer.append(word_card);
    }

    spinner(false)

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

document.getElementById("btn_search").addEventListener("click", () => {
    
    remActive()
    const input = document.getElementById("input_search");
    const search_data = input.value.trim().toLowerCase(); // no space (trim()) + all lower case
    fetch(`https://openapi.programming-hero.com/api/words/all`).then(res => res.json()).then(data => {
        const all_words = data.data
        const filter_words = all_words.filter(word => word.word.toLowerCase().includes(search_data)) ;
        display_level_word(filter_words)
    })

    if(search_data == null) {
        
    }
    
})