import type { Status } from "../store/slices/general/generalSlice";

  export const useGetStatus = (status: string | undefined, statuses: Status[]) => {
    if (!status) return 'Desconocido';
    return statuses.find((s) => s.id === status)?.name || status;
  };
