export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  salary: string;
  category: string;
  description: string;
  requirements: string[];
  postedAt: string;
  logo: string;
  applicants: number;
}

export const categories = [
  "Technology", "Marketing", "Design", "Finance", "Healthcare",
  "Education", "Engineering", "Sales", "Human Resources", "Legal"
];

export const locations = [
  "New York, NY", "San Francisco, CA", "Austin, TX", "Seattle, WA",
  "Chicago, IL", "Boston, MA", "Remote", "Los Angeles, CA"
];

export const jobTypes = ["Full-time", "Part-time", "Contract", "Remote"] as const;

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechNova Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "₹10L - ₹15L",
    category: "Technology",
    description: "Join our engineering team to build cutting-edge web applications using React and TypeScript. You'll work closely with designers and backend engineers to deliver exceptional user experiences.",
    requirements: ["5+ years React experience", "TypeScript proficiency", "Experience with REST APIs", "Strong UI/UX sensibility"],
    postedAt: "2 days ago",
    logo: "TN",
    applicants: 45,
  },
  {
    id: "2",
    title: "Product Marketing Manager",
    company: "GrowthLab",
    location: "New York, NY",
    type: "Full-time",
    salary: "₹8L - ₹12L",
    category: "Marketing",
    description: "Drive product marketing strategies for our B2B SaaS platform. You'll own positioning, messaging, and go-to-market plans for product launches.",
    requirements: ["3+ years product marketing", "B2B SaaS experience", "Strong analytical skills", "Excellent communication"],
    postedAt: "1 day ago",
    logo: "GL",
    applicants: 32,
  },
  {
    id: "3",
    title: "UX/UI Designer",
    company: "DesignCraft Studio",
    location: "Remote",
    type: "Remote",
    salary: "₹7L - ₹11L",
    category: "Design",
    description: "Create beautiful, intuitive interfaces for our clients' digital products. You'll conduct user research, create wireframes, and deliver polished designs in Figma.",
    requirements: ["4+ years UX design", "Figma proficiency", "User research experience", "Design system experience"],
    postedAt: "3 days ago",
    logo: "DC",
    applicants: 58,
  },
  {
    id: "4",
    title: "Data Analyst",
    company: "FinSight Analytics",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "₹6L - ₹9L",
    category: "Finance",
    description: "Analyze financial data and build dashboards to support business decision-making. Work with stakeholders across the organization to derive actionable insights.",
    requirements: ["SQL proficiency", "Python/R experience", "Data visualization tools", "Finance domain knowledge"],
    postedAt: "5 days ago",
    logo: "FS",
    applicants: 27,
  },
  {
    id: "5",
    title: "Backend Engineer",
    company: "CloudScale Systems",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "₹12L - ₹18L",
    category: "Engineering",
    description: "Design and implement scalable microservices architecture. You'll work on high-throughput systems processing millions of requests daily.",
    requirements: ["Node.js or Go experience", "Distributed systems knowledge", "AWS/GCP experience", "Database optimization"],
    postedAt: "1 day ago",
    logo: "CS",
    applicants: 39,
  },
  {
    id: "6",
    title: "Sales Development Representative",
    company: "SalesPro Solutions",
    location: "Austin, TX",
    type: "Full-time",
    salary: "₹4.5L - ₹6L + Incentives",
    category: "Sales",
    description: "Generate qualified leads and build pipeline for our enterprise sales team. You'll be the first point of contact for potential customers.",
    requirements: ["1+ years SDR experience", "CRM proficiency", "Strong communication", "Goal-oriented mindset"],
    postedAt: "4 days ago",
    logo: "SP",
    applicants: 21,
  },
  {
    id: "7",
    title: "DevOps Engineer",
    company: "InfraCore",
    location: "Remote",
    type: "Contract",
    salary: "₹14L - ₹20L",
    category: "Technology",
    description: "Build and maintain CI/CD pipelines, manage cloud infrastructure, and ensure system reliability. You'll work with Kubernetes and Terraform daily.",
    requirements: ["Kubernetes expertise", "Terraform/IaC", "CI/CD pipelines", "Monitoring & observability"],
    postedAt: "6 hours ago",
    logo: "IC",
    applicants: 15,
  },
  {
    id: "8",
    title: "HR Business Partner",
    company: "PeopleFirst Corp",
    location: "Boston, MA",
    type: "Full-time",
    salary: "₹7L - ₹10L",
    category: "Human Resources",
    description: "Partner with business leaders to develop and implement HR strategies that support organizational growth and employee engagement.",
    requirements: ["5+ years HR experience", "SHRM certification preferred", "Change management", "Employee relations"],
    postedAt: "3 days ago",
    logo: "PF",
    applicants: 18,
  },
];

export const stats = [
  { label: "Jobs Posted", value: "12,450+" },
  { label: "Companies", value: "3,200+" },
  { label: "Candidates", value: "85,000+" },
  { label: "Successful Hires", value: "9,800+" },
];
