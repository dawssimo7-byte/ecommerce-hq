import { randomUUID } from "node:crypto";

export type Room =
  | "product-research"
  | "marketing"
  | "analytics"
  | "video-studio"
  | "suppliers"
  | "budget-manager"
  | "shopify-store"
  | "customer-support"
  | "central";

export interface PlannedTask {
  taskId: string;
  room: Room;
  description: string;
  status: "pending";
}

export interface ExecutionPlan {
  planId: string;
  originalMessage: string;
  status: "planned";
  tasks: PlannedTask[];
  createdAt: string;
}

const ROOM_RULES: {
  room: Room;
  keywords: RegExp;
  description: string;
}[] = [
  {
    room: "product-research",
    keywords: /منتج|منتجات|بحث|سوق|منافس|product|research|market/i,
    description: "البحث عن المنتجات والأسواق والمنافسين"
  },
  {
    room: "marketing",
    keywords: /تسويق|إعلان|إعلانات|حملة|marketing|ads|campaign/i,
    description: "إعداد وتحليل الأنشطة التسويقية"
  },
  {
    room: "analytics",
    keywords: /تحليل|مبيعات|أرباح|بيانات|analytics|sales|profit/i,
    description: "تحليل البيانات والمبيعات والأداء"
  },
  {
    room: "video-studio",
    keywords: /فيديو|تصميم فيديو|مونتاج|video|editing/i,
    description: "إعداد محتوى الفيديو"
  },
  {
    room: "suppliers",
    keywords: /مورد|موردين|شحن|مخزون|cj|supplier|shipping|stock/i,
    description: "فحص الموردين والمخزون والشحن"
  },
  {
    room: "budget-manager",
    keywords: /ميزانية|تكلفة|ميزانيات|مصروف|budget|cost|expense/i,
    description: "حساب التكاليف وإدارة الميزانية"
  },
  {
    room: "shopify-store",
    keywords: /متجر|شوبيفاي|منتج في المتجر|shopify|store|orders/i,
    description: "إدارة المتجر والعمليات"
  },
  {
    room: "customer-support",
    keywords: /عميل|عملاء|زبون|زبائن|دعم|ردود|customer|support/i,
    description: "إدارة العملاء والردود"
  }
];

export function createPlan(message: string): ExecutionPlan {
  const originalMessage = message.trim();

  if (!originalMessage) {
    throw new Error("لا يمكن إنشاء خطة لطلب فارغ.");
  }

  const selectedRooms = ROOM_RULES.filter(rule =>
    rule.keywords.test(originalMessage)
  );

  const tasks: PlannedTask[] = selectedRooms.length
    ? selectedRooms.map(rule => ({
        taskId: randomUUID(),
        room: rule.room,
        description: rule.description,
        status: "pending"
      }))
    : [
        {
          taskId: randomUUID(),
          room: "central",
          description: "تحليل الطلب وتحديد القسم المناسب",
          status: "pending"
        }
      ];

  return {
    planId: randomUUID(),
    originalMessage,
    status: "planned",
    tasks,
    createdAt: new Date().toISOString()
  };
}
