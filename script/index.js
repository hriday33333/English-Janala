const createElements = (arr) => {
    const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
    return htmlElements.join(" ");
};




const loadLesson=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res=>res.json())
    .then(json => displayLesson(json.data));
};

const removeActive = () => {
    const lessonButton = document.querySelectorAll(".lesson-btn")
    // console.log(lessonButton)
    lessonButton.forEach(btn => btn.classList.remove("active"))
}

const loadLevelWord = (id) => {
    
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        removeActive()
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        // console.log(clickBtn)
        clickBtn.classList.add("active")
        displayWord(data.data)
    });
};

// {
//     "word": "Big",
//     "meaning": "বড়",
//     "pronunciation": "বিগ",
//     "level": 1,
//     "sentence": "He has a big house.",
//     "points": 1,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "large",
//         "huge",
//         "giant"
//     ],
//     "id": 72
// }


const loadWordDetail = async(id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
};

const displayWordDetails = (word) => {
    console.log(word)
    const detailsBox = document.getElementById("details-container")
    detailsBox.innerHTML = `
          <div class="">
                    <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>: ${word.pronunciation} )</h2>
                </div>
                <div>
                    <h2 class=" font-bold">Meaning</h2>
                    <p>${word.meaning} </p>
                </div>
                <div>
                    <h2 class=" font-bold">Example</h2>
                    <p>${word.sentence} </p>
                </div>
                <div class="">
                    <h2 class=" font-bold">synonyms</h2>
                    <div class="">${createElements(word.synonyms)}</div>
                </div>
                
    
    
    `
    document.getElementById("modals").showModal();
}


const displayWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML=""
    if(words.length == 0){
        wordContainer.innerHTML=`<div class=" text-center col-span-full rounded-xl py-10 space-y-6 bangla">
        <img class="mx-auto" src="./assets/alert-error.png " alt="">
            <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>

        </div>`
        return;
    }

// {
//     "id": 85,
//     "level": 1,
//     "word": "Hat",
//     "meaning": "টুপি",
//     "pronunciation": "হ্যাট"
// }


    words.forEach(word => {
        // console.log(word)
        const card = document.createElement("div")
        card.innerHTML=`
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word ? word.word:'শব্দ পাওয়া যায়নি 😪😫'} </h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="font-medium text-2xl bangla">"${word.meaning ? word.meaning :'অর্থ পাওয়া যায়নি 😪😫'} /${word.pronunciation ? word.pronunciation :'pronunciation পাওয়া যায়নি 😪😫' } "</div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id} )" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;
        wordContainer.append(card)
    })
}

const displayLesson = (lessons) => {
    console.log(lessons);

        // !  ****Ui তে দেকাতে আমাদের ৪ টা স্টেপ দরে দরে করতে হবে****

         // ! ১,, যেকানে আমরা রাকবো সেই কন্টেইনারকে দরা এবং খালি করে দিতে হয়
    const levelContainer = document.getElementById("level-container")
         //! Empty করে দিতে হয় 
    levelContainer.innerHTML="" 

         // ! ২,, আমরা সব গুলো লেসনে ডুকবো
    for( let lesson of lessons){
         // ! ৩  creat element একটা একটা করে এলিমেন্ট তৈরি করা
        //  console.log(lesson)
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML=`<button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book"></i>Lesson - ${lesson.level_no} </button>`

        


        // !  ৪  এপেন্ড করা  এইচটিএমএল কন্টেইনারে জাভাস্ক্রিপ্ট এর মাধ্যমে
        levelContainer.append(btnDiv);
    }

    
}
loadLesson();

