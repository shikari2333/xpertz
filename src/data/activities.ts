
export interface Activity {
  id: string;
  label: string;
  top: string;
  left: string;
  icon: string;
  highlights: string[];
}

export const activities: Activity[] = [
  {
    id: 'munnar',
    label: 'Munnar',
    top: '20%',
    left: '30%',
    icon: '/icons/tea.svg',
    highlights: ['Tea Museums', 'Eravikulam NP', 'Mattupetty Dam'],
  },
  {
    id: 'thekkady',
    label: 'Thekkady',
    top: '35%',
    left: '50%',
    icon: '/icons/wildlife.svg',
    highlights: ['Periyar Lake', 'Wildlife Safari', 'Spice Plantations'],
  },
  {
    id: 'ramak',
    label: 'Ramakkalmedu',
    top: '45%',
    left: '40%',
    icon: '/icons/wind.svg',
    highlights: ['Wind Farm', 'Kuravan & Kurathi', 'Sunrise Views'],
  },
  {
    id: 'vagamon',
    label: 'Vagamon',
    top: '55%',
    left: '60%',
    icon: '/icons/paragliding.svg',
    highlights: ['Meadows', 'Paragliding', 'Pine Forests'],
  },
  {
    id: 'idhdam',
    label: 'Idukki Arch Dam',
    top: '65%',
    left: '45%',
    icon: '/icons/dam.svg',
    highlights: ['Engineering Marvel', 'Boat Rides', 'Valley Views'],
  },
  {
    id: 'nedum',
    label: 'Nedumkandam',
    top: '80%',
    left: '50%',
    icon: '/icons/home.svg',
    highlights: ['Local Culture', 'Markets', 'Kerala Experiences'],
  },
];
