// VideoList.js
import React from 'react';

const VideoList = () => {
    // Sample video URLs
    const videos = [
        "https://youtu.be/OzI9M74IfR0?si=N9Pjj_C0k4ZLi_5g",
        "https://youtu.be/sLykke8q2ls?si=k3s9G7qwYjmZO6ln",
        "https://youtu.be/hFGG7T3Mq3w?si=ClDUs9LkbolYYTOH",
        "https://youtu.be/-aQMjByEeo8?si=QThWl63CZdAsCDOo",
        "https://youtu.be/JrNMyzsYr4M?si=9QC9950jgrdglsax",
        "https://youtu.be/A66TYFdz8YA?si=1vnLoFBTc4Sf0tfy",
        "https://youtu.be/mEMHF5W4zlY?si=S6LYUl4RYeq5UCEL",
        "https://youtu.be/iAIBF2ngbWY?si=JZ5Cs-eVykfNPZZj",
        "https://youtu.be/kO4AU5yBp64?si=_bVWHQVW8nUno9GR",
        "https://youtu.be/k3usIlOkElQ?si=IEsxBcP-2cjBaYNn",
        "https://youtu.be/6BYIKEH0RCQ?si=2hH0_Hi3qH0F3fxn",
        "https://youtu.be/riVOHkYvzjI?si=zowL0WC1aFqaZ_xo",
        "https://youtu.be/AX6OrbgS8lI?si=kSx55m1MVMK27Mci",
        "https://youtu.be/xEALTVLxrDw?si=S-Lpaya4i-ItBZJW",
        "https://youtu.be/rDe6QJ4AGQE?si=hF7SXk3GvMyqOPUU",
        "https://youtu.be/rDe6QJ4AGQE?si=HRc4QlaId4IRONOm",
        "https://youtu.be/PAW_Gd3QVww?si=74_GBpP9Q1lfBzB8",
        "https://youtu.be/pdL1imksSqY?si=ulFYoq0yiZ4lpPwg",
        "https://youtu.be/osyKe6jQ3XU?si=A2lfq3GPTGThWSRJ",
        "https://youtu.be/oRZ0cfZ9SeU?si=gRP2nayRXjuFQZX5",

        // Add more video URLs
    ];

    return (
        <div className="video-list">
            {videos.map((video, index) => (
                <div key={index} className="video">
                    <iframe width="300" height="200" src={video} title="YouTube Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
                </div>
            ))}
        </div>
    );

export default VideoList;