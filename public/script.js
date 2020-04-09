document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4){
        if (xhr.status === 200){
          var data = JSON.parse(xhr.responseText);
          for (var blogPost in data) {
            var postDiv         = document.createElement('div');
            var postText        = document.createElement('p');
            var thumbnail       = document.createElement('img');
            var postContainer   = document.getElementsByClassName('post-container')[0];
            var postTime = document.createElement("span");

            thumbnail.src = "./img/logo2.png";
            thumbnail.className = "thumbnail";
            postText.innerHTML = data[blogPost];
            postDiv.className = "post";

            let date = new Date(parseInt(blogPost));
            postTime.textContent  = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;

            postDiv.appendChild(thumbnail);
            postDiv.appendChild(postText);
            postDiv.appendChild(postTime);
            postContainer.appendChild(postDiv);
          }
        }
        else {
          console.error(xhr.responseText);
        }
      }
    }
    xhr.open('GET', '/posts', true);
    xhr.send();
  }
}
