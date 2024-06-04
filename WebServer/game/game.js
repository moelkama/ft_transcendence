document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("logoutButton").addEventListener('click',exit)
    document.getElementById("pro").addEventListener('click', show)
    function exit(){
        window.location.href = "https://127.0.0.1/home/"
    }
    function show(){
        window.location.href = "https://127.0.0.1/profile/"
    }

    getSessionData();
    fetch('/api/get_session/')
        .then(response => {
            if (!response.ok) {
                window.location.href = "/login/";
            }
            return response.json();
        })
        .then(data => {
            const id = data.user_id;
            const token = data.token;
            console.log(id);
            console.log(token);
            const url = `wss://${window.location.host}/wss/game/?id=${id}&token=${token}`;
            // const url = `ws://${window.location.host}/ws/game/?id={{user.token_access}}`;
            const chatsocket = new WebSocket(url);
            chatsocket.onopen = function(event) {
                console.log("WebSocket connection established.");
            };

            elem = document.getElementById("canvas-id")
            ctx = elem.getContext("2d");
            width = elem.width
            height = elem.height
            function draw_ball(b)
            {
                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
                ctx.stroke();
                ctx.fillStyle = "yellow";
                ctx.fill();
            }

            function put_center()
            {
                ctx.beginPath();
                ctx.moveTo(width / 2, 0);
                ctx.lineTo(width / 2, height);
                ctx.stroke();
            }
    
            function put_score(score, x, y)
            {
                ctx.font = "60px Arial";
                ctx.fillText(score, x,y);
            }

            function draw_racket(racket)
            {
                ctx.fillStyle = "red";
                ctx.fillRect(racket.x, racket.y, racket.w, racket.h);
            }

            function draw(data)
            {
                ctx.clearRect(0, 0, width, height);
                put_center();
                for (let i = 0; i < data.players.length; i++)
                    draw_racket(data.players[i].racket);
                draw_ball(data.ping);
                put_score(data.team1_score, width / 2 + (40), 20 / 100 * height);
                put_score(data.team2_score, width / 2 - (60 + 10), 20 / 100 * height);
                // requestAnimationFrame(draw);
            }

            function    create_canvas(data)
            {
                for (let i = 0; i < data.players.length; i++)
                {
                    console.log(data.players[i].user.login);
                    document.getElementById("canvas-display_name-id-" + i.toString()).innerHTML = data.players[i].user.login;
                    document.getElementById("canvas-icon-id-" + i.toString()).src = data.players[i].user.icon;
                }
                document.getElementById("ping-pong").style.display = "block";
                document.getElementById("loader").style.display = "none";
                // document.getElementById("game-serface").appendChild(elem);
            }

            var first_time = false;
            chatsocket.onmessage = function (e)
            {
                var data = JSON.parse(e.data)
                console.log(data);
                if (data.type == 'game.state')
                {
                    if (!first_time)
                    {
                        first_time = true;
                        create_canvas(data);
                    }
                    draw(data);
                }
                else if (data.type == 'game.end')
                {
                    console.log("game  end");
                }
            }
    
            document.addEventListener("keydown", (event) => {
                // if (event.key == "w")
                //     chatsocket.send(JSON.stringify('w'));
                // else if (event.key == "s")
                //     chatsocket.send(JSON.stringify('s'));
                if (event.key == "ArrowUp")
                    chatsocket.send(JSON.stringify('Up'));
                else if (event.key == "ArrowDown")
                    chatsocket.send(JSON.stringify('Down'));
            });
            document.addEventListener("keyup", (event) => {
                if (event.key == "ArrowUp" || event.key == "ArrowDown")
                    chatsocket.send(JSON.stringify('Stop'));
                // else if (event.key == "s" || event.key == "w")
                //     chatsocket.send(JSON.stringify('Stop2'));
            });
        //     const url = `wss://${window.location.host}/wss/game/?id=${id}&token=${token}`;
            
        //     chatsocket = new WebSocket(url);
        //     chatsocket.onopen = function(event) {
        //         console.log("WebSocket connection established....");
        //     };
            
        //     var elem = document.getElementById("canvas");
        //     var ctx = elem.getContext("2d");
        //     width = elem.width
        //     height = elem.height
            
        //     function draw_ball(b)
        //     {
        //         ctx.beginPath();
        //         ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        //         ctx.stroke();
        //         ctx.fillStyle = "yellow";
        //         ctx.fill();
        //     }

        //     function put_center()
        //     {
        //         ctx.beginPath();
        //         ctx.moveTo(width / 2, 0);
        //         ctx.lineTo(width / 2, height);
        //         ctx.stroke();
        //     }

        //     function put_score(score, x, y)
        //     {
        //         ctx.font = "60px Arial";
        //         ctx.fillText(score, x,y);
        //     }
            
        //     function draw_racket(racket)
        //     {
        //         ctx.fillStyle = "red";
        //         x = 0;
        //         if (racket.side == 'RIGHT')
        //             x = width - racket.w
        //         ctx.fillRect(x, racket.y, racket.w, racket.h);
        //     }
            
        //     function draw(data)
        //     {
        //         ctx.clearRect(0, 0, width, height);
        //         put_center();
        //         draw_racket(data.racket1);
        //         draw_racket(data.racket2);
        //         draw_ball(data.b);
        //         put_score(data.racket1.score, width / 2 + (40), 20 / 100 * height);
        //         put_score(data.ll, 0, 0);
        //         put_score(data.racket2.score, width / 2 - (60 + 10), 20 / 100 * height);
        //     }
        //     chatsocket.onmessage = function (e)
        //     {
        //         console.log("hello world!!!!!!");
        //         var data = JSON.parse(e.data);
        //         draw(data);
        //     }

        // document.addEventListener("keydown", (event) => {
        //     if (event.key == "w")
        //         chatsocket.send(JSON.stringify('w'));
        //     else if (event.key == "s")
        //         chatsocket.send(JSON.stringify('s'));
        //     if (event.key == "ArrowUp")
        //         chatsocket.send(JSON.stringify('Up'));
        //     else if (event.key == "ArrowDown")
        //         chatsocket.send(JSON.stringify('Down'));
        // });
        // document.addEventListener("keyup", (event) => {
        //     if (event.key == "ArrowUp" || event.key == "ArrowDown")
        //         chatsocket.send(JSON.stringify('Stop1'));
        //     else if (event.key == "s" || event.key == "w")
        //         chatsocket.send(JSON.stringify('Stop2'));
        // });
    });
});


function getSessionData() {
    fetch('/api/get_session/')
        .then(response => {
            if (!response.ok) {
                window.location.href = "/login/";
            }
            return response.json();
        })
        .then(data => {
            const userId = data.user_id;
            const token = data.token;
            const url = `https://127.0.0.1/api/tasks/${userId}/`;
            return fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                }
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const userData = JSON.parse(JSON.stringify(data));
            document.getElementById('login').textContent =  userData.username;
            document.getElementById('pro').src = userData.photo_profile;
        })

}
