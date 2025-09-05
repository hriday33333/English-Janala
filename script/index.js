const loadLesson=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res=>res.json())
    .then(json => displayLesson(json.data));
};

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
        btnDiv.innerHTML=`<button href="" class="btn btn-outline btn-primary"><i class="fa-solid fa-book"></i>Lesson - ${lesson.level_no} </button>`

        


        // !  ৪  এপেন্ড করা  এইচটিএমএল কন্টেইনারে জাভাস্ক্রিপ্ট এর মাধ্যমে
        levelContainer.append(btnDiv);
    }

    
}
loadLesson();