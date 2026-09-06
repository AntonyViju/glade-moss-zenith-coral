export type AppId =
  | "home"
  | "crm"
  | "sales"
  | "buying"
  | "stock"
  | "accounts"
  | "hr"
  | "mfg"
  | "projects"
  | "studio";

export type Activity = {
  type: "comment" | "email" | "change" | "call" | "note";
  author: string;
  time: string;
  text: string;
};

export type LineItem = {
  item: string;
  description: string;
  qty: number;
  rate: number;
  uom: string;
};

export type FieldDef = {
  name: string;
  label: string;
  type: "text" | "select" | "date" | "currency" | "textarea" | "link" | "number" | "percent";
  options?: string[];
  span?: 1 | 2;
};

export type DeskRecord = {
  id: string;
  title: string;
  subtitle?: string;
  status: string;
  stage?: string;
  amount?: number;
  date?: string;
  owner?: string;
  tags?: string[];
  fields: Record<string, string | number>;
  lines?: LineItem[];
  activity?: Activity[];
};

export type DoctypeDef = {
  name: string;
  app: AppId;
  plural: string;
  views: Array<"list" | "kanban" | "dashboard">;
  stages?: string[];
  columns: Array<{ key: string; label: string; kind?: "currency" | "status" | "date" | "text" }>;
  fields: FieldDef[];
  workflow?: string[];
  smart?: Array<{ label: string; value: string }>;
};

export const APPS: Array<{
  id: AppId;
  name: string;
  blurb: string;
  tint: string;
}> = [
  { id: "home", name: "Home", blurb: "Workspace", tint: "ink" },
  { id: "crm", name: "CRM", blurb: "Pipeline & people", tint: "teal" },
  { id: "sales", name: "Sales", blurb: "Quotes to cash", tint: "ink" },
  { id: "buying", name: "Buying", blurb: "Vendors & POs", tint: "stone" },
  { id: "stock", name: "Inventory", blurb: "Items & warehouses", tint: "sage" },
  { id: "accounts", name: "Accounting", blurb: "Ledger & cash", tint: "slate" },
  { id: "hr", name: "HR", blurb: "People ops", tint: "warm" },
  { id: "mfg", name: "Manufacture", blurb: "BOM & work orders", tint: "char" },
  { id: "projects", name: "Projects", blurb: "Delivery board", tint: "olive" },
  { id: "studio", name: "Theme Studio", blurb: "Skin the desk", tint: "teal" },
];

export const NOTIFICATIONS = [
  { id: "n1", title: "SO-24018 overdue", body: "Al-Nour Contracting — SAR 86,400 unpaid 12 days", time: "12m", unread: true },
  { id: "n2", title: "Lead assigned", body: "Ma’aden inquiry routed to Layla Al-Harbi", time: "1h", unread: true },
  { id: "n3", title: "GRN posted", body: "Valve shipment received at Dammam WH", time: "3h", unread: false },
  { id: "n4", title: "Leave approved", body: "Omar Qureshi — 4–6 Sep", time: "Yesterday", unread: false },
];

