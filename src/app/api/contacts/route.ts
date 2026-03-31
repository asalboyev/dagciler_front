import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function sendTelegramMessage(text: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;

  await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: "HTML",
      }),
    }
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone_number, email, message, company } = body;

    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

    const params = new URLSearchParams();
    if (name) params.set("name", String(name));
    if (phone_number) params.set("phone_number", String(phone_number));
    if (email) params.set("email", String(email));
    if (message) params.set("message", String(message));
    if (company) params.set("company", String(company));

    const apiRes = await fetch(`${apiUrl}/store?${params.toString()}`, {
      method: "POST",
    });

    const telegramText = [
      "<b>Новая заявка — Dagcilfer</b>",
      "",
      `<b>Имя:</b> ${name ?? "N/A"}`,
      `<b>Телефон:</b> ${phone_number ?? "N/A"}`,
      email ? `<b>Email:</b> ${email}` : null,
      company ? `<b>Организация:</b> ${company}` : null,
      message ? `<b>Сообщение:</b> ${message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    await sendTelegramMessage(telegramText);

    if (apiRes.ok) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Failed to submit" },
      { status: apiRes.status }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
