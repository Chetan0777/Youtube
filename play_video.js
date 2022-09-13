const play_video = (el) => {
    let video = JSON.parse(localStorage.getItem("show"));
    let id = video.id.videoId;
    let play = document.getElementById("playVideo");
    play.src = `https://www.youtube.com/embed/${id}`;
    let title = document.createElement("p");
    title.style.marginLeft="5%";
    title.style.marginTop="2%";
    title.style.fontSize="20px";
    title.style.fontWeight="none";
    title.innerText = video.snippet.title;
    document.getElementById("heading").append(title)
} 
const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=IN&key=AIzaSyAEu1A260aZeViZRqZeXIfjIaXMlySStUY`

const show_popular = async() => {
    let res = await fetch(url);
    let data = await res.json();
    append(data.items);
}
show_popular()

const search = async () => {
    let query=document.getElementById("search").value
    const url2 = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=${query}&key=AIzaSyAVMQmBfoZ0QDULYztGSSirJ6YU6VkK12s`;
    let res = await fetch(url2);
    let data = await res.json();
    append(data.items);
}
search()
let append = async(data) => {
    let content = document.getElementById("right_div");
    content.innerHTML = null;
    data.forEach((el) => {
        let img = document.createElement("img");
        img.src = el.snippet.thumbnails.medium.url;
        let p = document.createElement("p");
        p.innerText = el.snippet.title;
        let p1 = document.createElement("p");
        p1.innerText = el.snippet.channelTitle;
        let div = document.createElement("div");
        div.onclick = () => {
            show_page(el);
        }
        div.setAttribute("class","card");
        div.append(img,p);
        content.append(div);
        document.getElementById("right_div").append(p1)
    });
}
let show_page = (data) => {
    localStorage.setItem("show",JSON.stringify(data))
    window.location.href = "play_video.html";
}