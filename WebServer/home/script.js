function get_csrf_token(){
  fetch('/api/csrf-token/')
  .then(response => response.json())
  .then(data => {
      document.getElementById('csrfToken').value = data.csrfToken;
  })
  .catch(error => console.error('Error fetching CSRF token:', error));
}

function leaderboard() {
  fetch('/api/leaderboard/')
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          console.log(data);
          var mydiv = document.getElementById("leadrboard");
          for (let i = 0; i < data.length; i++) {
              img = document.createElement('img');
              username = document.createElement('p');
              br = document.createElement('br');
              username.textContent = i + 1 +"-" +data[i].username + " - " + data[i].score + " points";
              mydiv.appendChild(username);
              img.src = data[i].photo_profile;
              img.style.width = "80px";
              img.style.height = "80px";
              mydiv.appendChild(img);
              mydiv.appendChild(br);
          }
      })
      .catch(error => console.error('Error fetching leaderboard:', error));
}

function getSessionData() {
  fetch('/api/data/')
      .then(response => {
          if (!response.ok) {
              window.location.href = "/";
          }
          return response.json();
      })
      .then(data => {
          const userData = JSON.parse(JSON.stringify(data));
          console.log(userData);
          document.getElementById('login').textContent =  userData.username;
          document.getElementById('nameprofile').textContent =  userData.username;
          // document.getElementById('pro').src = userData.photo_profile;
          // document.getElementById('editimage').src = userData.photo_profile;
          document.getElementById('profileid').src = userData.photo_profile;
          document.getElementById('content_scor').textContent = userData.score;
          document.getElementById('winid').textContent = "WIN : " + userData.win;
          document.getElementById('loseid').textContent = "LOSE : " + userData.lose;
          document.getElementById('totalid').textContent = "Total : " + userData.total_match;
          document.getElementById('content_rank').textContent = userData.ranking;
          var profiles = document.getElementById('imageprofile');
          var img = document.createElement('img');
          img.style.borderRadius = "50%";
          img.style.border = "2px solid black";
          img.src = userData.photo_profile;
          profiles.appendChild(img);
          if (userData.ranking <= 3) {
            var reward = document.getElementById('achievements');
            var img = document.createElement('img');
            if (userData.ranking == 1)
              img.src = "https://graphicriver.img.customer.envatousercontent.com/files/263514869/Medal%201st-preview1.jpg?auto=compress%2Cformat&q=80&fit=crop&crop=top&max-h=8000&max-w=590&s=959bf475c323d52351f0ee81736c950f"
            else if (userData.ranking == 2)
              img.src = "https://media.istockphoto.com/id/1160210754/vector/silver-medal-badge-for-second-place-round-metal-runner-up-award-symbol-with-red-ribbon.jpg?s=612x612&w=is&k=20&c=tPnzd_LvUtobXjuxQIGa6sLv815MrmEJtd_1mOltP9I="
            else if (userData.ranking == 3)
              img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlZJGYUbr0b3ysGAbECsRnPXAES-LBkV1Y7x0PKoXARFfV-EzilGPyY_SRSpzFmo66Zcc&usqp=CAU";
            img.style.width = "100px";
            img.style.height = "100px";
            reward.appendChild(img);
          }  
      })
      .catch(error => {
          console.error('Error:', error);
      });
}
    
document.addEventListener("DOMContentLoaded", function () {
    getSessionData();
    leaderboard();
    // get_csrf_token();
    const links = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".content-section");
    
  
    links.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("data-target");
        console.log(targetId);
  
        sections.forEach((section) => {
          if (section.id === targetId) {
            section.style.display = "flex";
          } else {
            section.style.display = "none";
          }
        });
      });
    });
    // Initial state
    document.getElementById("home").style.display = "flex";
    document.getElementById("profile").style.display = "none";
    document.getElementById("chat").style.display = "none";
    document.getElementById("notifi").style.display = "none";
    // document.getElementById("setting").style.display = "none";
  });
  
  
  
  let currentFriend = null;
  
  function openChat(friendName) {
      currentFriend = friendName;
      document.getElementById('chat-friend-name').textContent = `Chat with ${friendName}`;
      document.getElementById('chat-messages').innerHTML = ''; // Clear previous messages
  }
  
  function sendMessage() {
      const messageInput = document.getElementById('message-input');
      const message = messageInput.value.trim();
      
      if (message && currentFriend) {
          const chatMessages = document.getElementById('chat-messages');
          
          const messageElement = document.createElement('div');
          messageElement.className = 'chat-message sent';
          messageElement.innerHTML = `<p class=\"message\">${message}</p>`;
          
          chatMessages.appendChild(messageElement);
          messageInput.value = '';
          
          // Simulate receiving a reply
          setTimeout(() => {
              const replyElement = document.createElement('div');
              replyElement.className = 'chat-message received';
              replyElement.innerHTML = `<p>Reply from ${currentFriend}</p>`;
              chatMessages.appendChild(replyElement);
              chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
          }, 1000);
      }
  }

    function showLogoutModal() {
    const modal = document.getElementById('logout-modal');
    modal.style.display = 'flex';
  }
  
  function closeLogoutModal() {
    const modal = document.getElementById('logout-modal');
    modal.style.display = 'none';
  }
  
  function logout() {
    // Clear any stored session or user data
    localStorage.clear();
    sessionStorage.clear();
    
    // Redirect to the login page (assuming login.html is your login page)
    window.location.href = '/logout/';
  }

  function showSettingsModal() {
    const modal = document.getElementById('settings-modal');
    modal.style.display = 'flex';
  }
  
  function closeSettingsModal() {
    const modal = document.getElementById('settings-modal');
    modal.style.display = 'none';
  }
  
  
  function showNotificationsModal() {
    const modal = document.getElementById('notifi');
    modal.style.display = 'flex';
  }
  function closeNotificationsModal() {
    const modal = document.getElementById('notifi');
    modal.style.display = 'none';
  }



  // function previewImage(event) {
  //   const reader = new FileReader();
  //   reader.onload = function() {
  //       const output = document.getElementById('profileImagePreview');
  //       output.src = reader.result;
  //   };
  //   reader.readAsDataURL(event.target.files[0]);
  // }
  
  // function saveSettings() {
  //   const username = document.getElementById('username').value;
  //   // Simulate saving data to a server
  //   console.log('Saving settings...');
  //   console.log('New username:', username);
  
  //   // Show a confirmation message or perform further actions as needed
  //   alert('Settings saved successfully!');
  // }