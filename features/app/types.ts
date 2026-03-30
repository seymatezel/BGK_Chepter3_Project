export type ThreatLevel = 'TEHLİKELİ' | 'ŞÜPHELİ' | 'GÜVENLİ';

export interface AnalysisResult {
  id: string;
  timestamp: number;
  type: 'text' | 'image' | 'link' | 'qr';
  content: string;
  result: ThreatLevel;
  reason: string;
  action: string;
  linkVar: boolean;
  qrVar: boolean;
}

export interface AIResponse {
  SONUÇ: ThreatLevel;
  NEDEN: string;
  NE_YAPMALI: string;
  LINK_VAR: boolean;
  QR_VAR: boolean;
}
