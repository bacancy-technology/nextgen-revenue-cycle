export const summaryMetrics = [
  {
    label: "Net collections",
    value: 482750,
    change: "+12.4%",
    tone: "positive",
  },
  {
    label: "Claims in flight",
    value: 1246,
    change: "-3.1%",
    tone: "positive",
  },
  {
    label: "Denial rate",
    value: "4.8%",
    change: "-0.9%",
    tone: "positive",
  },
  {
    label: "A/R > 90 days",
    value: 96840,
    change: "+1.3%",
    tone: "warning",
  },
];

export const revenueTrend = [
  { month: "Jan", revenue: 312000, collections: 278000 },
  { month: "Feb", revenue: 335000, collections: 294000 },
  { month: "Mar", revenue: 348000, collections: 309000 },
  { month: "Apr", revenue: 362000, collections: 327000 },
  { month: "May", revenue: 389000, collections: 341000 },
  { month: "Jun", revenue: 421000, collections: 376000 },
  { month: "Jul", revenue: 437000, collections: 392000 },
];

export const claimsFunnel = [
  { name: "Created", value: 1680, fill: "#33b3c4" },
  { name: "Scrubbed", value: 1540, fill: "#4bc1d1" },
  { name: "Submitted", value: 1458, fill: "#62cad8" },
  { name: "Accepted", value: 1334, fill: "#7bd8e3" },
  { name: "Paid", value: 1198, fill: "#2fa9ba" },
];

export const collectionRateData = [
  { payer: "Medicare", rate: 94 },
  { payer: "BCBS", rate: 91 },
  { payer: "Aetna", rate: 88 },
  { payer: "United", rate: 86 },
  { payer: "Self-pay", rate: 73 },
];

export const arBuckets = [
  { label: "0-30", amount: 182000 },
  { label: "31-60", amount: 118000 },
  { label: "61-90", amount: 77400 },
  { label: "90+", amount: 48250 },
];

export const patients = [
  {
    id: "PT-1001",
    name: "Olivia Bennett",
    mrn: "MRN-49218",
    dob: "1988-05-14",
    phone: "(312) 555-0129",
    payer: "Blue Cross PPO",
    location: "Chicago Central",
    provider: "Dr. Shah",
    status: "Active",
    balance: 420,
    nextAppointment: "2026-03-18T09:15:00",
    lastVisit: "2026-02-24T13:00:00",
    risk: "Medium",
    documents: ["Insurance Card", "Consent Form"],
    history: [
      "Eligibility verified 2 days ago",
      "Claim 43192 submitted for cardiology follow-up",
    ],
  },
  {
    id: "PT-1002",
    name: "Noah Carter",
    mrn: "MRN-49264",
    dob: "1974-10-02",
    phone: "(312) 555-0180",
    payer: "Medicare",
    location: "Oak Brook",
    provider: "Dr. Rivera",
    status: "Pending documents",
    balance: 1280,
    nextAppointment: "2026-03-16T10:45:00",
    lastVisit: "2026-03-01T11:30:00",
    risk: "High",
    documents: ["Referral", "Medical Necessity Note"],
    history: [
      "Authorization follow-up due today",
      "Outstanding invoice from February cycle",
    ],
  },
  {
    id: "PT-1003",
    name: "Sophia Martinez",
    mrn: "MRN-49301",
    dob: "1993-09-27",
    phone: "(847) 555-0110",
    payer: "United Healthcare",
    location: "Naperville",
    provider: "Dr. Lee",
    status: "Active",
    balance: 210,
    nextAppointment: "2026-03-20T14:00:00",
    lastVisit: "2026-02-19T09:20:00",
    risk: "Low",
    documents: ["Insurance Card"],
    history: [
      "Patient portal payment posted yesterday",
      "New preventive visit scheduled",
    ],
  },
  {
    id: "PT-1004",
    name: "Liam Jackson",
    mrn: "MRN-49318",
    dob: "1981-12-11",
    phone: "(708) 555-0155",
    payer: "Aetna",
    location: "Chicago Central",
    provider: "Dr. Patel",
    status: "Needs eligibility review",
    balance: 860,
    nextAppointment: "2026-03-15T16:20:00",
    lastVisit: "2026-02-13T15:30:00",
    risk: "Medium",
    documents: ["Photo ID", "Insurance Card"],
    history: [
      "Subscriber mismatch flagged by eligibility engine",
      "Appeal draft linked to January claim",
    ],
  },
  {
    id: "PT-1005",
    name: "Emma Walker",
    mrn: "MRN-49342",
    dob: "1967-06-08",
    phone: "(630) 555-0192",
    payer: "Self-pay",
    location: "Virtual",
    provider: "Dr. Chen",
    status: "Collections plan",
    balance: 2330,
    nextAppointment: "2026-03-21T08:30:00",
    lastVisit: "2026-01-29T08:00:00",
    risk: "High",
    documents: ["Payment Plan"],
    history: [
      "Three installment reminders sent",
      "Portal statement downloaded last week",
    ],
  },
];

