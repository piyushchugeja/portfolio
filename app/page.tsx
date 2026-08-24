import { Hero } from '@/components/home/Hero';
import { Work } from '@/components/home/Work';
import { Experience } from '@/components/home/Experience';
import { Skills } from '@/components/home/Skills';
import { Education } from '@/components/home/Education';
import { Recognition } from '@/components/home/Recognition';
import { Independent } from '@/components/home/Independent';
import { Contact } from '@/components/home/Contact';

/* Recruiter priority, not chronology: what he built, then where, then with
   what, then the credentials that back it up. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Work />
      <Experience />
      <Skills />
      <Education />
      <Recognition />
      <Independent />
      <Contact />
    </>
  );
}
