export type ValidStatus = "active" | "inactive" | "pending" | "approved" | "rejected" | "processing" | "completed" | "draft";

export const getValidStatus = (status: string): ValidStatus => {
  const validStatuses: ValidStatus[] = [
    "active", "inactive", "pending", "approved", "rejected", 
    "processing", "completed", "draft"
  ];
  
  const lowerStatus = status.toLowerCase();
  
  // Map common status variations to valid statuses
  const statusMap: { [key: string]: ValidStatus } = {
    'generating': 'processing',
    'failed': 'rejected',
    'success': 'completed',
    'error': 'rejected',
    'done': 'completed',
    'in_progress': 'processing',
    'in-progress': 'processing',
    'cancelled': 'rejected',
    'canceled': 'rejected'
  };
  
  if (statusMap[lowerStatus]) {
    return statusMap[lowerStatus];
  }
  
  return validStatuses.includes(lowerStatus as ValidStatus) 
    ? lowerStatus as ValidStatus 
    : "inactive";
};