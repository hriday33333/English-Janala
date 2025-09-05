const loadLesson=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res=>res.json())
    .then(json => displayLesson(json.data));
};

const loadLevelWord = (id) => {
    
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then((res) => res.json())
    .then((data) => displayWord(data.data));
};

const displayWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML=""

// {
//     "id": 85,
//     "level": 1,
//     "word": "Hat",
//     "meaning": "টুপি",
//     "pronunciation": "হ্যাট"
// }


    words.forEach(word => {
        console.log(word)
        const card = document.createElement("div")
        card.innerHTML=`
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word} </h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="font-medium text-2xl bangla">"${word.meaning} /${word.pronunciation} "</div>
            <div class="flex justify-between items-center">
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
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
         console.log(lesson)
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML=`<button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book"></i>Lesson - ${lesson.level_no} </button>`

        


        // !  ৪  এপেন্ড করা  এইচটিএমএল কন্টেইনারে জাভাস্ক্রিপ্ট এর মাধ্যমে
        levelContainer.append(btnDiv);
    }

    
}
loadLesson();