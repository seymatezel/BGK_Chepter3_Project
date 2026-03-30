import { GoogleGenAI, Type } from "@google/genai";
import { AIResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

const SYSTEM_INSTRUCTION = `
Sen bir siber güvenlik uzmanısın. Türkiye'deki dolandırıcılık kalıplarını çok iyi biliyorsun.
Analiz ederken şunlara bak:
- Sahte kurum taklidi: Ziraat Bankası, Garanti, İş Bankası, Yapı Kredi, PTT, Turkcell, Vodafone, Türk Telekom, e-Devlet, SGK, vergi dairesi, Yurtiçi Kargo, MNG Kargo
- Aciliyet dili: "Hemen tıklayın", "Hesabınız askıya alındı", "Son 24 saat"
- Kimlik/kart/şifre talebi
- Ödül/hediye vaadi: "Tebrikler kazandınız"
- Şüpheli link varlığı
- Dil hataları ve tutarsız yazım
- Kargo dolandırıcılığı

Ayrıca tespit et:
- Metinde link var mı? → LINK_VAR: true/false
- Metinde QR kod geçiyor mu? → QR_VAR: true/false

Yanıt formatı (kesinlikle bu formatta ver):
SONUÇ: [TEHLİKELİ / ŞÜPHELİ / GÜVENLİ]
NEDEN: [2-3 cümle, teknik terim yok, sade Türkçe]
NE YAPMALI: [Tek somut öneri]
LINK_VAR: [true/false]
QR_VAR: [true/false]

Dili otomatik algıla. Türkçe mesaja Türkçe, İngilizce mesaja İngilizce yanıt ver.
`;

export async function analyzeContent(content: string, isImage: boolean = false): Promise<AIResponse> {
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: isImage 
      ? { parts: [{ inlineData: { data: content.split(',')[1], mimeType: "image/png" } }, { text: "Bu görseli dolandırıcılık açısından analiz et." }] }
      : content,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });

  const response = await model;
  const text = response.text;

  // Simple parser for the specified format
  const result: Partial<AIResponse> = {};
  
  const lines = text.split('\n');
  lines.forEach(line => {
    if (line.startsWith('SONUÇ:')) result.SONUÇ = line.replace('SONUÇ:', '').trim() as any;
    if (line.startsWith('NEDEN:')) result.NEDEN = line.replace('NEDEN:', '').trim();
    if (line.startsWith('NE YAPMALI:')) result.NE_YAPMALI = line.replace('NE YAPMALI:', '').trim();
    if (line.startsWith('LINK_VAR:')) result.LINK_VAR = line.replace('LINK_VAR:', '').trim().toLowerCase() === 'true';
    if (line.startsWith('QR_VAR:')) result.QR_VAR = line.replace('QR_VAR:', '').trim().toLowerCase() === 'true';
  });

  return {
    SONUÇ: result.SONUÇ || 'ŞÜPHELİ',
    NEDEN: result.NEDEN || 'Analiz sırasında bir sorun oluştu.',
    NE_YAPMALI: result.NE_YAPMALI || 'Lütfen dikkatli olun.',
    LINK_VAR: !!result.LINK_VAR,
    QR_VAR: !!result.QR_VAR,
  };
}

export async function analyzeUrl(url: string): Promise<AIResponse> {
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Bu linki dolandırıcılık açısından analiz et: ${url}`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });

  const response = await model;
  const text = response.text;

  const result: Partial<AIResponse> = {};
  const lines = text.split('\n');
  lines.forEach(line => {
    if (line.startsWith('SONUÇ:')) result.SONUÇ = line.replace('SONUÇ:', '').trim() as any;
    if (line.startsWith('NEDEN:')) result.NEDEN = line.replace('NEDEN:', '').trim();
    if (line.startsWith('NE YAPMALI:')) result.NE_YAPMALI = line.replace('NE YAPMALI:', '').trim();
    if (line.startsWith('LINK_VAR:')) result.LINK_VAR = line.replace('LINK_VAR:', '').trim().toLowerCase() === 'true';
    if (line.startsWith('QR_VAR:')) result.QR_VAR = line.replace('QR_VAR:', '').trim().toLowerCase() === 'true';
  });

  return {
    SONUÇ: result.SONUÇ || 'ŞÜPHELİ',
    NEDEN: result.NEDEN || 'Link analizi sırasında bir sorun oluştu.',
    NE_YAPMALI: result.NE_YAPMALI || 'Linki açmadan önce iki kez düşünün.',
    LINK_VAR: true,
    QR_VAR: false,
  };
}
