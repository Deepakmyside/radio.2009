import { FaInstagram } from "react-icons/fa";

// 🔥 reusable description component
const instaDescription = (link) => (
  <>
    Behind the scenes reel — a glimpse into the creative process of Radio.2009.{" "}
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-[#DC143C] hover:underline"
    >
      <FaInstagram size={14} />
      Check on Instagram
    </a>
  </>
);

export const works = [
  {
    id: 1,
    title: "Tere Warga",
    category: "Poster",
    mediaUrl: "/images/tere-warga.jpg",
    type: "image",
    description: instaDescription("https://instagram.com/radio.2009"),
    tags: ["cover art", "music", "illustration"],
    date: "2026",
    rotation: 2,
  },
  {
    id: 2, // ✅ fixed duplicate id
    title: "Art for Real boss",
    category: "Poster",
    mediaUrl: "/images/realboss.jpg",
    type: "image",
    description: instaDescription("https://instagram.com/radio.2009"),
    tags: ["cover art", "music", "illustration"],
    date: "2026",
    rotation: -3,
  },
  {
    id: 3,
    title: "Ho Bas Dooron Tarde Rahe",
    category: "Poster",
    mediaUrl: "/images/dooron.png",
    type: "image",
    description: instaDescription("https://instagram.com/radio.2009"),
    tags: ["scenery", "train", "mood"],
    date: "2026",
    rotation: -2,
  },
  {
    id: 4,
    title: "Chitt Rall Kre",
    category: "Poster",
    mediaUrl: "/images/chitt-rall.png",
    type: "image",
    description: instaDescription("https://instagram.com/radio.2009"),
    tags: ["room", "vinyl", "music wall"],
    date: "2026",
    rotation: 1,
  },
  {
    id: 5,
    title: "The Red Room",
    category: "Poster",
    mediaUrl: "/images/red-room.png",
    type: "image",
    description: instaDescription("https://instagram.com/radio.2009"),
    tags: ["room", "portrait", "vinyl"],
    date: "2026",
    rotation: -4,
  },
  {
    id: 6,
    title: "Pind",
    category: "Poster",
    mediaUrl: "/images/savegram2.jpg",
    type: "image",
    description: instaDescription("https://instagram.com/radio.2009"),
    tags: ["cover art", "landscape"],
    date: "2026",
    rotation: 2,
  },
  {
    id: 11,
    title: "Artwork",
    category: "Poster",
    mediaUrl: "/images/bathinda-podcastArt.jpg",
    type: "image",
    description: instaDescription("https://instagram.com/radio.2009"),
    tags: ["art",],
    date: "2026",
    rotation: 2,
  },
  {
    id: 12,
    title: "Navaan Sandhu Art part 1",
    category: "Poster",
    mediaUrl: "/images/navaan-art1.jpg",
    type: "image",
    description: instaDescription("https://instagram.com/radio.2009"),
    tags: ["cover art","Music poster"],
    date: "2026",
    rotation: 2,
  },
   {
    id: 13,
    title: "Navaan Sandhu Art part 2",
    category: "Poster",
    mediaUrl: "/images/navaan-art2.jpg",
    type: "image",
    description: instaDescription("https://instagram.com/radio.2009"),
    tags: ["cover art","Music poster"],
    date: "2026",
    rotation: 2,
  },
  {
    id: 14,
    title: "Navaan Sandhu Art part 3",
    category: "Poster",
    mediaUrl: "/images/navaan-art3.jpg",
    type: "image",
    description: instaDescription("https://instagram.com/radio.2009"),
    tags: ["cover art","Music poster"],
    date: "2026",
    rotation: 2,
  },
  {
    id: 7,
    title: "Radio.2009 Reel",
    category: "Visuals",
    mediaUrl: "/images/herovideo.mp4",
    type: "video",
    description: instaDescription("https://instagram.com/radio.2009"),
    tags: ["reel", "Artwork", "video"],
    date: "2026",
    rotation: 0,
  },
  {
    id: 8,
    title: "Punjab Reel",
    category: "Visuals",
    mediaUrl: "/images/punjab.mp4",
    type: "video",
    description: instaDescription("https://instagram.com/radio.2009"),
    tags: ["reel", "Artwork", "video"],
    date: "2026",
    rotation: 0,
  },
  {
    id: 9,
    title: "12 Saal song visuals",
    category: "Visuals",
    mediaUrl: "/images/12saal.mp4",
    type: "video",
    description: instaDescription("https://instagram.com/radio.2009"),
    tags: ["reel", "Artwork", "video"],
    date: "2026",
    rotation: 0,
  },
  {
    id: 10,
    title: "11-11 Artwork",
    category: "Visuals",
    mediaUrl: "/images/11-11.mp4",
    type: "video",
    description: instaDescription("https://instagram.com/radio.2009"),
    tags: ["reel", "Artwork", "video"],
    date: "2026",
    rotation: 0,
  },
];

export const categories = ["Both", "Poster", "Visuals"];