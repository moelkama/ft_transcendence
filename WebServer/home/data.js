document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/data/')
        .then(response => {
            if (!response.ok) {
                window.location.href = "/";
            }
            return response.json();
        })
        .then(data => {
            const userData = JSON.parse(JSON.stringify(data));
            document.getElementById('login').textContent =  userData.username;
            document.getElementById('content_scor').textContent =  userData.score;
            document.getElementById('content_scor').style.color = "cyan";
            document.getElementById('content_scor').style.fontWeight = "bold";
            document.getElementById('content_scor').style.fontSize = "20px";
            document.getElementById('content_scor').style.marginLeft = "10px";
            document.getElementById('nameprofile').textContent =  userData.username;
            document.getElementById('content_rank').textContent = userData.ranking;
  
            var settingsform = document.getElementById('settings-form');
            var img3 = document.createElement('img');
            img3.src = userData.photo_profile;
            img3.style.borderRadius = "50%";
            img3.style.border = "2px solid black";
            settingsform.prepend(img3);
            /*  */
            var imgpro= document.getElementById('profileid');
            var img2 = document.createElement('img');
            img2.style.borderRadius = "50%";
            img2.style.border = "2px solid cyan";
            img2.src = userData.photo_profile;
            imgpro.appendChild(img2);
            // profileid.appendChild(img);
            var profiles = document.getElementById('imageprofile');
            var img = document.createElement('img');
            img.style.borderRadius = "50%";
            img.style.border = "2px solid black";
            img.src = userData.photo_profile;
            profiles.appendChild(img);
            // profileid.appendChild(img);
            if (userData.ranking <= 4) {
                var reward = document.getElementById('achievements');
                var img = document.createElement('img');
                if (userData.ranking == 1)
                    img.src = "https://static.vecteezy.com/system/resources/previews/017/770/036/non_2x/award-golden-medals-3d-realistic-illustration-first-place-medals-vector.jpg"
                else if (userData.ranking == 2)
                    img.src = "https://static.vecteezy.com/system/resources/previews/022/090/574/non_2x/ward-golden-medals-3d-realistic-illustration-second-place-medals-with-laurel-leaves-vector.jpg"
                else if (userData.ranking == 3)
                    img.src = "https://media.istockphoto.com/id/849128726/vector/third-place-winner-of-bronze-medal.webp?b=1&s=612x612&w=0&k=20&c=UdG7qz10A0728P8zANEa4q6fnT4obK7Lu9if_5oijEc=";
                else if (userData.ranking == 4)
                    img.src = "https://www.shutterstock.com/image-vector/4-years-anniversary-logo-ribbon-260nw-2168606291.jpg"
                img.style.width = "150px";
                img.style.height = "150px";
                img.style.borderRadius = "50%";
                img.style.border = "2px solid crimson";
                space = document.createElement('div');
                space.style.width = "20px";

                container = document.createElement('div');
                container.style.display = 'flex';
                container.style.alignItems = 'center';
                container.style.marginLeft = "10px";
                container.style.marginTop = "50px";
                container.appendChild(space);
                container.appendChild(img);
                reward.appendChild(container);
            }  
        })
        .catch(error => {
            console.error('Error:', error);
        });
});