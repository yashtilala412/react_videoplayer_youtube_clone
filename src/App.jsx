import React from 'react';
import './App.css';
import ReactPlayer from 'react-player';


const videoData = [
  {
  
  url: "https://youtu.be/OzI9M74IfR0?si=N9Pjj_C0k4ZLi_5g",
    title: "Yimmy Yimmy - Tayc | Shreya Ghoshal | Jacqueline Fernandez | Rajat N | Rana Nyadjiko | Anshul Garg",
    artist: "Shreya Ghoshal",
    views: "67M views",
    uploadDate: "3 week ago"
},
{
  
  url: "https://youtu.be/sLykke8q2ls?si=k3s9G7qwYjmZO6ln",
    title: "Dooriyan - Dino James ft. Kaprila",
    artist: "Dino James",
    views: "36M views",
    uploadDate: "4 years ago"
},{
  
  url: "https://youtu.be/hFGG7T3Mq3w?si=ClDUs9LkbolYYTOH",
    title: "Dino James – Wishlist feat Kaprila | Official Music Video",
    artist: "Dino James",
    views: "79M views",
    uploadDate: "4 years ago"
},{
  
  url: "https://youtu.be/-aQMjByEeo8?si=QThWl63CZdAsCDOo",
    title: "Arcade x Mann Mera (Mashup) Full Version | Gravero",
    artist: "Gravero",
    views: "43M views",
    uploadDate: "2 years ago"
},{
  
  url: "https://youtu.be/JrNMyzsYr4M?si=9QC9950jgrdglsax",
    title: "Ellie Goulding - Love Me Like You Do (Lyrics)",
    artist: "Ellie Goulding",
    views: "88M views",
    uploadDate: "2 years ago"
},{
  
  url: "https://youtu.be/A66TYFdz8YA?si=1vnLoFBTc4Sf0tfy",
    title: "King - Tu Aake Dekhle | The Carnival | The Last Ride | Prod. by Shahbeatz | Latest Hit Songs 2020",
    artist: "King",
    views: "504M views",
    uploadDate: "3 years ago" 
},{
  
  url: "https://youtu.be/mEMHF5W4zlY?si=S6LYUl4RYeq5UCEL",
    title: "Tera Ghata | Lyrical Video | Gajendra Verma Ft. Karishma Sharma | Vikram Singh",
    artist: "Gajendra Verma",
    views: "170M views",
    uploadDate: "5 years ago"
},{
  
  url: "https://youtu.be/iAIBF2ngbWY?si=JZ5Cs-eVykfNPZZj",
    title: "ANIMAL:Pehle Bhi Main(Full Video) | Ranbir Kapoor,Tripti Dimri |Sandeep V |Vishal M,Raj S |Bhushan K",
    artist: "Sandeep V",
    views: "119M views",
    uploadDate: "3 months ago"
},{
  
  url: "https://youtu.be/kO4AU5yBp64?si=_bVWHQVW8nUno9GR",
    title: "Pehle Bhi Main x Kaise Hua (ACV Mashup) | ANIMAL MASHUP | Ranbir Kapoor",
    artist: "Sandeep V",
    views: "3.2M views",
    uploadDate: "3 months ago"
},{
  
  url: "https://youtu.be/k3usIlOkElQ?si=IEsxBcP-2cjBaYNn",
    title: "Closer x Apna Bana Le Full Version | Instagram Viral Song Mashup | Proyash",
    artist: "Proyash",
    views: "12M views",
    uploadDate: "1 years ago"
},{
  
  url: "https://youtu.be/6BYIKEH0RCQ?si=2hH0_Hi3qH0F3fxn",
    title: "Ritviz - Liggi [Official Music Video]",
    artist: "Ritviz",
    views: "197M views",
    uploadDate: "4 years ago"
},{
  
  url: "https://youtu.be/riVOHkYvzjI?si=zowL0WC1aFqaZ_xo",
    title: "People X Nainowale Ne (Mashup) - Full Version | Neeti Mohan & Libianca | Lo-fi 2307 | Insta Viral",
    artist: "Neeti Mohan & Libianca",
    views: "41M views",
    uploadDate: "11 months ago"
},{
  
  url: "https://youtu.be/AX6OrbgS8lI?si=kSx55m1MVMK27Mci",
    title: "AUR - TU HAI KAHAN - Raffey - Usama - Ahad (Official Music Video)",
    artist: "Raffey",
    views: "144M views",
    uploadDate: "11 months ago"
},{
  
  url: "https://youtu.be/xEALTVLxrDw?si=S-Lpaya4i-ItBZJW",
    title: "MITRAZ - Akhiyaan (Official Music Video)",
    artist: "MITRAZ",
    views: "33M views",
    uploadDate: "11 months ago"
},{
  
  url:   "https://youtu.be/rDe6QJ4AGQE?si=hF7SXk3GvMyqOPUU",
  
    title: "Woh Lamhe X Laare Choote | Adbhut Chapter 15(Extended) | ROHAN | Atif Aslam | Indian Synthwave Remix",
    artist: "Atif Aslam",
    views: "5.4M views",
    uploadDate: "10 months ago"
},{
  
  url: "https://youtu.be/rDe6QJ4AGQE?si=HRc4QlaId4IRONOm",
  
  title: "Woh Lamhe X Laare Choote | Adbhut Chapter 15(Extended) | ROHAN | Atif Aslam | Indian Synthwave Remix",
  artist: "Atif Aslam",
  views: "5.4M views",
  uploadDate: "10 months ago"
},{
  
  url: "https://youtu.be/PAW_Gd3QVww?si=74_GBpP9Q1lfBzB8",
  
  title: "Akull - Laal Bindi",
  artist: "Akull",
  views: "187M views",
  uploadDate: "5 years ago"
},{
  
  url: "https://youtu.be/pdL1imksSqY?si=ulFYoq0yiZ4lpPwg",
  
  title: "Husn Mashup | Anuv Jain | Let Her Go X Husn X Choo Lo X Jiyein Kyun | Sid Guldekar",
  artist: "Anuv Jain",
  views: "4.5M views",
  uploadDate: "2 months ago"
},{
  
  url: "https://youtu.be/osyKe6jQ3XU?si=A2lfq3GPTGThWSRJ",

  title: "Husn x Tune Jo Na Kaha (Complete Version)",
  artist: "Mauvision",
  views: "1.2M views",
  uploadDate: "2 months ago"
},{
  
  url:   "https://youtu.be/oRZ0cfZ9SeU?si=gRP2nayRXjuFQZX5",
  title: "Vilen - Ek Raat (Official Video)",
  artist: "Vilen",
  views: "603M views",
  uploadDate: "6 years ago"
},
];

const App = () => {
  return (
    <div className="app">
      <h1>Video Player</h1>
      <div className="video-grid">
        {videoData.map((video, index) => (
          <div key={index} className="video-item">
            <ReactPlayer
              light={true}
              controls={true}
              height="200px"
              width="300px"
              url={video.url}
              style={{ borderRadius: '20px' }}
            />
            <div className="video-info">
              <h3>{video.title}</h3>
              <p>{video.artist}</p>
              <p>{video.views}</p>
              <p>{video.uploadDate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;