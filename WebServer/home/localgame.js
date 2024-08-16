vx = Math.cos(ang * Math.PI / 180) * o.speed;
vy = Math.sin(ang * Math.PI / 180) * o.speed;

function clear_rec()
{
    h.clearRect(0, 0, width, height);
}

function draw_rec()
{
    clear_rec();
    h.beginPath();
    h.arc(o.rec.x, o.rec.y, o.rec.r, 0, Math.PI * 2);
    h.stroke();
    h.fillStyle = ball_color;
    h.fill();
}

function ball_animation()
{
    if (vx > 0)
    {
        if ((o.rec.x + o.rec.r) + vx < (width - barra2.width))
        {
            o.rec.x += vx;
        }
        else
        {
            if ((o.rec.y /*+ o.rec.r*/) < barra2.y || o.rec.y >barra2.y + barra2.height)
            {
                o.rec.x += vx;
            }
            else
            {
                o.rec.x += (width - barra2.width) - (o.rec.x + o.rec.r);
                vx = - vx;
            }
        }
    }
    else
    {
        if (o.rec.y < barra1.y || o.rec.y >barra1.y + barra1.height || (o.rec.x - o.rec.r) + vx > barra2.width)
        {
            o.rec.x += vx;
        }
        else
        {
            o.rec.x = barra1.width + o.rec.r;
            vx = -vx;
        }
    }
    if (vy > 0)
    {
        if (o.rec.y + o.rec.r + vy < (height - ff))
            o.rec.y += vy;
        else
        {
            o.rec.y = (height - ff) - o.rec.r;
            vy = -vy;
        }
    }
    else
    {
        if (o.rec.y  + vy > o.rec.r + ff)
            o.rec.y += vy;
        else
        {
            o.rec.y = o.rec.r + ff;
            vy = -vy;
        }
    }
    draw_rec();
}

function    run_local_game() {
    setInterval(ball_animation);
}