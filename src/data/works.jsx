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
    category: "Covers",
    mediaUrl: "/images/tere-warga.jpg",
    type: "image",
    description: instaDescription("https://instagram.com/radio.2009"),
    tags: ["cover art", "music", "illustration"],
    date: "2024",
    rotation: 2,
  },
  {
    id: 2, // ✅ fixed duplicate id
    title: "Art for Real boss",
    category: "Covers",
    mediaUrl: "/images/realboss.jpg",
    type: "image",
    description: instaDescription("https://instagram.com/radio.2009"),
    tags: ["cover art", "music", "illustration"],
    date: "2024",
    rotation: -3,
  },
  {
    id: 3,
    title: "Ho Bas Dooron Tarde Rahe",
    category: "Stories",
    mediaUrl: "/images/dooron.png",
    type: "image",
    description: instaDescription("https://instagram.com/radio.2009"),
    tags: ["scenery", "train", "mood"],
    date: "2024",
    rotation: -2,
  },
  {
    id: 4,
    title: "Chitt Rall Kre",
    category: "Illustrations",
    mediaUrl: "/images/chitt-rall.png",
    type: "image",
    description: instaDescription("https://instagram.com/radio.2009"),
    tags: ["room", "vinyl", "music wall"],
    date: "2024",
    rotation: 1,
  },
  {
    id: 5,
    title: "The Red Room",
    category: "Illustrations",
    mediaUrl: "/images/red-room.png",
    type: "image",
    description: instaDescription("https://instagram.com/radio.2009"),
    tags: ["room", "portrait", "vinyl"],
    date: "2024",
    rotation: -4,
  },
  {
    id: 6,
    title: "Pind",
    category: "Covers",
    mediaUrl: "/images/savegram2.jpg",
    type: "image",
    description: instaDescription("https://instagram.com/radio.2009"),
    tags: ["cover art", "landscape"],
    date: "2024",
    rotation: 2,
  },
  {
    id: 7,
    title: "Radio.2009 Reel",
    category: "Videos",
    mediaUrl: "/images/herovideo.mp4",
    type: "video",
    description: instaDescription("https://instagram.com/radio.2009"),
    tags: ["reel", "process", "video"],
    date: "2024",
    rotation: 0,
  },
  {
    id: 8,
    title: "Punjab Reel",
    category: "Videos",
    mediaUrl: "/images/punjab.mp4",
    type: "video",
    description: instaDescription("https://instagram.com/radio.2009"),
    tags: ["reel", "process", "video"],
    date: "2024",
    rotation: 0,
  },
];

export const categories = ["All", "Covers", "Illustrations", "Stories", "Branding", "Videos"];