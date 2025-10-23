import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchStatuses } from "../store/slices/general/thunks/general.thunks";
import { fetchPatients } from "../store/slices/patient/thunks/patient.thunks";
import { fetchProviders } from "../store/slices/provider/thunks/provider.thunks";

function PatientList() {
  const dispatch = useAppDispatch();
  const { patients, loading } = useAppSelector((state) => state.patients);
  const {providers} = useAppSelector((state) => state.providers);
  const { statuses } = useAppSelector((state) => state.general);
  useEffect(() => {
    // Solo fetch si los estados aún no están cargados
    if (!statuses || statuses.length === 0) {
      dispatch(fetchStatuses());
    }
    dispatch(fetchProviders());
    dispatch(fetchPatients());
  }, [dispatch, statuses]);

  const getStatus = (status: string) => {
    return statuses.find((s) => s.id === status)?.name || status;
  };

  const getProvider = (providerId: string) => {
    
    const provider= providers.find((p) => p.id === providerId) 
        return provider?.full_name + ' - ' + provider?.specialty || 'Desconocido';
};

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-xl">
        Loading...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
List of patients      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {patient.full_name}
            </h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> {patient.email}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Mobile:</span> {patient.phone}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`inline-block px-3 py-1 rounded-full text-black text-xs font-bold `}
                >
                  {getStatus(patient.status_id)}
                </span>
              </p>
              {patient.provider_id && (
                <p className="text-gray-600">
                  <span className="font-medium">Provider:</span>{" "}
                  {getProvider(patient.provider_id)}
                </p>
              )}
            </div>
            <Link
              to={`/patient/${patient.id}`}
              className="mt-4 block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              See Details
            </Link>
          </div>
        ))}
      </div>
      {patients.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
            We dont have any patients registered yet.
            </p>
      )}
    </div>
  );
}

export default PatientList;
