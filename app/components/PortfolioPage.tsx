"use client";

import Image from "next/image";
//import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Key, useEffect, useMemo, useRef, useState } from "react";

type Project = typeof portfolioData[number];

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

const PortfolioModal = ({ project, onClose }: { project: any; onClose: () => void }) => {
  const images = project.images || [];
  const containerRef = useRef<HTMLDivElement>(null);

  const [orientations, setOrientations] = useState<boolean[]>([]);
  const [scrollX, setScrollX] = useState(0);

  // For fullscreen lightbox
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const scrollAmount = 350;

  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, []);

  useEffect(() => {
    setOrientations(new Array(images.length).fill(false));
  }, [images]);

  const handleImageLoad = (index: number, e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    const isLandscape = img.naturalWidth > img.naturalHeight;
    setOrientations(prev => {
      const updated = [...prev];
      updated[index] = isLandscape;
      return updated;
    });
  };

  // Separate media
  const portraits: string[] = [];
  const landscapes: string[] = [];
  const videos: string[] = [];

  images.forEach((media: string, index: number) => {
    const isVideo = media.toLowerCase().endsWith(".mp4");
    if (isVideo) videos.push(media);
    else if (orientations[index]) landscapes.push(media);
    else portraits.push(media);
  });

  const orderedMedia = [...portraits, ...landscapes, ...videos];

  // Scroll
  const scrollLeft = () => {
    if (!containerRef.current) return;
    const newScroll = Math.max(scrollX - scrollAmount, 0);
    containerRef.current.scrollTo({ left: newScroll, behavior: "smooth" });
    setScrollX(newScroll);
  };

  const scrollRight = () => {
    if (!containerRef.current) return;
    const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth;
    const newScroll = Math.min(scrollX + scrollAmount, maxScroll);
    containerRef.current.scrollTo({ left: newScroll, behavior: "smooth" });
    setScrollX(newScroll);
  };

  const canScrollLeft = scrollX > 0;
  const canScrollRight = containerRef.current && scrollX < containerRef.current.scrollWidth - containerRef.current.clientWidth - 5;

  return (
    <div  className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-10 px-4 overflow-y-auto"
      onClick={() => {
        if (lightboxIndex === null) {
          onClose();
        }
      }}
    >
      {/* Modal container */}
      <div
        className="relative w-full max-w-6xl bg-[#0b0b0b] border border-gray-800 rounded-2xl shadow-xl"
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Close button */}
        <button className="absolute top-4 right-4 text-white text-3xl hover:text-green-400 z-20"
          onClick={() => {
            if (lightboxIndex === null) {
              onClose();
            }
          }}  
        >
          ×
        </button>

        {/* Content */}
        <div className="p-8">
          <h2 className="text-4xl font-bold text-white mb-6">{project.title}</h2>
          <p className="text-gray-300 whitespace-pre-line mb-8">{project.description}</p>

          <div className="flex flex-wrap gap-3 mb-10">
            {project.genres.map((genre: string, i: Key | null | undefined) => (
              <span key={i} className="border border-gray-700 px-4 py-2 rounded-md text-white">{genre}</span>
            ))}
          </div>

          <h3 className="text-2xl font-bold text-white mb-4">Gallery</h3>

          <div className="relative">
            {canScrollLeft && (
              <button onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/70 hover:bg-black text-white text-2xl rounded-full z-10"
              >
                ‹
              </button>
            )}
            {canScrollRight && (
              <button onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/70 hover:bg-black text-white text-2xl rounded-full z-10"
              >
                ›
              </button>
            )}

            <div ref={containerRef} className="flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth">
              {orderedMedia.map((media, index) => {
                const isVideo = media.toLowerCase().endsWith(".mp4");
                const isPortrait = portraits.includes(media);
                const portraitMarginClasses = isPortrait ? `${index === 0 ? "lg:ml-36" : ""} ${index === orderedMedia.length - 1 ? "lg:mr-36" : ""}`: "";

                return (
                  <div
                    key={index} onClick={() => !isVideo && setLightboxIndex(index)}
                    className={`flex-shrink-0 ${isPortrait ? 'h-64' : 'h-32 lg:h-64'} bg-black flex items-center justify-center rounded-lg shadow-md cursor-pointer
                      ${isPortrait ? "mx-auto max-w-[350px] w-auto" : "w-[250px] lg:w-[350px]"} ${portraitMarginClasses}
                    `}
                  >
                    {isVideo ? (
                      <video src={media} controls className={`${isPortrait ? 'h-64' : 'h-32 lg:h-64'} w-full object-cover rounded-lg`}/>
                    ) : (
                      <Image
                        src={media}
                        alt=""
                        width={500}
                        height={500}
                        onLoad={(e) => handleImageLoad(index, e)}
                        className={`${ isPortrait ? "h-full w-auto object-contain" : "h-full w-full object-cover"} rounded-lg`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 cursor-zoom-out"
          onClick={() => setLightboxIndex(null)} // Clicking anywhere closes lightbox
        >
          {/* Close button for lightbox */}
          <button onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }} className="absolute top-4 right-4 text-white text-3xl hover:text-green-400 z-50">
            ×
          </button>

          {/* Centered image */}
          <Image
            src={orderedMedia[lightboxIndex]}
            alt=""
            width={1200}
            height={1200}
            className={`object-contain ${
              portraits.includes(orderedMedia[lightboxIndex])
                ? "max-h-[calc(100%-160px)]" // Add top/bottom margin for portrait
                : "max-h-full"
            }`}
          />
        </div>
      )}
    </div>
  );
};

const ProjectCard = ({ project, onClick }: { project: any; onClick: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const allMedia = useMemo(() => {
    return [project.mainImage, ...project.images];
  }, [project.mainImage, project.images]);

  const goLeft = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const goRight = () => {
    if (currentIndex < allMedia.length - 1) setCurrentIndex(currentIndex + 1);
  };

  return (
    <>
      <div
        onClick={onClick}
        className="cursor-pointer bg-[#0b0b0b] border border-gray-800 rounded-2xl
                    overflow-hidden hover:-translate-y-1 hover:shadow-2xl
                    transition-all duration-300"
      >
        {/* Carousel Image/Video Area */}
        <div className="relative w-full h-[220px] bg-black flex items-center justify-center">
          {/* Left Arrow */}
          {currentIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goLeft();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/70 hover:bg-black text-white text-lg rounded-full border border-white z-10"
            >
              ‹
            </button>
          )}

          {/* Right Arrow */}
          {currentIndex < allMedia.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goRight();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/70 hover:bg-black text-white text-lg rounded-full border border-white z-10"
            >
              ›
            </button>
          )}

          {/* Media Display */}
          {allMedia[currentIndex].toLowerCase().endsWith('.mp4') ? (
            <video src={allMedia[currentIndex]} controls
              className="max-h-full max-w-full object-contain rounded-lg cursor-pointer"
            />
          ) : (
            <Image
              src={allMedia[currentIndex]}
              alt={project.title}
              width={800}
              height={450}
              className="max-h-full max-w-full object-contain rounded-lg cursor-pointer"
            />
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-white mb-3">
            {project.title}
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-5">
            {project.description}
          </p>

          <div className="flex gap-3 flex-wrap">
            {project.genres.map((genre: string , i: Key | null | undefined) => (
              <span key={i} className="bg-black border border-gray-700 px-4 py-2 rounded-md text-white text-sm font-bold">
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const Portfolio = () => {
  
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeGenre, setActiveGenre] = useState<string>("All");
  /* const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const genreFromUrl = searchParams.get("genre") || "All";
  const [activeGenre, setActiveGenre] = useState<string>(genreFromUrl); */

  // 🔹 Unique genres (clean + sorted)
  const allGenres = useMemo(() => {
    const genreCount: Record<string, number> = {};

    // Count occurrences
    portfolioData.forEach(project => {
      project.genres.forEach(genre => {
        genreCount[genre] = (genreCount[genre] || 0) + 1;
      });
    });

    // Sort by frequency (highest first)
    const sortedGenres = Object.entries(genreCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 7) // 👈 top 7 only
      .map(entry => entry[0]);

    return ["All", ...sortedGenres];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeGenre === "All") return portfolioData;
    return portfolioData.filter(p =>
      p.genres.includes(activeGenre)
    );
  }, [activeGenre]);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  /* useEffect(() => {
    setActiveGenre(genreFromUrl);
  }, [genreFromUrl]); */

  return (
    <>
      <section className="mx-auto max-w-[96rem] px-6 pb-20">

        {/* HEADER */}
        <div className="text-center mb-7">
          <h1 className="text-5xl font-extrabold text-white">
            Our <span className="text-neon-green">Portfolio</span>
          </h1>
        </div>

        {/* 🔥 GENRE BAR */}
        <div className="relative mb-10">

          {/* Left Arrow */}
          <button onClick={scrollLeft} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black text-white w-10 h-10 rounded-full">
            ‹
          </button>

          {/* Scroll Container */}
          <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide justify-center min-w-full">
            {allGenres.map((genre) => (
              <button
                key={genre} 
                onClick={() => setActiveGenre(genre)}
                /* onClick={() => {
                  const params = new URLSearchParams(searchParams.toString());

                  if (genre === "All") {
                    params.delete("genre");
                  } else {
                    params.set("genre", genre);
                  }

                  router.push(`${pathname}?${params.toString()}`);
                }} */
                className={`
                  px-8 py-3 text-lg rounded-full border whitespace-nowrap transition-all duration-200
                  ${
                    activeGenre === genre
                      ? "bg-neon-green text-black border-neon-green"
                      : "border-white/30 text-white/80 hover:border-neon-green hover:text-white"
                  }
                `}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Right Arrow */}
          <button onClick={scrollRight} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black text-white w-10 h-10 rounded-full">
            ›
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project}
              onClick={() => setActiveProject(project)}
            />
          ))}
        </div>
      </section>

      {activeProject && (
        <PortfolioModal project={activeProject} onClose={() => setActiveProject(null)}/>
      )}
    </>
  );
};

export default Portfolio;