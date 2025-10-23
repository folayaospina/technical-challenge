import { useState, useEffect, use } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchPatientById,
  updatePatientStatus,
} from "../store/slices/patient/thunks/patient.thunks";
import { useGetStatus } from "../hooks/status.hook";
import { current } from "../../node_modules/immer/src/core/current";
import { fetchStatuses } from "../store/slices/general/thunks/general.thunks";
import useGetProvider from "../hooks/provider.hook";
import { fetchStatusHistory } from "../store/slices/status-history/statushSlice";

function PatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedPatient: patient, loading } = useAppSelector(
    (state) => state.patients
  );
  const { providers } = useAppSelector((state) => state.providers);
  const { statuses } = useAppSelector((state) => state.general);
  const [newStatus, setNewStatus] = useState("");
  const [statusList, setStatusList] = useState<any[]>([]);
  const getStatus = useGetStatus(patient?.status_id, statuses);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const fetchStatusList = async (patientId: string) => {
    try {
      const response = await fetch(`${API_URL}/status-history/${patientId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch status history");
      }
      const data = await response.json();
      console.log("data", data);
      setStatusList(data);
    } catch (error) {
      setStatusList([]);
    }
  };

  useEffect(() => {
    if (statuses.length === 0) {
      dispatch(fetchStatuses());
    }
    if (id) {
      dispatch(fetchPatientById(id));
      dispatch(fetchStatusHistory(id));
      fetchStatusList(id);
    }
  }, [id, dispatch]);

  const handleStatusUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      await dispatch(
        updatePatientStatus({ id, status_id: newStatus })
      ).unwrap();
      alert("Estado actualizado exitosamente");
    } catch (error) {
      console.error("Error:", error);
      alert("Error al actualizar estado");
    }
  };

  const getProvider = useGetProvider(providers, patient?.provider_id || "");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("es-ES");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-xl">
        Loading...
      </div>
    );
  if (!patient)
    return (
      <div className="flex justify-center items-center h-64 text-xl text-red-600">
        Patient not found
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate("/")}
        className="mb-6 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
      >
        ← Back
      </button>

      <div className="bg-white shadow-md rounded-lg p-8 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {patient.full_name}
        </h1>
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-medium">Email:</span> {patient.email}
          </p>
          <p>
            <span className="font-medium">Mobile:</span> {patient.phone}
          </p>
          {patient.provider_id && (
            <p className="text-gray-600">
              <span className="font-medium">Provider:</span> {getProvider}
            </p>
          )}
          <p>
            <span className="font-medium">Actual status:</span>{" "}
            <span
              className={`inline-block ml-2 px-3 py-1 rounded-full text-black text-md font-bold `}
            >
              {getStatus}
            </span>
          </p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-8 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Update status</h2>
        <form onSubmit={handleStatusUpdate}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              New Status:
            </label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Update Status
          </button>
        </form>
      </div>

      <div className="bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          History of status{" "}
        </h2>
        <div className="relative pl-8 space-y-6">
          {statusList && statusList.length > 0 ? (
            statusList.map((history) => {
              console.log(history);

              const status = statuses.find((s) => s.id === history.status_id);

              return (
                <div key={history.id} className="relative">
                  <div
                    className={`absolute left-[-25px] top-0 w-3.5 h-3.5 rounded-full border-4 border-white `}
                  />
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="mb-2">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-black text-xs font-bold `}
                      >
                        {status ? status.name : "Desconocido"}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {formatDate(history.changed_at)}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-center">
              Doesn't have available status history{" "}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PatientDetail;
