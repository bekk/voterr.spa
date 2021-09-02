interface Vote {
  id: string;
  candidateId: number;
  voterObjectId: string;
  voterTenantId: string;
  timestamp: Date;
}

export default Vote;