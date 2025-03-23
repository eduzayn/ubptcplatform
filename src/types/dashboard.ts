export interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: "ebook" | "podcast" | "article";
  thumbnail: string;
  url: string;
}

export interface CertificationRequirement {
  id: string;
  name: string;
  completed: boolean;
  description: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "webinar" | "workshop" | "lecture" | "meeting";
  speaker: string;
  description: string;
}

export type CredentialType = "professional" | "student";

export interface CredentialInfo {
  title: string;
  colorClass: string;
  prefix: string;
}

export interface QrCodeData {
  id: string;
  type: CredentialType;
  memberId: string;
  timestamp: string;
  url: string;
}
