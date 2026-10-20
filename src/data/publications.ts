import { z } from 'zod';
const publicationSchema = z.object({
  id: z.string(), title: z.string(), authors: z.array(z.string()).min(1),
  year: z.number().int(), venue: z.string(), type: z.enum(['Journal', 'Conference', 'Preprint']),
  url: z.string().url(), doi: z.string().optional(), details: z.string().optional(),
  selected: z.boolean().default(false),
});
export type Publication = z.infer<typeof publicationSchema>;
export const publications = z.array(publicationSchema).parse([
  {
    id: 'dim-2026', title: 'Detector-in-Memory for Massive MIMO Detection',
    authors: ['Ryan Yuyang Fu', 'Mihir Kavishwar', 'Naresh Shanbhag'], year: 2026,
    venue: 'IEEE International Symposium on Circuits and Systems (ISCAS)', type: 'Conference',
    url: 'https://doi.org/10.1109/ISCAS66217.2026.11562752', doi: '10.1109/ISCAS66217.2026.11562752',
    details: 'pp. 1122–1126', selected: true,
  },
  {
    id: 'adc-2026', title: 'Minimizing ADC Precision for Analog In-Memory Computing',
    authors: ['Mihir Kavishwar', 'Naresh Shanbhag'], year: 2026,
    venue: 'IEEE International Conference on Acoustics, Speech, and Signal Processing (ICASSP)', type: 'Conference',
    url: 'https://doi.org/10.1109/ICASSP55912.2026.11465137', doi: '10.1109/ICASSP55912.2026.11465137',
    selected: true,
  },
  {
    id: 'energy-accuracy-2026', title: 'Energy-Accuracy Trade-Offs in Massive MIMO Signal Detection Using SRAM-Based In-Memory Computing',
    authors: ['Mihir Kavishwar', 'Naresh R. Shanbhag'], year: 2026,
    venue: 'IEEE Transactions on Circuits and Systems I: Regular Papers', type: 'Journal',
    url: 'https://doi.org/10.1109/TCSI.2025.3594230', doi: '10.1109/TCSI.2025.3594230',
    details: 'vol. 73, no. 1, pp. 513–526 · First published online in 2025', selected: true,
  },
  {
    id: 'csnr-adc-2025', title: 'Compute SNR-Optimal Analog-to-Digital Converters for Analog In-Memory Computing',
    authors: ['Mihir Kavishwar', 'Naresh Shanbhag'], year: 2025, venue: 'arXiv:2507.09776', type: 'Preprint', url: 'https://arxiv.org/abs/2507.09776',
  },
  {
    id: 'mimo-2024', title: 'Massive MIMO Signal Detection using SRAM-based In-Memory Computing',
    authors: ['Mihir Kavishwar', 'Naresh Shanbhag'], year: 2024,
    venue: 'IEEE International Symposium on Circuits and Systems (ISCAS)', type: 'Conference',
    url: 'https://doi.org/10.1109/ISCAS58744.2024.10558118', doi: '10.1109/ISCAS58744.2024.10558118', details: 'Singapore · pp. 1–5',
  },
  {
    id: 'vad-indicon-2022', title: 'Analog Acoustic Feature Extraction and Delta-Sigma Modulation based Neural Network Classification for Voice Activity Detection',
    authors: ['Mihir Kavishwar', 'Prashant Kurrey', 'Rajesh Zele'], year: 2022,
    venue: 'IEEE India Council International Conference (INDICON)', type: 'Conference',
    url: 'https://doi.org/10.1109/INDICON56171.2022.10039873', doi: '10.1109/INDICON56171.2022.10039873', details: 'Kochi, India · pp. 1–4',
  },
  {
    id: 'vad-icecs-2022', title: 'Analog/Mixed-Signal Classification for Voice Activity Detection',
    authors: ['Prashant Kurrey', 'Mihir Kavishwar', 'Rajesh Zele'], year: 2022,
    venue: 'IEEE International Conference on Electronics, Circuits and Systems (ICECS)', type: 'Conference',
    url: 'https://doi.org/10.1109/ICECS202256217.2022.9971057', doi: '10.1109/ICECS202256217.2022.9971057', details: 'Glasgow, UK · pp. 1–4',
  },
]);
