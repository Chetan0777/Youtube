const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=IN&key=AIzaSyBaFlrZM3WsKZZR5t1v02DIDLX0foMeaeM`
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
    let content = document.getElementById("content");
    content.innerHTML = null;
    data.forEach((el) => {
        let img = document.createElement("img");
        img.src = el.snippet.thumbnails.medium.url;
        let h4 = document.createElement("h4");
        h4.innerText = el.snippet.title;
        let div = document.createElement("div");
        div.onclick = () => {
            show_page(el);
        }
        div.setAttribute("class","card");
        div.append(img,h4);
        content.append(div);
    });
}
let sort=()=>{
    let data=q
        data=data.sort(function(a,b){
          if(a.snippet.title>b.snippet.title) return 1;
          if(a.snippet.title<b.snippet.title) return -1;
          return 0
        });
    append(data)
}

let show_page = (data) => {
    localStorage.setItem("show",JSON.stringify(data))
    window.location.href = "play_video.html";
}