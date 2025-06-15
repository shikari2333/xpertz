
export interface Activity {
  id: string;
  label: string;
  top: string;
  left: string;
  icon: string;
  highlights: string[];
  distance?: string;
  time?: string;
}

export const activities: Activity[] = [  {
    id: "nedum",
    label: "Nedumkandam",
    top: "650px",
    left: "500px", 
    icon: "/assets/nedumkandam.png",
    highlights: ["Your central hub in Idukki", "Gateway to High Ranges"],
  },
  {
    id: "munnar",
    label: "Munnar",
    top: "150px",
    left: "250px",
    icon: "/svg/munnar.png",
    highlights: ["Tea Plantations", "Eravikulam National Park", "Munnar Tea Museum"],
    distance: "90 km",
    time: "2 hr 30 min",
  },
  {
    id: "thekkady",
    label: "Thekkady",
    top: "700px",
    left: "680px",
    icon: "/svg/tekady.png",
    highlights: ["Periyar Wildlife Sanctuary", "Boat Safari", "Spice Plantations"],
    distance: "60 km",
    time: "1 hr 45 min",
  },
  {
    id: "ramakkalmedu",
    label: "Ramakkalmedu",
    top: "600px",
    left: "600px",
    icon: "/svg/ramakkalmedu.png",
    highlights: ["Windmills", "Panoramic Views", "Trekking"],
    distance: "25 km",
    time: "45 min",
  },
  {
    id: "vagamon",
    label: "Vagamon",
    top: "750px",
    left: "280px",
    icon: "/svg/vagamon.png",
    highlights: ["Green Meadows", "Pine Forests", "Paragliding"],
    distance: "70 km",
    time: "2 hr",
  },
  {
    id: "idukki-dam",
    label: "Idukki Arch Dam",
    top: "400px",
    left: "150px",
    icon: "/svg/idukkidam.png",
    highlights: ["Asia's Largest Arch Dam", "Panoramic Views", "Boating"],
    distance: "75 km",
    time: "2 hr 15 min",
  },
];