export const DOCTYPES: Record<string, DoctypeDef> = {
  Lead: {
    name: "Lead",
    app: "crm",
    plural: "Leads",
    views: ["list"],
    columns: [
      { key: "id", label: "ID" },
      { key: "title", label: "Lead" },
      { key: "organization", label: "Organization" },
      { key: "status", label: "Status", kind: "status" },
      { key: "source", label: "Source" },
      { key: "owner", label: "Owner" },
      { key: "date", label: "Date", kind: "date" },
    ],
    fields: [
      { name: "organization", label: "Organization", type: "text" },
      { name: "contact", label: "Contact", type: "text" },
      { name: "email", label: "Email", type: "text" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "source", label: "Source", type: "select", options: ["Website", "Referral", "Tender", "Walk-in", "Exhibition"] },
      { name: "territory", label: "Territory", type: "text" },
      { name: "notes", label: "Notes", type: "textarea", span: 2 },
    ],
    workflow: ["New", "Contacted", "Qualified", "Lost"],
    smart: [
      { label: "Opportunities", value: "1" },
      { label: "Calls", value: "3" },
    ],
  },
  Opportunity: {
    name: "Opportunity",
    app: "crm",
    plural: "Opportunities",
    views: ["list", "kanban"],
    stages: ["New", "Qualified", "Proposition", "Negotiation", "Won"],
    columns: [
      { key: "id", label: "ID" },
      { key: "title", label: "Opportunity" },
      { key: "customer", label: "Customer" },
      { key: "status", label: "Stage", kind: "status" },
      { key: "amount", label: "Amount", kind: "currency" },
      { key: "owner", label: "Owner" },
      { key: "date", label: "Close", kind: "date" },
    ],
    fields: [
      { name: "customer", label: "Customer", type: "link" },
      { name: "contact", label: "Contact", type: "text" },
      { name: "probability", label: "Probability", type: "percent" },
      { name: "expected_close", label: "Expected close", type: "date" },
      { name: "source", label: "Source", type: "text" },
      { name: "next_action", label: "Next action", type: "text" },
      { name: "notes", label: "Notes", type: "textarea", span: 2 },
    ],
    workflow: ["New", "Qualified", "Proposition", "Negotiation", "Won"],
    smart: [
      { label: "Quotations", value: "2" },
      { label: "Meetings", value: "4" },
    ],
  },
  "Sales Order": {
    name: "Sales Order",
    app: "sales",
    plural: "Sales Orders",
    views: ["list"],
    columns: [
      { key: "id", label: "ID" },
      { key: "title", label: "Customer" },
      { key: "status", label: "Status", kind: "status" },
      { key: "amount", label: "Grand total", kind: "currency" },
      { key: "delivery_date", label: "Delivery", kind: "date" },
      { key: "owner", label: "Owner" },
      { key: "date", label: "Date", kind: "date" },
    ],
    fields: [
      { name: "customer", label: "Customer", type: "link" },
      { name: "po_no", label: "Customer PO", type: "text" },
      { name: "delivery_date", label: "Delivery date", type: "date" },
      { name: "warehouse", label: "Warehouse", type: "link" },
      { name: "payment_terms", label: "Payment terms", type: "select", options: ["Net 15", "Net 30", "Net 45", "Advance 50%"] },
      { name: "sales_partner", label: "Sales partner", type: "text" },
      { name: "notes", label: "Terms", type: "textarea", span: 2 },
    ],
    workflow: ["Draft", "To Deliver", "To Bill", "Completed"],
    smart: [
      { label: "Pick lists", value: "1" },
      { label: "Invoices", value: "0" },
      { label: "Deliveries", value: "1" },
    ],
  },
  Quotation: {
    name: "Quotation",
    app: "sales",
    plural: "Quotations",
    views: ["list"],
    columns: [
      { key: "id", label: "ID" },
      { key: "title", label: "Customer" },
      { key: "status", label: "Status", kind: "status" },
      { key: "amount", label: "Amount", kind: "currency" },
      { key: "owner", label: "Owner" },
      { key: "date", label: "Valid till", kind: "date" },
    ],
    fields: [
      { name: "customer", label: "Customer", type: "link" },
      { name: "valid_till", label: "Valid till", type: "date" },
      { name: "incoterm", label: "Incoterm", type: "select", options: ["EXW", "FOB", "CIF", "DAP"] },
      { name: "notes", label: "Notes", type: "textarea", span: 2 },
    ],
    workflow: ["Draft", "Open", "Ordered", "Lost"],
  },
  "Purchase Order": {
    name: "Purchase Order",
    app: "buying",
    plural: "Purchase Orders",
    views: ["list"],
    columns: [
      { key: "id", label: "ID" },
      { key: "title", label: "Supplier" },
      { key: "status", label: "Status", kind: "status" },
      { key: "amount", label: "Amount", kind: "currency" },
      { key: "owner", label: "Buyer" },
      { key: "date", label: "Required", kind: "date" },
    ],
    fields: [
      { name: "supplier", label: "Supplier", type: "link" },
      { name: "required_by", label: "Required by", type: "date" },
      { name: "warehouse", label: "Target warehouse", type: "link" },
      { name: "notes", label: "Notes", type: "textarea", span: 2 },
    ],
    workflow: ["Draft", "To Receive", "To Bill", "Completed"],
  },
  Item: {
    name: "Item",
    app: "stock",
    plural: "Items",
    views: ["list"],
    columns: [
      { key: "id", label: "Code" },
      { key: "title", label: "Item" },
      { key: "group", label: "Group" },
      { key: "status", label: "Status", kind: "status" },
      { key: "qty", label: "On hand", kind: "text" },
      { key: "amount", label: "Valuation", kind: "currency" },
    ],
    fields: [
      { name: "item_group", label: "Item group", type: "select", options: ["Pipes", "Valves", "Pumps", "Safety", "Electrical"] },
      { name: "uom", label: "Default UOM", type: "text" },
      { name: "warehouse", label: "Default warehouse", type: "link" },
      { name: "safety_stock", label: "Safety stock", type: "number" },
      { name: "description", label: "Description", type: "textarea", span: 2 },
    ],
    workflow: ["Active", "Active", "Disabled"],
  },
  Employee: {
    name: "Employee",
    app: "hr",
    plural: "Employees",
    views: ["list", "kanban"],
    stages: ["Onboarding", "Active", "On leave", "Notice"],
    columns: [
      { key: "id", label: "ID" },
      { key: "title", label: "Name" },
      { key: "department", label: "Department" },
      { key: "status", label: "Status", kind: "status" },
      { key: "owner", label: "Reports to" },
      { key: "date", label: "Joined", kind: "date" },
    ],
    fields: [
      { name: "department", label: "Department", type: "select", options: ["Sales", "Finance", "Warehouse", "HR", "Procurement"] },
      { name: "designation", label: "Designation", type: "text" },
      { name: "reports_to", label: "Reports to", type: "link" },
      { name: "email", label: "Work email", type: "text" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "joined", label: "Date of joining", type: "date" },
    ],
    workflow: ["Onboarding", "Active", "On leave", "Notice"],
  },
  Task: {
    name: "Task",
    app: "projects",
    plural: "Tasks",
    views: ["list", "kanban"],
    stages: ["Backlog", "In progress", "Review", "Done"],
    columns: [
      { key: "id", label: "ID" },
      { key: "title", label: "Task" },
      { key: "project", label: "Project" },
      { key: "status", label: "Status", kind: "status" },
      { key: "owner", label: "Assignee" },
      { key: "date", label: "Due", kind: "date" },
    ],
    fields: [
      { name: "project", label: "Project", type: "link" },
      { name: "assignee", label: "Assignee", type: "link" },
      { name: "priority", label: "Priority", type: "select", options: ["Low", "Medium", "High"] },
      { name: "due", label: "Due date", type: "date" },
      { name: "notes", label: "Description", type: "textarea", span: 2 },
    ],
    workflow: ["Backlog", "In progress", "Review", "Done"],
  },
  "Work Order": {
    name: "Work Order",
    app: "mfg",
    plural: "Work Orders",
    views: ["list"],
    columns: [
      { key: "id", label: "ID" },
      { key: "title", label: "Item" },
      { key: "status", label: "Status", kind: "status" },
      { key: "qty", label: "Qty" },
      { key: "owner", label: "Supervisor" },
      { key: "date", label: "Due", kind: "date" },
    ],
    fields: [
      { name: "bom", label: "BOM", type: "link" },
      { name: "qty", label: "Qty to manufacture", type: "number" },
      { name: "workshop", label: "Workstation", type: "text" },
      { name: "notes", label: "Notes", type: "textarea", span: 2 },
    ],
    workflow: ["Not started", "In process", "Completed"],
  },
  "Sales Invoice": {
    name: "Sales Invoice",
    app: "accounts",
    plural: "Sales Invoices",
    views: ["list", "dashboard"],
    columns: [
      { key: "id", label: "ID" },
      { key: "title", label: "Customer" },
      { key: "status", label: "Status", kind: "status" },
      { key: "amount", label: "Outstanding", kind: "currency" },
      { key: "owner", label: "Owner" },
      { key: "date", label: "Due", kind: "date" },
    ],
    fields: [
      { name: "customer", label: "Customer", type: "link" },
      { name: "due_date", label: "Due date", type: "date" },
      { name: "payment_terms", label: "Payment terms", type: "text" },
      { name: "notes", label: "Remarks", type: "textarea", span: 2 },
    ],
    workflow: ["Draft", "Unpaid", "Paid", "Overdue"],
  },
};

