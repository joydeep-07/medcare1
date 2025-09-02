// src/components/doctors_list.js

const doctors_list = [
  {
    id: 1,
    name: "Dr. Anita Sharma",
    department: "General Medicine",
    specialty: "General Physician",
    bio: "Dr. Sharma is a highly experienced general physician with over 15 years in practice. She focuses on preventative care, **holistic patient well-being**, and chronic disease management. Her approach emphasizes **patient education and personalized treatment plans**.",
    image:
      "https://i.pinimg.com/736x/a6/78/c7/a678c77bd016467efa9508e6152d876d.jpg",
    education: "MBBS, MD (General Medicine)",
    experience: "15+ years of experience",
    contact: {
      email: "anita.sharma@example.com",
      phone: "+91-9876543210",
    },
  },
  {
    id: 2,
    name: "Dr. Rajesh Kumar",
    department: "General Medicine",
    specialty: "Family Physician",
    bio: "Dr. Kumar is passionate about patient education and provides comprehensive primary care services for adults and families. He is dedicated to **fostering long-term patient relationships** and promoting **healthy lifestyle choices**.",
    image:
      "https://t4.ftcdn.net/jpg/07/07/89/33/360_F_707893394_5DEhlBjWOmse1nyu0rC9T7ZRvsAFDkYC.jpg",
    education: "MBBS, DNB (Family Medicine)",
    experience: "12+ years of experience",
    contact: {
      email: "rajesh.kumar@example.com",
      phone: "+91-9876543211",
    },
  },
  {
    id: 3,
    name: "Dr. Naresh Tehran",
    department: "Cardiology",
    specialty: "Interventional Cardiologist",
    bio: "A leading cardiologist, Dr. Gupta specializes in interventional cardiology and the treatment of complex heart conditions. He is renowned for his **precision in diagnostics** and his commitment to **cutting-edge cardiac procedures**.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmuven5L6Ma29G5YmwU61kM-fFVwS33-OkTQ&s",
    education: "MBBS, MD (Cardiology), DM (Cardiology)",
    experience: "20+ years of experience",
    contact: {
      email: "naresh.tehran@example.com",
      phone: "+91-9876543212",
    },
  },
  {
    id: 4,
    name: "Dr. Ramkanta Panda",
    department: "Cardiology",
    specialty: "Cardiovascular Surgeon",
    bio: "Dr. Ramkanta provides compassionate care for patients with cardiovascular diseases, with a strong emphasis on lifestyle modifications. He believes in **empowering patients through education** and promoting a **heart-healthy way of life**.",
    image:
      "https://peacemedicaltourism.com/assets/uploads/editor/Dr_Ramakanta_Panda,_Chairman_Asian_Heart_Institute,_Mumbai_(1).jpg",
    education: "MBBS, MS (Cardiothoracic Surgery), M.Ch (CTVS)",
    experience: "25+ years of experience",
    contact: {
      email: "ramkanta.panda@example.com",
      phone: "+91-9876543213",
    },
  },
  {
    id: 5,
    name: "Dr. Bimal Prasad Padhy",
    department: "Neurology",
    specialty: "Neurologist",
    bio: "Specializing in neurological disorders, Dr. Reddy is known for his diagnostic expertise and innovative treatment approaches. He is dedicated to **improving the quality of life** for patients facing complex neurological challenges, employing the **latest advancements in neuro-science**.",
    image:
      "https://www.carehospitals.com/assets/images/main/dr-bimla-prasad-paddy.webp",
    education: "MBBS, MD (General Medicine), DM (Neurology)",
    experience: "18+ years of experience",
    contact: {
      email: "bimal.padhy@example.com",
      phone: "+91-9876543214",
    },
  },
  {
    id: 6,
    name: "Dr. Vikram Sharma",
    department: "Neurology",
    specialty: "Neuro-Physician",
    bio: "Dr has a keen interest in neurodegenerative diseases and offers patient-centered care for a wide range of neurological conditions. She is committed to **advancing research in neurology** and providing **individualized care plans**.",
    image:
      "https://www.carehospitals.com/assets/images/main/dr-vikram-neuro.webp",
    education: "MBBS, MD (Neurology)",
    experience: "14+ years of experience",
    contact: {
      email: "vikram.sharma@example.com",
      phone: "+91-9876543215",
    },
  },
  {
    id: 7,
    name: "Dr. R. Kiran Kumar",
    department: "Pediatrics",
    specialty: "Pediatrician",
    bio: "A beloved pediatrician, Dr provides expert care for children from infancy through adolescence, focusing on growth and development. He creates a **nurturing environment** for her young patients and offers **comprehensigve guidance to parents**.",
    image: "https://www.carehospitals.com/assets/images/main/dr-kiran.webp",
    education: "MBBS, MD (Pediatrics)",
    experience: "10+ years of experience",
    contact: {
      email: "kiran.kumar@example.com",
      phone: "+91-9876543216",
    },
  },
  {
    id: 8,
    name: "Dr. Umesh Tukaram",
    department: "Pediatrics",
    specialty: "Child Specialist",
    bio: "Dr. Umesh Tukaram is committed to children's health, offering comprehensive pediatric services and guidance for parents. He is a strong advocate for **childhood immunizations** and believes in a **collaborative approach to pediatric care**.",
    image:
      "https://www.carehospitals.com/assets/images/main/dr-umesh-tukaram-neuro.webp",
    education: "MBBS, DCH",
    experience: "16+ years of experience",
    contact: {
      email: "umesh.tukaram@example.com",
      phone: "+91-9876543217",
    },
  },
  {
    id: 9,
    name: "Dr. Ankita Mitra",
    department: "Pediatrics",
    specialty: "Developmental Pediatrician",
    bio: "With a focus on preventive pediatric medicine, Dr. Singh ensures children receive the best start in life through regular check-ups and vaccinations. She is dedicated to **promoting healthy habits** and **addressing developmental milestones**.",
    image:
      "https://www.carehospitals.com/assets/images/main/dr-ankita-mitra.webp",
    education: "MBBS, MD (Pediatrics), Fellowship in Developmental Pediatrics",
    experience: "9+ years of experience",
    contact: {
      email: "ankita.mitra@example.com",
      phone: "+91-9876543218",
    },
  },
  {
    id: 10,
    name: "Dr. A Jayachandra",
    department: "Orthopedics",
    specialty: "Orthopedic Surgeon",
    bio: "Dr. A Jayachandra is an orthopedic surgeon specializing in sports injuries and joint replacement, dedicated to restoring mobility. He utilizes **advanced surgical techniques** and emphasizes **post-operative rehabilitation** for optimal recovery.",
    image:
      "https://www.carehospitals.com/assets/images/main/best-pulmonologist-a-jayachandra.webp",
    education: "MBBS, MS (Orthopedics)",
    experience: "22+ years of experience",
    contact: {
      email: "a.jayachandra@example.com",
      phone: "+91-9876543219",
    },
  },
  {
    id: 11,
    name: "Dr. Aditi Laad",
    department: "Orthopedics",
    specialty: "Orthopedic & Joint Replacement Specialist",
    bio: "Expert in musculoskeletal care, Dr. Verma offers both surgical and non-surgical solutions for bone and joint conditions. He is committed to **pain management** and **improving functional outcomes** for his patients.",
    image:
      "https://www.carehospitals.com/indore/assets/images/main/dr-aditi-laad-indore.webp",
    education: "MBBS, MS (Orthopedics), Fellowship in Arthroplasty",
    experience: "13+ years of experience",
    contact: {
      email: "aditi.laad@example.com",
      phone: "+91-9876543220",
    },
  },
  {
    id: 12,
    name: "Dr. Atul Kathed",
    department: "Dermatology",
    specialty: "Dermatologist & Cosmetologist",
    bio: "Dr. Mittal is a dermatologist treating a wide range of skin conditions, from acne to complex dermatological issues, with a focus on skin health. She provides **personalized skincare regimens** and is passionate about **educating patients on sun protection**.",
    image:
      "https://www.carehospitals.com/indore/assets/images/main/dr-atul-khated-indore.webp",
    education: "MBBS, MD (Dermatology, Venereology & Leprosy)",
    experience: "11+ years of experience",
    contact: {
      email: "atul.kathed@example.com",
      phone: "+91-9876543221",
    },
  },
];

export default doctors_list;
