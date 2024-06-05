var url;

elem = NaN
ctx = NaN
width = 0
height = 0
main_socket = NaN

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

var firs_time = true;
function    display_ping_pong(data)
{
    if (firs_time)
    {
        console.log("hellooooo")
        for (let i = 0; i < data.players.length; i++)
        {
            console.log(data.players[i].user.login);
            document.getElementById(data.players.length.toString() + "-canvas-display_name-id-" + i.toString()).innerHTML = data.players[i].user.login;
            // document.getElementById(data.players.length.toString() + "-canvas-icon-id-" + i.toString()).src = data.players[i].user.icon;
        }
        document.getElementById("ping-pong-" + data.players.length.toString()).style.display = "block";
        // document.getElementById("loader").style.display = "none";
        firs_time = false
    }
}

document.addEventListener("keydown", (event) => {
    if (event.key == "ArrowUp")
        main_socket.send(JSON.stringify('Up'));
    else if (event.key == "ArrowDown")
        main_socket.send(JSON.stringify('Down'));
});

document.addEventListener("keyup", (event) => {
    if (event.key == "ArrowUp" || event.key == "ArrowDown")
        main_socket.send(JSON.stringify('Stop'));
});

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    return await response.json();
}

// Call fetchData using async/await
// var data = NaN
// async function main()
// {
//     try
//     {
//         const response = await fetch('/api/get_session/');
//         if (!response.ok)
//             throw new Error('Network response was not ok ' + response.statusText);
//         data =  await response.json();
//         console.log(data);
//     }
//     catch (error)
//     {
//         console.error('Error fetching data:', error);
//     }
// }

// main();
// url = `wss://${window.location.host}/wss/game/?id=${data.user_id}&token=${data.token}`;
// main_socket = new WebSocket(url);
// main_socket.onopen = function(event) {
//     console.log("WebSocket connection established.");
// };
// console.log(data);
// fetch('/api/get_session/')
//     .then(response => {
//         if (!response.ok) {
//             window.location.href = "/login/";
//         }
//         return response.json();
//     })
//     .then(data =>
//     {
//         url = `wss://${window.location.host}/wss/game/?id=${data.user_id}&token=${data.token}`;
//         main_socket = new WebSocket(url);

//         elem = document.getElementById("canvas-id")
//         ctx = elem.getContext("2d");
//         width = elem.width
//         height = elem.height

//         const menuButton = document.getElementById('ShowMenu-id');
//         console.log(menuButton);
//         const menu = document.getElementById('menu-id');

//         menuButton.addEventListener('click', function() {
//             menu.classList.toggle('show');
//         });

//         document.getElementById("play-id").addEventListener('click', play);

//         main_socket.onopen = function(event) {
//             console.log("WebSocket connection established.");
//         };

//         main_socket.onmessage = function (e)
//         {
//             var data = JSON.parse(e.data)
//             console.log(data);
//             if (data.type == 'game.state')
//             {
//                 display_ping_pong(data);
//                 draw(data);
//             }
//             else if (data.type == 'game.end')
//             {
//                 console.log("game  end");
//             }
//         }
//     }
// );

// function    play()
// {
//     console.log("hwllfwejifjwe")
// }