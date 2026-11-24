import { randomUUID } from "node:crypto";

export interface BrainRequest {
  message: string;
  projectId?: string;
}

export interface BrainResponse {
  taskId: string;
  status: "received" | "rejected";
  message: string;
  projectId?: string;
  createdAt: string;
}

export function processRequest(
  request: BrainRequest
): BrainResponse {

  const message = request.message?.trim();

  if (!message) {
    return {
      taskId: "",
      status: "rejected",
      message: "الطلب فارغ. يرجى كتابة المهمة.",
      projectId: request.projectId,
      createdAt: new Date().toISOString()
    };
  }

  return {
    taskId: randomUUID(),
    status: "received",
    message: "استلم العقل المركزي طلبك. بانتظار تفعيل محرك التخطيط والذكاء الاصطناعي.",
    projectId: request.projectId,
    createdAt: new Date().toISOString()
  };
}