export const appointments = [
  {
    id: "AP-2001",
    patient: "Olivia Bennett",
    provider: "Dr. Shah",
    time: "09:15 AM",
    type: "Follow-up",
    location: "Chicago Central",
    status: "Confirmed",
  },
  {
    id: "AP-2002",
    patient: "Noah Carter",
    provider: "Dr. Rivera",
    time: "10:45 AM",
    type: "Consult",
    location: "Oak Brook",
    status: "Eligibility hold",
  },
  {
    id: "AP-2003",
    patient: "Emma Walker",
    provider: "Dr. Chen",
    time: "01:00 PM",
    type: "Telehealth",
    location: "Virtual",
    status: "Reminder sent",
  },
];

export const claims = [
  {
    id: "CLM-43192",
    patient: "Olivia Bennett",
    payer: "Blue Cross PPO",
    amount: 1240,
    status: "Submitted",
    age: "3 days",
    denialReason: null,
    assignedTo: "Ariana Reed",
  },
  {
    id: "CLM-43183",
    patient: "Noah Carter",
    payer: "Medicare",
    amount: 2160,
    status: "Denied",
    age: "8 days",
    denialReason: "Missing authorization",
    assignedTo: "James Patel",
  },
  {
    id: "CLM-43177",
    patient: "Sophia Martinez",
    payer: "United Healthcare",
    amount: 860,
    status: "Accepted",
    age: "2 days",
    denialReason: null,
    assignedTo: "Ariana Reed",
  },
  {
    id: "CLM-43154",
    patient: "Liam Jackson",
    payer: "Aetna",
    amount: 1450,
    status: "Appeal in review",
    age: "14 days",
    denialReason: "Modifier mismatch",
    assignedTo: "Neha Kapoor",
  },
  {
    id: "CLM-43120",
    patient: "Emma Walker",
    payer: "Self-pay",
    amount: 620,
    status: "Patient balance",
    age: "18 days",
    denialReason: null,
    assignedTo: "James Patel",
  },
];

export const payments = [
  {
    id: "PAY-701",
    source: "Portal card",
    patient: "Sophia Martinez",
    amount: 210,
    date: "2026-03-12",
    status: "Settled",
  },
  {
    id: "PAY-702",
    source: "ERA / EFT",
    patient: "Olivia Bennett",
    amount: 980,
    date: "2026-03-13",
    status: "Posted",
  },
  {
    id: "PAY-703",
    source: "ACH plan",
    patient: "Emma Walker",
    amount: 450,
    date: "2026-03-11",
    status: "Pending",
  },
];

export const invoices = [
  {
    id: "INV-8801",
    patient: "Emma Walker",
    balance: 2330,
    dueDate: "2026-03-20",
    status: "Installment plan",
  },
  {
    id: "INV-8802",
    patient: "Noah Carter",
    balance: 1280,
    dueDate: "2026-03-17",
    status: "Statement sent",
  },
  {
    id: "INV-8803",
    patient: "Olivia Bennett",
    balance: 420,
    dueDate: "2026-03-25",
    status: "New balance",
  },
];

export const analyticsKpis = [
  { label: "Clean claim rate", value: "96.2%" },
  { label: "Days in A/R", value: "34.1" },
  { label: "Revenue per provider", value: "$127k" },
  { label: "First pass acceptance", value: "99.0%" },
];

export const codingQueue = [
  { diagnosis: "I10", procedure: "99214", status: "Validated" },
  { diagnosis: "E11.9", procedure: "83036", status: "Needs modifier" },
  { diagnosis: "M54.5", procedure: "97110", status: "Eligible" },
];

export const eligibilityChecks = [
  { patient: "Olivia Bennett", response: "Active", checkedAt: "08:42 AM" },
  { patient: "Noah Carter", response: "Auth needed", checkedAt: "09:05 AM" },
  { patient: "Liam Jackson", response: "Subscriber mismatch", checkedAt: "09:16 AM" },
];

export const userDirectory = [
  { name: "Ariana Reed", role: "Billing Staff", access: "Claims, Payments" },
  { name: "Dr. Shah", role: "Provider", access: "Schedule, Clinical review" },
  { name: "Marcus Young", role: "Admin", access: "RBAC, Audit, Settings" },
];

export const auditLogs = [
  {
    event: "Claim CLM-43183 appealed",
    actor: "James Patel",
    time: "2026-03-14 08:52",
  },
  {
    event: "Patient payment plan updated",
    actor: "Emma Walker",
    time: "2026-03-14 08:11",
  },
  {
    event: "New billing staff invited",
    actor: "Marcus Young",
    time: "2026-03-13 17:44",
  },
];
