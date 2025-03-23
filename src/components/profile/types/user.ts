export interface UserData {
  id: string;
  name: string;
  email: string;
  cpf: string;
  profession: string;
  institution: string;
  graduationYear: string;
  specialization: string;
  memberSince: string;
  memberId: string;
  paymentStatus: "active" | "suspended";
  avatarUrl?: string;
}