const act = (
  type: Activity["type"],
  author: string,
  time: string,
  text: string,
): Activity => ({ type, author, time, text });

export const SEED: Record<string, DeskRecord[]> = {
  Lead: [
    {
      id: "CRM-LEAD-0041",
      title: "Ma’aden phosphate spares",
      subtitle: "Ras Al-Khair",
      status: "Qualified",
      date: "2026-09-02",
      owner: "Layla Al-Harbi",
      tags: ["Tender", "Strategic"],
      fields: {
        organization: "Ma’aden",
        contact: "Fahad Al-Qahtani",
        email: "f.qahtani@maaden.com.sa",
        phone: "+966 13 874 1100",
        source: "Tender",
        territory: "Eastern Province",
        notes: "Looking for a 24-month frame agreement on valves and gaskets. Site visit requested.",
      },
      activity: [
        act("call", "Layla Al-Harbi", "2h ago", "Discovery call. Technical pack due Thursday."),
        act("email", "Antony Viju", "Yesterday", "Sent capability statement and ISO certificates."),
      ],
    },
    {
      id: "CRM-LEAD-0038",
      title: "SABIC Jubail instrumentation",
      subtitle: "Jubail Industrial",
      status: "Contacted",
      date: "2026-08-28",
      owner: "Layla Al-Harbi",
      tags: ["Website"],
      fields: {
        organization: "SABIC",
        contact: "Nora Al-Mutairi",
        email: "n.mutairi@sabic.com",
        phone: "+966 13 345 6789",
        source: "Website",
        territory: "Jubail",
        notes: "Need explosion-proof transmitters, Q4 turnaround.",
      },
      activity: [act("email", "Layla Al-Harbi", "3d ago", "Acknowledged RFQ. Waiting on P&ID.")],
    },
    {
      id: "CRM-LEAD-0034",
      title: "Al-Nour contracting yard",
      subtitle: "Dammam 2nd Industrial",
      status: "New",
      date: "2026-09-05",
      owner: "Antony Viju",
      tags: ["Walk-in"],
      fields: {
        organization: "Al-Nour Contracting",
        contact: "Hassan Farid",
        email: "hassan@alnour.sa",
        phone: "+966 50 412 8890",
        source: "Walk-in",
        territory: "Dammam",
        notes: "Walked into the showroom. Interested in PPE + grinding consumables.",
      },
    },
    {
      id: "CRM-LEAD-0031",
      title: "NEOM utility corridor",
      subtitle: "Tabuk",
      status: "Qualified",
      date: "2026-08-19",
      owner: "Layla Al-Harbi",
      tags: ["Referral"],
      fields: {
        organization: "NEOM",
        contact: "Ibrahim Cole",
        email: "i.cole@neom.com",
        phone: "+966 14 555 0190",
        source: "Referral",
        territory: "Tabuk",
        notes: "Referred by Khatib & Alami. Long-cycle, high visibility.",
      },
    },
    {
      id: "CRM-LEAD-0027",
      title: "Bahri dry-dock consumables",
      subtitle: "King Abdulaziz Port",
      status: "Lost",
      date: "2026-07-30",
      owner: "Omar Qureshi",
      tags: ["Exhibition"],
      fields: {
        organization: "Bahri",
        contact: "Yousef Rahman",
        email: "y.rahman@bahri.sa",
        phone: "+966 13 668 2000",
        source: "Exhibition",
        territory: "Dammam Port",
        notes: "Lost on lead time. Keep warm for 2027 dry-dock window.",
      },
    },
  ],
  Opportunity: [
    {
      id: "CRM-OPP-0118",
      title: "Aramco Dhahran valve frame",
      subtitle: "Saudi Aramco",
      status: "Negotiation",
      stage: "Negotiation",
      amount: 1840000,
      date: "2026-10-12",
      owner: "Layla Al-Harbi",
      tags: ["Frame", "Aramco"],
      fields: {
        customer: "Saudi Aramco",
        contact: "Majid Al-Dosari",
        probability: 70,
        expected_close: "2026-10-12",
        source: "Existing",
        next_action: "Commercial clarification workshop",
        notes: "Three-year frame. Legal reviewing liquidated damages clause.",
      },
      activity: [
        act("note", "Layla Al-Harbi", "4h ago", "Procurement asked for 2% annual price lock."),
        act("email", "Antony Viju", "1d ago", "Sent revised commercial schedule."),
      ],
    },
    {
      id: "CRM-OPP-0112",
      title: "Maaden mill spares 2026",
      subtitle: "Ma’aden",
      status: "Proposition",
      stage: "Proposition",
      amount: 620000,
      date: "2026-09-28",
      owner: "Layla Al-Harbi",
      tags: ["Spares"],
      fields: {
        customer: "Ma’aden",
        contact: "Fahad Al-Qahtani",
        probability: 55,
        expected_close: "2026-09-28",
        source: "Tender",
        next_action: "Submit technical pack",
        notes: "Must match OEM form-fit-function.",
      },
    },
    {
      id: "CRM-OPP-0104",
      title: "SABIC transmitters lot",
      subtitle: "SABIC",
      status: "Qualified",
      stage: "Qualified",
      amount: 275000,
      date: "2026-10-04",
      owner: "Antony Viju",
      fields: {
        customer: "SABIC",
        contact: "Nora Al-Mutairi",
        probability: 40,
        expected_close: "2026-10-04",
        source: "Website",
        next_action: "Site survey",
        notes: "Need ATEX docs.",
      },
    },
    {
      id: "CRM-OPP-0098",
      title: "Harbor yard expansion PPE",
      subtitle: "Internal",
      status: "New",
      stage: "New",
      amount: 48000,
      date: "2026-09-18",
      owner: "Sara Chen",
      fields: {
        customer: "Harbor & Co.",
        contact: "Sara Chen",
        probability: 90,
        expected_close: "2026-09-18",
        source: "Internal",
        next_action: "Issue PR",
        notes: "Safety refresh for new warehouse hires.",
      },
    },
    {
      id: "CRM-OPP-0091",
      title: "Al-Nour grinding package",
      subtitle: "Al-Nour Contracting",
      status: "Won",
      stage: "Won",
      amount: 86400,
      date: "2026-08-22",
      owner: "Antony Viju",
      fields: {
        customer: "Al-Nour Contracting",
        contact: "Hassan Farid",
        probability: 100,
        expected_close: "2026-08-22",
        source: "Walk-in",
        next_action: "Kick off delivery",
        notes: "Converted. First order SO-24018.",
      },
    },
    {
      id: "CRM-OPP-0088",
      title: "SEC Dammam switchgear",
      subtitle: "Saudi Electricity Co.",
      status: "Qualified",
      stage: "Qualified",
      amount: 410000,
      date: "2026-11-02",
      owner: "Layla Al-Harbi",
      fields: {
        customer: "Saudi Electricity Co.",
        contact: "Reem Al-Zahrani",
        probability: 35,
        expected_close: "2026-11-02",
        source: "Tender",
        next_action: "Prequalification file",
        notes: "New account. Need vendor number.",
      },
    },
  ],
  "Sales Order": [
    {
      id: "SO-24018",
      title: "Al-Nour Contracting",
      subtitle: "PO-AN-8891",
      status: "To Deliver",
      amount: 86400,
      date: "2026-09-01",
      owner: "Antony Viju",
      tags: ["Rush"],
      fields: {
        customer: "Al-Nour Contracting",
        po_no: "PO-AN-8891",
        delivery_date: "2026-09-09",
        warehouse: "Dammam WH-01",
        payment_terms: "Net 30",
        sales_partner: "Direct",
        notes: "Deliver to 2nd Industrial City, gate 4. Call Hassan 30 min prior.",
        grand_total: 86400,
      },
      lines: [
        { item: "PPE-HARNESS-X3", description: "Full-body harness, Class A", qty: 24, rate: 420, uom: "Nos" },
        { item: "GRIND-DISC-180", description: "Cutting disc 180mm INOX", qty: 200, rate: 18, uom: "Nos" },
        { item: "SAFE-BOOT-42", description: "Composite-toe boot", qty: 24, rate: 265, uom: "Pair" },
      ],
      activity: [
        act("change", "System", "2h ago", "Picked 18 of 24 harnesses."),
        act("comment", "James Okonkwo", "Yesterday", "Boots arriving from Jeddah tonight."),
      ],
    },
    {
      id: "SO-24014",
      title: "Saudi Aramco",
      subtitle: "Frame call-off 7",
      status: "To Bill",
      amount: 312000,
      date: "2026-08-21",
      owner: "Layla Al-Harbi",
      fields: {
        customer: "Saudi Aramco",
        po_no: "4500348871",
        delivery_date: "2026-08-30",
        warehouse: "Dammam WH-01",
        payment_terms: "Net 45",
        sales_partner: "Direct",
        notes: "Call-off against frame AGR-2025-19.",
        grand_total: 312000,
      },
      lines: [
        { item: "VLV-GATE-6-300", description: "Gate valve 6\" 300# A216 WCB", qty: 12, rate: 18400, uom: "Nos" },
        { item: "GSK-SPIR-6", description: "Spiral wound gasket 6\"", qty: 48, rate: 95, uom: "Nos" },
      ],
      activity: [act("change", "James Okonkwo", "5d ago", "DN completed. Awaiting invoice.")],
    },
    {
      id: "SO-24011",
      title: "SABIC",
      subtitle: "Jubail stores",
      status: "Completed",
      amount: 54800,
      date: "2026-08-08",
      owner: "Layla Al-Harbi",
      fields: {
        customer: "SABIC",
        po_no: "SBC-7721",
        delivery_date: "2026-08-14",
        warehouse: "Dammam WH-01",
        payment_terms: "Net 30",
        sales_partner: "Direct",
        notes: "Closed.",
        grand_total: 54800,
      },
      lines: [{ item: "TX-DP-ATEX", description: "DP transmitter ATEX", qty: 4, rate: 13700, uom: "Nos" }],
    },
    {
      id: "SO-24009",
      title: "Ma’aden",
      subtitle: "Phosphate mill",
      status: "Draft",
      amount: 198500,
      date: "2026-09-04",
      owner: "Antony Viju",
      fields: {
        customer: "Ma’aden",
        po_no: "Pending",
        delivery_date: "2026-09-22",
        warehouse: "Dammam WH-01",
        payment_terms: "Advance 50%",
        sales_partner: "Direct",
        notes: "Hold until commercial sign-off.",
        grand_total: 198500,
      },
      lines: [
        { item: "PMP-CHEM-40", description: "Chemical process pump 40m3/h", qty: 2, rate: 64200, uom: "Nos" },
        { item: "SL-MECH-40", description: "Mechanical seal kit", qty: 4, rate: 17525, uom: "Set" },
      ],
    },
    {
      id: "SO-24006",
      title: "SEC Dammam",
      subtitle: "Substation 12",
      status: "To Deliver",
      amount: 121000,
      date: "2026-08-26",
      owner: "Layla Al-Harbi",
      fields: {
        customer: "Saudi Electricity Co.",
        po_no: "SEC-441-26",
        delivery_date: "2026-09-11",
        warehouse: "Dammam WH-01",
        payment_terms: "Net 30",
        sales_partner: "Direct",
        notes: "Escort required at gate.",
        grand_total: 121000,
      },
      lines: [{ item: "CBL-XLPE-240", description: "XLPE 240mm cable", qty: 500, rate: 242, uom: "Mtr" }],
    },
  ],
  Quotation: [
    {
      id: "QTN-1182",
      title: "Ma’aden",
      status: "Open",
      amount: 620000,
      date: "2026-09-20",
      owner: "Layla Al-Harbi",
      fields: { customer: "Ma’aden", valid_till: "2026-09-20", incoterm: "DAP", notes: "Validity 14 days." },
      lines: [{ item: "PMP-CHEM-40", description: "Chemical process pump", qty: 6, rate: 64200, uom: "Nos" }],
    },
    {
      id: "QTN-1174",
      title: "Saudi Aramco",
      status: "Ordered",
      amount: 1840000,
      date: "2026-09-01",
      owner: "Layla Al-Harbi",
      fields: { customer: "Saudi Aramco", valid_till: "2026-09-01", incoterm: "DAP", notes: "Converted to frame." },
    },
    {
      id: "QTN-1168",
      title: "SABIC",
      status: "Draft",
      amount: 275000,
      date: "2026-09-18",
      owner: "Antony Viju",
      fields: { customer: "SABIC", valid_till: "2026-09-18", incoterm: "EXW", notes: "Awaiting ATEX annex." },
    },
  ],
  "Purchase Order": [
    {
      id: "PO-5512",
      title: "Emerson Gulf",
      status: "To Receive",
      amount: 188000,
      date: "2026-09-08",
      owner: "James Okonkwo",
      fields: { supplier: "Emerson Gulf", required_by: "2026-09-08", warehouse: "Dammam WH-01", notes: "Air freight the transmitters." },
      lines: [{ item: "TX-DP-ATEX", description: "DP transmitter ATEX", qty: 10, rate: 18800, uom: "Nos" }],
    },
    {
      id: "PO-5504",
      title: "Kitz Valves ME",
      status: "Completed",
      amount: 240000,
      date: "2026-08-18",
      owner: "James Okonkwo",
      fields: { supplier: "Kitz Valves ME", required_by: "2026-08-18", warehouse: "Dammam WH-01", notes: "Received complete." },
    },
    {
      id: "PO-5498",
      title: "3M Saudi",
      status: "To Bill",
      amount: 21400,
      date: "2026-09-03",
      owner: "Sara Chen",
      fields: { supplier: "3M Saudi", required_by: "2026-09-03", warehouse: "Dammam WH-01", notes: "PPE restock." },
    },
  ],
  Item: [
    {
      id: "VLV-GATE-6-300",
      title: "Gate valve 6\" 300#",
      status: "Active",
      amount: 220800,
      owner: "James Okonkwo",
      fields: { item_group: "Valves", uom: "Nos", warehouse: "Dammam WH-01", safety_stock: 6, description: "Cast steel gate, API 600, RF flanged.", qty_on_hand: 12, group: "Valves", qty: 12 },
    },
    {
      id: "PMP-CHEM-40",
      title: "Chemical process pump",
      status: "Active",
      amount: 128400,
      fields: { item_group: "Pumps", uom: "Nos", warehouse: "Dammam WH-01", safety_stock: 1, description: "ANSI chemical pump, 40 m³/h, 316SS.", qty_on_hand: 2, group: "Pumps", qty: 2 },
    },
    {
      id: "TX-DP-ATEX",
      title: "DP transmitter ATEX",
      status: "Active",
      amount: 54800,
      fields: { item_group: "Electrical", uom: "Nos", warehouse: "Dammam WH-01", safety_stock: 4, description: "4-20mA HART, Ex d IIC.", qty_on_hand: 4, group: "Electrical", qty: 4 },
    },
    {
      id: "PPE-HARNESS-X3",
      title: "Full-body harness",
      status: "Active",
      amount: 10080,
      fields: { item_group: "Safety", uom: "Nos", warehouse: "Dammam WH-01", safety_stock: 20, description: "EN 361, dorsal + sternal D-rings.", qty_on_hand: 24, group: "Safety", qty: 24 },
    },
    {
      id: "CBL-XLPE-240",
      title: "XLPE 240mm cable",
      status: "Active",
      amount: 121000,
      fields: { item_group: "Electrical", uom: "Mtr", warehouse: "Dammam WH-01", safety_stock: 200, description: "Cu XLPE/SWA/PVC 0.6/1kV.", qty_on_hand: 500, group: "Electrical", qty: 500 },
    },
    {
      id: "GRIND-DISC-180",
      title: "Cutting disc 180mm",
      status: "Active",
      amount: 3600,
      fields: { item_group: "Safety", uom: "Nos", warehouse: "Dammam WH-01", safety_stock: 80, description: "INOX, 1.6mm.", qty_on_hand: 200, group: "Safety", qty: 200 },
    },
  ],
  Employee: [
    {
      id: "HR-EMP-0001",
      title: "Antony Viju",
      subtitle: "System Manager",
      status: "Active",
      stage: "Active",
      date: "2022-03-14",
      owner: "Board",
      fields: { department: "Management", designation: "Managing Partner", reports_to: "Board", email: "antony@harbor.co", phone: "+966 50 100 4401", joined: "2022-03-14" },
    },
    {
      id: "HR-EMP-0004",
      title: "Layla Al-Harbi",
      subtitle: "Sales Manager",
      status: "Active",
      stage: "Active",
      date: "2023-01-09",
      owner: "Antony Viju",
      fields: { department: "Sales", designation: "Sales Manager", reports_to: "Antony Viju", email: "layla@harbor.co", phone: "+966 55 882 1904", joined: "2023-01-09" },
    },
    {
      id: "HR-EMP-0007",
      title: "Omar Qureshi",
      subtitle: "Accountant",
      status: "On leave",
      stage: "On leave",
      date: "2023-06-01",
      owner: "Antony Viju",
      fields: { department: "Finance", designation: "Accountant", reports_to: "Antony Viju", email: "omar@harbor.co", phone: "+966 54 220 7711", joined: "2023-06-01" },
    },
    {
      id: "HR-EMP-0011",
      title: "James Okonkwo",
      subtitle: "Warehouse lead",
      status: "Active",
      stage: "Active",
      date: "2024-02-18",
      owner: "Antony Viju",
      fields: { department: "Warehouse", designation: "Warehouse Lead", reports_to: "Antony Viju", email: "james@harbor.co", phone: "+966 53 441 2280", joined: "2024-02-18" },
    },
    {
      id: "HR-EMP-0014",
      title: "Sara Chen",
      subtitle: "People ops",
      status: "Active",
      stage: "Active",
      date: "2024-11-04",
      owner: "Antony Viju",
      fields: { department: "HR", designation: "HR Generalist", reports_to: "Antony Viju", email: "sara@harbor.co", phone: "+966 56 019 3344", joined: "2024-11-04" },
    },
    {
      id: "HR-EMP-0018",
      title: "Maha Al-Shammari",
      subtitle: "Buyer",
      status: "Onboarding",
      stage: "Onboarding",
      date: "2026-09-01",
      owner: "James Okonkwo",
      fields: { department: "Procurement", designation: "Buyer", reports_to: "James Okonkwo", email: "maha@harbor.co", phone: "+966 58 772 0012", joined: "2026-09-01" },
    },
  ],
  Task: [
    {
      id: "PRJ-TSK-22",
      title: "Aramco QA dossier",
      status: "In progress",
      stage: "In progress",
      date: "2026-09-08",
      owner: "Layla Al-Harbi",
      fields: { project: "Aramco frame 2026", assignee: "Layla Al-Harbi", priority: "High", due: "2026-09-08", notes: "Compile mill certs + ITP." },
    },
    {
      id: "PRJ-TSK-19",
      title: "Dammam racking layout",
      status: "Review",
      stage: "Review",
      date: "2026-09-06",
      owner: "James Okonkwo",
      fields: { project: "WH expansion", assignee: "James Okonkwo", priority: "Medium", due: "2026-09-06", notes: "Aisle 4-6 re-slot." },
    },
    {
      id: "PRJ-TSK-17",
      title: "VAT return Aug",
      status: "Backlog",
      stage: "Backlog",
      date: "2026-09-10",
      owner: "Omar Qureshi",
      fields: { project: "Close Aug", assignee: "Omar Qureshi", priority: "High", due: "2026-09-10", notes: "ZATCA Fatoora alignment." },
    },
    {
      id: "PRJ-TSK-15",
      title: "Onboard Maha",
      status: "In progress",
      stage: "In progress",
      date: "2026-09-07",
      owner: "Sara Chen",
      fields: { project: "People ops", assignee: "Sara Chen", priority: "Medium", due: "2026-09-07", notes: "Laptop, badge, ERP user." },
    },
    {
      id: "PRJ-TSK-12",
      title: "Pump test protocol",
      status: "Done",
      stage: "Done",
      date: "2026-09-02",
      owner: "James Okonkwo",
      fields: { project: "Maaden mill", assignee: "James Okonkwo", priority: "Low", due: "2026-09-02", notes: "Signed off." },
    },
    {
      id: "PRJ-TSK-09",
      title: "Website catalog photos",
      status: "Backlog",
      stage: "Backlog",
      date: "2026-09-15",
      owner: "Sara Chen",
      fields: { project: "Brand", assignee: "Sara Chen", priority: "Low", due: "2026-09-15", notes: "Valves + PPE hero shots." },
    },
    {
      id: "PRJ-TSK-08",
      title: "Credit limit review",
      status: "Review",
      stage: "Review",
      date: "2026-09-05",
      owner: "Omar Qureshi",
      fields: { project: "Close Aug", assignee: "Omar Qureshi", priority: "High", due: "2026-09-05", notes: "Al-Nour + SEC." },
    },
    {
      id: "PRJ-TSK-05",
      title: "ISO 9001 surveillance",
      status: "In progress",
      stage: "In progress",
      date: "2026-09-20",
      owner: "Antony Viju",
      fields: { project: "Quality", assignee: "Antony Viju", priority: "High", due: "2026-09-20", notes: "Auditor on site 20 Sep." },
    },
  ],
  "Work Order": [
    {
      id: "WO-441",
      title: "Seal kit assembly",
      status: "In process",
      amount: 4,
      date: "2026-09-07",
      owner: "James Okonkwo",
      fields: { bom: "BOM-SL-MECH-40", qty: 4, workshop: "Bay A", notes: "For Maaden hold order." },
    },
    {
      id: "WO-436",
      title: "Harness inspection lot",
      status: "Completed",
      amount: 24,
      date: "2026-09-01",
      owner: "James Okonkwo",
      fields: { bom: "BOM-PPE-HARNESS", qty: 24, workshop: "QA bench", notes: "Passed." },
    },
    {
      id: "WO-429",
      title: "Cable cut-to-length",
      status: "Not started",
      amount: 500,
      date: "2026-09-10",
      owner: "James Okonkwo",
      fields: { bom: "BOM-CBL-240", qty: 500, workshop: "Cut station", notes: "SEC order." },
    },
  ],
  "Sales Invoice": [
    {
      id: "SINV-2408-014",
      title: "Saudi Aramco",
      status: "Unpaid",
      amount: 312000,
      date: "2026-09-15",
      owner: "Omar Qureshi",
      fields: { customer: "Saudi Aramco", due_date: "2026-09-15", payment_terms: "Net 45", notes: "Call-off 7." },
    },
    {
      id: "SINV-2408-009",
      title: "SABIC",
      status: "Paid",
      amount: 0,
      date: "2026-08-28",
      owner: "Omar Qureshi",
      fields: { customer: "SABIC", due_date: "2026-08-28", payment_terms: "Net 30", notes: "Settled." },
    },
    {
      id: "SINV-2407-031",
      title: "Al-Nour Contracting",
      status: "Overdue",
      amount: 86400,
      date: "2026-08-25",
      owner: "Omar Qureshi",
      fields: { customer: "Al-Nour Contracting", due_date: "2026-08-25", payment_terms: "Net 30", notes: "Reminder 2 sent." },
    },
    {
      id: "SINV-2408-021",
      title: "Ma’aden",
      status: "Draft",
      amount: 99300,
      date: "2026-09-12",
      owner: "Omar Qureshi",
      fields: { customer: "Ma’aden", due_date: "2026-09-12", payment_terms: "Advance 50%", notes: "Advance invoice." },
    },
  ],
};

