export const profile = {
  name: 'Mihir Kavishwar',
  role: 'PhD student · Electrical & Computer Engineering',
  institution: 'University of Illinois Urbana-Champaign', institutionUrl: 'https://illinois.edu/',
  advisor: { name: 'Naresh Shanbhag', url: 'https://shanbhag.ece.illinois.edu/' },
  description: 'Mihir Kavishwar researches algorithms, architectures, and integrated circuits for energy-efficient signal processing at UIUC, with applications to AI inference, massive MIMO processing, and high-speed electrical and optical interconnects.',
  research: 'My research focuses on algorithms, architectures, and integrated circuits for energy-efficient signal processing, with applications to AI inference, massive MIMO processing, and high-speed electrical and optical interconnects.',
  links: {
    scholar: 'https://scholar.google.com/citations?user=sKpCcWgAAAAJ&hl=en',
    github: 'https://github.com/mihirvk', email: 'mailto:mihirvk2@illinois.edu',
    personalEmail: 'mailto:mihir.kavishwar710@gmail.com',
    linkedin: 'https://www.linkedin.com/in/mihir-kavishwar-862349188/',
    cv: '/cv/', cvPdf: '/assets/pdfs/Mihir_Kavishwar_Academic_CV.pdf',
  },
  cvUpdated: 'October 2026',
} as const;
export const navigation = [
  { label: 'Home', href: '/' }, { label: 'Publications', href: '/publications/' },
  { label: 'Coursework', href: '/course_list/' }, { label: 'Writing', href: '/writing/' },
];
