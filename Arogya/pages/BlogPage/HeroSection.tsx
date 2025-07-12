import { HoverEffect } from '@/components/ui/card-hover-effect';

export default function HeroSection() {
  return (
    <div className="h-auto bg-gradient-to-b from-white to-green-100">
      <div className="max-w-5xl mt-16 mx-auto">
        <HoverEffect spotlight={spotlight} items={projects} />
      </div>
    </div>
  );
}

export const spotlight = {
  label: 'Lorem, Ipsum / Dolor',
  title: 'Lorem Ipsum Dolor Sit Amet',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation.',
  image: 'https://alpexcursion.com/storage/media/Blog/Lauterbrunnen.webp',
  date: '12 July',
  location: 'Global',
};

export const projects = [
  {
    label: 'Lorem / Ipsum',
    title: 'Card One',
    link: '',
    image: 'https://alpexcursion.com/storage/media/Blog/Lauterbrunnen.webp',
    date: '10 July',
    location: 'India',
  },
  {
    label: 'Dolor / Sit',
    title: 'Card Two',
    link: '',
    image: 'https://alpexcursion.com/storage/media/Blog/Lauterbrunnen.webp',
    date: '9 July',
    location: 'USA',
  },
  {
    label: 'Adipiscing / Elit',
    title: 'Card Three',
    link: '',
    image: 'https://alpexcursion.com/storage/media/Blog/Lauterbrunnen.webp',
    date: '8 July',
    location: 'Europe',
  },
  {
    label: 'Tempor / Incididunt',
    title: 'Card Four',
    link: '',
    image: 'https://alpexcursion.com/storage/media/Blog/Lauterbrunnen.webp',
    date: '7 July',
    location: 'Asia',
  },
  {
    label: 'Ut / Enim',
    title: 'Card Five',
    link: '',
    image: 'https://alpexcursion.com/storage/media/Blog/Lauterbrunnen.webp',
    date: '6 July',
    location: 'UK',
  },
  {
    label: 'Veniam / Quis',
    title: 'Card Six',
    link: '',
    image: 'https://alpexcursion.com/storage/media/Blog/Lauterbrunnen.webp',
    date: '5 July',
    location: 'Canada',
  },
];