export function cloneRecords(): Record<string, DeskRecord[]> {
  return JSON.parse(JSON.stringify(SEED)) as Record<string, DeskRecord[]>;
}

export function findRecord(
  records: Record<string, DeskRecord[]>,
  doctype: string,
  id: string,
): DeskRecord | undefined {
  return records[doctype]?.find((r) => r.id === id);
}

export const APP_DOCTYPES: Record<Exclude<AppId, "home" | "studio">, string[]> = {
  crm: ["Lead", "Opportunity"],
  sales: ["Sales Order", "Quotation"],
  buying: ["Purchase Order"],
  stock: ["Item"],
  accounts: ["Sales Invoice"],
  hr: ["Employee"],
  mfg: ["Work Order"],
  projects: ["Task"],
};

export const MONTHLY_REVENUE = [
  { month: "Mar", value: 980000 },
  { month: "Apr", value: 1120000 },
  { month: "May", value: 1040000 },
  { month: "Jun", value: 1410000 },
  { month: "Jul", value: 1260000 },
  { month: "Aug", value: 1680000 },
  { month: "Sep", value: 740000 },
];

export const AGED_RECEIVABLES = [
  { bucket: "Current", value: 312000 },
  { bucket: "1–30", value: 54800 },
  { bucket: "31–60", value: 86400 },
  { bucket: "61+", value: 22000 },
];

export function statusTone(status: string): "neutral" | "info" | "success" | "warning" | "danger" {
  const s = status.toLowerCase();
  if (["won", "completed", "paid", "active", "done", "ordered"].includes(s)) return "success";
  if (["overdue", "lost", "disabled"].includes(s)) return "danger";
  if (["negotiation", "to deliver", "to bill", "to receive", "review", "on leave", "open", "in process", "in progress"].includes(s))
    return "warning";
  if (["qualified", "proposition", "unpaid", "contacted"].includes(s)) return "info";
  return "neutral";
}

export const USER = {
  name: "Antony Viju",
  email: "antony@harbor.co",
  role: "System Manager",
  company: "Harbor & Co.",
  city: "Dammam",
};
