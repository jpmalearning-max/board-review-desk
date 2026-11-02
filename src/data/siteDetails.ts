export interface WorkCardItem {
  number: string;
  image: string;
  gradientClass: string;
  title: string;
  today: string;
  withBrand: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const SITE_DETAILS = {
  founderName: 'Jameel Pasha',
  founderFirstName: 'Jameel',
  founderInitials: 'JP',
  businessName: 'Board Review Desk',
  whoIHelpLine:
    'For Engineering final year students and who brings board without circuit diagrams in Viajayawada',
  city: 'Viajayawada',
  promiseBefore: 'Less tracing, more ',
  promiseItalic: 'boards',
  promiseAfter: ' out the door.',
  heroSetupSentence:
    'I set up a board intake form, a board status board, and a Monday list of faulty boards on sale for your shop.',
  price: 'Rs 15,000 setup + Rs 5,000 a month',
  bookingUrl: 'https://cal.com/jameel-pasha-62vmsx/20-minute-intro-call',
  whatsappUrl: 'https://wa.me/919701765572',
  email: 'jpmalearning@gmail.com',
  emailUrl: 'mailto:jpmalearning@gmail.com',
  aboutLetter:
    'I help circuit board repair shops across India get boards fixed when no diagram comes with them. I hate seeing a good shop lose a customer over a board nobody can read. I like the moment a shop stops guessing and starts repairing.',
  problemSentence:
    'A customer or an engineering final year student walks into your shop with a dead board and no circuit diagram, it sits on your bench while you trace blind and answer the same status questions again and again, and a good customer walks away before your shop stops guessing and starts repairing.',
  finalHeadline: "Let's clear your bench and get more boards out the door.",
  year: '2026',
  images: {
    logo: '/logo.png',
    me: '/me.jpg',
    work1: '/work-1.jpg',
    work2: '/work-2.jpg',
    work3: '/work-3.jpg',
  },
} as const;

export const WORK_CARDS: WorkCardItem[] = [
  {
    number: '01',
    image: SITE_DETAILS.images.work1,
    gradientClass: 'rich-panel-1',
    title: 'Board intake form',
    today:
      'Boards arrive from customers and engineering final year students without circuit diagrams, and drop-off details get lost on a busy bench.',
    withBrand:
      'Every board enters your shop through a clear board intake form so your team knows what came in, what fault was reported, and whose board it is.',
  },
  {
    number: '02',
    image: SITE_DETAILS.images.work2,
    gradientClass: 'rich-panel-2',
    title: 'Board status board',
    today:
      'Customers keep calling and walking into your shop with the same status questions again and again while you are trying to read a board.',
    withBrand:
      'Every repair sits on a clear board status board so you and your team see what is waiting, what is on the bench, and what is ready.',
  },
  {
    number: '03',
    image: SITE_DETAILS.images.work3,
    gradientClass: 'rich-panel-3',
    title: 'Monday list of faulty boards on sale',
    today:
      'Unrepairable or unclaimed faulty boards pile up in boxes around your shop instead of finding buyers who want parts or practice boards.',
    withBrand:
      'Every Monday your shop puts out a clean list of faulty boards on sale for engineering final year students and buyers.',
  },
];

export const EVENING_WITHOUT: string[] = [
  'Boards brought in without circuit diagrams sit stacked across your bench with handwritten notes or no notes at all.',
  'Your evening goes into tracing tracks by hand and trying to remember what fault each customer described at drop-off.',
  'Phone calls and shop visits interrupt your focus with the same status questions again and again.',
  'Faulty boards nobody could read stay piled in a corner while a good customer gives up waiting.',
];

export const EVENING_WITH: string[] = [
  'Every board on your bench has its intake details recorded on your board intake form before repair work starts.',
  'Your board status board shows what is waiting, what is being checked on the bench, and what is ready for pickup.',
  'Your team checks the board status board to answer customer questions while repair work carries on.',
  'Faulty boards set aside during the week are ready for your Monday list of faulty boards on sale.',
];

export const HOW_WE_START_STEPS: StepItem[] = [
  {
    number: '01',
    title: 'A 20 minute call',
    description:
      'You tell me how boards come into your circuit board repair shop today and where jobs stall when no circuit diagram comes with them.',
  },
  {
    number: '02',
    title: 'A plan for your circuit board repair shop',
    description:
      'I map out your board intake form, your board status board, and your Monday list of faulty boards on sale around your bench.',
  },
  {
    number: '03',
    title: 'I set it up and show your team',
    description:
      'I put Board Review Desk in place for your shop and walk you and your team through running it day to day.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Who is Board Review Desk for?',
    answer:
      'It is for circuit board repair shops across India, including shops in Viajayawada serving engineering final year students and anyone who brings a board without circuit diagrams.',
  },
  {
    question: 'What do you set up?',
    answer:
      'I set up a board intake form, a board status board, and a Monday list of faulty boards on sale.',
  },
  {
    question: 'How long does setup take?',
    answer:
      'Setup timing is agreed on our 20 minute call when I hear how your shop works.',
  },
  {
    question: 'What does it cost?',
    answer: SITE_DETAILS.price,
  },
  {
    question: 'How do we start?',
    answer:
      'Book a 20 minute call with the button on this page, or message me on WhatsApp or by email.',
  },
];
