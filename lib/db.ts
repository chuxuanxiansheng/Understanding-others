import { getSupabase } from "./supabase";

function db(table: string) {
  return getSupabase().from(table as any) as any;
}

export interface SessionRow {
  id: string;
  set_mode: string;
  guesser_name: string;
  share_token: string;
  created_at: string;
  completed_at: string | null;
}

export interface AnswerRow {
  id: string;
  session_id: string;
  question_id: string;
  chosen: string;
}

export interface CorrectionRow {
  id: string;
  session_id: string;
  question_id: string;
  is_correct: boolean;
  corrected_to: string | null;
  note: string | null;
}

export async function createSession(
  setMode: string,
  guesserName: string,
  shareToken: string
): Promise<string> {
  const { data, error } = await db("sessions")
    .insert({ set_mode: setMode, guesser_name: guesserName, share_token: shareToken })
    .select("id")
    .single();

  if (error) throw new Error("创建会话失败: " + error.message);
  return data.id;
}

export async function getSession(id: string): Promise<SessionRow | null> {
  const { data, error } = await db("sessions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as SessionRow;
}

export async function saveAnswers(
  answersArr: { questionId: string; chosen: string }[],
  sessionId: string
) {
  const rows = answersArr.map((a) => ({
    session_id: sessionId,
    question_id: a.questionId,
    chosen: a.chosen,
  }));

  const { error } = await db("answers").insert(rows);
  if (error) throw new Error("保存答案失败: " + error.message);
}

export async function getAnswers(sessionId: string): Promise<AnswerRow[]> {
  const { data, error } = await db("answers")
    .select("*")
    .eq("session_id", sessionId);

  if (error) throw new Error("获取答案失败: " + error.message);
  return (data || []) as AnswerRow[];
}

export async function deleteCorrections(sessionId: string) {
  const { error } = await db("corrections")
    .delete()
    .eq("session_id", sessionId);

  if (error) throw new Error("删除纠错失败: " + error.message);
}

export async function saveCorrections(
  correctionsArr: { questionId: string; isCorrect: boolean; correctedTo?: string; note?: string }[],
  sessionId: string
) {
  const rows = correctionsArr.map((c) => ({
    session_id: sessionId,
    question_id: c.questionId,
    is_correct: c.isCorrect,
    corrected_to: c.correctedTo || null,
    note: c.note || null,
  }));

  const { error } = await db("corrections").insert(rows);
  if (error) throw new Error("保存纠错失败: " + error.message);
}

export async function getCorrections(sessionId: string): Promise<CorrectionRow[]> {
  const { data, error } = await db("corrections")
    .select("*")
    .eq("session_id", sessionId);

  if (error) throw new Error("获取纠错失败: " + error.message);
  return (data || []) as CorrectionRow[];
}

export async function completeSession(sessionId: string) {
  const { error } = await db("sessions")
    .update({ completed_at: new Date().toISOString() })
    .eq("id", sessionId);

  if (error) throw new Error("完成会话失败: " + error.message);
}