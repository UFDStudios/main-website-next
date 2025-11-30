"use client";

import Image from "next/image";
import { useState } from "react";

const portfolioData = [
  {
    title: "Ludo Multiplayer Game",
    description: `Ludo Multiplayer is a mobile board game built in Unity (C#) for Android & iOS, offering classic Ludo gameplay with modern multiplayer features.

      - Real-time multiplayer with Photon and matchmaking
      - ELO ranking system for competitive play
      - Player profiles with avatar support
      - In-game chat system for social interaction
      - Player stats and match results synced via Firebase
      - In-game shop for cosmetics, upgrades, and IAPs
      - Optimized for smooth performance on all devices
    `,
    genres: ["Board", "Multiplayer", "Competitive", "Offline"],
    images: [
      "/images/portfolio/ludo_multiplayer/group1.png",
      "/images/portfolio/ludo_multiplayer/group2.png",
      "/images/portfolio/ludo_multiplayer/group3.png",
      "/images/portfolio/ludo_multiplayer/group4.png",
    ],
    mainImage: "/images/portfolio/ludo_multiplayer/banner.png",
  },
  {
    title: "Whisper House - Mobile Horror Game",
    description: `A first-person psychological horror game built in Unity, optimized for mobile with Firebase & AdMob integration. Players explore a haunted mansion, solve puzzles, and survive terrifying encounters.

      Core Systems:
      - Mobile FPS Controller (Joystick/Touch)
      - Inventory System (Key, Battery, Notes, Tools)
      - Save/Load System
      - Enemy AI (Stalker & Patrol Types)
      - Hiding System (Bed, Closet)
      - Jump Scare System
    `,
    genres: ["Adventure", "Horror", "Stylized-realistic", "Offline"],
    images: [
      "/images/portfolio/whisper_house/group1.png",
      "/images/portfolio/whisper_house/group2.png",
      "/images/portfolio/whisper_house/group3.png",
      "/images/portfolio/whisper_house/group4.png",
    ],
    mainImage: "/images/portfolio/whisper_house/banner.png",
  },
  {
    title: "Dragon Dive - Endless Runner Game",
    description: `Dragon Dive is a fast-paced 2D endless surfing game inspired by Alto’s Adventure, featuring smooth procedural terrain generation, trick combos, and dynamic environments.

      Key Technical Features:
      - Procedural terrain & object generation for endless gameplay
      - Parallax scrolling and dynamic day-night/weather cycles
      - Touch controls for jumps, tricks, and wingsuit gliding
      - Optimized for mobile.
    `,
    genres: ["Action", "Casual", "Stylized", "Dragon", "Offline"],
    images: [
      "/images/portfolio/dragon_drive/group1.png",
      "/images/portfolio/dragon_drive/group2.png",
      "/images/portfolio/dragon_drive/group3.png",
      "/images/portfolio/dragon_drive/group4.png",
    ],
    mainImage: "/images/portfolio/dragon_drive/banner.png",
  },
  {
    title: "Quad Racer - Typing Game",
    description: `Quad Racer is a real-time typing-based racing game built in Unity for WebGL. Players control a quad bike that accelerates based on typing speed and accuracy, competing against AI opponents in a dynamic race environment.

      Technical Features:
      - Developed with Unity & C#
      - WebGL Deployment
      - Typing Input System
      - WPM & Accuracy Tracking
      - AI Opponents
    `,
    genres: ["Racing", "Casual", "Stylized", "Offline"],
    images: [
      "/images/portfolio/quad_racer/group1.png",
      // "/images/portfolio/quad_racer/group2.png",
      "/images/portfolio/quad_racer/group3.png",
      "/images/portfolio/quad_racer/group4.png",
      "/images/portfolio/quad_racer/group5.png",
    ],
    mainImage: "/images/portfolio/quad_racer/banner.png",
  },
  {
    title: "Jab Jab Boxing - Typing Game",
    description: `A fun and interactive typing game where kids boost their typing speed and accuracy by fighting AI opponents in a boxing ring!

      Key Features:
      - WebGL build – play directly in the browser
      - Sound effects & unlimited levels
      - Difficulty scaling for all ages

      Perfect for classrooms or at-home learning – built for engagement, education, and fun!
    `,
    genres: ["Sports","Boxing","Typing", "Fighting"],
    images: [
      "/images/portfolio/jab_jab_boxing/group1.png",
      "/images/portfolio/jab_jab_boxing/group2.png",
      "/images/portfolio/jab_jab_boxing/group3.png",
      "/images/portfolio/jab_jab_boxing/group4.png",
    ],
    mainImage: "/images/portfolio/jab_jab_boxing/banner.png",
  },
  {
    title: "Chroma Pop: Match 3 Game",
    description: `It's a Match 3 Game with the following features implemented in it:

      - Custom level editor (With 1000 levels)
      - AdMob ads
      - In-app purchase
      - Firebase analytics
      - Custom abilities VFX
    `,
    genres: ["Puzzle", "Match 3", "Monster", "Candy", "Casual", "Stylized", "Offline"],
    images: [
      "/images/portfolio/chroma_pop/group1.png",
      //"/images/portfolio/chroma_pop/group2.png",
      "/images/portfolio/chroma_pop/group3.png",
      //"/images/portfolio/chroma_pop/group4.png",
      "/images/portfolio/chroma_pop/group5.png",
      "/images/portfolio/chroma_pop/group6.png",
      //"/images/portfolio/chroma_pop/group7.png"
    ],
    mainImage: "/images/portfolio/chroma_pop/banner.png",
  },
  {
    title: "Manor Mystery: Puzzle Adventure Quest",
    description: `Uncover dark secrets in "Manor Mystery: Puzzle Adventure Quest." Step into the shoes of a detective whose wife and child have vanished in their 1920s home. Solve hidden-object puzzles, navigate haunted rooms, and break the curse of the hunted witch.

      This game includes:
      - A complete animated story
      - Multiple puzzle & riddle based levels
      - Unity timeline
      - Cutscenes
    `,
    genres: ["Puzzle-adventure", "Mystery", "Stylized", "Puzzles", "Offline"],
    images: [
      "/images/portfolio/manor_mystery/group1.png",
      "/images/portfolio/manor_mystery/group2.png",
      "/images/portfolio/manor_mystery/group3.png",
      "/images/portfolio/manor_mystery/group4.png",
      //"/images/portfolio/manor_mystery/group5.png"
    ],
    mainImage: "/images/portfolio/manor_mystery/banner.png",
  },
  {
    title: "Circular Pong: Color Ball Game",
    description: ` Circle Ping Pong game, with AdMob ads(Interstitial, Rewarded, Appopen, MREC, Banner), Firebase Sdk, Skin store, Spin wheel, and much more. `,
    genres: ["Arcade", "Casual"],
    images: [
      "/images/portfolio/circular_pong/group1.png",
      //"/images/portfolio/circular_pong/group2.png",
      "/images/portfolio/circular_pong/group3.png",
      "/images/portfolio/circular_pong/group4.png",
      "/images/portfolio/circular_pong/group5.png",
    ],
    mainImage: "/images/portfolio/circular_pong/banner.png",
  },
  {
    title: "Nitro Racers: Multiplayer Car Racing Game",
    description: `A Multiplayer Car Racing Game with Photon Fusion SDK integration. 
      
      It has following key features:
      - Lobby system
      - Matchmaking system
      - In-app purchase
      - 5 custom designed maps
      - Car customization
    `,
    genres: ["Racing", "Car Race", "Competitive multiplayer", "Realistic", "Vehicles"],
    images: [
      "/images/portfolio/nitro_racers/group1.png",
      "/images/portfolio/nitro_racers/group2.png",
      "/images/portfolio/nitro_racers/group3.png",
      "/images/portfolio/nitro_racers/group4.png",
    ],
    mainImage: "/images/portfolio/nitro_racers/banner.png",
  },
  {
    title: "World Soccer 2025 - Soccer League Game",
    description: `World Soccer 2025 is a fast-paced mobile soccer game delivering thrilling real-time action with intuitive touch controls.

      Technical Highlights:
      - Developed in Unity for iOS and Android
      - Supports multiplayer (Photon/Firebase) and offline modes
      - Optimized touch joystick & button controls
      - Lightweight and optimized for low-end devices
      - Engaging maze challenges designed for replayability
    `,
    genres: ["Sports", "Casual", "Offline", "Soccer"],
    images: [
      "/images/portfolio/world_soccer/group1.png",
      "/images/portfolio/world_soccer/group2.png",
      "/images/portfolio/world_soccer/group3.png",
      "/images/portfolio/world_soccer/group4.png",
    ],
    mainImage: "/images/portfolio/world_soccer/banner.png",
  },
  {
    title: "Pookie Park: Multiplayer Puzzle Game",
    description: `Pookie Park is a collaborative action-puzzle game that supports both single-player and online play for 2 to 8 players. A very cute 2 player game to play with your partner. It's the perfect game for couples, making it an ideal choice for fun, cooperative play with your partner. Solve mind bending puzzles, collect keys, and unlock doors to cross multiple unique levels. Each designed to test your logic, creativity, and teamwork skills!`,
    genres: ["Platformer", "Casual", "Multiplayer", "Competitive", "Puzzle"],
    images: [
      "/images/portfolio/pookie_park/group1.png",
      "/images/portfolio/pookie_park/group2.png",
      "/images/portfolio/pookie_park/group3.png",
      "/images/portfolio/pookie_park/group4.png",
    ],
    mainImage: "/images/portfolio/pookie_park/banner.png",
  },
  {
    title: "Solitaire Card Game",
    description: `Solitaire Card Game is a classic single-player card challenge where you arrange shuffled cards into ordered stacks using strategy, patience, and a bit of luck. With simple rules and relaxing gameplay, it’s perfect for quick breaks or long sessions as you aim to clear the board and achieve the perfect win.`,
    genres: ["Card", "Casual", "Realistic", "Offline"],
    images: [
      //"/images/portfolio/solitaire_card/group1.png",
      "/images/portfolio/solitaire_card/group2.png",
      "/images/portfolio/solitaire_card/group3.png",
      //"/images/portfolio/solitaire_card/group4.png",
      "/images/portfolio/solitaire_card/group5.png",
      "/images/portfolio/solitaire_card/group6.png",
    ],
    mainImage: "/images/portfolio/solitaire_card/banner.png",
  },
  {
    title: "Rolling Going Balls",
    description: `Rolling goinng balls is a 3d game. It is an addictive rolling-ball runner where you guide a speeding sphere across shifting platforms, sudden drops, and rising obstacles. Time your moves, keep your balance, and push for the highest score as the pace intensifies. Easy to pick up, hard to master, and endlessly fun.`,
    genres: ["Adventure", "Hyper-Casual"],
    images: [
      "/images/portfolio/rolling_going_balls/group1.png",
      "/images/portfolio/rolling_going_balls/group2.png",
      "/images/portfolio/rolling_going_balls/group3.png",
      "/images/portfolio/rolling_going_balls/group4.png",
      //"/images/portfolio/rolling_going_balls/group5.png",
    ],
    mainImage: "/images/portfolio/rolling_going_balls/banner.png",
  },
  {
    title: "Linceo - 2d Space Endless Game",
    description: `Linceo is a 2d Space Endless Game. It is a fast-paced arcade adventure where you guide your ship through an endless cosmic field filled with obstacles and challenges. Test your reflexes, collect points, and see how long you can survive as the speed ramps up. Simple controls, vibrant visuals, and addictive gameplay make Linceo perfect for quick, exciting sessions in outer space..`,
    genres: ["Casual", "Stylized", "Science-fiction", "Space", "Offline"],
    images: [
      "/images/portfolio/linceo/group1.png",
      "/images/portfolio/linceo/group2.png",
      "/images/portfolio/linceo/group3.png",
      "/images/portfolio/linceo/group4.png",
      //"/images/portfolio/linceo/group5.png",
      //"/images/portfolio/linceo/group6.png",
    ],
    mainImage: "/images/portfolio/linceo/banner.png",
  },
  {
    title: "Tennis Clash 3d Mobile Game",
    description: `Tennis Clash 3D is a fast-paced mobile tennis game made in Unity (C#) for Android & iOS, featuring smooth physics, intuitive controls, and competitive multiplayer.

      - Real-time 1v1 multiplayer with Photon, friend invites & chat
      - Leaderboards and ELO ranking system
      - Player stats synced via Firebase
      - Optimized 3D visuals, object pooling, dynamic quality scaling
      - In-game shop with upgrades, cosmetics, and IAPs
      - Integrated AdMob ads
  `,
    genres: ["Sports", "Casual", "Stylized", "Competitive", "Multiplayer"],
    images: [
      "/images/portfolio/tennis_clash/group1.png",
      //"/images/portfolio/tennis_clash/group2.png",
      "/images/portfolio/tennis_clash/group3.png",
      "/images/portfolio/tennis_clash/group4.png",
      //"/images/portfolio/tennis_clash/group5.png",
      "/images/portfolio/tennis_clash/group6.png",
      //"/images/portfolio/tennis_clash/group7.png",
    ],
    mainImage: "/images/portfolio/tennis_clash/banner.png",
  },
  {
    title: "Casino Slot Game",
    description: `Casino Slot Game i.e. Mortal Oath is an exciting slot machine experience themed around ancient powers and high-stakes destiny. Spin the reels, unlock special symbols, trigger bonus features, and chase big wins as you immerse yourself in a world of mystery and fortune. Perfect for quick, thrilling gameplay sessions.`,
    genres: ["Anime", "Casual", "Slots", "Casino"],
    images: [
      "/images/portfolio/casino_slot/group1.png",
      "/images/portfolio/casino_slot/group2.png",
      "/images/portfolio/casino_slot/group3.png",
      "/images/portfolio/casino_slot/group4.png"
    ],
    mainImage: "/images/portfolio/casino_slot/banner.png",
  },
  {
    title: "Yeti Penguin Hit Game",
    description: `A fun and satisfying 3D tap-timing game where the Yeti smashes a penguin across snowy terrain! Developed in Unity for Android & iOS with engaging visuals and dynamic physics.

      Core Features:
      - 3D ragdoll penguin physics with dynamic flight paths
      - Tap-to-hit timing mechanic with power indicator
      - Multiple penguin styles and Yeti skins
      - Distance-based scoring and high score system
      - Leaderboards (Google Play Games / Game Center)
      - Iron Source ads: Interstitial, Rewarded, Banner, App Open
      - Firebase SDK
      - Optimized low-poly art style for smooth performance
    `,
    genres: ["Casual", "Realistic", "Offline", "HTML5"],
    images: [
      "/images/portfolio/yeti_penguin/group1.png",
      "/images/portfolio/yeti_penguin/group2.png",
      "/images/portfolio/yeti_penguin/group3.png",
      "/images/portfolio/yeti_penguin/group4.png",
    ],
    mainImage: "/images/portfolio/yeti_penguin/banner.png",
  },
  {
    title: "Pixel Adventure Multiplayer Platformer Game",
    description: `It's a fun multiplayer platformer game which includes the following

      - Pixel art design
      - Enemy AI
      - 100's of animated traps
      - 50 levels
      - Sound design
      - Leaderboard
      - Animated characters
      - Particle effects and VFX
    `,
    genres: ["Platformer", "Competitive Multiplayer", "Stylized", "Pixelated"],
    images: [
      "/images/portfolio/pixel_adventure/group1.png",
      "/images/portfolio/pixel_adventure/group2.png",
      "/images/portfolio/pixel_adventure/group3.png",
      "/images/portfolio/pixel_adventure/group4.png"
    ],
    mainImage: "/images/portfolio/pixel_adventure/banner.png",
  },
];

