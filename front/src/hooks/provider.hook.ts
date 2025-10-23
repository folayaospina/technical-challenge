import { useMemo } from 'react';

const useGetProvider = (providers: any[], providerId: string) => {
    return useMemo(() => {
        const provider = providers.find((p) => p.id === providerId);
        return provider?.full_name + ' - ' + provider?.specialty || 'Desconocido';
    }, [providers, providerId]);
};

export default useGetProvider;