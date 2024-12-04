const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/******************* Get all medical reports *******************/
const getAllRecords = async () => {
  const res = await fetch(`${API_BASE_URL}/MedicalRecords/`);

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.detail);
  }

  return data;
};

/******************* Get record by id *******************/
const getRecordById = async (_id) => {
  const res = await fetch(`${API_BASE_URL}/MedicalRecords/${_id}`);

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.detail);
  }

  return data;
};

export { getAllRecords, getRecordById };