const PortfolioImages = ({ images }: { images: string[] }) => {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape' | null>(null);
  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.naturalHeight > img.naturalWidth) {
      setOrientation('portrait');
    } else {
      setOrientation('landscape');
    }
  };
  if (!orientation) {
    // Render initially with default grid, and detect orientation on first image load
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
        {images.map((img, i) => (
          <Image
            key={i}
            src={img}
            width={300}
            height={300}
            alt="Project image"
            className="rounded-lg shadow-md"
            onLoad={i === 0 ? handleLoad : undefined}
          />
        ))}
      </div>
    );
  }
  const isPortrait = orientation === 'portrait';
  const gridClass = isPortrait ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2';
  const imgSize = isPortrait ? 300 : 550; // Increased size for landscape
  return (
    <div className={`grid ${gridClass} gap-6 mt-10`}>
      {images.map((img, i) => (
        <Image
          key={i}
          src={img}
          width={imgSize}
          height={imgSize}
          alt="Project image"
          className="rounded-lg shadow-md"
        />
      ))}
    </div>
  );
};

function PortfolioSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[70%_30%] gap-10 items-center ml-10 mr-10">

      {/* LEFT SIDE → Text (70%) */}
      <div className="text-left">
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold">
          <span className="text-neon-green">"</span>
          <span className="text-white">Our </span>
          <span className="text-neon-green">Portfolio</span>
          <span className="text-neon-green">"</span>
        </h1>

        <p className="mt-3 lg:mt-5 text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/90">
          Building games that players love to play.
        </p>
        <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/90">
          High-quality experiences. Lasting engagement.
        </p>
      </div>

      {/* RIGHT SIDE → Images (30%) */}
      <div className="relative h-60 lg:h-80 flex items-center justify-end mr-10">
        
        {/* Image 1 */}
        <div className="absolute w-40 md:w-48 lg:w-56 rounded-xl overflow-hidden shadow-xl rotate-[-10deg] right-16 hover:scale-105 transition-all duration-300">
          <img 
            src="/images/portfolio/quad_racer/banner.png"
            className="w-full h-full object-cover"
            alt="Portfolio image 1"
          />
        </div>

        {/* Image 2 */}
        <div className="absolute w-40 md:w-48 lg:w-56 rounded-xl overflow-hidden shadow-xl rotate-[8deg] right-2 hover:scale-105 transition-all duration-300">
          <img 
            src="/images/portfolio/chroma_pop/banner.png"
            className="w-full h-full object-cover"
            alt="Portfolio image 2"
          />
        </div>
      </div>

    </div>
  );
}

