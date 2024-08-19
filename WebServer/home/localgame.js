var elem = null;
var ctx = null;
var width = 0
var height = 0

class racket
{
    constructor(x, y, min, max)
    {
        this.x = x
        this.y = y
        this.min = min
        this.max = max
        this.h = hh
        this.w = ww
        this.vy = 0
        this.score = 0
    }

    change_direction(data)
    {
        if (data == 'Up')
            this.vy = -racket_speed
        else if (data == 'Down')
            this.vy = racket_speed
        else if (data == 'Stop')
            this.vy = 0
    }

    move()
    {
        if (this.vy < 0)
            if (this.y + this.vy > this.min)
                this.y += this.vy
            else
                this.y = this.min
        else
        {
            if (this.y + this.vy < this.max - this.h)
                this.y += this.vy
            else
                this.y = this.max - this.h
        }
    }

    serialize_racket()
    {
        return {
            'x': this.x,
            'y': this.y,
            'h': this.h,
            'w': this.w,
            'score':this.score,
        }
    }
}

class ball
{
    constructor(x, y)
    {
        this.x = x
        this.y = y
        this.r = 10
        this.angl = 0
        this.speed = 0.9
        this.vx = Math.cos(this.angl * Math.pi / 180) * this.speed
        this.vy = Math.sin(this.angl * Math.pi / 180) * this.speed
    }

    serialize_ball()
    {
        return{
            'x':this.x,
            'y':this.y,
            'r':this.r,
        }
    }
}

class   Match
{
    constructor(N)
    {
        this.starting = false
        this.players = new Array(N);
        this.players[0] = new player(ww, (height - hh) / 2, 0, height);
        this.players[1] = new player(width - ww, (height - hh) / 2, 0, height);
        console.log("Match width: " + width + " height: " + height);
        this.b = new ball(width / 2, height / 2)
        this.team1_score = 0
        this.team2_score = 0
    }

    set_player(player, index)
    {
        this.players[index] = player
    }

    move()
    {
        if (this.b.x + this.b.r < ww)
        {
            this.team1_score += 1
            this.b.x = width / 2
            this.b.y = height / 2
            // this.b.__init__(width / 2, height / 2)
            // await asyncio.sleep(1)
        }
        if (this.b.x - this.b.r > width - ww)
        {
            this.team2_score += 1
            this.b.x = width / 2
            this.b.y = height / 2
            // this.b.__init__(width / 2, height / 2)
            // await asyncio.sleep(1)
        }
        if (this.b.vx > 0)
        {
            if ((this.b.x + this.b.r) + this.b.vx < (width - ww))
                this.b.x += this.b.vx
            else
            {
                if ((this.b.y) < this.players[1].racket.y  || this.b.y >this.players[1].racket.y + hh)
                    this.b.x += this.b.vx
                else
                {
                    this.b.x += (width - ww) - (this.b.x + this.b.r)
                    this.b.vx = -this.b.vx
                }
            }
        }
        else
        {
            if (this.b.y < this.players[0].racket.y  || this.b.y >this.players[0].racket.y + hh  || (this.b.x - this.b.r) + this.b.vx > ww)
                this.b.x += this.b.vx
            else
            {
                this.b.x = ww + this.b.r
                this.b.vx = -this.b.vx
            }
        }
        if (this.b.vy > 0)
        {
            if (this.b.y + this.b.r + this.b.vy < (height - 0))
                this.b.y += this.b.vy
            else
            {
                this.b.y = (height - 0) - this.b.r
                this.b.vy = -this.b.vy
            }
        }
        else
        {
            if ((this.b.y - this.b.r) + this.b.vy > 0)
                this.b.y += this.b.vy
            else
            {
                this.b.y = this.b.r + 0
                this.b.vy = -this.b.vy
            }
        }
        // for player in this.players
        //     player.racket.move()
    }

    run_game()
    {
        console.log("run_game called");
        this.move();
        draw(serialize_Match(this));
        if (this.team1_score == score_to_win)
            return 1
        if (this.team2_score == score_to_win)
            return 2
        // }
    }
}

function serialize_Match(o)
{
    return{
        'type':'game.state',
        'players':o.players.map(p => ({ racket: p.racket.serialize_racket() })),
        'ping':o.b.serialize_ball(),
        'team1_score':o.team1_score,
        'team2_score':o.team2_score,
    }
}

class   player
{
    // constructor(username, photo_profile)
    // {
    //     this.racket = None;
    //     // this.username = username;
    //     // this.photo_profile = photo_profile;
    // }

    constructor(x, y, min, max)
    {
        this.racket = new racket(x, y, min, max)
    }
    // serialize_User(self)
    // {
    //     return{
    //         'login':self.username,
    //         'icon':self.photo_profile,
    //     }
    // }
}

var match = new Match(2);
function    run_local_game() {
    console.log("run_local_game start");
    ///////////////
    elem = document.getElementById('2-canvas-id');
    ctx = elem.getContext("2d");
    width = elem.width
    height = elem.height
    ///////////////
    document.getElementById("2-canvas-display_name-id-0").innerHTML = document.getElementById("local_game_player1_display_name_id").value;
    document.getElementById("2-canvas-icon-id-1").src = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fgamesgo.net%2Ffire-and-water-geometry-dash%2F&psig=AOvVaw3hNLYds0rZ9is8AI5UvzoL&ust=1724064954591000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMCv_tOw_ocDFQAAAAAdAAAAABAE';
    document.getElementById("2-canvas-display_name-id-0").innerHTML = document.getElementById("local_game_player2_display_name_id").value;
    document.getElementById("2-canvas-icon-id-1").src = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fgamesgo.net%2Ffire-and-water-geometry-dash%2F&psig=AOvVaw3hNLYds0rZ9is8AI5UvzoL&ust=1724064954591000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMCv_tOw_ocDFQAAAAAdAAAAABAE';
    local_game_starting = true;

    document.addEventListener("keydown", (event) => {
        if (local_game_starting)
        {
            if (event.key == "ArrowUp")
            {
                console.log("event.key: " + event.key);
                console.log("match.players[0].racket: " + match.players[0].racket.vy);
                match.players[0].racket.change_direction('Up');
            }
            else if (event.key == "ArrowDown")
                match.players[0].racket.change_direction('Down');
            else if (event.key == "w")
                match.players[1].racket.change_direction('Up');
            else if (event.key == "s")
                match.players[1].racket.change_direction('Down');
        }
    });
    
    document.addEventListener("keyup", (event) => {
        if (local_game_starting)
        {
            if (event.key == "ArrowUp" || event.key == "ArrowDown")
                match.players[0].racket.change_direction('Stop');
            else if (event.key == "w" || event.key == "s")
                match.players[1].racket.change_direction('Stop');
        }
    });
    game_asid();
    console.log("run_local_game end");
}

setInterval(match.run_game());