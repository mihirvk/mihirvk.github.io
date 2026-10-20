import { z } from 'zod';
const updateSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), title: z.string(), text: z.string(),
  category: z.enum(['Research', 'Presentation', 'Award', 'Service', 'Life', 'Experience']),
  links: z.array(z.object({ label: z.string(), href: z.string().url() })).default([]),
});
export type Update = z.infer<typeof updateSchema>;
// Dates describe the event; conference dates do not imply acceptance dates.
export const updates = z.array(updateSchema).parse([
  { date: '2026-08-01', category: 'Experience', title: 'Summer internship at NVIDIA',
    text: 'I spent June–August 2026 as a summer intern in NVIDIA’s digital mixed-signal design team, working on optical interconnects.' },
  { date: '2026-05-25', category: 'Research', title: 'Detector-in-Memory at ISCAS 2026',
    text: 'Our paper, “Detector-in-Memory for Massive MIMO Detection,” appeared at ISCAS 2026.',
    links: [{ label: 'Paper', href: 'https://doi.org/10.1109/ISCAS66217.2026.11562752' }] },
  { date: '2026-05-08', category: 'Presentation', title: 'ICASSP, Barcelona',
    text: 'I presented our paper, “Minimizing ADC Precision for Analog In-Memory Computing,” at ICASSP 2026 in Barcelona, Spain.',
    links: [{ label: 'Paper', href: 'https://doi.org/10.1109/ICASSP55912.2026.11465137' }, { label: 'Session', href: 'https://www.cmsworkshops.com/ICASSP2026/view_session.php?SessionID=1387&bare=1' }] },
  { date: '2026-04-28', category: 'Award', title: 'Paul D. Coleman Outstanding Research Award',
    text: 'I received the 2026 Paul D. Coleman Outstanding Research Award from Illinois ECE.',
    links: [{ label: 'Award recipients', href: 'https://ece.illinois.edu/academics/awards/banquet/2026' }] },
  { date: '2026-02-25', category: 'Service', title: 'Session chair at the CSL Student Conference',
    text: 'I co-chaired the Circuits, Architectures, and Scalable Systems session at the CSL Student Conference 2026.',
    links: [{ label: 'Organizing committee', href: 'https://studentconference.csl.illinois.edu/organizing-committee/' }] },
  { date: '2025-08-01', category: 'Research', title: 'Paper accepted in IEEE TCAS-I',
    text: '“Energy-Accuracy Trade-Offs in Massive MIMO Signal Detection Using SRAM-Based In-Memory Computing” was accepted in IEEE Transactions on Circuits and Systems I: Regular Papers.',
    links: [{ label: 'Paper', href: 'https://doi.org/10.1109/TCSI.2025.3594230' }] },
  { date: '2024-01-01', category: 'Research', title: 'Paper accepted at ISCAS 2024',
    text: '“Massive MIMO Signal Detection using SRAM-based In-Memory Computing” was accepted for a lecture presentation at ISCAS 2024.',
    links: [{ label: 'Paper', href: 'https://doi.org/10.1109/ISCAS58744.2024.10558118' }] },
  { date: '2023-05-01', category: 'Life', title: 'Moving to Illinois', text: 'I transferred from Princeton University to the University of Illinois Urbana-Champaign.' },
  { date: '2022-09-01', category: 'Life', title: 'Starting at Princeton', text: 'I started as a PhD student in Princeton’s Department of Electrical and Computer Engineering.' },
  { date: '2022-09-01', category: 'Research', title: 'Voice activity detection papers accepted',
    text: 'Our work on analog acoustic feature extraction and mixed-signal classification for voice activity detection was accepted for lecture presentations at ICECS and INDICON 2022.',
    links: [{ label: 'ICECS paper', href: 'https://doi.org/10.1109/ICECS202256217.2022.9971057' }, { label: 'INDICON paper', href: 'https://doi.org/10.1109/INDICON56171.2022.10039873' }] },
  { date: '2022-08-01', category: 'Award', title: 'Graduating from IIT Bombay', text: 'I graduated with BTech and MTech degrees in Electrical Engineering and a minor in Systems and Control Engineering, and received the Undergraduate Research Award (URA03).' },
  { date: '2022-01-01', category: 'Service', title: 'Teaching Mixed-Signal VLSI Design', text: 'I started as a teaching assistant for EE719 Mixed-Signal VLSI Design at IIT Bombay.' },
  { date: '2021-12-01', category: 'Service', title: 'Writing for BackgroundHum', text: 'I co-authored articles on the global chip shortage and the IIT Bombay EE PhD program for the department’s student newsletter, BackgroundHum.',
    links: [{ label: 'Chip shortage', href: 'https://www.ee.iitb.ac.in/~bh/pages/articles/Global-Chip-Shortage.html' }, { label: 'PhD program', href: 'https://www.ee.iitb.ac.in/~bh/pages/articles/Demystifying-the-PhD-Program.html' }] },
]);