const AboutUs = () => {

  return (
        <div className="mx-auto max-w-[96rem]">
          <div >
            <PortfolioSection />

            {/* Sections */}
            <div className="ml-10 space-y-20">
              {portfolioData.map((project, index) => (
                <div key={index} className="border-b border-gray-800 pb-16">

                  <h3 className="text-5xl font-bold mb-5">{project.title}</h3>
                  <strong className="font-semibold text-white text-3xl block mb-2 ml-10">Game Description: </strong>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center ml-10">
                    <p className="text-gray-300 leading-relaxed whitespace-pre-line text-xl">
                      {project.description}
                    </p>

                    <div className="flex justify-center self-center">
                      <Image
                        src={project.mainImage}
                        width={400}
                        height={500}
                        alt={project.title}
                        className="rounded-xl shadow-lg"
                      />
                    </div>
                  </div>              
                  <div className="flex gap-3 mt-6 flex-wrap ml-10">
                    {project.genres?.map((genre, i) => (
                      <div key={i} className="bg-black border border-gray-700 px-4 py-2 rounded-md text-white shadow hover:bg-gray-900 transition text-base font-bold">
                        {genre}
                      </div>
                    ))}
                  </div>

                  {/* Image Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 mr-7">
                    {project.images.map((img, i) => (
                      <Image
                        key={i}
                        src={img}
                        width={400}
                        height={300}
                        alt="Project image"
                        className="rounded-lg shadow-md"
                      />
                    ))}
                  </div>
                  {/* {PortfolioImages({ images: project.images })} */}
                  
                </div>
              ))}
            </div>
          </div>           
        </div>
    );
};

export default AboutUs;

