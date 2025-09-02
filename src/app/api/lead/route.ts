import { NextResponse } from "next/server";

const WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL;

type LeadPayload = {
  form_id: string;           
  section_path: string;      
  lead: {
    nome: string;
    whatsapp: string;
  };
  utm: {
    utm_source?: string | null;
    utm_medium?: string | null;
    utm_campaign?: string | null;
    utm_term?: string | null;
    utm_content?: string | null;
    gclid?: string | null;
    fbclid?: string | null;
  };
};

export async function POST(req: Request) {
  try {
    if (!WEBHOOK_URL) {
      return NextResponse.json(
        { ok: false, error: "MAKE_WEBHOOK_URL não configurada" },
        { status: 500 }
      );
    }

    const body = (await req.json()) as LeadPayload;

    if (!body?.lead?.nome || !body?.lead?.whatsapp || !body?.form_id) {
      return NextResponse.json(
        { ok: false, error: "Campos obrigatórios ausentes" },
        { status: 400 }
      );
    }

    const r = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!r.ok) {
      const text = await r.text().catch(() => "");
      return NextResponse.json(
        { ok: false, error: `Webhook retornou ${r.status}: ${text}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Erro inesperado" },
      { status: 500 }
    );
  }
}
