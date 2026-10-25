import solomonPhoto from '../images/1725732793686.jpeg';
import kingsleyPhoto from '../images/WhatsApp Image 2026-05-24 at 17.59.11.jpeg';
import ibrahimPhoto from '../images/WhatsApp Image 2026-05-24 at 17.58.54.jpeg';
import mosesPhoto from '../images/WhatsApp Image 2026-05-24 at 18.16.37moses.jpeg';
import funmiPhoto from '../images/funmi.jpeg';

export interface Leader {
  name: string;
  role: string;
  image: string;
  email: string;
  linkedin: string;
  founder: boolean;
}

export const leaders: Leader[] = [
  { name: 'Odelola Solomon O.', role: 'General Managing Director, Co-founder & Head of Engineering', image: solomonPhoto, email: 'solomon@vislybluq.com', linkedin: 'https://www.linkedin.com/company/vislybluq', founder: true },
  { name: 'Ibekwe Kingsley', role: 'CEO, Co-founder & Senior Software Engineer', image: kingsleyPhoto, email: 'kingsley@vislybluq.com', linkedin: 'https://www.linkedin.com/company/vislybluq', founder: true },
  { name: 'Oluwatifunmilayo Ude', role: 'Co-founder and Head of AI and Data Engineering', image: funmiPhoto, email: 'hello@vislybluq.com', linkedin: 'https://www.linkedin.com/company/vislybluq', founder: true },
  { name: 'Ibrahim Modupe', role: 'Product and Operations Lead', image: ibrahimPhoto, email: 'modupe@vislybluq.com', linkedin: 'https://www.linkedin.com/company/vislybluq', founder: false },
  { name: 'Festus Moses', role: 'Head of Legal & Corporate Affairs', image: mosesPhoto, email: 'moses@vislybluq.com', linkedin: 'https://www.linkedin.com/company/vislybluq', founder: false },
];

export const founders = leaders.filter((leader) => leader.founder);
