setInterval(() => {
    const d = new Date(); // system time, in-built
    const htime = d.getHours();
    const mtime = d.getMinutes();
    const stime = d.getSeconds();

    const hrotation = 30 * htime + mtime / 2;
    const mrotation = 6 * mtime;
    const srotation = 6 * stime;

    hour.style.transform = `rotate(${hrotation}deg)`;
    minute.style.transform = `rotate(${mrotation}deg)`;
    second.style.transform = `rotate(${srotation}deg)`;
}, 1000);

// transform --> CSS property--> rotate, scale, move and skew